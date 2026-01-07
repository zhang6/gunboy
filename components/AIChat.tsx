import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Radio, Settings } from 'lucide-react';
import { sendMessageToHunyuan } from '../services/hunyuanService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "欢迎来到军械库。想聊聊 9mm 还是 .45 ACP？或者需要光学瞄具的归零建议？🔧", timestamp: Date.now(), id: 0 }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const messageIdCounter = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 防止首次加载时自动滚动
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsgText = input.trim();
    const now = Date.now();
    // 使用计数器确保消息 ID 唯一
    messageIdCounter.current += 1;
    const userMsgId = messageIdCounter.current;
    const userMsg: ChatMessage = { 
      role: 'user', 
      text: userMsgText, 
      timestamp: now, 
      id: userMsgId 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // 创建 bot 消息，使用不同的 ID，但使用相同的时间戳（稍微延迟一点）
    messageIdCounter.current += 1;
    const botMsgId = messageIdCounter.current;
    const botMsg: ChatMessage = { 
      role: 'model', 
      text: '', 
      timestamp: Date.now(), 
      id: botMsgId 
    };
    setMessages(prev => [...prev, botMsg]);

    try {
      // 流式接收响应
      let accumulatedText = '';
      const responseText = await sendMessageToHunyuan(userMsgText, {
        onChunk: (chunk: string) => {
          accumulatedText += chunk;
          // 使用 id 来唯一标识消息，确保只更新正确的 bot 消息
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId && msg.role === 'model'
              ? { ...msg, text: accumulatedText }
              : msg
          ));
          scrollToBottom();
        }
      });

      // 确保最终文本被设置（如果流式响应结束时还没有完整文本）
      if (responseText && responseText !== accumulatedText) {
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId && msg.role === 'model'
            ? { ...msg, text: responseText }
            : msg
        ));
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId && msg.role === 'model'
          ? { ...msg, text: '火控系统故障，请重试！💥' }
          : msg
      ));
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <section id="chat" className="py-24 bg-tactical-dark relative border-t border-tactical-gray">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-8 border-b-2 border-tactical-green/30 pb-4"
            >
                <div>
                    <h2 className="text-3xl md:text-4xl font-black font-military text-white">
                        <span className="text-tactical-green">GUNSMITH</span> AI
                    </h2>
                    <p className="text-tactical-orange font-mono text-sm mt-1">弹道计算机就绪 // 战术问答系统</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-tactical-green animate-pulse">
                    <Settings size={20} />
                    <span className="font-mono text-sm">系统运转正常</span>
                </div>
            </motion.div>

            <div className="bg-black/50 border border-tactical-green/50 backdrop-blur-md h-[600px] flex flex-col relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tactical-green"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-tactical-green"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-tactical-green"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-tactical-green"></div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id ?? msg.timestamp}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-10 h-10 flex items-center justify-center border ${msg.role === 'model' ? 'border-tactical-green bg-tactical-green/10 text-tactical-green' : 'border-tactical-orange bg-tactical-orange/10 text-tactical-orange'}`}>
                                    {msg.role === 'model' ? <Bot size={20} /> : <User size={20} />}
                                </div>
                                <div className={`max-w-[70%] p-4 border-l-2 ${msg.role === 'user' ? 'border-r-2 border-l-0 border-tactical-orange bg-tactical-orange/5 text-tactical-orange' : 'border-tactical-green bg-tactical-green/5 text-tactical-green'}`}>
                                    <p className="text-sm md:text-base leading-relaxed tracking-wide">{msg.text}</p>
                                    <span className="text-[10px] opacity-50 block mt-2 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                            <div className="w-10 h-10 flex items-center justify-center border border-tactical-green bg-tactical-green/10 text-tactical-green">
                                <Bot size={20} />
                            </div>
                            <div className="p-4 border-l-2 border-tactical-green bg-tactical-green/5 text-tactical-green flex items-center gap-2">
                                <span className="w-2 h-2 bg-tactical-green animate-ping"></span>
                                <span className="text-xs">正在计算弹道数据...</span>
                            </div>
                         </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-tactical-gray/30 border-t border-tactical-green/30">
                    <div className="flex gap-0 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tactical-green font-mono">{'>'}</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="输入问题 (例如: AR-15 最佳膛线缠距?)"
                            className="flex-1 bg-black/80 border border-tactical-gray text-white pl-8 pr-4 py-3 font-mono focus:border-tactical-green outline-none transition-colors uppercase placeholder-slate-600"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-tactical-green hover:bg-white text-black px-6 font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            发送
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AIChat;