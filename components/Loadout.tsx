import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Shield, Wind, Zap } from 'lucide-react';

const loadouts = {
  primary: {
    name: "MK18 MOD 1 定制版",
    type: "短管突击步枪 (SBR)",
    specs: [
      { label: "口径", value: "5.56x45mm NATO" },
      { label: "枪管长度", value: "10.3 英寸" },
      { label: "膛线缠距", value: "1:7" },
      { label: "有效射程", value: "300米" }
    ],
    mods: ["EOTECH EXPS3-0 全息瞄具", "Geissele SSA-E 竞赛级扳机", "SureFire SOCOM556-RC2 抑制器", "BCM 战术握把"],
    desc: "专为近距离作战 (CQB) 优化的定制平台。极短的枪管配合抑制器，在狭窄空间内提供极致的操控性。",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop"
  },
  secondary: {
    name: "GLOCK 19 GEN 5 MOS",
    type: "半自动手枪",
    specs: [
      { label: "口径", value: "9x19mm 帕拉贝鲁姆" },
      { label: "弹匣容量", value: "15+1 发" },
      { label: "扳机力度", value: "4.5 磅" },
      { label: "空枪重量", value: "670克" }
    ],
    mods: ["Trijicon RMR Type 2 红点", "Streamlight TLR-7A 战术灯", "Agency Arms 扳机组", "定制防滑握把纹理"],
    desc: "可靠性之王。经过彻底的内部抛光与扳机组升级，配合红点瞄具，实现快速且精准的后续射击。",
    image: "https://images.unsplash.com/photo-1585562137992-d6a0589254d7?q=80&w=800&auto=format&fit=crop"
  },
  longRange: {
    name: "REMINGTON 700 PCR",
    type: "高精度狙击步枪",
    specs: [
      { label: "口径", value: ".308 温彻斯特" },
      { label: "枪管", value: "24英寸 重型枪管" },
      { label: "底盘系统", value: "Magpul PRS Gen 3" },
      { label: "枪机类型", value: "栓动式" }
    ],
    mods: ["Vortex Razor HD Gen III 瞄准镜", "Atlas 两脚架", "Timney Calvin Elite 扳机", "Dead Air Sandman-S 消音器"],
    desc: "为了 800 米外的目标而生。每一发子弹都经过手工复装，以确保初速的一致性与极致的落点精度。",
    image: "https://images.unsplash.com/photo-1599409895318-62071a998e98?q=80&w=800&auto=format&fit=crop"
  }
};

const Loadout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary' | 'longRange'>('primary');

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,255,10,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,255,10,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Navigation */}
          <div className="md:w-1/3 space-y-2">
             <div className="mb-8">
                <h2 className="text-4xl font-black font-military text-white">战术 <span className="text-tactical-green">装备库</span></h2>
                <div className="h-1 w-20 bg-tactical-green mt-2"></div>
             </div>
             
             {Object.keys(loadouts).map((key) => (
               <button
                 key={key}
                 onClick={() => setActiveTab(key as any)}
                 className={`w-full text-left p-6 border-l-4 transition-all duration-300 font-mono text-sm tracking-widest group relative overflow-hidden ${
                   activeTab === key 
                   ? 'border-tactical-green bg-tactical-green/10 text-white' 
                   : 'border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                 }`}
               >
                 <span className="relative z-10 flex justify-between items-center">
                    {key === 'primary' && "PRIMARY // 主武器"}
                    {key === 'secondary' && "SECONDARY // 副武器"}
                    {key === 'longRange' && "LONG RANGE // 远距离"}
                    {activeTab === key && <Crosshair size={16} className="animate-spin-slow" />}
                 </span>
                 {/* Hover Sweep Effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-tactical-green/0 via-tactical-green/10 to-tactical-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
               </button>
             ))}
             
             <div className="mt-8 p-6 border border-dashed border-slate-700 rounded-lg bg-slate-900/50">
                <div className="flex items-center gap-2 text-tactical-orange mb-2">
                    <Zap size={16} /> <span className="text-xs font-bold uppercase">系统状态</span>
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    所有武器均处于战备状态。上次维护时间：24小时前。保养剂：Lucas Oil Extreme Duty。
                </p>
             </div>
          </div>

          {/* Right Column: Display Area */}
          <div className="md:w-2/3">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-tactical-gray/20 border border-slate-700 p-1"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-tactical-green"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-tactical-green"></div>

                    <div className="relative h-64 md:h-80 w-full overflow-hidden bg-black/50 mb-6 group">
                        <img 
                            src={loadouts[activeTab].image} 
                            alt={loadouts[activeTab].name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 text-tactical-green border border-tactical-green text-xs font-mono">
                            IMG_SRC: {loadouts[activeTab].type.toUpperCase()}
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-slate-700 pb-6">
                            <div>
                                <h3 className="text-3xl font-black font-military text-white tracking-wide">{loadouts[activeTab].name}</h3>
                                <p className="text-tactical-green font-mono text-sm mt-1">{loadouts[activeTab].type}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex gap-2">
                                <span className="px-3 py-1 bg-slate-800 text-xs font-mono text-slate-300 rounded">GEN 3</span>
                                <span className="px-3 py-1 bg-tactical-green/20 text-xs font-mono text-tactical-green border border-tactical-green/30 rounded">实战测试通过</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <Shield size={14} /> 技术参数
                                </h4>
                                <div className="space-y-3">
                                    {loadouts[activeTab].specs.map((spec, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                                            <span className="text-slate-500 font-mono">{spec.label}</span>
                                            <span className="text-slate-200 font-bold">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <Wind size={14} /> 改装列表
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {loadouts[activeTab].mods.map((mod, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono hover:border-tactical-orange transition-colors cursor-default">
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-6 text-sm text-slate-400 leading-relaxed italic border-l-2 border-tactical-orange pl-4">
                                    "{loadouts[activeTab].desc}"
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loadout;