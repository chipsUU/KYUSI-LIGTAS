import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Menu, X, Radio, Download } from 'lucide-react';

interface NavbarProps {
  isSimulatedAlert: boolean;
  onToggleSimulateAlert: () => void;
  onOpenDownloadModal: () => void;
  onOpenSpecsModal: () => void;
  onOpenResidentPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSimulatedAlert,
  onToggleSimulateAlert,
  onOpenDownloadModal,
  onOpenResidentPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur-md text-slate-100">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full border border-slate-700 bg-[#1E293B] flex items-center justify-center text-[#F59E0B] transition-transform duration-200 group-hover:scale-110 shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
              {/* 12s circular spinning indicator */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#F59E0B]/50 animate-spin-12s pointer-events-none" />
            </div>
            <span className="font-display text-lg sm:text-xl tracking-[-0.04em] text-white uppercase whitespace-nowrap">
              KYUSI<span className="text-[#F59E0B]">·LIGTAS</span>
            </span>
          </a>

          {/* Micro status ticker - only on wide desktop (2xl) so it never squishes laptops */}
          <div className="hidden 2xl:flex items-center gap-2 pl-3 border-l border-slate-800 text-[11px] font-mono font-medium text-slate-400 shrink-0">
            <span className={`w-2 h-2 rounded-full ${isSimulatedAlert ? 'bg-[#F59E0B] animate-ping' : 'bg-emerald-400'}`} />
            <span>Node-AI: Online (Tullahan Basin)</span>
          </div>
        </div>

        {/* Center: Floating Slate 'Pill' Container - visible on xl screens (1280px+) */}
        <div className="hidden xl:flex items-center justify-center flex-1 max-w-2xl px-2">
          <nav className="bg-[#1E293B] rounded-full p-1.5 border border-slate-700/80 shadow-lg flex items-center gap-1">
            <a
              href="#overview"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              Overview
            </a>
            <a
              href="#the-app"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              The App
            </a>
            <a
              href="#iot-telemetry"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              IoT Telemetry
            </a>
            <a
              href="#predictive-engine"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              AI Predictive
            </a>
            <a
              href="#shelter-scanner"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              Shelter Scanner
            </a>
            <a
              href="#irise-up"
              className="px-3 py-1 rounded-full font-mono text-[12px] font-bold text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:text-white whitespace-nowrap"
            >
              iRISE-UP Sync
            </a>
          </nav>
        </div>

        {/* Right: Social Icons & Action Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Social Icons - only on 2xl to prevent crowding on laptops */}
          <div className="hidden 2xl:flex items-center gap-2 shrink-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-8 h-8 rounded-full border border-slate-700 bg-[#1E293B] text-slate-300 hover:text-white hover:border-[#F59E0B] flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="GitHub Research Repository"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter Dispatch"
              className="w-8 h-8 rounded-full border border-slate-700 bg-[#1E293B] text-slate-300 hover:text-white hover:border-[#F59E0B] flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="X / Twitter Civil Defense Dispatch"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Incident Bot"
              className="w-8 h-8 rounded-full border border-slate-700 bg-[#1E293B] text-slate-300 hover:text-white hover:border-[#F59E0B] flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="@KyusiLigtas Telegram Incident Bot"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>

          {/* Download Native Android APK Action */}
          <button
            onClick={onOpenDownloadModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-tight bg-[#F59E0B] hover:bg-amber-400 text-slate-950 border border-amber-400/80 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
            title="Download official Android APK package"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download APK</span>
            <span className="sm:hidden">APK</span>
          </button>

          {/* Resident Portal / Open App Action Button - responsive text */}
          <button
            onClick={onOpenResidentPortal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-tight bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/40 transition-all cursor-pointer shadow-sm hover:scale-105 shrink-0"
            title="Open Resident Evacuee Pass & App View"
          >
            <span className="hidden lg:inline">Resident Portal / Open App →</span>
            <span className="inline lg:hidden">Resident App →</span>
          </button>

          {/* Emergency Alert Toggle - Warning Orange Accent */}
          <button
            onClick={onToggleSimulateAlert}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-[-0.02em] border transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:scale-105 shrink-0 ${
              isSimulatedAlert
                ? 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-[#1E293B] text-[#F59E0B] border-amber-500/50 hover:bg-[#F59E0B] hover:text-[#0F172A]'
            }`}
            title="Toggle simulated flood surge alert"
          >
            {isSimulatedAlert ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Active</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate</span>
              </>
            )}
          </button>

          {/* Mobile / Tablet menu trigger (visible on screens < xl) */}
          <div className="flex xl:hidden items-center ml-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 border border-slate-700 bg-[#1E293B] text-slate-200 hover:text-white focus:outline-none cursor-pointer rounded transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#0F172A]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 font-mono shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isSimulatedAlert ? 'bg-[#F59E0B] animate-ping' : 'bg-emerald-400'}`} />
              <span>Node-AI: Online (Tullahan Basin)</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase">QC DRRM System</span>
          </div>

          {/* Floating Pill style links */}
          <div className="bg-[#1E293B] p-3 rounded-2xl border border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-1">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Overview
            </a>
            <a
              href="#the-app"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              The App
            </a>
            <a
              href="#iot-telemetry"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              IoT Telemetry
            </a>
            <a
              href="#predictive-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              AI Predictive Engine
            </a>
            <a
              href="#shelter-scanner"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Shelter Scanner
            </a>
            <a
              href="#irise-up"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-mono text-[12px] font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              iRISE-UP Sync
            </a>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                onOpenDownloadModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-xs font-bold uppercase tracking-[-0.02em] text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors font-mono shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </button>
            <button
              onClick={() => {
                onOpenResidentPortal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-xs font-mono font-bold uppercase tracking-tight text-white bg-sky-600 hover:bg-sky-500 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              Resident Portal / Open App →
            </button>
          </div>

          {/* Social links inside drawer for tablets & mobiles */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
            <span>•</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter / X</a>
            <span>•</span>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-white">Telegram</a>
          </div>
        </div>
      )}
    </header>
  );
};
