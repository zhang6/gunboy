import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Radio } from 'lucide-react';

const hotspots = [
    { id: 1, x: "20%", y: "35%", name: "美国内华达靶场", type: "战术训练", status: "活跃" },
    { id: 2, x: "45%", y: "25%", name: "德国 H&K 总部", type: "认证考核", status: "已核实" },
    { id: 3, x: "75%", y: "30%", name: "东南亚丛林训练", type: "合同任务", status: "已完成" },
    { id: 4, x: "30%", y: "45%", name: "巴西亚马逊流域", type: "生存挑战", status: "归档" },
];

const OperationsMap: React.FC = () => {
    const [activePoint, setActivePoint] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-tactical-gray/30">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-tactical-green/30 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black font-military text-white tracking-tight">全球 <span className="text-tactical-green">行动足迹</span></h2>
                        <div className="flex items-center gap-2 mt-2 text-tactical-green font-mono text-xs animate-pulse">
                            <Radio size={14} />
                            <span>卫星链路已建立 // 实时讯号</span>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-slate-500 font-mono text-xs">当前坐标锁定</p>
                        <p className="text-white font-mono text-lg tracking-widest">34°04'N 118°15'W</p>
                    </div>
                </div>

                {/* Map Container */}
                <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] border-2 border-slate-800 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    {/* World Map Silhouette (Abstract) */}
                    <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'invert(1) grayscale(1) brightness(0.5) sepia(1) hue-rotate(90deg) saturate(3)'
                        }}
                    ></div>

                    {/* Radar Sweep Line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tactical-green/10 to-transparent w-[50%] h-full animate-[radar_4s_linear_infinite] border-r border-tactical-green/30 blur-sm pointer-events-none"></div>

                    {/* Hotspots */}
                    {hotspots.map((spot) => (
                        <div 
                            key={spot.id}
                            className="absolute group cursor-pointer"
                            style={{ left: spot.x, top: spot.y }}
                            onMouseEnter={() => setActivePoint(spot.id)}
                            onMouseLeave={() => setActivePoint(null)}
                        >
                            {/* Pulse Effect */}
                            <div className="absolute -left-3 -top-3 w-6 h-6 bg-tactical-green rounded-full opacity-20 animate-ping"></div>
                            <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-tactical-green rounded-full border border-white shadow-[0_0_10px_#0aff0a]"></div>

                            {/* Label Line */}
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 40 }}
                                className="absolute left-1.5 top-1.5 w-[1px] bg-white/50"
                            ></motion.div>
                            <motion.div 
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 20 }}
                                className="absolute left-1.5 top-[41.5px] h-[1px] bg-white/50"
                            ></motion.div>

                            {/* Info Box (Tooltip) */}
                            <AnimatePresence>
                                {activePoint === spot.id && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 30, scale: 1 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                        className="absolute left-4 top-4 bg-black/90 border border-tactical-green/50 p-4 w-64 backdrop-blur-md z-20"
                                    >
                                        <div className="flex justify-between items-start mb-2 border-b border-slate-700 pb-2">
                                            <h4 className="text-white font-bold font-military text-sm">{spot.name}</h4>
                                            <Navigation size={14} className="text-tactical-orange" />
                                        </div>
                                        <div className="space-y-1 font-mono text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">类型:</span>
                                                <span className="text-tactical-green">{spot.type}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">状态:</span>
                                                <span className="text-white bg-slate-800 px-1">{spot.status}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* HUD Elements Overlay */}
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-tactical-green/60">
                        <p>SCANNING FREQ: 14.5Ghz</p>
                        <p>TARGET ACQUISITION: AUTO</p>
                    </div>
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-tactical-orange/60 text-right">
                        <p>SECURE CHANNEL</p>
                        <p>ENCRYPTION: AES-256</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OperationsMap;