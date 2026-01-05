import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Clock, Zap } from 'lucide-react';

const Stats: React.FC = () => {
  const statItems = [
    { 
      id: 1, 
      label: "累计射击 (发)", 
      value: "8,450", 
      icon: <Zap className="text-tactical-orange" />, 
      color: "text-tactical-orange",
      chart: "M0,20 L10,20 L20,10 L30,25 L40,5 L50,20 L60,20", 
    },
    { 
      id: 2, 
      label: "平均散布 (MOA)", 
      value: "0.42", 
      icon: <Target className="text-tactical-green" />, 
      color: "text-tactical-green",
      chart: "M0,25 Q30,25 30,10 T60,25", 
    },
    { 
      id: 3, 
      label: "训练时长 (小时)", 
      value: "320", 
      icon: <Clock className="text-blue-400" />, 
      color: "text-blue-400",
      chart: "M0,25 L10,25 L10,15 L20,15 L20,10 L30,10 L30,25 L60,25", 
    },
    { 
      id: 4, 
      label: "战术效能", 
      value: "98.5%", 
      icon: <Activity className="text-tactical-red" />, 
      color: "text-tactical-red",
      chart: "M0,20 L20,20 L25,5 L30,25 L35,15 L40,20 L60,20", 
    },
  ];

  return (
    <section className="py-16 bg-tactical-dark border-b border-tactical-gray/30 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black border border-slate-800 p-6 relative group overflow-hidden"
            >
               {/* Animated Background Graph */}
               <svg className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 60 30">
                  <motion.path 
                    d={item.chart} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className={item.color}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <path d={item.chart} fill="none" stroke="currentColor" strokeWidth="2" className={`${item.color} blur-sm opacity-50`} />
               </svg>

              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="text-slate-500 scale-75 origin-top-left">{item.icon}</div>
                <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')} animate-pulse`}></div>
              </div>
              
              <div className="font-military text-3xl text-white font-bold relative z-10">
                {item.value}
              </div>
              
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1 relative z-10">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;