import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, PenTool, Database, Target } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    { title: "枪械改装", icon: <PenTool className="text-tactical-green" size={28} />, desc: "AR-15 / Glock 平台深度定制与调校", color: "border-tactical-green" },
    { title: "精密射击", icon: <Crosshair className="text-tactical-orange" size={28} />, desc: "远距离精确射击 (LR) 与风偏计算", color: "border-tactical-orange" },
    { title: "弹药复装", icon: <Database className="text-white" size={28} />, desc: "高精度竞赛级弹药手工复装", color: "border-white" },
    { title: "实战竞技", icon: <Target className="text-tactical-red" size={28} />, desc: "IPSC / IDPA 战术射击训练", color: "border-tactical-red" },
  ];

  return (
    <section id="about" className="py-24 relative bg-tactical-dark">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
             <h2 className="text-4xl font-black font-military text-white">SPECIALTIES</h2>
             <div className="w-16 h-1 bg-tactical-green mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-black/50 border border-slate-800 group overflow-hidden"
            >
              {/* Hover Scan Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tactical-green/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>

              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300 origin-left">
                {card.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 font-military text-white">{card.title}</h3>
              <p className="text-slate-500 font-mono text-xs leading-relaxed">
                {card.desc}
              </p>

              {/* Technical Decors */}
              <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-1 h-1 bg-slate-700"></div>
                  <div className="w-1 h-1 bg-slate-700"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800 group-hover:bg-tactical-green transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;