import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Zap, Target } from 'lucide-react';

const doctrines = [
  {
    id: "01",
    icon: <Eye size={32} />,
    title: "SITUATIONAL AWARENESS",
    chn: "态势感知",
    desc: "战场不在眼前，而在脑海中构建。在威胁出现前预知威胁，时刻保持黄色警备状态。",
    quote: "OBSERVE. ORIENT. DECIDE. ACT."
  },
  {
    id: "02",
    icon: <Brain size={32} />,
    title: "MENTAL FORTITUDE",
    chn: "心理壁垒",
    desc: "压力是精准度的毒药。通过呼吸控制与视觉化训练，将心率锁定在战斗节奏，此时无声胜有声。",
    quote: "CALM IS A SUPER POWER."
  },
  {
    id: "03",
    icon: <Zap size={32} />,
    title: "VIOLENCE OF ACTION",
    chn: "雷霆行动",
    desc: "犹豫即败北。一旦决定交战，以压倒性的速度和火力打破敌方的OODA循环。",
    quote: "SPEED. SURPRISE. VIOLENCE."
  }
];

const CombatDoctrine: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
            <h2 className="text-[12rem] md:text-[20rem] font-black font-military text-white leading-none">
                DOCTRINE
            </h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-4xl font-black font-military text-white">作战 <span className="text-tactical-green">信条</span></h2>
                    <p className="text-slate-500 font-mono text-xs mt-2 tracking-[0.3em]">TACTICAL PHILOSOPHY // MINDSET</p>
                </div>
                <div className="hidden md:block">
                    <Target className="text-tactical-red animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {doctrines.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="group relative bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tactical-green to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-black border border-white/20 text-tactical-green rounded-lg group-hover:text-white group-hover:bg-tactical-green transition-all duration-300">
                                {item.icon}
                            </div>
                            <span className="text-4xl font-black text-white/5 font-military group-hover:text-white/10 transition-colors">
                                {item.id}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white font-military tracking-wider mb-1">{item.title}</h3>
                        <h4 className="text-sm font-bold text-tactical-green mb-4 font-sans tracking-widest">{item.chn}</h4>
                        
                        <p className="text-slate-400 font-mono text-sm leading-relaxed mb-8 border-l border-white/20 pl-4 group-hover:border-tactical-green transition-colors">
                            {item.desc}
                        </p>

                        <div className="mt-auto">
                            <p className="text-xs font-black text-white uppercase tracking-widest bg-black/50 inline-block px-2 py-1">
                                "{item.quote}"
                            </p>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-tactical-green"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default CombatDoctrine;