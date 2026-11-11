import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface FloatingBottomBarProps {
  onOpenAdminPortal: () => void;
}

export const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({ onOpenAdminPortal }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (isMinimized) {
    return (
      <aside 
        aria-label="Admin and Moderator Quick Access Dock (Minimized)"
        className="fixed bottom-4 right-4 sm:right-6 z-50 pointer-events-auto"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700/80 rounded-full px-3.5 py-2 shadow-2xl flex items-center gap-2 text-xs font-mono transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          title="Expand BDRRMC Portal Access"
        >
          <div className="relative flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="font-bold text-[11px] uppercase">BDRRMC Portal</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Admin and Moderator Quick Access Dock"
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-1rem)] sm:max-w-max transition-all"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-2xl flex items-center justify-between gap-2 sm:gap-4 text-xs font-mono">
        {/* Status indicator: Small shield icon with glowing emerald dot & text */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <span className="font-bold text-white uppercase tracking-tight text-[11px] sm:text-xs">
            BDRRMC Portal
          </span>
        </div>

        {/* Separator */}
        <span className="text-slate-600 hidden md:inline">|</span>

        {/* Informative subtext */}
        <span className="text-slate-400 font-sans text-xs hidden lg:inline font-normal">
          Authorized personnel & shelter operators
        </span>

        {/* Action Button */}
        <button
          onClick={onOpenAdminPortal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1 group shrink-0"
        >
          <span className="hidden sm:inline">Become an Admin / Moderator</span>
          <span className="sm:hidden">Mod Portal</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>

        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="text-slate-500 hover:text-slate-300 p-1 rounded-full transition-colors cursor-pointer shrink-0"
          title="Minimize dock"
          aria-label="Minimize dock"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
