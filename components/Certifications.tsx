import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Crosshair, Zap, Award, Hexagon, Star } from 'lucide-react';

const certifications = [
  {
    id: "01",
    provider: "GLOCK",
    title: "高级军械师",
    subtitle: "ADVANCED ARMORER",
    level: "LV.5",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-green-400 to-emerald-600",
    shadow: "shadow-emerald-500/20",
    stats: [
        { label: "结构", val: 98 },
        { label: "改装", val: 95 }
    ]
  },
  {
    id: "02",
    provider: "BALLISTICS",
    title: "远程射击大师",
    subtitle: "PRECISION RIFLE",
    level: "SSS",
    icon: <Crosshair className="w-6 h-6" />,
    gradient: "from-blue-400 to-indigo-600",
    shadow: "shadow-indigo-500/20",
    stats: [
        { label: "风偏", val: 92 },
        { label: "计算", val: 99 }
    ]
  },
  {
    id: "03",
    provider: "TCCC",
    title: "战地急救认证",
    subtitle: "COMBAT MEDIC",
    level: "MED",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-red-400 to-rose-600",
    shadow: "shadow-rose-500/20",
    stats: [
        { label: "急救", val: 90 },
        { label: "抗压", val: 88 }
    ]
  },
  {
    id: "04",
    provider: "HORNADY",
    title: "复装弹药专家",
    subtitle: "AMMO MASTER",
    level: "EXP",
    icon: <Award className="w-6 h-6" />,
    gradient: "from-amber-300 to-orange-500",
    shadow: "shadow-orange-500/20",
    stats: [
        { label: "精度", val: 99 },
        { label: "手工", val: 96 }
    ]
  }
];

const Certifications: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tactical-green/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block"
            >
                <h2 className="text-4xl md:text-6xl font-black font-military text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tighter mb-4">
                    战术资质认证
                </h2>
                <div className="flex items-center justify-center gap-2 text-tactical-green font-mono text-sm tracking-[0.5em] uppercase">
                    <Hexagon size={12} className="fill-current" />
                    Elite Operator Status
                    <Hexagon size={12} className="fill-current" />
                </div>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                    viewport={{ once: true }}
                    className="group relative perspective-1000"
                >
                    {/* Card Container */}
                    <div className={`relative h-[420px] bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl ${cert.shadow}`}>
                        
                        {/* Top Gradient Bar */}
                        <div className={`h-2 w-full bg-gradient-to-r ${cert.gradient}`}></div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col h-full relative">
                            {/* Holographic BG Effect on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="bg-white/5 p-2 rounded-lg border border-white/10 group-hover:border-white/30 transition-colors">
                                    <div className={`text-transparent bg-clip-text bg-gradient-to-br ${cert.gradient}`}>
                                        {cert.icon}
                                    </div>
                                </div>
                                <span className="font-mono text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">{cert.id}</span>
                            </div>

                            {/* Main Title */}
                            <div className="mb-auto">
                                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${cert.gradient} text-black inline-block mb-2 font-mono`}>
                                    {cert.provider}
                                </div>
                                <h3 className="text-2xl font-bold text-white font-sans tracking-wide mb-1 group-hover:scale-105 transition-transform origin-left">{cert.title}</h3>
                                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{cert.subtitle}</p>
                            </div>

                            {/* Big Level Display */}
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 translate-x-12 group-hover:translate-x-4 transition-transform duration-500 opacity-20 group-hover:opacity-100">
                                <span className={`text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-b ${cert.gradient}`}>
                                    {cert.level}
                                </span>
                            </div>

                            {/* Stats/Footer */}
                            <div className="mt-8 space-y-4 relative z-10 bg-black/20 p-4 rounded-lg border border-white/5 backdrop-blur-md">
                                {cert.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                                            <span>{stat.label}</span>
                                            <span className="text-white">{stat.val}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${stat.val}%` }}
                                                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                                className={`h-full bg-gradient-to-r ${cert.gradient}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;