import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black perspective-1000">
      
      {/* 1. Dynamic 3D Grid Floor (Moving Forward) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 w-[200%] h-[50%] left-[-50%] bg-[linear-gradient(transparent_0%,rgba(10,255,10,0.2)_100%),linear-gradient(90deg,rgba(10,255,10,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(10,255,10,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] animate-[grid-move_2s_linear_infinite]"></div>
      </div>

      {/* 2. Background Image Layer with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
         <img 
            src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop" 
            alt="Tactical Background" 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-50"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </motion.div>

      {/* 3. Massive Marquee Text */}
      <div className="absolute top-1/6 left-0 w-full overflow-hidden opacity-10 pointer-events-none rotate-[-2deg] scale-110 z-0 mix-blend-overlay">
         <motion.div 
            className="whitespace-nowrap font-military text-[8rem] md:text-[12rem] text-slate-400"
            animate={{ x: [0, -2000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
         >
            ZHANG JIAYANG TACTICAL OPERATIONS ZHANG JIAYANG TACTICAL OPERATIONS
         </motion.div>
      </div>

      {/* 4. Target Lock / HUD Circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
            initial={{ scale: 2, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 0.3, rotate: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
            className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-tactical-green/30 rounded-full flex items-center justify-center relative"
        >
            <div className="absolute w-full h-[1px] bg-tactical-green/30"></div>
            <div className="absolute h-full w-[1px] bg-tactical-green/30"></div>
            {/* Spinning Dashed Ring */}
            <div className="w-[70%] h-[70%] border border-dashed border-tactical-green/40 rounded-full animate-spin-slow duration-[30s]"></div>
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-tactical-green/50"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-tactical-green/50"></div>
            
            <div className="absolute top-10 right-10 text-xs font-mono text-tactical-green/60 animate-pulse">
                TARGET LOCKED
            </div>
        </motion.div>
      </div>

      {/* 5. Laser Scan Line Effect */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "120%" }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        className="absolute left-0 w-full h-2 bg-tactical-green/50 shadow-[0_0_20px_#0aff0a] z-10 opacity-30 pointer-events-none blur-sm"
      ></motion.div>

      {/* Main Content */}
      <div className="z-10 text-center px-4 relative max-w-5xl">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6 inline-flex items-center gap-3 bg-black/80 backdrop-blur border border-tactical-green px-6 py-2 shadow-[0_0_15px_rgba(10,255,10,0.2)]"
        >
           <div className="w-2 h-2 bg-tactical-red rounded-full animate-[ping_1s_infinite]"></div>
           <span className="text-xs font-mono tracking-widest text-tactical-green uppercase">战术系统上线 // v2.4.0</span>
        </motion.div>

        {/* GLITCH TITLE */}
        <div className="relative mb-4 group cursor-default">
            {/* Main Text */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-7xl md:text-[9rem] font-black text-white tracking-tighter font-sans leading-none relative z-20 mix-blend-normal select-none"
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
            >
                张佳阳
            </motion.h1>
            
            {/* Glitch Layers */}
            <motion.div 
                className="absolute inset-0 text-7xl md:text-[9rem] font-black text-red-600 tracking-tighter leading-none z-10 opacity-50 mix-blend-screen pointer-events-none"
                animate={{ x: [-2, 4, -2], y: [1, -1, 0], opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
            >
                张佳阳
            </motion.div>
            <motion.div 
                className="absolute inset-0 text-7xl md:text-[9rem] font-black text-blue-600 tracking-tighter leading-none z-10 opacity-50 mix-blend-screen pointer-events-none"
                animate={{ x: [2, -4, 2], y: [-1, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 0.25, repeatDelay: 2.1 }}
            >
                张佳阳
            </motion.div>
            
            {/* Scan Slice Effect */}
             <motion.div 
                className="absolute inset-0 bg-white/10 z-30"
                style={{ clipPath: "polygon(0 40%, 100% 40%, 100% 42%, 0 42%)" }}
                animate={{ clipPath: ["polygon(0 40%, 100% 40%, 100% 42%, 0 42%)", "polygon(0 60%, 100% 60%, 100% 62%, 0 62%)"] }}
                transition={{ repeat: Infinity, duration: 0.1, repeatType: "mirror" }}
            />
        </div>

        {/* English Name - Typing Effect */}
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="overflow-hidden whitespace-nowrap mx-auto border-r-2 border-tactical-green pr-2 max-w-fit mb-8"
        >
             <h2 className="text-xl md:text-3xl font-military text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-400 tracking-[0.5em] uppercase">
                ZHANG JIAYANG
             </h2>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="h-2 w-full max-w-xs bg-gradient-to-r from-transparent via-tactical-orange to-transparent mx-auto mb-8"
        ></motion.div>

        {/* Role Tags */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm md:text-xl text-slate-400 font-mono tracking-widest max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-white hover:text-tactical-green transition-colors cursor-crosshair">枪械专家</span> 
          <span className="text-tactical-green px-2">//</span> 
          <span className="text-white hover:text-tactical-green transition-colors cursor-crosshair">战术射手</span> 
          <span className="text-tactical-green px-2">//</span> 
          <span className="text-white hover:text-tactical-green transition-colors cursor-crosshair">弹道学研究</span>
        </motion.p>
        
        {/* Call to Action Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-12 flex flex-wrap gap-6 justify-center"
        >
             <button 
                onClick={() => document.getElementById('loadout')?.scrollIntoView({ behavior: 'smooth'})} 
                className="group relative px-8 py-3 bg-white text-black font-bold font-mono tracking-widest overflow-hidden transition-all hover:scale-105"
             >
                <div className="absolute inset-0 bg-tactical-green translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-black">查看装备库 <span className="text-xs opacity-50">-></span></span>
             </button>

             <button 
                onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth'})} 
                className="group relative px-8 py-3 bg-transparent border border-white/30 text-white font-bold font-mono tracking-widest hover:border-tactical-green transition-all"
             >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-tactical-green"><Terminal size={16} /> >_ 通讯终端</span>
             </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 cursor-pointer hover:text-tactical-green transition-colors flex flex-col items-center gap-1 z-20"
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth'})}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">下滑查看</span>
        <ChevronDown size={24} />
      </motion.div>
      
      <style>{`
        @keyframes grid-move {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;