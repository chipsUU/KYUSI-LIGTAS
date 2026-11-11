import React from 'react';
import { ScrollIndicator } from './ScrollIndicator';
import { 
  ArrowRight, 
  Cpu, 
  MapPin, 
  QrCode, 
  Activity, 
  Waves, 
  Volume2, 
  Compass, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  ShieldAlert,
  Smartphone,
  Download
} from 'lucide-react';

interface HeroProps {
  isSimulatedAlert: boolean;
  onOpenSpecsModal: () => void;
  onScrollToDemo: () => void;
  onOpenResidentPortal: () => void;
  onOpenDownloadModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isSimulatedAlert,
  onOpenSpecsModal,
  onScrollToDemo,
  onOpenResidentPortal,
  onOpenDownloadModal,
}) => {

  return (
    <section id="overview" className="relative bg-[#0F172A] text-slate-100">
      {/* 1. Fullscreen Hero Header */}
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between border-b border-slate-800 relative overflow-hidden">
        {/* Top Kicker Bar */}
        <div className="pt-6 px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs font-mono font-medium text-slate-400 tracking-[-0.02em] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>Quezon City Ordinance No. SP-3440, S-2024 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by Node-AI Telemetry</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Tullahan River Basin</span>
          </div>
        </div>

        {/* Centered Main Headline */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10 select-none overflow-hidden w-full">
          <h1 className="font-display uppercase text-white leading-[0.85] tracking-[-0.04em] text-center w-full max-w-6xl text-[clamp(2.5rem,8.5vw,7.5rem)] select-none">
            KYUSI<span className="text-[#F59E0B]">·LIGTAS</span>
          </h1>
        </div>

        {/* Horizontal Border Separating Hero from Metadata Row */}
        <div className="border-t border-slate-800 bg-[#0F172A]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 sm:pb-24 md:pb-16 lg:pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
            {/* Left: 'Based in...' label */}
            <div className="space-y-1 font-mono text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                ORIGIN & JURISDICTION
              </span>
              <div className="font-display text-base sm:text-lg text-white uppercase tracking-tight">
                Based in Quezon City, PH
              </div>
              <div className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                Tullahan River Sub-Basin 4B · Fairview / Batasan / Doña Imelda
              </div>
            </div>

            {/* Center: Rotating Circular 'Scroll Down' Text Indicator with Static Arrow */}
            <div className="flex items-center justify-center md:col-span-2 lg:col-span-1 order-last lg:order-none pt-2 lg:pt-0">
              <ScrollIndicator targetId="system-showcase" />
            </div>

            {/* Right: Multi-line Title / Role */}
            <div className="font-mono text-left md:text-right space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                CIVIC PLATFORM ARCHITECTURE
              </span>
              <div className="font-display text-base sm:text-lg text-white uppercase tracking-tight">
                IoT Flood Warning & Smart Evacuation
              </div>
              <div className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                Autonomous Early Warning · Multi-Channel Siren Dissemination
              </div>
              <div className="text-[10px] font-mono font-medium text-slate-500 uppercase">
                QCU College of Engineering Capstone
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Linear Running Marquee Banner */}
      <div id="system-showcase" className="w-full bg-[#1E293B] text-slate-300 border-b border-slate-800 py-3 overflow-hidden select-none font-mono text-xs uppercase tracking-[-0.02em] font-medium">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-[#F59E0B] font-bold">★ QC ORDINANCE NO. SP-3440, S-2024 COMPLIANT</span>
          <span className="text-slate-600">·</span>
          <span>TULLAHAN RIVER SUB-BASIN 4B REAL-TIME HYDROLOGY</span>
          <span className="text-slate-600">·</span>
          <span>30 TO 60-MINUTE PREDICTIVE SURGE HORIZON</span>
          <span className="text-slate-600">·</span>
          <span className="text-white font-bold">NODE-AI AUTONOMOUS TELEMETRY</span>
          <span className="text-slate-600">·</span>
          <span>RC522 RFID CONTACTLESS SHELTER REGISTRATION</span>
          <span className="text-slate-600">·</span>
          <span className="text-[#F59E0B] font-bold">★ QC ORDINANCE NO. SP-3440, S-2024 COMPLIANT</span>
          <span className="text-slate-600">·</span>
          <span>TULLAHAN RIVER SUB-BASIN 4B REAL-TIME HYDROLOGY</span>
        </div>
      </div>

      {/* 3. Deep System Narrative & Interactive Dual-Mockup Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-slate-800">
        {/* Compliance Kicker & Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-slate-700 bg-[#1E293B] text-slate-200 text-xs font-mono tracking-[-0.02em] font-medium uppercase rounded-md shadow-sm">
            <div className="relative w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#F59E0B]/50 animate-spin-12s" />
            </div>
            <span>SP-3440, S-2024</span>
            <span className="text-[#F59E0B]">·</span>
            <span className="text-[#F59E0B] font-bold">Node-AI</span>
          </div>

          <span className="text-xs font-mono text-slate-400 uppercase bg-[#1E293B] px-2.5 py-1 border border-slate-700 rounded-md hidden sm:inline">
            Coverage: Barangay Fairview · Batasan Hills · Doña Imelda
          </span>
        </div>

        {/* Narrative Headline */}
        <div className="max-w-4xl mb-10">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase text-white leading-[0.88] tracking-[-0.04em] [text-wrap:balance]">
            Transforming Barangay Evacuation from <span className="text-[#F59E0B]">Reactive Panic</span> to <span className="text-emerald-400">Data-Driven Precision</span>.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl font-sans">
            An IoT-enabled flood early warning and shelter management platform providing Quezon City communities a 
            <strong className="text-white font-bold font-mono text-sm mx-1 px-1.5 py-0.5 bg-[#1E293B] border border-slate-700 rounded">30- to 60-minute predictive lead time</strong>, 
            automated multi-channel siren triggers, and 
            <strong className="text-white font-bold font-mono text-sm mx-1 px-1.5 py-0.5 bg-[#1E293B] border border-slate-700 rounded">pen-and-paper-free RFID/QR shelter admission</strong>.
          </p>

          {/* Action CTAs with subtle warning orange accent */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 font-mono">
            {/* Download Native Android APK Action */}
            <button
              onClick={() => onOpenDownloadModal?.()}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] bg-[#F59E0B] hover:bg-amber-400 text-slate-950 border border-amber-400 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
              title="Download official Android APK for field resident pass"
            >
              <Download className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="whitespace-nowrap">Download APK</span>
            </button>

            <button
              onClick={onOpenResidentPortal}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] text-white bg-sky-600 hover:bg-sky-500 border border-sky-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-sky-500/20 hover:scale-105 active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">Resident Portal / Open App →</span>
            </button>

            <button
              onClick={onScrollToDemo}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:translate-x-1 active:scale-95 group"
            >
              <span className="whitespace-nowrap">Launch Interactive Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={onOpenSpecsModal}
              className="w-full sm:w-auto px-4 sm:px-5 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] text-slate-200 bg-[#1E293B] hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <Cpu className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="whitespace-nowrap">Hardware Specs</span>
            </button>
          </div>
        </div>

        {/* Dual-View Device Mockups Container */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4 font-mono text-xs font-medium uppercase tracking-[-0.02em] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-slate-200 font-bold">Dual-Tier System: Citizen Mobile Terminal & BDRRMC Command Matrix</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Latency: 140ms · LoRa 915MHz Mesh</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Citizen Mobile App View (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="mx-auto w-full max-w-[340px] sm:max-w-[360px] bg-[#1E293B] border border-slate-700 rounded-[36px] p-3.5 shadow-2xl relative">
                {/* Mobile Camera notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                </div>

                <div className="bg-[#0F172A] rounded-[26px] overflow-hidden pt-7 pb-4 px-3.5 border border-slate-800 text-slate-100">
                  {/* Citizen App Header */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold uppercase">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-[#F59E0B] flex items-center justify-center text-[#0F172A] text-[10px] font-black">
                        KL
                      </div>
                      <span className="font-display tracking-tight text-sm text-white">KYUSI-LIGTAS</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">Brgy. Fairview</span>
                  </div>

                  {/* Warning Status Card */}
                  <div className={`p-3 rounded-lg border mb-3 transition-colors ${
                    isSimulatedAlert 
                      ? 'bg-amber-950/40 text-[#F59E0B] border-amber-500/50' 
                      : 'bg-[#1E293B] text-slate-200 border-slate-700'
                  }`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${isSimulatedAlert ? 'text-[#F59E0B] animate-bounce' : 'text-slate-400'}`} />
                      <div>
                        <div className="font-display text-xs tracking-tight uppercase text-white">
                          {isSimulatedAlert 
                            ? 'STAGE 3: MANDATORY EVACUATION' 
                            : 'STAGE 2: PREEMPTIVE ADVISORY'}
                        </div>
                        <div className="text-[10px] font-mono mt-0.5 leading-tight text-slate-400 font-medium">
                          Tullahan Sector 3 · Critical upstream surge approaching within 35 mins.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nearest Safe Route */}
                  <div className="bg-[#1E293B] rounded-lg p-3 border border-slate-700 mb-3 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400 uppercase">Nearest Shelter:</span>
                      <span className="bg-slate-800 text-[#F59E0B] px-1.5 py-0.5 text-[10px] rounded border border-slate-700">420m (6m walk)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <div className="font-bold text-xs text-white truncate">Fairview High School Main Gym</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-300 font-medium">
                      <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Route: Via Dahlia Ave (Clear, +12m)</span>
                    </div>
                  </div>

                  {/* Offline Resident QR Pass Preview */}
                  <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-3 font-mono">
                    <div className="space-y-1">
                      <div className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-[-0.02em]">
                        Offline Evacuee Pass
                      </div>
                      <div className="text-xs font-bold font-sans text-slate-200">Santos Family (4 Pax)</div>
                      <div className="text-[10px] text-slate-400">ID: QC-FAIR-8821</div>
                    </div>
                    <div className="p-1 bg-white rounded border border-slate-300">
                      <QrCode className="w-10 h-10 text-slate-900" />
                    </div>
                  </div>

                  {/* Offline sync note */}
                  <div className="mt-2.5 text-center text-[10px] font-mono font-medium text-slate-400 uppercase flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>RA 10173 Encrypted Local Token</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Barangay Command Dashboard View (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 sm:p-6 shadow-xl h-full flex flex-col justify-between font-mono">
                {/* Terminal Header */}
                <div>
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      <span className="font-display text-base tracking-tight text-white pl-1">
                        BDRRMC COMMAND MATRIX · NODE-T01
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-950/40 font-bold uppercase text-[10px] rounded">
                        iRISE-UP: SYNCED
                      </span>
                    </div>
                  </div>

                  {/* Real-time Telemetry Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                    <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-700/80">
                      <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Waves className="w-3 h-3 text-[#F59E0B]" />
                        <span>Water Elevation</span>
                      </div>
                      <div className="text-2xl font-bold text-white mt-1 font-mono">
                        {isSimulatedAlert ? '2.84 m' : '1.42 m'}
                      </div>
                      <div className={`text-[10px] font-bold mt-0.5 ${isSimulatedAlert ? 'text-[#F59E0B]' : 'text-slate-400'}`}>
                        {isSimulatedAlert ? '▲ Surge: +4.2 cm/min' : 'Base: 1.20 m'}
                      </div>
                    </div>

                    <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-700/80">
                      <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Activity className="w-3 h-3 text-cyan-400" />
                        <span>Velocity</span>
                      </div>
                      <div className="text-2xl font-bold text-white mt-1 font-mono">
                        {isSimulatedAlert ? '3.85 m/s' : '1.20 m/s'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Doppler Hydrometry</div>
                    </div>

                    <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-700/80">
                      <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#F59E0B]" />
                        <span>Siren Grid</span>
                      </div>
                      <div className="text-2xl font-bold text-[#F59E0B] mt-1 font-mono">
                        {isSimulatedAlert ? 'TRIGGER' : 'ARMED'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">120dB Solar Array</div>
                    </div>

                    <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-700/80">
                      <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-400" />
                        <span>RFID In-Gym</span>
                      </div>
                      <div className="text-2xl font-bold text-white mt-1 font-mono">
                        {isSimulatedAlert ? '246/300' : '64/300'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Paper-Free Scan</div>
                    </div>
                  </div>

                  {/* River cross-section visualizer */}
                  <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-700/80 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-300 font-medium uppercase">Cross-Section Hydrology Sensor Feed (JSN-SR04T)</span>
                      <span className="text-[#F59E0B] font-bold">Node ID: QC-TUL-01</span>
                    </div>

                    {/* SVG River Cross Section Graphic */}
                    <div className="h-28 w-full relative bg-slate-950 rounded border border-slate-800 overflow-hidden">
                      {/* Critical Threshold line */}
                      <div className="absolute top-[28%] left-0 w-full border-b border-dashed border-red-500 flex items-center justify-between px-2">
                        <span className="text-[9px] font-mono text-red-200 bg-red-950/80 px-1 rounded font-bold border border-red-800">
                          MANDATORY EVACUATION (2.20M)
                        </span>
                      </div>

                      {/* Advisory Threshold line */}
                      <div className="absolute top-[52%] left-0 w-full border-b border-dashed border-amber-500 flex items-center justify-between px-2">
                        <span className="text-[9px] font-mono text-amber-200 bg-amber-950/80 px-1 rounded font-bold border border-amber-800">
                          PREEMPTIVE ADVISORY (1.50M)
                        </span>
                      </div>

                      {/* Dynamic water surface */}
                      <div
                        className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                          isSimulatedAlert
                            ? 'h-[80%] bg-amber-500/30 border-t-2 border-[#F59E0B]'
                            : 'h-[38%] bg-cyan-600/20 border-t border-cyan-400'
                        }`}
                      >
                        <div className="p-2 text-right">
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isSimulatedAlert ? 'bg-[#F59E0B] text-[#0F172A]' : 'bg-[#1E293B] text-cyan-300 border border-cyan-500/30'}`}>
                            Stage: {isSimulatedAlert ? '2.84m (CRITICAL SURGE)' : '1.42m (SAFE)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer status line inside console */}
                <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Predictive Horizon: Crest expected at +38 min</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">
                    Fairview Ops Console v2.4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
