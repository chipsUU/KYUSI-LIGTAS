import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PillarItem {
  id: string;
  number: string;
  title: string;
  targetId: string;
  tags: string[];
  subtitle: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'p1',
    number: '01',
    title: 'HYDROLOGY TELEMETRY',
    targetId: 'iot-telemetry',
    subtitle: 'Dual-core ESP32, JSN-SR04T waterproof ultrasonic transducer, Doppler flow hydrometry, and silt trap monitor.',
    tags: ['ESP32 CORE', 'JSN-SR04T ULTRASONIC', 'DOPPLER FLOW', '54H SOLAR AUTONOMY'],
  },
  {
    id: 'p2',
    number: '02',
    title: 'AI PREDICTIVE CREST',
    targetId: 'predictive-engine',
    subtitle: 'Long Short-Term Memory (LSTM) neural network with recursive Kalman state estimation for 30- to 60-minute lead time.',
    tags: ['LSTM NEURAL NET', 'KALMAN FILTER', '30-60M LEAD TIME', 'PAGASA RADAR SYNC'],
  },
  {
    id: 'p3',
    number: '03',
    title: 'TRI-CHANNEL BROADCAST',
    targetId: 'the-app',
    subtitle: 'Simultaneous sub-5-second dispatch across 120dB solar sirens, GSM SMS cell-broadcast queues, and Telegram bots.',
    tags: ['120DB REMOTE SIRENS', 'GSM CELL BROADCAST', '@KYUSILIGTAS BOT', '< 5S LATENCY'],
  },
  {
    id: 'p4',
    number: '04',
    title: 'CONTACTLESS RFID SHELTER',
    targetId: 'shelter-scanner',
    subtitle: 'RC522 RFID 13.56MHz and offline QR admissions replacing manual logbook paper bottlenecks with instant cot allotment.',
    tags: ['RC522 13.56MHZ', 'OFFLINE QR PASS', 'RA 10173 COMPLIANT', 'RELIEF KIT AUDIT'],
  },
  {
    id: 'p5',
    number: '05',
    title: 'QC iRISE-UP INTEGRATION',
    targetId: 'irise-up',
    subtitle: 'High-speed REST API synchronization connecting barangay-level edge servers to the QCDRRMC central command center.',
    tags: ['REST API TLS 1.3', 'QCDRRMC COMMAND', 'HMAC-SHA256', 'INTER-LGU SYNC'],
  },
];

export const DarkShowcaseSection: React.FC = () => {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#0F172A] text-slate-100 py-20 md:py-32 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 mb-4 gap-4">
          <div className="space-y-1 font-mono">
            <span className="text-[10px] uppercase font-bold text-[#F59E0B] tracking-wider">
              SYSTEM ARCHITECTURE DIRECTORY
            </span>
            <h2 className="font-display text-2xl sm:text-4xl uppercase text-white tracking-[-0.04em]">
              The 5 Mission-Critical Pillars
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 uppercase">
            Click any pillar to inspect live module
          </div>
        </div>

        {/* List of Items spanning 100% width with top border */}
        <div className="w-full divide-y divide-white/10 border-b border-white/10">
          {PILLARS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleScrollTo(item.targetId)}
              className="w-full border-t border-white/10 group cursor-pointer py-10 sm:py-14 md:py-16 px-4 sm:px-6 transition-colors duration-300 hover:bg-white/5 flex items-start justify-between gap-6"
            >
              {/* [Index (Orange, Mono)] */}
              <div className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-[#F59E0B] tracking-tight shrink-0 pt-2 select-none">
                {item.number}
              </div>

              {/* [Title + Tags (White, Archivo)] */}
              <div className="flex-1 min-w-0 pr-4">
                {/* On hover: Title translates +16px horizontally */}
                <h3 className="font-display text-[clamp(1.75rem,5.5vw,5rem)] uppercase text-white leading-[0.92] tracking-[-0.04em] transition-transform duration-300 ease-out group-hover:translate-x-[16px] select-none break-words">
                  {item.title}
                </h3>

                {/* Subtitle / Narrative */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans font-medium max-w-2xl leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Row of Tags (White, Archivo) */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {item.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded-full px-3 py-1 bg-white/10 text-white font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[-0.02em] border border-white/20 transition-colors duration-200 group-hover:border-[#F59E0B]/50 group-hover:text-[#F59E0B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* [Arrow Icon (Hidden, Orange)] - on hover: opacity becomes 1 and rotates 45deg */}
              <div className="shrink-0 pt-2">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform rotate-0 group-hover:rotate-45 text-[#F59E0B]">
                  <ArrowRight className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
