import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, CornerDownRight, Quote, Hash } from 'lucide-react';

const Legacy: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden border-b border-tactical-gray/30">
        {/* Background Texture - Rough Paper/Noise */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        
        {/* Diagonal Warning Stripes */}
        <div className="absolute top-0 right-0 w-[500px] h-full bg-repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(10, 255, 10, 0.03) 10px, rgba(10, 255, 10, 0.03) 20px) pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                
                {/* Left Column: The Photo (Dossier Style) */}
                <div className="lg:w-1/2 relative group">
                    <motion.div
                        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 p-4 bg-white transform rotate-[-2deg] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* 使用绝对路径 /kid-soldier.jpg，确保从 public 根目录加载 */}
                        <div className="relative overflow-hidden aspect-[3/4] border-4 border-slate-200 bg-slate-800">
                             <img 
                                src="/kid-soldier.jpg" 
                                alt="Project Genesis" 
                                className="w-full h-full object-cover filter contrast-125 sepia-[0.2]"
                             />
                             
                             {/* Overlay Texture */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                             
                             {/* "CONFIDENTIAL" Stamp */}
                             <div className="absolute top-4 left-4 border-4 border-red-600/50 text-red-600/50 font-black text-xl px-2 py-1 -rotate-12 opacity-80 mix-blend-multiply pointer-events-none">
                                 绝密档案
                             </div>
                        </div>
                        
                        {/* Polaroid Bottom Text */}
                        <div className="pt-4 pb-2 text-center font-mono text-slate-800 text-sm tracking-widest uppercase flex justify-between px-2">
                             <span>编号: #0089-ALPHA</span>
                             <span className="text-red-800 font-bold">年龄: 8岁</span>
                        </div>
                        
                        {/* Tape Effect */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/20 backdrop-blur-sm rotate-2 border-l border-r border-white/40 shadow-sm"></div>
                    </motion.div>

                    {/* Decorative Background Elements behind photo */}
                    <div className="absolute top-10 -right-10 w-full h-full border-2 border-tactical-green/20 z-0"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tactical-green/5 rounded-full blur-3xl z-0"></div>
                </div>

                {/* Right Column: Narrative */}
                <div className="lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FileWarning className="text-tactical-orange animate-pulse" />
                            <span className="text-tactical-orange font-mono text-xs tracking-[0.3em] uppercase">档案已解密 // 2024</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black font-military text-white mb-6 leading-none">
                            起源 <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">计划</span>
                        </h2>

                        <div className="space-y-6 text-slate-400 font-mono leading-relaxed text-lg">
                            <p className="border-l-2 border-tactical-green pl-6 py-2 bg-gradient-to-r from-tactical-green/5 to-transparent">
                                "主体在早期即展现出惊人的战术适应能力。8岁完成模拟空降资格认证。重型装甲协同演练评分：优秀。"
                            </p>

                            <div className="grid grid-cols-2 gap-4 my-8">
                                <div className="bg-slate-900/50 p-4 border border-slate-800">
                                    <div className="flex items-center gap-2 text-white mb-1">
                                        <Hash size={14} className="text-tactical-green" />
                                        <span className="font-bold text-sm">行动代号</span>
                                    </div>
                                    <div className="text-xs text-slate-500">天降行动 (Skyfall)</div>
                                </div>
                                <div className="bg-slate-900/50 p-4 border border-slate-800">
                                    <div className="flex items-center gap-2 text-white mb-1">
                                        <CornerDownRight size={14} className="text-tactical-green" />
                                        <span className="font-bold text-sm">当前状态</span>
                                    </div>
                                    <div className="text-xs text-slate-500">任务进行中</div>
                                </div>
                            </div>

                            <div className="relative">
                                <Quote className="absolute -top-4 -left-2 text-slate-700 w-8 h-8 opacity-50" />
                                <p className="italic text-slate-500 pl-8 text-sm">
                                    "真正的训练不是从学院开始的。而是始于风沙、尘土和旋翼的轰鸣声中。这里就是试炼场。"
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button className="px-6 py-3 bg-white text-black font-bold font-mono text-xs tracking-widest hover:bg-tactical-green transition-colors uppercase">
                                查看完整档案
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Legacy;