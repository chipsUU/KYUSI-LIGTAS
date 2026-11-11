import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Check, 
  Share2, 
  PlusSquare, 
  X, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'hero' | 'floating' | 'banner';
  className?: string;
  onOpenMobileGuide?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  className = '',
  onOpenMobileGuide,
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [installing, setInstalling] = useState(false);

  // If already installed and launched from homescreen, hide or render minimal badge
  if (isInstalled) {
    if (variant === 'floating' || variant === 'banner') return null;
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold ${className}`}>
        <Check className="w-3.5 h-3.5" />
        <span>PWA Installed</span>
      </div>
    );
  }

  const handleAction = async () => {
    if (isInstallable) {
      setInstalling(true);
      await install();
      setInstalling(false);
      return;
    }
    // If iOS or ambient installable is not yet fired, show step-by-step device guide
    if (onOpenMobileGuide) {
      onOpenMobileGuide();
    } else {
      setShowGuideModal(true);
    }
  };

  // 1. Navbar compact pill style
  if (variant === 'navbar') {
    return (
      <>
        <button
          onClick={handleAction}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
            isInstallable
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              : 'bg-[#1E293B] hover:bg-slate-700 text-amber-400 border border-amber-500/40 hover:text-white'
          } ${className}`}
          title="Install KYUSI-LIGTAS on your mobile device"
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">
            {installing ? 'Installing...' : isInstallable ? 'Install App' : 'Get Mobile App'}
          </span>
        </button>

        {showGuideModal && <MobileInstallGuideModal onClose={() => setShowGuideModal(false)} />}
      </>
    );
  }

  // 2. Hero wide action button
  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleAction}
          className={`px-5 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg active:scale-95 ${
            isInstallable
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 hover:scale-105'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 hover:scale-105'
          } ${className}`}
        >
          <Download className="w-4 h-4 text-slate-950/80 shrink-0" />
          <span className="whitespace-nowrap">
            {isInstallable ? 'Direct Install to Phone (PWA)' : 'Download Mobile App (PWA)'}
          </span>
        </button>

        {showGuideModal && <MobileInstallGuideModal onClose={() => setShowGuideModal(false)} />}
      </>
    );
  }

  // 3. Floating bottom/dock style
  return (
    <>
      <button
        onClick={handleAction}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      >
        <Smartphone className="w-4 h-4" />
        <span>Install App</span>
      </button>

      {showGuideModal && <MobileInstallGuideModal onClose={() => setShowGuideModal(false)} />}
    </>
  );
};

export const MobileInstallGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { isInstallable, install, isIOS, isAndroid } = usePWAInstall();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kyusi-ligtas.gov.ph';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn font-mono">
      <div 
        className="bg-[#1E293B] text-slate-100 border border-slate-700 max-w-lg w-full overflow-hidden flex flex-col rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-700 flex items-center justify-between bg-[#0F172A]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base uppercase text-white tracking-tight">
                Install KYUSI-LIGTAS on Mobile
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Official Progressive Web App (PWA) · Works 100% Offline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-300 overflow-y-auto max-h-[75vh]">
          {/* Quick Instant Install if browser event triggered */}
          {isInstallable && (
            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>1-Tap Installation Ready!</span>
              </div>
              <p className="text-[11px] font-sans leading-relaxed">
                Your browser supports direct automated installation. Tap the button below to download and pin KYUSI-LIGTAS directly to your phone's home screen.
              </p>
              <button
                onClick={async () => {
                  await install();
                  onClose();
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install Directly to Home Screen</span>
              </button>
            </div>
          )}

          {/* Android Guide */}
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>For Android Devices (Chrome / Edge / Brave / Samsung)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                RECOMMENDED
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-300 font-sans leading-relaxed">
              <li>
                Tap the <strong>three dots menu (⋮)</strong> in the top-right corner of Chrome.
              </li>
              <li>
                Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
              </li>
              <li>
                Tap <strong>"Install"</strong> to confirm. The KYUSI-LIGTAS icon will appear alongside your native apps.
              </li>
            </ol>
          </div>

          {/* iOS Guide */}
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>For Apple iPhone & iPad (Safari)</span>
              </div>
              <span className="text-[10px] text-sky-400 font-bold uppercase bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                IOS SAFARI
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-[11px] text-slate-300 font-sans leading-relaxed">
              <li className="flex items-start gap-2">
                <span>1.</span>
                <span>
                  Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-1 text-sky-400" /> in the bottom toolbar of Safari.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>2.</span>
                <span>
                  Scroll down the share sheet and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-white" />.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>3.</span>
                <span>
                  Tap <strong>"Add"</strong> in the top-right corner.
                </span>
              </li>
            </ol>
          </div>

          {/* Offline & Hardware Capabilities */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px] text-slate-400 font-sans">
            <div className="font-bold text-white font-mono uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline Civic Disaster Readiness</span>
            </div>
            <p>
              Once installed, KYUSI-LIGTAS caches evacuation routes, your encrypted QR Emergency Pass, hotline dials, and survival checklists locally. It boots in under 1 second without cellular data or power grid connectivity.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0F172A] border-t border-slate-700 flex items-center justify-between">
          <div className="text-[10px] text-slate-500 font-mono">
            V1.4.2 · Quezon City CivicTech
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};
