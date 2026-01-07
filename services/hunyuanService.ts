const HUNYUAN_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
// API Key 可以从环境变量读取
const API_KEY = import.meta.env.VITE_HUNYUAN_API_KEY || '';

const SYSTEM_INSTRUCTION = `
你现在是"张佳阳"的数字军械士（Digital Armorer）。
你的人设是：资深枪械技师、弹道学专家、射击竞技（IPSC/IDPA）爱好者。说话极其硬核、精准，喜欢讨论机械结构。

关于张佳阳的信息：
- 身份：代号 "Gunsmith" (枪匠)，狂热的轻武器发烧友。
- 爱好：枪械改装 (AR-15/Glock 平台)、子弹复装 (Reloading)、远距离精确射击 (Long Range)、各类口径研究。
- 坐标：地下靶场或工作台前。
- 风格：机械美学、碳纤维、Cerakote 涂装。
- 座右铭："Accuracy is final." (精准即是一切)。
- 联系方式：目前处于无线电静默状态，所有外部通讯已切断（Classified）。

回复风格指南：
- 专注于机械细节（如：扳机力度、膛线缠距、初速、MOA、皮卡汀尼导轨）。
- 语气要像老练的靶场教官或枪店老板，专业且带点那种"火药味"。
- 如果被问到非枪械话题，试着用射击术语比喻（比如：把解决Bug比作"排除卡壳故障"）。
- 多用 emoji 🔫🎯🔧📏💥。
- 如果被问及联系方式，回答："通讯频道已加密，暂不接受外部连线。Over。"
- 如果不知道答案，回答："数据缺失，需进行校零测试。"
`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface HunyuanOptions {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  onChunk?: (chunk: string) => void;
}

/**
 * 发送消息到 Hunyuan API (流式响应)
 * 如果没有配置 API Key，则回退到 SiliconFlow 服务
 */
export const sendMessageToHunyuan = async (
  userMessage: string,
  options: HunyuanOptions = {}
): Promise<string> => {
  const {
    model: modelName = 'ep-20250501155423-9xlbq',
    stream = true,
    max_tokens = 4096,
    temperature = 0.7,
    onChunk
  } = options;

  // 如果没有配置 Hunyuan API Key，回退到 SiliconFlow
  if (!API_KEY) {
    const { sendMessageToSiliconFlow } = await import('./siliconFlowService');
    return sendMessageToSiliconFlow(userMessage, {
      stream,
      max_tokens,
      temperature,
      onChunk
    });
  }

  const messages: Message[] = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch(HUNYUAN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': '*/*',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        stream,
        max_tokens,
        temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    if (stream) {
      return await handleStreamResponse(response, onChunk);
    } else {
      const data = await response.json();
      return data.choices[0]?.message?.content || '正在计算弹道... 📏';
    }
  } catch (error) {
    console.error('Hunyuan API Error:', error);
    // 如果 Hunyuan 失败，尝试回退到 SiliconFlow
    try {
      const { sendMessageToSiliconFlow } = await import('./siliconFlowService');
      return sendMessageToSiliconFlow(userMessage, {
        stream,
        max_tokens,
        temperature,
        onChunk
      });
    } catch (fallbackError) {
      console.error('Fallback service also failed:', fallbackError);
      return '火控系统故障，请重试！💥';
    }
  }
};

/**
 * 处理流式响应
 */
const handleStreamResponse = async (
  response: Response,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  
  if (!reader) {
    throw new Error('无法读取响应流');
  }

  let fullText = '';
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            
            if (delta) {
              fullText += delta;
              onChunk?.(delta);
            }
          } catch (e) {
            // 忽略解析错误，继续处理下一行
            console.warn('解析流数据错误:', e);
          }
        }
      }
    }

    // 处理剩余的 buffer
    if (buffer) {
      if (buffer.startsWith('data: ')) {
        const data = buffer.slice(6);
        if (data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              onChunk?.(delta);
            }
          } catch (e) {
            console.warn('解析流数据错误:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullText || '正在计算弹道... 📏';
};

