import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const bootTexts = [
    "INITIALIZING SYSTEM...",
    "CHECKING BIOMETRICS...",
    "LOADING WEAPON DATABASE...",
    "ESTABLISHING SECURE LINK...",
    "ACCESS GRANTED"
  ];

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Cycle through texts based on progress
    if (progress < 30) setTextIndex(0);
    else if (progress < 50) setTextIndex(1);
    else if (progress < 70) setTextIndex(2);
    else if (progress < 90) setTextIndex(3);
    else setTextIndex(4);

    if (progress === 100) {
      setTimeout(onComplete, 800); // Wait a bit after 100% before closing
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Matrix Effect (Simplified) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-tactical-green text-[10px] whitespace-nowrap"
            style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                animation: `pulse ${Math.random() * 2 + 1}s infinite`
            }}
          >
            {Math.random().toString(16).substring(2, 10).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="w-80 md:w-96 relative z-10">
        <div className="flex justify-between text-tactical-green text-xs mb-2 tracking-widest">
            <span>SYSTEM_BOOT</span>
            <span>v2.4.0</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-2 bg-slate-900 border border-slate-700 w-full mb-4 relative overflow-hidden">
            <motion.div 
                className="h-full bg-tactical-green"
                style={{ width: `${progress}%` }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
            ></motion.div>
        </div>

        {/* Dynamic Text */}
        <div className="h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={textIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`font-bold tracking-widest ${textIndex === 4 ? "text-white bg-tactical-green px-2 text-black" : "text-tactical-green"}`}
                >
                    {bootTexts[textIndex]}
                </motion.span>
            </AnimatePresence>
        </div>

        <div className="mt-8 text-center text-slate-600 text-[10px]">
             SECURE CONNECTION // ENCRYPTED
        </div>
      </div>
      
      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>
    </motion.div>
  );
};

export default IntroSequence;