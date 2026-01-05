import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, PenTool, Crosshair, Anchor, Wind, Layers } from 'lucide-react';

const SkillMatrix: React.FC = () => {
  const categories = [
    {
      title: "GUNSMITHING",
      subtitle: "枪械工程",
      icon: <PenTool />,
      skills: ["CNC 精密加工", "扳机组调校", "Cerakote 涂装", "3D 打印配件", "枪管研磨"],
      color: "border-blue-500 text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "BALLISTICS",
      subtitle: "弹道科学",
      icon: <Wind />,
      skills: ["多普勒雷达分析", "复装数据演算", "风偏修正模型", "BC 值测定", "超远距离解算"],
      color: "border-tactical-green text-tactical-green",
      bg: "bg-tactical-green/10"
    },
    {
      title: "TACTICS",
      subtitle: "战术应用",
      icon: <Crosshair />,
      skills: ["CQB 室内近战", "低光/夜视作战", "战术医疗 TCCC", "小队通讯协同", "高压力射击"],
      color: "border-tactical-red text-tactical-red",
      bg: "bg-tactical-red/10"
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black font-military text-white mb-4">SKILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-tactical-green to-emerald-600">MATRIX</span></h2>
                 <p className="text-slate-500 font-mono text-sm tracking-widest">TECHNICAL COMPETENCY VISUALIZATION // 技术栈能力分布</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Connecting Lines (Desktop only visuals) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10"></div>
                <div className="hidden lg:block absolute top-10 left-1/2 w-[2px] h-full bg-white/5 -z-10 -translate-x-1/2"></div>

                {categories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                        className="relative"
                    >
                        {/* Central Node */}
                        <div className={`w-full p-1 border border-dashed border-slate-700 bg-black relative z-10`}>
                            <div className={`p-6 border-l-4 ${cat.color} bg-slate-900/50 backdrop-blur-sm h-full`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-full border ${cat.color} ${cat.bg}`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-military text-white tracking-wider">{cat.title}</h3>
                                        <p className={`text-xs font-mono font-bold ${cat.color}`}>{cat.subtitle}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {cat.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="group flex items-center gap-3">
                                            {/* Skill Node */}
                                            <div className={`w-2 h-2 rounded-full ${cat.color.replace('text', 'bg')} group-hover:animate-ping`}></div>
                                            <div className="flex-1 h-8 bg-white/5 border border-white/5 flex items-center px-3 relative overflow-hidden">
                                                <span className="relative z-10 text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                                                    {skill}
                                                </span>
                                                {/* Hover Fill */}
                                                <div className={`absolute inset-0 ${cat.bg} w-0 group-hover:w-full transition-all duration-300`}></div>
                                            </div>
                                            {/* Tech Deco */}
                                            <div className="text-[10px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {Math.floor(Math.random() * 90 + 10)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative connectors */}
                        <div className="absolute -top-2 left-1/2 w-4 h-4 bg-black border border-slate-700 -translate-x-1/2 rotate-45"></div>
                        <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-black border border-slate-700 -translate-x-1/2 rotate-45"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default SkillMatrix;