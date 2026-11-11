import React from 'react';
import { Clock, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      value: '30 - 60 M',
      label: 'Predictive Lead Time',
      subtext: 'Upstream hydrograph forecasting provides ample evacuation buffer prior to street inundation.',
      icon: Clock,
    },
    {
      value: '< 5 SEC',
      label: 'Multi-Channel Alert Speed',
      subtext: 'Concurrent broadcast triggering remote sirens, GSM SMS queues, and disaster leadership bots.',
      icon: Zap,
    },
    {
      value: '100%',
      label: 'Paperless Registration',
      subtext: 'RC522 RFID and offline QR admissions eliminate manual logbook chaos and relief bottlenecks.',
      icon: CheckCircle2,
    },
    {
      value: 'RA 10173',
      label: 'Data Privacy Adherence',
      subtext: 'Station-based gate registration safeguards citizen privacy without invasive GPS surveillance.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
            Empirical Field Benchmarks
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
            Validated Under Monsoon Conditions
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal font-sans">
            Benchmarked against historical Tullahan River flash flood surges across Barangay Fairview, 
            Batasan Hills, and Doña Imelda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:border-amber-500/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase bg-[#0F172A] text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                      METRIC 0{idx + 1}
                    </span>
                    <Icon className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div className="font-display text-4xl sm:text-5xl font-black tracking-[-0.04em] text-white leading-none">
                    {m.value}
                  </div>
                  <div className="font-bold text-sm uppercase text-slate-200 mt-3">
                    {m.label}
                  </div>
                </div>
                <p className="mt-4 pt-3 border-t border-slate-700/80 text-xs text-slate-400 font-sans leading-relaxed">
                  {m.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
