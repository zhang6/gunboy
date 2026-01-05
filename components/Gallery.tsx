import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  // Fixed images from Unsplash to ensure they don't change on refresh
  // Adjusted spans to ensure perfect 3x3 grid tiling without gaps
  const images = [
    { 
        id: 1, 
        src: "https://images.unsplash.com/photo-1620021673322-68045610811b?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-2", 
        title: "MK18 Mod 1 改装", 
        tag: "5.56 NATO" 
    },
    { 
        id: 2, 
        src: "https://images.unsplash.com/photo-1585562137992-d6a0589254d7?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-1", 
        title: "Glock 19X 战术版", 
        tag: "9MM PARA" 
    },
    { 
        id: 3, 
        src: "https://images.unsplash.com/photo-1616423640778-2cfff83d6595?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-1", 
        title: "施密特-本德 光学瞄具", 
        tag: "OPTICS" 
    },
    { 
        id: 4, 
        src: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-2", 
        title: "高精度复装工作台", 
        tag: "RELOADING" 
    },
    { 
        id: 5, 
        src: "https://images.unsplash.com/photo-1599409895318-62071a998e98?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-2", 
        title: "AWM .338 狙击系统", 
        tag: "LONG RANGE" 
    },
    { 
        id: 6, 
        src: "https://images.unsplash.com/photo-1591123720664-59652d8a4115?q=80&w=600&auto=format&fit=crop", 
        span: "row-span-1", 
        title: "AK-105 现代化改造", 
        tag: "5.45x39" 
    },
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
        >
            <div>
                <h2 className="text-4xl md:text-5xl font-black text-white font-military tracking-tighter">武器 <span className="text-tactical-green">展示库</span></h2>
                <p className="text-slate-500 font-mono mt-2 tracking-widest text-xs">CUSTOM BUILDS & BALLISTICS // 个人收藏与改装案例</p>
            </div>
            <button className="hidden md:block px-6 py-2 border border-tactical-green text-tactical-green hover:bg-tactical-green hover:text-black transition-all font-mono text-xs uppercase">
                查看完整清单
            </button>
        </motion.div>

        {/* Added auto-rows-[300px] to ensure row-span works correctly with specific heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 auto-rows-[300px]">
            {images.map((img, idx) => (
                <motion.div
                    key={img.id}
                    className={`relative group overflow-hidden bg-tactical-gray ${img.span}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                >
                    <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100 filter contrast-125 saturate-50 group-hover:saturate-100"
                    />
                    
                    {/* HUD Overlay on Image */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-tactical-green/50 transition-all duration-300 pointer-events-none"></div>
                    {/* Crosshair Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute w-full h-[1px] bg-tactical-red"></div>
                        <div className="absolute h-full w-[1px] bg-tactical-red"></div>
                    </div>

                    <div className="absolute top-2 right-2 text-[10px] text-tactical-green font-mono opacity-0 group-hover:opacity-100 bg-black/70 px-2 py-1">
                        编号: {Math.floor(Math.random() * 90000) + 10000}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-tactical-orange font-mono text-[10px] tracking-widest block mb-1">{img.tag}</span>
                        <h4 className="text-white font-bold text-lg font-military tracking-wide">{img.title}</h4>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;