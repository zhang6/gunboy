import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';

const logs = [
    {
        id: "OP-2024-001",
        title: "沙漠地形适应性训练",
        location: "SECTOR 7 DESERT",
        date: "2024.03.15",
        status: "COMPLETED",
        image: "https://loremflickr.com/600/400/desert,military?random=101"
    },
    {
        id: "OP-2024-002",
        title: "CQB 室内近战演练",
        location: "KILLHOUSE ALPHA",
        date: "2024.04.02",
        status: "EVALUATED",
        image: "https://loremflickr.com/600/400/swat,tactical?random=102"
    },
    {
        id: "OP-2024-003",
        title: "1000米 远程狙击考核",
        location: "HIGHLAND RANGE",
        date: "2024.05.20",
        status: "RECORD SET",
        image: "https://loremflickr.com/600/400/sniper,camouflage?random=103"
    },
    {
        id: "OP-2024-004",
        title: "夜视仪战术射击",
        location: "UNDISCLOSED",
        date: "2024.06.11",
        status: "NIGHT OPS",
        image: "https://loremflickr.com/600/400/nightvision,soldier?random=104"
    }
];

const FieldLog: React.FC = () => {
    return (
        <section className="py-24 bg-tactical-dark border-b border-tactical-gray relative overflow-hidden">
             {/* Background Map Texture */}
             <div className="absolute inset-0 opacity-10 pointer-events-none grayscale" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/shattered-island.png")' }}></div>

             <div className="container mx-auto px-6 mb-12 relative z-10">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-3 h-3 bg-tactical-green animate-pulse"></div>
                    <h2 className="text-3xl font-black font-military text-white tracking-wide">FIELD <span className="text-tactical-gray text-stroke">LOGS</span></h2>
                </div>
                <p className="font-mono text-tactical-green text-xs tracking-widest pl-7">RECENT OPERATIONS & DEBRIEFS // 近期行动记录</p>
             </div>

             <div className="container mx-auto px-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {logs.map((log, index) => (
                         <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-black border border-slate-800 hover:border-tactical-green/50 transition-colors duration-300"
                         >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={log.image} 
                                    alt={log.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 border border-white/20">
                                    <span className="text-[10px] font-mono text-white tracking-wider">{log.id}</span>
                                </div>
                                <div className="absolute inset-0 bg-scanline opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-white group-hover:text-tactical-green transition-colors line-clamp-1">{log.title}</h3>
                                    <CheckCircle size={16} className="text-tactical-green/50 group-hover:text-tactical-green" />
                                </div>
                                
                                <div className="space-y-2 font-mono text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={12} />
                                        <span>{log.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} />
                                        <span>{log.date}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dashed border-slate-800 flex justify-between items-center">
                                    <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-700">{log.status}</span>
                                    <button className="text-tactical-green text-xs hover:underline opacity-0 group-hover:opacity-100 transition-opacity">DETAILS {'>>'}</button>
                                </div>
                            </div>

                            {/* Corner Decors */}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-tactical-green/20 group-hover:bg-tactical-green transition-colors"></div>
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>
    );
};

export default FieldLog;