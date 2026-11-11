import React from 'react';

export const SkewedMarqueeSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20 md:py-28 bg-[#0F172A]">
      {/* Full-width container with background #1E293B, skewed at -2deg */}
      <div 
        className="w-[120%] -ml-[10%] bg-[#1E293B] border-y border-slate-700 py-10 sm:py-16 md:py-20 transform -skew-y-2 overflow-hidden shadow-2xl select-none"
        style={{ transform: 'skewY(-2deg)' }}
      >
        {/* Row 1: Warning orange text (#F59E0B) in Archivo Black, 10vw size, infinite scrolling */}
        <div className="overflow-hidden pb-4 sm:pb-6 md:pb-8">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            <span className="font-display text-[10vw] uppercase text-[#F59E0B] leading-[0.85] tracking-[-0.04em] whitespace-nowrap drop-shadow-sm">
              MANDATORY EVACUATION PROTOCOLS • 30-MIN EARLY WARNING • TULLAHAN RIVER FLOOD SURGE • NODE-AI TELEMETRY •
            </span>
            <span className="font-display text-[10vw] uppercase text-[#F59E0B] leading-[0.85] tracking-[-0.04em] whitespace-nowrap drop-shadow-sm">
              MANDATORY EVACUATION PROTOCOLS • 30-MIN EARLY WARNING • TULLAHAN RIVER FLOOD SURGE • NODE-AI TELEMETRY •
            </span>
          </div>
        </div>

        {/* Row 2: White text with 80% opacity, scrolling in reverse */}
        <div className="overflow-hidden pt-2">
          <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-8">
            <span className="font-display text-[10vw] uppercase text-white/80 leading-[0.85] tracking-[-0.04em] whitespace-nowrap">
              RC522 RFID CONTACTLESS ADMISSION • ZERO PAPER LOGBOOKS • REST API QC iRISE-UP • RA 10173 COMPLIANT •
            </span>
            <span className="font-display text-[10vw] uppercase text-white/80 leading-[0.85] tracking-[-0.04em] whitespace-nowrap">
              RC522 RFID CONTACTLESS ADMISSION • ZERO PAPER LOGBOOKS • REST API QC iRISE-UP • RA 10173 COMPLIANT •
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
