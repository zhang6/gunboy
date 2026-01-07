import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Legacy from './components/Legacy';
import About from './components/About';
import Loadout from './components/Loadout';
import FieldLog from './components/FieldLog';
import OperationsMap from './components/OperationsMap';
import Certifications from './components/Certifications';
import Gallery from './components/Gallery';
import AIChat from './components/AIChat';
import IntroSequence from './components/IntroSequence';
import CombatDoctrine from './components/CombatDoctrine';
import SkillMatrix from './components/SkillMatrix';
import Analytics from './components/Analytics';
import { recordVisit } from './services/analyticsService';
import { Crosshair } from 'lucide-react';

const App: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [isAnalyticsPage, setIsAnalyticsPage] = useState(false);

  // 检查是否是访问统计页面
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/analytics' || path === '/stats' || path === '/analytics.html') {
      setIsAnalyticsPage(true);
    }
  }, []);

  // 记录访问（仅在主页面）
  useEffect(() => {
    if (!isAnalyticsPage) {
      // 延迟记录，避免影响页面加载
      const timer = setTimeout(() => {
        recordVisit().catch(console.error);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnalyticsPage]);

  // Ensure page scrolls to top on load and after intro completes
  useEffect(() => {
    if (!isAnalyticsPage) {
      window.scrollTo(0, 0);
      // Also prevent hash-based scrolling
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [isAnalyticsPage]);

  // Reset scroll position when intro completes
  useEffect(() => {
    if (!showIntro && !isAnalyticsPage) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [showIntro, isAnalyticsPage]);

  // Custom cursor follower effect
  useEffect(() => {
    if (!isAnalyticsPage) {
      const updateCursor = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', updateCursor);
      return () => window.removeEventListener('mousemove', updateCursor);
    }
  }, [isAnalyticsPage]);

  // 如果是访问统计页面，直接渲染统计组件
  if (isAnalyticsPage) {
    return <Analytics />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-tactical-green selection:text-black">
      {/* Intro Sequence Overlay */}
      <AnimatePresence>
        {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Custom Tactical Cursor */}
      <div 
        className="fixed w-8 h-8 border border-tactical-green rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden md:flex items-center justify-center mix-blend-difference"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      >
        <div className="w-1 h-1 bg-tactical-green rounded-full"></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="font-military text-2xl tracking-widest text-white flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Crosshair className="text-tactical-green group-hover:rotate-180 transition-transform duration-700" /> ZJY.MIL
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono font-bold text-slate-500 tracking-widest">
            <a href="#about" className="hover:text-tactical-green transition-colors uppercase">[ PROFILE ]</a>
            <a href="#loadout" className="hover:text-tactical-green transition-colors uppercase">[ LOADOUT ]</a>
            <a href="#ops" className="hover:text-tactical-green transition-colors uppercase">[ OPS ]</a>
            <a href="#logs" className="hover:text-tactical-green transition-colors uppercase">[ LOGS ]</a>
            <a href="#chat" className="hover:text-tactical-orange transition-colors uppercase text-white">[ COMMS ]</a>
        </div>
      </nav>

      <main>
        <Hero />
        <div id="stats">
            <Stats />
        </div>
        <Legacy />
        <CombatDoctrine />
        <About />
        <SkillMatrix />
        <div id="loadout">
             <Loadout />
        </div>
        <div id="ops">
            <OperationsMap />
        </div>
        <Certifications />
        <div id="logs">
            <FieldLog />
        </div>
        <Gallery />
        <AIChat />
      </main>

      <footer className="bg-black py-12 border-t border-tactical-gray relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-tactical-gray/30 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-tactical-gray/30 rounded-bl-3xl"></div>

        <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl font-military font-bold mb-8 text-slate-700 tracking-[0.5em] animate-pulse">
                // TRANSMISSION END //
            </h2>
            
            <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
                &copy; {new Date().getFullYear()} ZHANG JIAYANG. SECURE SERVER NODE: ALPHA-1.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;