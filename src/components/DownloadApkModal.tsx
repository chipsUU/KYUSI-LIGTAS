import React from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import QRCode from 'react-qr-code';

interface DownloadApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadApkModal: React.FC<DownloadApkModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Real APK URL from environment or GitHub releases
  const APK_URL: string = (import.meta.env.VITE_APK_URL as string) || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn font-mono">
      <div 
        className="bg-[#1E293B] text-slate-100 border border-slate-700 max-w-xl w-full overflow-hidden flex flex-col rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-slate-700 bg-[#0F172A] text-[#F59E0B] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg uppercase tracking-tight text-white">
                Download Native Android APK
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Resident Offline Emergency Pass & Evacuation Terminal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-slate-700 bg-[#0F172A] hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          {/* Release card */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white uppercase">kyusi-ligtas-resident.apk</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Target: Android 8.0+ (Min SDK 26) · Standalone Resident Pass
              </div>
            </div>
            <span className="px-2.5 py-1 bg-sky-950/60 text-sky-400 border border-sky-500/30 rounded font-bold uppercase text-[10px] shrink-0">
              RESIDENT APP
            </span>
          </div>

          {/* Scannable Real QR code section */}
          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
            <div className="p-3 bg-white rounded-xl border border-slate-300 shrink-0 shadow-md">
              <QRCode
                value={APK_URL || window.location.origin}
                size={110}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="M"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-xs font-bold text-white uppercase">Scan to Sideload on Android Phone</div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Point your mobile phone camera at this QR code to download the official resident APK package directly to your device.
              </p>
              <div className="text-[10px] text-[#F59E0B] font-bold uppercase pt-0.5">
                Zero Play Store dependence · Pure offline triage pass
              </div>
            </div>
          </div>

          {/* Sideload & Unknown Sources Notice */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#F59E0B] font-bold uppercase text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Android Installation Note:</span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              When prompted by Android, tap <strong>Settings</strong> and enable <strong>&ldquo;Allow from this source&rdquo;</strong> (or <em>Install unknown apps</em>) for Chrome or your download manager to complete the installation.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-700 bg-[#0F172A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted SQLite Pass · RA 10173 Protected</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {APK_URL ? (
              <a
                href={APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-[-0.02em] text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download APK</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-[-0.02em] text-slate-400 bg-slate-800 border border-slate-700 cursor-not-allowed flex items-center justify-center gap-2 opacity-80"
                title="Configure VITE_APK_URL or build via GitHub Actions"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>APK coming soon</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DownloadApkModal;
