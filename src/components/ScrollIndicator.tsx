import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId = 'system-showcase' }) => {
  return (
    <a
      href={`#${targetId}`}
      className="relative w-[144px] h-[144px] rounded-full flex items-center justify-center cursor-pointer group select-none"
      style={{ width: '144px', height: '144px' }}
      aria-label="Scroll Down to Interactive System Showcase"
    >
      {/* Animated SVG text container with linear rotation (360deg over 12s) */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-12s pointer-events-none select-none"
        viewBox="0 0 144 144"
        style={{ width: '144px', height: '144px' }}
      >
        <defs>
          <path
            id="scrollCirclePath144"
            d="M 72, 72 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>
        <text
          fill="#94A3B8"
          className="transition-colors group-hover:fill-[#F59E0B]"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.9px',
          }}
        >
          <textPath href="#scrollCirclePath144" startOffset="0%">
            Scroll Down • Scroll Down • Scroll Down • 
          </textPath>
        </text>
      </svg>

      {/* Static Arrow-Down Icon (Lucide) in the center */}
      <div className="relative z-10 w-11 h-11 rounded-full border border-slate-700 bg-[#1E293B] text-[#F59E0B] flex items-center justify-center group-hover:scale-110 group-hover:translate-y-0.5 transition-all duration-200 shadow-md">
        <ArrowDown className="w-5 h-5" />
      </div>
    </a>
  );
};
