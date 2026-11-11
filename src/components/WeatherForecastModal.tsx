import React from 'react';
import { 
  X, 
  CloudRain, 
  AlertTriangle, 
  Wind, 
  Droplets, 
  Gauge, 
  Compass, 
  Radio, 
  CheckCircle2, 
  ExternalLink,
  Waves
} from 'lucide-react';

interface WeatherForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherForecastModal: React.FC<WeatherForecastModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const forecastHours = [
    { time: '+1 Hour (04:00 AM)', rate: 31.2, label: 'Intense Downpour', heightPercent: 88, alert: true },
    { time: '+2 Hours (05:00 AM)', rate: 24.8, label: 'Heavy Continuous Rain', heightPercent: 70, alert: true },
    { time: '+3 Hours (06:00 AM)', rate: 12.5, label: 'Moderate Rainshowers', heightPercent: 35, alert: false },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#1E293B] border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden font-mono text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between bg-[#0F172A]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                PAGASA HYDROMET FEED · QUEZON CITY
              </div>
              <h2 className="font-display text-lg sm:text-xl uppercase tracking-tight text-white">
                Weather & Rainfall Forecast
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Active Thunderstorm Advisory Banner */}
          <div className="p-4 rounded-xl bg-[#0F172A] border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase text-white flex items-center gap-2">
                <span>Severe Thunderstorm Advisory No. 04</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-[#F59E0B] border border-amber-500/40">
                  YELLOW WARNING
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Heavy to intense rain with lightning and strong convective gusts affecting the <strong>Tullahan River Basin</strong> (Districts 2, 4, 5 — Fairview, Novaliches, Batasan Hills, Doña Imelda). High runoff saturation observed.
              </p>
            </div>
          </div>

          {/* Key Meteorological Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-700/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Current Rate</span>
              </div>
              <div className="text-xl font-bold text-white mt-1">28.4 mm/hr</div>
              <div className="text-[10px] text-[#F59E0B] font-sans mt-0.5">Heavy to Intense</div>
            </div>

            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-700/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-sky-400" />
                <span>6hr Accum.</span>
              </div>
              <div className="text-xl font-bold text-white mt-1">64.2 mm</div>
              <div className="text-[10px] text-slate-400 font-sans mt-0.5">Soil Sat: 91%</div>
            </div>

            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-700/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>Wind Vector</span>
              </div>
              <div className="text-xl font-bold text-white mt-1">SW 32 km/h</div>
              <div className="text-[10px] text-slate-400 font-sans mt-0.5">Gusts to 48 km/h</div>
            </div>

            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-700/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-sky-400" />
                <span>Pressure</span>
              </div>
              <div className="text-xl font-bold text-white mt-1">1004.2 hPa</div>
              <div className="text-[10px] text-amber-400 font-sans mt-0.5">Depression Low</div>
            </div>
          </div>

          {/* 3-Hour Precipitation Forecast Chart */}
          <div className="bg-[#0F172A] p-4 sm:p-5 rounded-xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold text-white tracking-tight">
                  3-Hour Micro-Precipitation Forecast Chart
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Generated via QC Node-AI local weather radar extrapolation & Kalman state filtering.
                </p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                15m Synced
              </span>
            </div>

            {/* Visual Bar Graph */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {forecastHours.map((hour, idx) => (
                <div key={idx} className="bg-[#1E293B] border border-slate-700 rounded-xl p-3 flex flex-col justify-between h-40">
                  <div className="text-[10px] font-bold text-slate-400 uppercase leading-tight">
                    {hour.time}
                  </div>

                  <div className="flex-1 flex items-end justify-center py-2">
                    <div className="w-12 bg-slate-900 rounded-t-lg overflow-hidden flex flex-col justify-end h-24 p-1 border border-slate-700/60">
                      <div 
                        className={`w-full rounded-t transition-all duration-500 ${
                          hour.alert ? 'bg-sky-400' : 'bg-slate-500'
                        }`}
                        style={{ height: `${hour.heightPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-center pt-1 border-t border-slate-700/50">
                    <div className="text-sm font-bold text-white">{hour.rate} mm/hr</div>
                    <div className="text-[9px] text-slate-400 truncate">{hour.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-slate-400 font-sans flex items-center justify-between pt-1">
              <span>*Precipitation crest expected between 03:45 AM - 04:30 AM over Tullahan Catchment.</span>
              <span className="text-emerald-400 font-bold uppercase">Confidence: 94.2%</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-700 bg-[#0F172A] flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Data Source: PAGASA Regional Doppler Station (Subic/Tanay Sync)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg uppercase font-bold text-xs border border-slate-700 cursor-pointer transition-colors"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
