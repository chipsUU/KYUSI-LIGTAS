import React from 'react';
import { Download, ArrowRight, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenSpecsModal: () => void;
  onOpenDownloadModal: () => void;
  onOpenPrivacyModal?: (tab?: 'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSpecsModal,
  onOpenDownloadModal,
  onOpenPrivacyModal,
}) => {
  return (
    <>
      {/* Centered CTA Section with 14vw Heading */}
      <section className="w-full bg-[#0F172A] text-slate-100 py-20 sm:py-28 md:py-36 border-t border-slate-800 flex flex-col items-center justify-center text-center px-4 overflow-hidden relative select-none">
        {/* Compliance Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3.5 py-1.5 border border-slate-700 rounded-md mb-6 shadow-md">
          <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
          <span>Quezon City Ordinance No. SP-3440, S-2024</span>
        </div>

        {/* 14vw Heading */}
        <h2 className="font-display text-[clamp(2.75rem,13vw,11rem)] uppercase text-white leading-[0.85] tracking-[-0.04em] text-center w-full max-w-7xl px-2 select-none">
          PILOT <span className="text-[#F59E0B]">TODAY</span>
        </h2>

        {/* Brief Narrative */}
        <p className="mt-6 text-sm sm:text-base font-sans font-normal max-w-xl text-slate-300 leading-relaxed px-4">
          Equip your barangay disaster risk council with autonomous flood surge prediction, 
          120dB remote siren grids, and paperless RFID evacuee tracking.
        </p>

        {/* Large Rounded-Full Button that adapts across screen sizes */}
        <div className="mt-8 sm:mt-10 max-w-full px-4">
          <button
            onClick={onOpenDownloadModal}
            className="w-full sm:w-auto px-6 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-full bg-[#000000] text-white font-mono text-xs sm:text-base md:text-lg font-bold uppercase tracking-[-0.02em] border-2 border-slate-800 hover:border-[#F59E0B] transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] group-hover:translate-y-0.5 transition-transform shrink-0" />
            <span className="whitespace-nowrap">Download Prototype APK (v1.4.2)</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>

        {/* Tech Badges */}
        <div className="mt-6 text-xs font-mono font-medium text-slate-400 flex flex-wrap items-center justify-center gap-3">
          <span>Android 8.0+ Sideload</span>
          <span className="text-slate-600">•</span>
          <span>SHA-256 Verified Package</span>
          <span className="text-slate-600">•</span>
          <span>Zero Cloud Lock-in</span>
        </div>
      </section>

      {/* Footer Separated by a 2px Black Top Border */}
      <footer className="w-full bg-[#000000] text-white border-t-2 border-black py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright Info */}
          <div className="text-center md:text-left space-y-1">
            <div className="font-display text-base tracking-tight text-white uppercase">
              KYUSI<span className="text-[#F59E0B]">·LIGTAS</span>
            </div>
            <p className="font-mono text-[12px] text-slate-400">
              © 2026 KYUSI-LIGTAS. All rights reserved. Quezon City University & QCDRRMC.
            </p>
          </div>

          {/* Horizontal Social Links in Space Mono (12px) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 font-mono text-[12px] text-white font-bold uppercase tracking-[-0.02em]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F59E0B] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Telegram Bot
            </a>
            <a
              href="#irise-up"
              className="hover:text-[#F59E0B] transition-colors"
            >
              QC iRISE-UP
            </a>
            <button
              onClick={onOpenSpecsModal}
              className="hover:text-[#F59E0B] transition-colors cursor-pointer uppercase font-bold text-[12px]"
            >
              Hardware Specs
            </button>
            {onOpenPrivacyModal && (
              <>
                <button
                  onClick={() => onOpenPrivacyModal('policy')}
                  className="hover:text-[#F59E0B] transition-colors cursor-pointer uppercase font-bold text-[12px]"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => onOpenPrivacyModal('policy')}
                  className="hover:text-[#F59E0B] transition-colors cursor-pointer uppercase font-bold text-[12px]"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => onOpenPrivacyModal('autonomy')}
                  className="text-amber-400 hover:underline transition-colors cursor-pointer uppercase font-bold text-[12px]"
                >
                  Citizen Data Rights
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};
