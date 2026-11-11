import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { PREDICTIVE_HYDROGRAPH_POINTS } from '../data/mockData';

export const PredictiveEngine: React.FC = () => {
  const [leadTimeMinutes, setLeadTimeMinutes] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackIndex, setPlaybackIndex] = useState<number>(5);

  const currentPoint = PREDICTIVE_HYDROGRAPH_POINTS[playbackIndex] || PREDICTIVE_HYDROGRAPH_POINTS[0];

  const handleNextStep = () => {
    setPlaybackIndex((prev) => (prev + 1) % PREDICTIVE_HYDROGRAPH_POINTS.length);
  };

  const handleReset = () => {
    setPlaybackIndex(0);
    setIsPlaying(false);
  };

  return (
    <section id="predictive-engine" className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core System Tier 1</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
              30- to 60-Minute Predictive Flood Horizon
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal max-w-2xl font-sans leading-relaxed">
              Real-time watershed modeling powered by a Long Short-Term Memory (LSTM) neural network 
              and recursive Kalman filter, forecasting river crests well before streets become impassable.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] px-3.5 py-2 border border-slate-700 rounded-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Telemetry Kalman Filter: Converged</span>
          </div>
        </div>

        {/* Predictive Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Hydrograph Display (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-[#1E293B] border border-slate-700 rounded-xl p-6 sm:p-8 shadow-xl font-mono">
            {/* Header with live timestamp and Stage Level */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-700/80 gap-3">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Target Basin: </span>
                <span className="text-white font-bold text-sm">Tullahan River Sub-Basin 4B (Station T-01)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded border ${
                  currentPoint.stage === 'CRITICAL'
                    ? 'bg-amber-950/60 text-[#F59E0B] border-amber-500/50'
                    : currentPoint.stage === 'ADVISORY'
                    ? 'bg-amber-950/30 text-amber-300 border-amber-600/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  Status: {currentPoint.stage}
                </span>
              </div>
            </div>

            {/* Simulated Hydrograph SVG Canvas */}
            <div className="my-6 relative bg-[#0F172A] p-4 rounded-lg border border-slate-800">
              <div className="h-64 sm:h-72 w-full relative flex items-end">
                {/* SVG Curves */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
                  {/* Grid Lines */}
                  <line x1="0" y1="60" x2="700" y2="60" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="700" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="0" y1="180" x2="700" y2="180" stroke="#334155" strokeWidth="1" />

                  {/* Stage threshold labels */}
                  <text x="10" y="52" fill="#EF4444" fontSize="10" fontFamily="Space Mono" fontWeight="bold">
                    CRITICAL SURGE (2.20M) - MANDATORY EVACUATION
                  </text>
                  <text x="10" y="112" fill="#F59E0B" fontSize="10" fontFamily="Space Mono" fontWeight="bold">
                    PREEMPTIVE ADVISORY (1.50M) - PREPARE GO-BAGS
                  </text>

                  {/* Predicted water level curve fill */}
                  <path
                    d={`M 0,240 
                       L 0,${240 - PREDICTIVE_HYDROGRAPH_POINTS[0].waterElevation * 75} 
                       ${PREDICTIVE_HYDROGRAPH_POINTS.map((pt, i) => `L ${(i / (PREDICTIVE_HYDROGRAPH_POINTS.length - 1)) * 700},${240 - pt.waterElevation * 75}`).join(' ')} 
                       L 700,240 Z`}
                    fill="url(#waterGradient)"
                    opacity="0.35"
                  />

                  {/* Predicted water line stroke */}
                  <path
                    d={`M 0,${240 - PREDICTIVE_HYDROGRAPH_POINTS[0].waterElevation * 75} 
                       ${PREDICTIVE_HYDROGRAPH_POINTS.map((pt, i) => `L ${(i / (PREDICTIVE_HYDROGRAPH_POINTS.length - 1)) * 700},${240 - pt.waterElevation * 75}`).join(' ')}`}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                  />

                  {/* Active cursor point */}
                  <circle
                    cx={(playbackIndex / (PREDICTIVE_HYDROGRAPH_POINTS.length - 1)) * 700}
                    cy={240 - currentPoint.waterElevation * 75}
                    r="6"
                    fill="#F59E0B"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />

                  <defs>
                    <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Time axis ticks */}
              <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>T-30m</span>
                <span>T-15m</span>
                <span className="font-bold text-white">Current (T-0)</span>
                <span className="text-[#F59E0B] font-bold">+15m Forecast</span>
                <span className="text-[#F59E0B] font-bold">+30m Peak</span>
                <span className="text-slate-400">+45m Runoff</span>
                <span className="text-slate-400">+60m Crest</span>
              </div>
            </div>

            {/* Playback Controls & Interactive Scrubber */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNextStep}
                    className="p-2 border border-slate-700 bg-[#0F172A] hover:bg-slate-800 text-slate-200 hover:text-white rounded cursor-pointer transition-colors"
                    title="Advance to next 5-minute timestep"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2 border border-slate-700 bg-[#0F172A] hover:bg-slate-800 text-slate-200 hover:text-white rounded cursor-pointer transition-colors"
                    title="Reset to baseline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-300 font-bold uppercase pl-1">
                    Timestep: {currentPoint.timeOffset}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Current Lead Time:</span>
                  <span className="font-bold text-[#F59E0B] text-sm">
                    {leadTimeMinutes} min window
                  </span>
                </div>
              </div>

              {/* Slider for Lead Time Simulation */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-bold uppercase">
                  <span>30 Min Lead Window</span>
                  <span>45 Min Recommended</span>
                  <span>60 Min Storm Surge</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="60"
                  step="5"
                  value={leadTimeMinutes}
                  onChange={(e) => setLeadTimeMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Predictive Live Metrics (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 font-mono">
            {/* Metric 1: Forecasted Elevation */}
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
                <span>Forecasted Peak Elevation</span>
                <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-white mt-2">
                {currentPoint.waterElevation.toFixed(2)} <span className="text-xl font-normal text-slate-400 font-sans">m</span>
              </div>
              <div className="mt-2 text-xs font-sans text-slate-400 flex items-center justify-between pt-2 border-t border-slate-700">
                <span>Rate of Rise:</span>
                <span className="font-bold text-[#F59E0B] font-mono">
                  {currentPoint.rateOfRise} cm/min
                </span>
              </div>
            </div>

            {/* Metric 2: Confidence Interval */}
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
                <span>LSTM Model Confidence</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-white mt-2">
                94.8 <span className="text-xl font-normal text-slate-400 font-sans">%</span>
              </div>
              <div className="mt-2 text-xs font-sans text-slate-400 pt-2 border-t border-slate-700">
                Calibrated against PAGASA Doppler radar historical surge curves.
              </div>
            </div>

            {/* Metric 3: Evacuation Window Countdown */}
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
                <span>Evacuation Buffer Remaining</span>
                <Clock className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-black text-[#F59E0B]">
                {Math.max(0, leadTimeMinutes - playbackIndex * 5)} MIN
              </div>
              <div className="p-3 bg-[#0F172A] border border-slate-800 rounded text-xs space-y-1">
                <div className="font-bold uppercase text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>QC BDRRMC Protocol Trigger</span>
                </div>
                <div className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  When forecast crest breaches 2.20m, autonomous SMS queue and remote 120dB sirens fire with 0ms operator delay.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
