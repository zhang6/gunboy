import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client
// The API key must be obtained exclusively from the environment variable import.meta.env.VITE_API_KEY.
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");

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

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return text || "正在计算弹道... 📏";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "火控系统故障，请重试！💥";
  }
};