import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Radio, 
  Volume2, 
  MessageSquare, 
  QrCode, 
  Package, 
  LogOut, 
  Activity, 
  Users, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  RefreshCw, 
  Sliders, 
  Clock, 
  Check, 
  Cpu, 
  Waves,
  Building,
  Bell,
  Search,
  Plus,
  ShieldCheck,
  ExternalLink,
  CloudRain,
  Download
} from 'lucide-react';
import { AppUser } from '../services/firebaseAuth';
import { WeatherForecastModal } from './WeatherForecastModal';
import { ShelterStatusModal } from './ShelterStatusModal';
import { SupabaseRegistrationsTable } from './SupabaseRegistrationsTable';

interface ModeratorDashboardProps {
  user: AppUser;
  onSignOut: () => void;
  onViewPublicSite: () => void;
}

interface Evacuee {
  id: string;
  name: string;
  room: string;
  checkInTime: string;
  reliefStatus: 'Claimed' | 'Pending' | 'Special Care';
  familyMembers: number;
}

const INITIAL_EVACUEES: Evacuee[] = [
  { id: 'EVAC-QC-0914', name: 'Santos, Eduardo P.', room: 'Gymnasium Quad B-12', checkInTime: '01:42 AM', reliefStatus: 'Claimed', familyMembers: 4 },
  { id: 'EVAC-QC-0915', name: 'Reyes, Maria Elena C.', room: 'Room 104 (Senior Sector)', checkInTime: '01:48 AM', reliefStatus: 'Claimed', familyMembers: 2 },
  { id: 'EVAC-QC-0916', name: 'Dela Cruz, Juan M.', room: 'Auditorium Cot A-04', checkInTime: '02:05 AM', reliefStatus: 'Pending', familyMembers: 5 },
  { id: 'EVAC-QC-0917', name: 'Bautista, Corazon D.', room: 'Room 108 (PWD Sector)', checkInTime: '02:18 AM', reliefStatus: 'Special Care', familyMembers: 3 },
  { id: 'EVAC-QC-0918', name: 'Gonzales, Arnel T.', room: 'Covered Court Tent 19', checkInTime: '02:30 AM', reliefStatus: 'Claimed', familyMembers: 6 },
  { id: 'EVAC-QC-0919', name: 'Lim, Jennifer S.', room: 'Gymnasium Quad B-14', checkInTime: '02:44 AM', reliefStatus: 'Pending', familyMembers: 1 },
  { id: 'EVAC-QC-0920', name: 'Villanueva, Rodolfo K.', room: 'Auditorium Cot A-09', checkInTime: '03:10 AM', reliefStatus: 'Claimed', familyMembers: 4 },
];

export const ModeratorDashboard: React.FC<ModeratorDashboardProps> = ({
  user,
  onSignOut,
  onViewPublicSite,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'telemetry' | 'broadcast' | 'rfid_scanner' | 'relief_log'
  >('overview');

  const [currentTime, setCurrentTime] = useState<string>('');
  const [evacuees, setEvacuees] = useState<Evacuee[]>(INITIAL_EVACUEES);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Action Feedback States
  const [sirenActive, setSirenActive] = useState(false);
  const [sirenCountdown, setSirenCountdown] = useState(10);
  const [sirenMode, setSirenMode] = useState<'emergency' | 'test'>('emergency');
  const [smsDispatchedNotice, setSmsDispatchedNotice] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showShelterModal, setShowShelterModal] = useState(false);

  // Audio Playback References
  const sirenAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{
    ctx: AudioContext;
    oscillators: OscillatorNode[];
    lfo?: OscillatorNode;
    freqLfo?: OscillatorNode;
    gain: GainNode;
  } | null>(null);

  // Clock Update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-PH', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 1. ACTUAL EMERGENCY SIREN: Massive, deep, ultra-long-tempo civil defense flood evacuation wail (~12.5s cycle)
  const startEmergencySiren = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      stopSynthSiren();

      const ctx = new AudioCtxClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Ultra-long continuous LFO tempo (0.08 Hz = ~12.5-second full wail cycle)
      // Provides a deliberate, slow, menacing 6.2s crescendo climb to screaming peak, then 6.2s slow descent
      const lfo = ctx.createOscillator();
      lfo.type = 'triangle';
      lfo.frequency.setValueAtTime(0.08, now);

      // Frequency sweep depth
      const lfoGain1 = ctx.createGain();
      lfoGain1.gain.setValueAtTime(280, now); // Sweeps 300Hz <-> 860Hz
      lfo.connect(lfoGain1);

      const lfoGain2 = ctx.createGain();
      lfoGain2.gain.setValueAtTime(420, now); // Sweeps 450Hz <-> 1290Hz (harmonic 5th)
      lfo.connect(lfoGain2);

      const lfoGain3 = ctx.createGain();
      lfoGain3.gain.setValueAtTime(140, now); // Sub-bass body modulation
      lfo.connect(lfoGain3);

      // Primary Horn Driver (Sawtooth: sharp, penetrating civic horn tone)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(580, now);
      lfoGain1.connect(osc1.frequency);

      // Secondary Overtone Horn (Dissonant warning fifth)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(870, now);
      lfoGain2.connect(osc2.frequency);

      // Sub-Bass Enclosure Resonance (Deep physical ground rumble)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(290, now);
      lfoGain3.connect(osc3.frequency);

      // Channel level mix
      const mix1 = ctx.createGain();
      mix1.gain.setValueAtTime(0.42, now);
      osc1.connect(mix1);

      const mix2 = ctx.createGain();
      mix2.gain.setValueAtTime(0.22, now);
      osc2.connect(mix2);

      const mix3 = ctx.createGain();
      mix3.gain.setValueAtTime(0.32, now);
      osc3.connect(mix3);

      // Resonant Horn Throat Filter (Simulates acoustic horn projection)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2500, now);
      filter.Q.setValueAtTime(2.4, now);

      mix1.connect(filter);
      mix2.connect(filter);
      mix3.connect(filter);

      // Master Volume with smooth anti-pop envelope
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.68, now + 0.08);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      lfo.start(now);

      synthNodesRef.current = {
        ctx,
        oscillators: [osc1, osc2, osc3],
        lfo,
        gain: masterGain,
      };
    } catch (err) {
      console.warn('Emergency siren synth error:', err);
    }
  };

  // 2. TESTING SIREN: Distinct electronic diagnostic test tone sequence (clean alternating dual-chime pulses, non-alarming test)
  const startTestSiren = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      stopSynthSiren();

      const ctx = new AudioCtxClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Diagnostic Electronic Test Pattern:
      // Alternating clean dual-tone calibration pulses (880 Hz & 660 Hz with rhythmic 1.25 Hz pulse)
      // Standard civic siren diagnostic chime - clean, non-alarming, official test tone
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1100, now);

      // Diagnostic pulse LFO (creates clean 1.25 Hz rhythmic test pulses)
      const pulseLfo = ctx.createOscillator();
      pulseLfo.type = 'square';
      pulseLfo.frequency.setValueAtTime(1.25, now);

      // Frequency alternation LFO: shifts pitch between 880Hz and 660Hz every 0.8s
      const freqLfo = ctx.createOscillator();
      freqLfo.type = 'square';
      freqLfo.frequency.setValueAtTime(0.625, now);

      const freqGain1 = ctx.createGain();
      freqGain1.gain.setValueAtTime(110, now);
      freqLfo.connect(freqGain1);
      freqGain1.connect(osc1.frequency);

      const freqGain2 = ctx.createGain();
      freqGain2.gain.setValueAtTime(138, now);
      freqLfo.connect(freqGain2);
      freqGain2.connect(osc2.frequency);

      // Pulse gate on master output
      const pulseMix = ctx.createGain();
      pulseMix.gain.setValueAtTime(0.0001, now);
      pulseLfo.connect(pulseMix.gain);

      const mix1 = ctx.createGain();
      mix1.gain.setValueAtTime(0.40, now);
      osc1.connect(mix1);

      const mix2 = ctx.createGain();
      mix2.gain.setValueAtTime(0.25, now);
      osc2.connect(mix2);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(1.8, now);

      mix1.connect(filter);
      mix2.connect(filter);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.55, now + 0.05);

      filter.connect(pulseMix);
      pulseMix.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      pulseLfo.start(now);
      freqLfo.start(now);

      synthNodesRef.current = {
        ctx,
        oscillators: [osc1, osc2],
        lfo: pulseLfo,
        freqLfo,
        gain: masterGain,
      };
    } catch (err) {
      console.warn('Diagnostic test siren synth error:', err);
    }
  };

  const stopSynthSiren = () => {
    if (synthNodesRef.current) {
      try {
        const { ctx, oscillators, lfo, freqLfo, gain } = synthNodesRef.current;
        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.08);

        setTimeout(() => {
          try {
            oscillators.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch {}
            });
            if (lfo) {
              try {
                lfo.stop();
                lfo.disconnect();
              } catch {}
            }
            if (freqLfo) {
              try {
                freqLfo.stop();
                freqLfo.disconnect();
              } catch {}
            }
            try {
              gain.disconnect();
            } catch {}
            try {
              ctx.close();
            } catch {}
          } catch {}
        }, 100);
      } catch (err) {
        console.warn('Error stopping synth siren:', err);
      }
      synthNodesRef.current = null;
    }
  };

  const stopAllSirenAudio = () => {
    if (sirenAudioRef.current) {
      try {
        sirenAudioRef.current.pause();
        sirenAudioRef.current.currentTime = 0;
      } catch (err) {
        console.warn('Error pausing HTML5 audio:', err);
      }
    }
    stopSynthSiren();
  };

  // Siren Countdown Timer (10 seconds with continuous audio playback sync)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (sirenActive) {
      if (sirenCountdown > 0) {
        timer = setTimeout(() => {
          setSirenCountdown((c) => c - 1);
        }, 1000);
      } else {
        // Countdown hit 0: pause audio, reset currentTime to 0, hide banner, restore button
        stopAllSirenAudio();
        setSirenActive(false);
        setSirenCountdown(10);
      }
    } else {
      stopAllSirenAudio();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [sirenActive, sirenCountdown]);

  // Cleanup audio upon component unmount
  useEffect(() => {
    return () => {
      stopAllSirenAudio();
    };
  }, []);

  const handleSoundSiren = (mode: 'emergency' | 'test' = 'emergency') => {
    if (sirenActive) return;

    setSirenMode(mode);
    setSirenActive(true);
    setSirenCountdown(10);

    if (mode === 'emergency') {
      // 1. Immediately trigger the continuous, ultra-long tempo civil defense emergency wail
      startEmergencySiren();

      // 2. Concurrently play the slowed-down HTML5 Audio element for depth
      try {
        if (!sirenAudioRef.current) {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.loop = true;
          audio.volume = 0.4;
          audio.playbackRate = 0.50; // Significantly elongated sample cadence
          sirenAudioRef.current = audio;
        } else {
          sirenAudioRef.current.playbackRate = 0.50;
          sirenAudioRef.current.volume = 0.4;
        }

        sirenAudioRef.current.currentTime = 0;
        sirenAudioRef.current.loop = true;
        const playPromise = sirenAudioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('HTML5 Audio autoplay notice (continuous Web Audio running):', err);
          });
        }
      } catch (err) {
        console.warn('HTML5 Audio notice (continuous Web Audio running):', err);
      }
    } else {
      // Diagnostic Test Mode: trigger clean electronic test chimes (distinct non-alarming sound)
      startTestSiren();
    }
  };

  const handleDispatchSms = () => {
    setSmsDispatchedNotice('DISPATCH SENT: 4,120 resident devices queued via Cell-Broadcast & Globe/Smart SMPP gateway.');
    setTimeout(() => setSmsDispatchedNotice(null), 5000);
  };

  const handleExportCsv = () => {
    const headers = ['Evacuee ID', 'Name', 'Room / Cot Assignment', 'Check-In Timestamp', 'Relief Kit Status', 'Family Size'];
    const rows = evacuees.map((e) => [
      e.id,
      `"${e.name}"`,
      `"${e.room}"`,
      e.checkInTime,
      e.reliefStatus,
      e.familyMembers.toString(),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kyusi-ligtas-evacuation-masterlist-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  const filteredEvacuees = evacuees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans select-none">
      {/* ========================================================================= */}
      {/* TOP APP HEADER */}
      {/* ========================================================================= */}
      <header className="h-16 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0 font-mono">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B] text-[#0F172A] font-black flex items-center justify-center font-display text-base">
              QC
            </div>
            <div>
              <div className="font-display text-sm tracking-tight text-white uppercase leading-none">
                KYUSI<span className="text-[#F59E0B]">·LIGTAS</span> COMMAND
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5">
                Quezon City Disaster Risk Reduction & Management Council
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-slate-300 font-bold uppercase text-[11px]">
              QC Tullahan Grid: Synchronized
            </span>
          </div>
        </div>

        {/* Right: Moderator Identity & Timestamp */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold text-slate-200">{currentTime || 'Syncing...'}</span>
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-2.5 bg-[#1E293B] border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs uppercase">
              {user.email ? user.email[0] : 'M'}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-white font-bold text-xs leading-none truncate max-w-[150px]">
                {user.email || 'commander@gmail.com'}
              </div>
              <div className="text-[10px] text-[#F59E0B] font-bold uppercase tracking-tight mt-0.5">
                {user.role || 'Barangay Incident Commander'}
              </div>
            </div>
          </div>

          {/* Public Site Quick Switch */}
          <button
            onClick={onViewPublicSite}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase border border-slate-800 transition-colors cursor-pointer"
            title="View public showcase site in another mode"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Site</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* BODY WITH FIXED LEFT SIDEBAR & MAIN CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* FIXED LEFT SIDEBAR */}
        <aside className="w-64 bg-[#0B0F19] border-r border-slate-800 flex flex-col justify-between shrink-0 p-4 font-mono text-xs">
          <div className="space-y-6">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2">
              COMMAND MODULES
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold uppercase transition-all text-left cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4 shrink-0" />
                <span>BDRRMC Command Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('telemetry')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold uppercase transition-all text-left cursor-pointer ${
                  activeTab === 'telemetry'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Radio className="w-4 h-4 shrink-0" />
                <span>Live IoT Telemetry & Calibration</span>
              </button>

              <button
                onClick={() => setActiveTab('broadcast')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold uppercase transition-all text-left cursor-pointer ${
                  activeTab === 'broadcast'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>Siren & SMS Broadcast Triggers</span>
              </button>

              <button
                onClick={() => setActiveTab('rfid_scanner')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold uppercase transition-all text-left cursor-pointer ${
                  activeTab === 'rfid_scanner'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4 shrink-0" />
                <span>RFID / QR Evacuee Check-In</span>
              </button>

              <button
                onClick={() => setActiveTab('relief_log')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold uppercase transition-all text-left cursor-pointer ${
                  activeTab === 'relief_log'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>Relief Pack Inventory & Distribution</span>
              </button>
            </nav>

            {/* Quick Metrics Badge */}
            <div className="p-3 bg-[#1E293B] rounded-xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">FAIRVIEW SHELTER</span>
                <span className="text-emerald-400">92% CAP</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92%]" />
              </div>
              <div className="text-[10px] text-slate-400">
                184 / 200 Cots Occupied · 6 Relief Stations
              </div>
            </div>
          </div>

          {/* Persistent Sign Out button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 border border-transparent hover:border-red-500/30 font-bold uppercase text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN VIEW AREA */}
        {/* ========================================================================= */}
        <main className="flex-1 bg-[#0F172A] overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Active Dispatch Banner (Top UI Overlay) */}
          {sirenActive && (
            sirenMode === 'emergency' ? (
              <div className="border border-red-800/80 bg-red-950/20 rounded-xl p-5 mb-6 flex items-center justify-between animate-fadeIn">
                {/* Left Content */}
                <div className="flex items-center gap-4">
                  <Volume2 className="w-8 h-8 animate-pulse text-red-500 shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-slate-200 tracking-wide font-display uppercase">
                      120DB SOLAR SIREN DISPATCH ACTIVE (MANDATORY EVACUATION)
                    </h4>
                    <p className="font-mono text-xs text-red-400/80 mt-1">
                      Continuous long-tempo civil defense wail transmitting across Fairview Tullahan River Horn Grids 1, 2, & 3.
                    </p>
                  </div>
                </div>

                {/* Right Content */}
                <div className="text-right">
                  <div className="text-3xl font-black text-slate-300 font-mono">{sirenCountdown}S</div>
                  <div className="text-[10px] uppercase tracking-widest text-red-500/70 font-mono">AUTO CUTOFF</div>
                </div>
              </div>
            ) : (
              <div className="border border-sky-600/80 bg-sky-950/30 rounded-xl p-5 mb-6 flex items-center justify-between animate-fadeIn">
                {/* Left Content */}
                <div className="flex items-center gap-4">
                  <Activity className="w-8 h-8 animate-pulse text-sky-400 shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-slate-200 tracking-wide font-display uppercase">
                      120DB SIREN ACOUSTIC AUDIT TEST ACTIVE
                    </h4>
                    <p className="font-mono text-xs text-sky-300/80 mt-1">
                      Electronic diagnostic calibration tone sequence transmitting on Fairview Horn Array. Routine check — no flood hazard.
                    </p>
                  </div>
                </div>

                {/* Right Content */}
                <div className="text-right">
                  <div className="text-3xl font-black text-sky-200 font-mono">{sirenCountdown}S</div>
                  <div className="text-[10px] uppercase tracking-widest text-sky-400/80 font-mono">TEST CUTOFF</div>
                </div>
              </div>
            )
          )}

          {/* SMS Notification Banner */}
          {smsDispatchedNotice && (
            <div className="p-3.5 bg-sky-950/70 border border-sky-500/50 rounded-xl text-xs text-sky-200 font-mono flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{smsDispatchedNotice}</span>
            </div>
          )}

          {/* CSV Export Notification */}
          {exportNotice && (
            <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 font-mono flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Evacuation Masterlist exported to CSV successfully!</span>
            </div>
          )}

          {/* QUICK ACTION TOOLBAR */}
          <div className="bg-[#1E293B] border border-slate-700 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 font-mono">
            <div>
              <div className="text-[10px] font-bold uppercase text-amber-500 tracking-wider">
                EMERGENCY OVERRIDE & DISPATCH ACTIONS
              </div>
              <h2 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-white mt-0.5">
                Barangay Action Console
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Action 1A: Sound 120dB Remote Siren (Actual Emergency - Slow Wail) */}
              <button
                onClick={() => handleSoundSiren('emergency')}
                disabled={sirenActive}
                className={`px-4 py-2.5 rounded-xl font-bold uppercase text-xs transition-all flex items-center gap-2 shadow-md ${
                  sirenActive && sirenMode === 'emergency'
                    ? 'bg-amber-700/50 text-amber-500 border border-amber-600/50 cursor-not-allowed'
                    : sirenActive
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border border-slate-700'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${sirenActive && sirenMode === 'emergency' ? 'animate-pulse text-amber-400' : ''}`} />
                <span>
                  {sirenActive && sirenMode === 'emergency'
                    ? `SIREN ACTIVE (${sirenCountdown}S)`
                    : 'SOUND 120DB REMOTE SIREN'}
                </span>
              </button>

              {/* Action 1B: Run 120dB Siren Audit Test (Routine Diagnostic Test Chime) */}
              <button
                onClick={() => handleSoundSiren('test')}
                disabled={sirenActive}
                className={`px-4 py-2.5 rounded-xl font-bold uppercase text-xs transition-all flex items-center gap-2 shadow-md border ${
                  sirenActive && sirenMode === 'test'
                    ? 'bg-sky-900/60 text-sky-300 border-sky-500/60 cursor-not-allowed'
                    : sirenActive
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700'
                    : 'bg-sky-950/80 text-sky-300 hover:bg-sky-900 border-sky-600/60 cursor-pointer'
                }`}
              >
                <Radio className={`w-4 h-4 ${sirenActive && sirenMode === 'test' ? 'animate-pulse text-sky-400' : 'text-sky-400'}`} />
                <span>
                  {sirenActive && sirenMode === 'test'
                    ? `TEST ACTIVE (${sirenCountdown}S)`
                    : 'RUN 120DB SIREN AUDIT TEST'}
                </span>
              </button>

              {/* Action 2: Dispatch Preemptive Evacuation SMS */}
              <button
                onClick={handleDispatchSms}
                className="px-4 py-2.5 rounded-xl font-bold uppercase text-xs text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Dispatch Preemptive Evacuation SMS</span>
              </button>

              {/* Action 3: Export Evacuation Masterlist (CSV) */}
              <button
                onClick={handleExportCsv}
                className="px-4 py-2.5 rounded-xl font-bold uppercase text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export Evacuation Masterlist (CSV)</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: BDRRMC COMMAND OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Telemetry Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="bg-[#1E293B] border border-slate-700 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">RIVER WATER LEVEL</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">2.42 m</div>
                  <div className="text-[11px] text-amber-500/90 mt-1 font-sans flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Stage 2 (Alert) · Cresting in 42m
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">TOTAL REGISTERED EVACUEES</div>
                  <div className="text-2xl font-black text-white mt-1">184 Persons</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-sans">
                    42 Families Registered · 0 Missing
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">RELIEF PACKS ISSUED</div>
                  <div className="text-2xl font-black text-white mt-1">142 Claimed</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">
                    58 Remaining in Fairview Gymnasium
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700 p-4 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">NODE-AI FIELD SENSORS</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">3 / 3 Online</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">
                    100% LoRa/Cellular Packet Delivery
                  </div>
                </div>
              </div>

              {/* INTERACTIVE DASHBOARD CARDS: WEATHER & RAINFALL FORECAST & EVACUATION SHELTER STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-mono">
                {/* Card 1: Weather & Rainfall Forecast (Clickable) */}
                <div
                  onClick={() => setShowWeatherModal(true)}
                  className="bg-[#1E293B] border border-slate-700 hover:border-slate-500 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer hover:bg-slate-800/80 group flex flex-col justify-between space-y-4"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Weather & Rainfall Forecast detailed modal"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-105 transition-transform">
                        <CloudRain className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          PAGASA LOCAL FEED · TULLAHAN BASIN
                        </div>
                        <h3 className="font-display text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-sky-300 transition-colors">
                          Weather & Rainfall Forecast
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-[#F59E0B] border border-amber-500/30 uppercase font-bold shrink-0">
                      Yellow Alert
                    </span>
                  </div>

                  {/* Metric highlights */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Precip Rate</div>
                      <div className="text-lg font-bold text-white mt-0.5">28.4 <span className="text-xs font-normal text-slate-400">mm/h</span></div>
                      <div className="text-[10px] text-[#F59E0B] font-sans">Heavy/Intense</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">3h Peak Extrap</div>
                      <div className="text-lg font-bold text-sky-300 mt-0.5">31.2 <span className="text-xs font-normal text-slate-400">mm/h</span></div>
                      <div className="text-[10px] text-slate-400 font-sans">At 04:00 AM</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Wind Vector</div>
                      <div className="text-lg font-bold text-white mt-0.5">32 <span className="text-xs font-normal text-slate-400">km/h</span></div>
                      <div className="text-[10px] text-slate-400 font-sans">SW Gusts 48</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="text-[11px] font-sans truncate">
                      Severe thunderstorm advisory active over Tullahan basin.
                    </span>
                    <span className="text-[#F59E0B] font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      View Doppler Feed →
                    </span>
                  </div>
                </div>

                {/* Card 2: Evacuation Shelter Status (Clickable) */}
                <div
                  onClick={() => setShowShelterModal(true)}
                  className="bg-[#1E293B] border border-slate-700 hover:border-slate-500 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer hover:bg-slate-800/80 group flex flex-col justify-between space-y-4"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Evacuation Shelter Status detailed modal"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          RFID / QR HEADCOUNT AUDIT
                        </div>
                        <h3 className="font-display text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-emerald-300 transition-colors">
                          Evacuation Shelter Status
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 uppercase font-bold shrink-0">
                      3 Hubs Online
                    </span>
                  </div>

                  {/* Highlights with Mini Progress Bars */}
                  <div className="space-y-2.5 py-1 border-y border-slate-800/80">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 truncate">Fairview HS Gym (42 Families)</span>
                        <span className="text-white font-bold">184 / 200 (92%)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[92%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 truncate">Batasan Hills NHS (61 Families)</span>
                        <span className="text-white font-bold">256 / 400 (64%)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[64%]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="text-[11px] font-sans truncate">
                      587 Total Evacuees · 163 Cots Remaining.
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      Inspect Shelter Headcount →
                    </span>
                  </div>
                </div>
              </div>

              {/* REAL-TIME SUPABASE HARDWARE REGISTRATIONS STREAM */}
              <SupabaseRegistrationsTable />

              {/* LIVE TABLE OF REGISTERED EVACUEES */}
              <div className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden shadow-xl font-mono">
                <div className="p-4 sm:p-5 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg uppercase text-white tracking-tight">
                      Live Evacuee Admission & Allocation Masterlist
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Real-time admissions synced from RFID scanners and offline QR reader terminals.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search ID, name, or room..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#0F172A] border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 w-56 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0F172A] text-slate-400 uppercase text-[10px] border-b border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Evacuee ID</th>
                        <th className="py-3 px-4">Full Name</th>
                        <th className="py-3 px-4">Family Count</th>
                        <th className="py-3 px-4">Shelter Room & Bed</th>
                        <th className="py-3 px-4">Check-in Time</th>
                        <th className="py-3 px-4">Relief Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredEvacuees.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-sky-400">{e.id}</td>
                          <td className="py-3 px-4 font-bold text-white">{e.name}</td>
                          <td className="py-3 px-4 text-slate-300">{e.familyMembers} pax</td>
                          <td className="py-3 px-4 text-slate-200">{e.room}</td>
                          <td className="py-3 px-4 text-slate-400">{e.checkInTime}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                e.reliefStatus === 'Claimed'
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                                  : e.reliefStatus === 'Special Care'
                                  ? 'bg-purple-950/60 text-purple-400 border border-purple-500/40'
                                  : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                              }`}
                            >
                              {e.reliefStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setEvacuees((prev) =>
                                  prev.map((item) =>
                                    item.id === e.id
                                      ? {
                                          ...item,
                                          reliefStatus: item.reliefStatus === 'Claimed' ? 'Pending' : 'Claimed',
                                        }
                                      : item
                                  )
                                );
                              }}
                              className="text-[11px] text-amber-500 hover:underline cursor-pointer"
                            >
                              Toggle Relief
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LIVE IOT SENSOR TELEMETRY & CALIBRATION */}
          {/* ========================================================================= */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6 font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E293B] border border-slate-700 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Station 1: Tullahan Bridge</span>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between"><span>Transducer:</span><span className="text-white font-bold">JSN-SR04T Waterproof</span></div>
                    <div className="flex justify-between"><span>Ultrasonic Distance:</span><span className="text-amber-400 font-bold">1.58m to Crest</span></div>
                    <div className="flex justify-between"><span>Stream Velocity:</span><span className="text-white font-bold">1.82 m/s</span></div>
                    <div className="flex justify-between"><span>Solar Battery:</span><span className="text-emerald-400 font-bold">13.8V (Float)</span></div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase rounded-lg border border-slate-700 text-slate-200 cursor-pointer">
                      Calibrate Zero Datum (Offset: 0.00m)
                    </button>
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Station 2: Batasan Catchment</span>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between"><span>Transducer:</span><span className="text-white font-bold">JSN-SR04T Waterproof</span></div>
                    <div className="flex justify-between"><span>Ultrasonic Distance:</span><span className="text-emerald-400 font-bold">3.12m Safe Margin</span></div>
                    <div className="flex justify-between"><span>Stream Velocity:</span><span className="text-white font-bold">0.94 m/s</span></div>
                    <div className="flex justify-between"><span>Solar Battery:</span><span className="text-emerald-400 font-bold">13.4V (Active)</span></div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase rounded-lg border border-slate-700 text-slate-200 cursor-pointer">
                      Calibrate Zero Datum (Offset: -0.05m)
                    </button>
                  </div>
                </div>

                <div className="bg-[#1E293B] border border-slate-700 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Station 3: Doña Imelda Weir</span>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between"><span>Transducer:</span><span className="text-white font-bold">JSN-SR04T Waterproof</span></div>
                    <div className="flex justify-between"><span>Ultrasonic Distance:</span><span className="text-amber-400 font-bold">2.01m (Rising)</span></div>
                    <div className="flex justify-between"><span>Stream Velocity:</span><span className="text-white font-bold">1.45 m/s</span></div>
                    <div className="flex justify-between"><span>Solar Battery:</span><span className="text-emerald-400 font-bold">13.6V (Normal)</span></div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase rounded-lg border border-slate-700 text-slate-200 cursor-pointer">
                      Calibrate Zero Datum (Offset: +0.02m)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: BROADCAST TRIGGERS */}
          {/* ========================================================================= */}
          {activeTab === 'broadcast' && (
            <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-6 font-mono">
              <h3 className="font-display text-xl uppercase text-white">Tri-Channel Alert Dispatch Center</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                      <Volume2 className="w-5 h-5" />
                      <span>Acoustic Sirens (120dB)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">DUAL-MODE</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    3 Solar Horn towers deployed along Tullahan River corridor. Supports diagnostic audit or mandatory evacuation burst.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleSoundSiren('emergency')}
                      disabled={sirenActive}
                      className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs uppercase transition-all flex items-center justify-center gap-1.5 ${
                        sirenActive && sirenMode === 'emergency'
                          ? 'bg-amber-700/50 text-amber-500 border border-amber-600/50 cursor-not-allowed'
                          : sirenActive
                          ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${sirenActive && sirenMode === 'emergency' ? 'animate-pulse text-amber-400' : ''}`} />
                      <span>{sirenActive && sirenMode === 'emergency' ? `ACTIVE (${sirenCountdown}S)` : 'Actual Siren'}</span>
                    </button>

                    <button
                      onClick={() => handleSoundSiren('test')}
                      disabled={sirenActive}
                      className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs uppercase transition-all flex items-center justify-center gap-1.5 border ${
                        sirenActive && sirenMode === 'test'
                          ? 'bg-sky-900/60 text-sky-300 border-sky-500/60 cursor-not-allowed'
                          : sirenActive
                          ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700'
                          : 'bg-sky-950/80 text-sky-300 hover:bg-sky-900 border-sky-600/60 cursor-pointer shadow-md'
                      }`}
                    >
                      <Radio className={`w-3.5 h-3.5 ${sirenActive && sirenMode === 'test' ? 'animate-pulse text-sky-400' : 'text-sky-400'}`} />
                      <span>{sirenActive && sirenMode === 'test' ? `TEST (${sirenCountdown}S)` : 'Test Horns'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <MessageSquare className="w-5 h-5" />
                    <span>GSM SMS Cell Broadcast</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Direct integration with telco disaster priority queues.
                  </p>
                  <button
                    onClick={handleDispatchSms}
                    className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase rounded cursor-pointer"
                  >
                    Queue Advisory SMS
                  </button>
                </div>

                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Radio className="w-5 h-5" />
                    <span>Telegram Official Bot</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Push notifications to 1,290 verified resident subscribers.
                  </p>
                  <button
                    onClick={() => {
                      setSmsDispatchedNotice('Telegram Bot Alert: Broadcast pushed to @KyusiLigtasBot channel.');
                      setTimeout(() => setSmsDispatchedNotice(null), 4000);
                    }}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase rounded cursor-pointer"
                  >
                    Broadcast to Telegram
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: RFID / QR SCANNER STATION */}
          {/* ========================================================================= */}
          {activeTab === 'rfid_scanner' && (
            <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-6 font-mono">
              <h3 className="font-display text-xl uppercase text-white">Contactless Admission Scanner Terminal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#0F172A] rounded-xl border border-slate-800 text-center space-y-4">
                  <QrCode className="w-20 h-20 text-amber-500 mx-auto" />
                  <div className="text-sm font-bold text-white uppercase">RC522 RFID 13.56MHz & QR Optical Reader</div>
                  <p className="text-xs text-slate-400 font-sans">
                    Tap physical QC Citizen ID card or scan digital offline emergency pass.
                  </p>
                  <button
                    onClick={() => {
                      const newEvacuee: Evacuee = {
                        id: `EVAC-QC-09${Math.floor(100 + Math.random() * 899)}`,
                        name: 'Ramirez, Carlos V.',
                        room: 'Auditorium Cot B-07',
                        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        reliefStatus: 'Claimed',
                        familyMembers: 3,
                      };
                      setEvacuees([newEvacuee, ...evacuees]);
                      setSuccessNotice(`Scanned & Admitted: ${newEvacuee.name} to ${newEvacuee.room}!`);
                      setTimeout(() => setSuccessNotice(null), 4000);
                    }}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase text-xs rounded-xl cursor-pointer"
                  >
                    Simulate RFID Tap (Admit Evacuee)
                  </button>
                </div>

                <div className="p-5 bg-[#0F172A] rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase">Cot Allotment Algorithm</div>
                  <div className="space-y-2 text-xs text-slate-400 font-sans">
                    <p>• Seniors and PWD evacuees are auto-assigned to Ground Floor Rooms 101-110.</p>
                    <p>• Families with infant children receive priority partitions with mosquito netting.</p>
                    <p>• RA 10173 compliance: Personal addresses and phone numbers are encrypted client-side.</p>
                  </div>
                </div>
              </div>

              {/* LIVE SUPABASE HARDWARE REGISTRATIONS IN RFID TERMINAL */}
              <SupabaseRegistrationsTable />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: RELIEF PACK INVENTORY */}
          {/* ========================================================================= */}
          {activeTab === 'relief_log' && (
            <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl space-y-6 font-mono">
              <h3 className="font-display text-xl uppercase text-white">Relief Pack Inventory & Distribution Audit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-bold">Standard Family Food Packs</div>
                  <div className="text-2xl font-black text-white">58 Remaining</div>
                  <div className="text-[11px] text-slate-400">200 Baseline Delivered by DSWD</div>
                </div>

                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-bold">Hygiene & Sanitary Kits</div>
                  <div className="text-2xl font-black text-white">42 Remaining</div>
                  <div className="text-[11px] text-slate-400">Toothpaste, soap, feminine pads</div>
                </div>

                <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-bold">Potable Water Gallons (5-Gal)</div>
                  <div className="text-2xl font-black text-emerald-400">110 Available</div>
                  <div className="text-[11px] text-slate-400">QC Water Tanker Refill Ready</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals for Interactive Dashboard Cards */}
      <WeatherForecastModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
      />

      <ShelterStatusModal
        isOpen={showShelterModal}
        onClose={() => setShowShelterModal(false)}
      />
    </div>
  );
};
