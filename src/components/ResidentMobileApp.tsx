import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  QrCode, 
  MapPin, 
  Building, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Download, 
  WifiOff, 
  Radio, 
  Check, 
  CheckCircle2, 
  Clock, 
  Navigation, 
  Layers, 
  Share2, 
  ShieldCheck,
  BatteryCharging,
  Wifi,
  Signal,
  Smartphone,
  PhoneCall,
  UserCheck,
  Monitor,
  Tablet,
  CheckCheck,
  Bed,
  Route,
  ChevronRight
} from 'lucide-react';
import { ResidentProfile } from './ResidentAuth';
import QRCode from 'react-qr-code';

interface ResidentMobileAppProps {
  profile: ResidentProfile;
  onSignOut: () => void;
  onBackToPublic: () => void;
  onOpenPrivacyModal?: (tab?: 'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy') => void;
}

interface ChecklistItem {
  id: string;
  category: 'hydration' | 'medical' | 'docs' | 'gear';
  label: string;
  checked: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', category: 'hydration', label: 'Drinking water (3-day supply, 1 gal/person/day)', checked: true },
  { id: 'c2', category: 'hydration', label: 'Non-perishable food & manual can opener', checked: true },
  { id: 'c3', category: 'medical', label: 'First aid kit & 7-day prescription medications', checked: true },
  { id: 'c4', category: 'docs', label: 'Waterproof pouch with valid IDs, birth certs & land titles', checked: true },
  { id: 'c5', category: 'gear', label: 'Battery-powered radio & high-capacity power bank', checked: true },
  { id: 'c6', category: 'gear', label: 'Waterproof LED flashlight + extra D-batteries', checked: true },
  { id: 'c7', category: 'gear', label: 'Whistle / emergency audible signaling device', checked: false },
  { id: 'c8', category: 'medical', label: 'Hygiene kit, soaps, sanitaries & disinfectant wipes', checked: false },
];

export const ResidentMobileApp: React.FC<ResidentMobileAppProps> = ({
  profile,
  onSignOut,
  onBackToPublic,
  onOpenPrivacyModal,
}) => {
  // Module Screen State (Default: shelters)
  const [activeModule, setActiveModule] = useState<'qr_pass' | 'shelters' | 'routes' | 'checklist'>('shelters');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [passSavedNotice, setPassSavedNotice] = useState(false);
  const [hotlineDialed, setHotlineDialed] = useState(false);

  // Viewport mode override for evaluator testing: 'auto' | 'mobile' | 'tablet' | 'desktop'
  const [viewportOverride, setViewportOverride] = useState<'auto' | 'mobile' | 'tablet' | 'desktop'>('auto');
  const [detectedBreakpoint, setDetectedBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Detect physical screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDetectedBreakpoint('mobile');
      } else if (width >= 768 && width < 1024) {
        setDetectedBreakpoint('tablet');
      } else {
        setDetectedBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effective mode based on override or detection
  const currentMode = viewportOverride === 'auto' ? detectedBreakpoint : viewportOverride;

  const checkedCount = checklist.filter((c) => c.checked).length;

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSavePass = () => {
    setPassSavedNotice(true);
    setTimeout(() => setPassSavedNotice(false), 3500);
  };

  const handleDialHotline = () => {
    setHotlineDialed(true);
    setTimeout(() => setHotlineDialed(false), 4000);
  };

  return (
    <div className="bg-[#0B1120] min-h-screen text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ========================================================================= */}
      {/* GLOBAL / DESKTOP / TABLET TOP APP BAR */}
      {/* ========================================================================= */}
      <header className="h-16 bg-[#0D1526] border-b border-[#1E293B] px-3 sm:px-6 lg:px-8 flex items-center justify-between z-40 sticky top-0 font-mono text-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111C30] hover:bg-[#1E293B] active:scale-95 text-slate-300 hover:text-white border border-[#1E293B] transition-all cursor-pointer min-h-[44px]"
            title="Return to public landing"
          >
            <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
            <span className="hidden sm:inline">← Back to Public Site</span>
            <span className="sm:hidden">Exit</span>
          </button>

          {/* Quick Evaluator Device Preview Mode Switcher */}
          <div className="hidden sm:flex items-center bg-[#111C30] p-1 rounded-xl border border-slate-800 text-[11px]">
            <span className="text-slate-500 px-2 uppercase font-bold text-[10px] hidden md:inline">Mode:</span>
            <button
              onClick={() => setViewportOverride('auto')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                viewportOverride === 'auto' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Auto-detect based on screen size"
            >
              Auto
            </button>
            <button
              onClick={() => setViewportOverride('mobile')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                viewportOverride === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Force Native Mobile Smartphone Mode (<768px)"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setViewportOverride('tablet')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                viewportOverride === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Force Tablet Split-Screen Mode (768px-1024px)"
            >
              <Tablet className="w-3 h-3" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setViewportOverride('desktop')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                viewportOverride === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Force Desktop Dual-Column Chassis (>1024px)"
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
          </div>
        </div>

        {/* Resident Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency Hotline Action */}
          <button
            onClick={handleDialHotline}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 active:scale-95 text-red-200 border border-red-500/40 text-xs font-bold uppercase transition-all cursor-pointer min-h-[44px]"
            title="Quezon City DRRMC Central Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">{hotlineDialed ? 'Connecting 122...' : 'Hotline (122)'}</span>
            <span className="sm:hidden">122</span>
          </button>

          {/* Privacy & Citizen Rights */}
          {onOpenPrivacyModal && (
            <button
              onClick={() => onOpenPrivacyModal('autonomy')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111C30] hover:bg-[#1E293B] active:scale-95 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase transition-all cursor-pointer min-h-[44px]"
              title="Citizen Data Portability & Rights Center"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Data Rights</span>
            </button>
          )}

          {/* Household Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111C30] border border-[#1E293B]">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-bold text-white text-xs">{profile.fullName}</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold">{profile.totalHousehold} Pax</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 uppercase text-[10px]">{profile.barangay.replace('Brgy. ', '')}</span>
          </div>

          {/* Sign Out / Switch Household Profile */}
          <button
            onClick={onSignOut}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-300 border border-slate-700 text-xs font-bold uppercase transition-all cursor-pointer min-h-[44px]"
            title="Switch profile or sign out"
          >
            Switch
          </button>
        </div>
      </header>

      {/* Hotline feedback flash */}
      {hotlineDialed && (
        <div className="bg-red-600 text-white px-4 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider animate-fadeIn">
          🚨 Routing priority emergency call to Quezon City DRRMC Central Hotline (122) / BDRRMC Fairview Substation...
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MOBILE SMARTPHONE VIEWPORT (<768px): FULL-SCREEN NATIVE APP */}
      {/* ========================================================================= */}
      {currentMode === 'mobile' && (
        <div className="w-full flex-1 flex flex-col justify-between pb-[calc(5rem+env(safe-area-inset-bottom,0px))] bg-[#0B1120]">
          {/* Mobile Sticky Live Top Bar */}
          <div className="sticky top-16 z-30 bg-[#0D1526]/95 backdrop-blur-md px-4 py-2.5 border-b border-[#1E293B] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-200">QC-TULLAHAN • LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                Offline Token Active
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {profile.barangay.replace('Brgy. ', '')}
              </span>
            </div>
          </div>

          {/* Main Mobile Scrollable Content */}
          <div className="p-4 space-y-4 max-w-xl mx-auto w-full">
            {/* Preemptive Advisory Banner */}
            <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase">
                <span className="text-[#F59E0B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                  PREEMPTIVE ADVISORY
                </span>
                <span className="text-slate-400 bg-[#0B1120] px-2.5 py-0.5 rounded-full border border-slate-800 text-[10px]">
                  SECTOR 3
                </span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                "Upstream surge expected in 35 mins. Prepare go-bags."
              </p>
            </div>

            {/* Mobile Screen: Shelters */}
            {activeModule === 'shelters' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400 px-1">
                  <span>NEARBY CENTERS</span>
                  <span className="text-emerald-400 text-[11px]">2 OPEN NEAR YOU</span>
                </div>

                {/* Center 1 */}
                <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-4 space-y-3 shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                        FAIRVIEW HIGH SCHOOL MAIN GYM
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                        <span>Barangay Fairview • 420m (6m walk)</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 shrink-0">
                      82% Full
                    </span>
                  </div>

                  <div className="w-full bg-[#0B1120] h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-[#F59E0B] h-full w-[82%]" />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Pets</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1120] text-emerald-400 border border-slate-800">✓ PWD Ramp</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Medic</span>
                  </div>
                </div>

                {/* Center 2 */}
                <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-4 space-y-3 shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                        BATASAN NATIONAL HIGH SCHOOL EVACUATION HUB
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                        <span>Barangay Batasan Hills • 850m (12m walk)</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30 shrink-0">
                      40% Full
                    </span>
                  </div>

                  <div className="w-full bg-[#0B1120] h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-sky-400 h-full w-[40%]" />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1120] text-emerald-400 border border-slate-800">✓ PWD Ramp</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Medic</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Screen: QR Pass */}
            {activeModule === 'qr_pass' && (
              <div className="space-y-4 animate-fadeIn text-center">
                <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="text-xs font-mono font-bold uppercase text-slate-400">
                    OFFLINE EVACUEE IDENTITY TOKEN
                  </div>

                  {/* QR Graphic with pure #FFFFFF background, #000000 modules, and square finder patterns */}
                  <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl mx-auto border border-slate-200">
                    <QRCode
                      value={profile.tokenHash || 'QC-EVC-5948'}
                      size={180}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="H"
                      className="mx-auto block"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono font-bold text-[#38BDF8] break-all">
                      {profile.tokenHash || 'QC-EVC-5948'}
                    </div>
                    <div className="text-base font-bold text-white">
                      {profile.fullName || 'Juan M. Dela Cruz'}
                    </div>
                    <div className="text-xs text-amber-400 font-mono font-bold">
                      {profile.totalHousehold || 5} Registered Household Pax
                    </div>
                  </div>

                  {passSavedNotice && (
                    <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Evacuee Pass Saved to Photos / Wallet!</span>
                    </div>
                  )}

                  <button
                    onClick={handleSavePass}
                    className="w-full min-h-[48px] py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save Pass to Photos / Apple Wallet</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Screen: Roads */}
            {activeModule === 'routes' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="text-xs font-mono font-bold uppercase text-slate-400 px-1">
                  LIVE ROAD & EVACUATION CORRIDORS
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Regalado Highway</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                        Passable
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Clear traffic flow for light and heavy emergency response transports.
                    </p>
                  </div>

                  <div className="bg-[#111C30] border border-red-500/50 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-200 text-sm">Bistekville 2 Creek Access</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/50 font-bold">
                        FLOODED - DO NOT CROSS
                      </span>
                    </div>
                    <p className="text-xs text-red-300 font-sans leading-relaxed">
                      Overtopping Tullahan creek boundary (0.92m flash water). Use Dahlia alternate route.
                    </p>
                  </div>

                  <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Commonwealth Sub-arterial</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-500/40 font-bold">
                        Congested
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      BDRRMC traffic marshals on-site directing shuttle caravans.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Screen: Go-Bag */}
            {activeModule === 'checklist' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400 px-1">
                  <span>SURVIVAL GO-BAG</span>
                  <span className="text-amber-400 font-bold">{checkedCount} of {checklist.length} Packed</span>
                </div>

                <div className="bg-[#111C30] border border-[#1E293B] rounded-2xl p-3.5 space-y-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#0B1120] active:scale-98 transition-all cursor-pointer text-xs min-h-[48px]"
                    >
                      <div className={`p-1 rounded ${item.checked ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {item.checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </div>
                      <span className={`${item.checked ? 'text-slate-300 line-through opacity-85' : 'text-white font-medium'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offline SQLite Notice Card */}
            <div className="p-3.5 bg-[#111C30] border border-[#1E293B] rounded-xl text-xs text-slate-400 font-sans space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Cloud Dependency:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your QR pass and offline checklist remain 100% accessible via local SQLite / IndexedDB encryption even if cell towers fail.
              </p>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MOBILE FIXED BOTTOM THUMB NAVIGATION BAR */}
          {/* ===================================================================== */}
          <nav 
            className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-50 flex items-center justify-around py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl"
            role="navigation"
            aria-label="Mobile Resident Navigation"
          >
            {/* [Pass] */}
            <button
              onClick={() => setActiveModule('qr_pass')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                activeModule === 'qr_pass' ? 'text-[#F59E0B]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase font-bold mt-1">Pass</span>
            </button>

            {/* [Shelters] */}
            <button
              onClick={() => setActiveModule('shelters')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                activeModule === 'shelters' 
                  ? 'text-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase font-bold mt-1">Shelters</span>
            </button>

            {/* [Roads] */}
            <button
              onClick={() => setActiveModule('routes')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 cursor-pointer min-h-[48px] ${
                activeModule === 'routes' ? 'text-[#F59E0B]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Navigation className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase font-bold mt-1">Roads</span>
            </button>

            {/* [Go-Bag] */}
            <button
              onClick={() => setActiveModule('checklist')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 cursor-pointer min-h-[48px] relative ${
                activeModule === 'checklist' ? 'text-[#F59E0B]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <CheckSquare className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-3 text-[9px] font-mono font-bold bg-amber-500 text-slate-950 px-1 rounded-full">
                  {checkedCount}/8
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold mt-1">Go-Bag</span>
            </button>
          </nav>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TABLET / IPAD VIEWPORT (768px - 1024px): MASTER-DETAIL SPLIT SCREEN */}
      {/* ========================================================================= */}
      {currentMode === 'tablet' && (
        <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 flex flex-row gap-6 items-start">
          {/* Left Master Pane (35% Width) */}
          <aside className="w-[35%] shrink-0 space-y-4 font-mono text-xs sticky top-20">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                TABLET MASTER CONTROL
              </div>
              <div className="text-white font-bold text-sm">
                {profile.barangay} Operations
              </div>
            </div>

            {/* Module Selector List */}
            <div className="space-y-2.5">
              <button
                onClick={() => setActiveModule('qr_pass')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[48px] active:scale-98 ${
                  activeModule === 'qr_pass'
                    ? 'bg-[#111C30] border-[#F59E0B] text-white shadow-md'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <QrCode className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold uppercase text-xs">[01] QR PASS</span>
                </div>
                <span className="text-[10px] text-slate-400 bg-[#0B1120] px-2 py-0.5 rounded border border-slate-800">
                  OFFLINE
                </span>
              </button>

              <button
                onClick={() => setActiveModule('shelters')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[48px] active:scale-98 ${
                  activeModule === 'shelters'
                    ? 'bg-[#111C30] border-[#F59E0B] text-white shadow-md'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold uppercase text-xs">[02] SHELTERS</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE
                </span>
              </button>

              <button
                onClick={() => setActiveModule('routes')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[48px] active:scale-98 ${
                  activeModule === 'routes'
                    ? 'bg-[#111C30] border-[#F59E0B] text-white shadow-md'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-bold uppercase text-xs">[03] ROAD HAZARDS</span>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                  HAZARD
                </span>
              </button>

              <button
                onClick={() => setActiveModule('checklist')}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[48px] active:scale-98 ${
                  activeModule === 'checklist'
                    ? 'bg-[#111C30] border-[#F59E0B] text-white shadow-md'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold uppercase text-xs">[04] GO-BAG</span>
                </div>
                <span className="text-[10px] text-sky-400 bg-[#0B1120] px-2 py-0.5 rounded border border-slate-800">
                  {checkedCount}/8
                </span>
              </button>
            </div>

            {/* Active Flood Warning Summary Card */}
            <div className="bg-[#111C30] border border-amber-500/30 rounded-xl p-3.5 space-y-1.5">
              <div className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Sector 3 Flood Surge</span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Upstream surge expected in 35 mins. Mandatory pack completion requested.
              </p>
            </div>

            {/* Encrypted SQLite Token Health Card */}
            <div className="bg-[#111C30] border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Local SQLite Encrypted</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Household token signed with QC-LGU key. 100% functional without cellular towers.
              </p>
            </div>
          </aside>

          {/* Right Detail Pane (65% Width) */}
          <section className="flex-1 bg-[#111C30] border border-[#1E293B] rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Top Detail Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px]">CURRENT MODULE VIEW</span>
                <h2 className="text-base font-bold text-white uppercase mt-0.5">
                  {activeModule === 'shelters' && 'Evacuation Centers & Real-Time Cot Capacity'}
                  {activeModule === 'qr_pass' && 'Offline Digital Evacuee Identity Ticket'}
                  {activeModule === 'routes' && 'Real-Time Road Network & Inundation Vectors'}
                  {activeModule === 'checklist' && '72-Hour Survival Go-Bag Audit Grid'}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#0B1120] text-emerald-400 border border-slate-800 uppercase font-bold text-[11px]">
                Tablet Split Active
              </span>
            </div>

            {/* DETAIL VIEW: SHELTERS */}
            {activeModule === 'shelters' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 gap-4">
                  {/* Fairview High */}
                  <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">FAIRVIEW HIGH SCHOOL MAIN GYM</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">Dahlia Ave, Fairview • 420m (6m walk)</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold">
                        82% Full (184/200 cots)
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full w-[82%]" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Zone A:</strong> Bleachers (Full)
                      </div>
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Zone B:</strong> Rms 101-106 (92/120)
                      </div>
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Amenities:</strong> Pets, PWD, Medic
                      </div>
                    </div>
                  </div>

                  {/* Batasan Hills */}
                  <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">BATASAN NATIONAL HIGH SCHOOL EVACUATION HUB</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">IBP Road, Batasan Hills • 850m (12m walk)</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 font-mono text-xs font-bold">
                        40% Full (256/400 cots)
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-sky-400 h-full w-[40%]" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Zone 1:</strong> Gymnasium (Open)
                      </div>
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Zone 2:</strong> Main Bldg (144 Cots Avail)
                      </div>
                      <div className="p-2 bg-[#111C30] rounded border border-slate-800 text-slate-300">
                        <strong className="text-white block">Amenities:</strong> PWD Ramp, Medic, SSDD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DETAIL VIEW: QR PASS */}
            {activeModule === 'qr_pass' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn">
                <div className="bg-white p-6 rounded-2xl shadow-inner text-center border border-slate-200">
                  <div className="inline-block p-3 bg-white rounded-xl shadow-sm">
                    <QRCode
                      value={profile.tokenHash || 'QC-EVC-5948'}
                      size={200}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="H"
                      className="mx-auto block"
                    />
                  </div>
                  <div className="text-slate-800 font-mono text-xs font-bold uppercase mt-3">
                    ISO/IEC 18004 Standard QR Token · Hardware Optical Scanner Validated
                  </div>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 bg-[#0B1120] rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 uppercase text-[10px]">Cryptographic Token Hash:</span>
                    <div className="text-sky-300 font-bold break-all text-xs">
                      {profile.tokenHash || 'QC-EVC-5948'}
                    </div>
                  </div>

                  <div className="p-4 bg-[#0B1120] rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">Household Registered Head:</span>
                    <div className="text-white font-bold text-sm">{profile.fullName}</div>
                    <div className="text-amber-400">{profile.totalHousehold} Registered Family Members</div>
                  </div>

                  {passSavedNotice && (
                    <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Pass Token Saved!</span>
                    </div>
                  )}

                  <button
                    onClick={handleSavePass}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold uppercase rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Download Pass to Wallet
                  </button>
                </div>
              </div>
            )}

            {/* DETAIL VIEW: ROADS */}
            {activeModule === 'routes' && (
              <div className="space-y-3 font-mono text-xs animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-[#0B1120] border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Regalado Highway</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">Passable</span>
                    </div>
                    <p className="text-slate-400 font-sans text-xs">Northbound clear to Fairview Center Mall.</p>
                  </div>

                  <div className="p-4 bg-[#0B1120] border border-red-500/40 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-red-200 text-sm">Bistekville 2 Creek Access</span>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 text-[10px]">FLOODED</span>
                    </div>
                    <p className="text-red-300 font-sans text-xs">0.92m flash water overtopping canal. Evacuate via Dahlia.</p>
                  </div>

                  <div className="p-4 bg-[#0B1120] border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Commonwealth Sub-arterial</span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 text-[10px]">Congested</span>
                    </div>
                    <p className="text-slate-400 font-sans text-xs">QC DRRMC shuttle trucks navigating heavy rain lanes.</p>
                  </div>

                  <div className="p-4 bg-[#0B1120] border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">Doña Imelda Lowland Spillway</span>
                      <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30 text-[10px]">Monitored</span>
                    </div>
                    <p className="text-slate-400 font-sans text-xs">Weir floodgate gates opened to release upstream pressure.</p>
                  </div>
                </div>
              </div>
            )}

            {/* DETAIL VIEW: GO-BAG */}
            {activeModule === 'checklist' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className="p-3 bg-[#0B1120] border border-slate-800 rounded-xl flex items-center gap-3 cursor-pointer hover:border-slate-600 transition-colors"
                    >
                      <div className={item.checked ? 'text-emerald-400' : 'text-slate-500'}>
                        {item.checked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs ${item.checked ? 'text-slate-400 line-through' : 'text-white font-medium'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DESKTOP VIEWPORT (>1024px): DUAL-COLUMN WITH REALISTIC DEVICE CHASSIS */}
      {/* ========================================================================= */}
      {currentMode === 'desktop' && (
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Left Column: Interactive Control Deck */}
          <div className="w-full lg:w-[380px] shrink-0 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                RESIDENT APP MODULES
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Select any civic module below to inspect the interactive resident viewport.
              </p>
            </div>

            {/* Module Selectors List */}
            <div className="space-y-3 font-mono">
              <button
                onClick={() => setActiveModule('qr_pass')}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeModule === 'qr_pass'
                    ? 'bg-[#111C30] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeModule === 'qr_pass' ? 'bg-amber-500/20 text-[#F59E0B]' : 'bg-[#0B1120] text-slate-400'}`}>
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase ${activeModule === 'qr_pass' ? 'text-[#F59E0B]' : 'text-slate-200'}`}>
                      [01] DIGITAL EVACUEE QR PASS
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Offline household token for instant gate check-in
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-700 text-slate-400 bg-[#0B1120]">
                  OFFLINE
                </span>
              </button>

              <button
                onClick={() => setActiveModule('shelters')}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeModule === 'shelters'
                    ? 'bg-[#111C30] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeModule === 'shelters' ? 'bg-amber-500/20 text-[#F59E0B]' : 'bg-[#0B1120] text-slate-400'}`}>
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase ${activeModule === 'shelters' ? 'text-[#F59E0B]' : 'text-slate-200'}`}>
                      [02] SHELTERS & CAPACITY
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Live cot vacancy, walking distance & amenities
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-emerald-500/30 text-emerald-400 bg-emerald-950/40">
                  LIVE
                </span>
              </button>

              <button
                onClick={() => setActiveModule('routes')}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeModule === 'routes'
                    ? 'bg-[#111C30] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeModule === 'routes' ? 'bg-amber-500/20 text-[#F59E0B]' : 'bg-[#0B1120] text-slate-400'}`}>
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase ${activeModule === 'routes' ? 'text-[#F59E0B]' : 'text-slate-200'}`}>
                      [03] ROAD ACCESSIBILITY ALERTS
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Flood surge passability along arterial creeks
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-amber-500/30 text-amber-400 bg-amber-950/40">
                  HAZARD
                </span>
              </button>

              <button
                onClick={() => setActiveModule('checklist')}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeModule === 'checklist'
                    ? 'bg-[#111C30] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white'
                    : 'bg-[#111C30] border-[#1E293B] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeModule === 'checklist' ? 'bg-amber-500/20 text-[#F59E0B]' : 'bg-[#0B1120] text-slate-400'}`}>
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase ${activeModule === 'checklist' ? 'text-[#F59E0B]' : 'text-slate-200'}`}>
                      [04] 72-HOUR GO-BAG CHECKLIST
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Essential emergency survival checklist
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-700 text-sky-400 bg-[#0B1120]">
                  {checkedCount}/{checklist.length}
                </span>
              </button>
            </div>

            {/* Local Encrypted Tokens Status */}
            <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-4 sm:p-5 space-y-2 font-mono">
              <div className="text-xs font-bold text-[#F59E0B] uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>LOCAL ENCRYPTED TOKENS:</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                "Even if cellular towers fail during a typhoon storm surge, the resident's QR pass and offline checklist remain 100% accessible via local SQLite / IndexedDB encryption."
              </p>
            </div>
          </div>

          {/* Right Column: Realistic Phone Viewport Container */}
          <div className="w-full max-w-[400px] mx-auto flex flex-col items-center">
            <div className="w-[380px] h-[780px] bg-[#0D1526] border-4 border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden p-3 relative flex flex-col justify-between">
              {/* Screen Inner Glass */}
              <div className="bg-[#0B1120] rounded-[2rem] overflow-hidden border border-slate-800/80 flex-1 flex flex-col justify-between font-sans">
                {/* Top Device Bar */}
                <div className="bg-[#111C30] px-5 py-3 border-b border-[#1E293B] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Signal className="w-3.5 h-3.5 text-emerald-400" />
                    <Wifi className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px]">QC-GOV</span>
                  </div>

                  <div className="font-bold text-white uppercase text-[11px] tracking-tight">
                    KYUSI-LIGTAS v1.4.2
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                      {profile.barangay.replace('Brgy. ', '')}
                    </span>
                  </div>
                </div>

                {/* In-App Content Area */}
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                  {/* PREEMPTIVE ADVISORY CARD */}
                  <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-3.5 space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                      <span className="text-[#F59E0B] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                        PREEMPTIVE ADVISORY
                      </span>
                      <span className="text-slate-400 bg-[#0B1120] px-2 py-0.5 rounded border border-slate-800">
                        SECTOR 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      "Upstream surge expected in 35 mins. Prepare go-bags."
                    </p>
                  </div>

                  {/* Dynamic Module Screen Content */}
                  {activeModule === 'shelters' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400">
                        <span>NEARBY CENTERS</span>
                        <span className="text-emerald-400 text-[10px]">2 OPEN NEAR YOU</span>
                      </div>

                      <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-4 space-y-3 shadow-md">
                        <div>
                          <div className="text-sm font-bold text-white uppercase tracking-tight">
                            FAIRVIEW HIGH SCHOOL MAIN GYM
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#F59E0B] shrink-0" />
                            <span>Barangay Fairview • 420m (6m walk)</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-mono text-[11px]">Occupancy</span>
                            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                              82% Full
                            </span>
                          </div>
                          <div className="w-full bg-[#0B1120] h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-[#F59E0B] h-full w-[82%]" />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Pets</span>
                          <span className="px-2 py-0.5 rounded bg-[#0B1120] text-emerald-400 border border-slate-800">✓ PWD Ramp</span>
                          <span className="px-2 py-0.5 rounded bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Medic</span>
                        </div>
                      </div>

                      <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-4 space-y-3 shadow-md">
                        <div>
                          <div className="text-sm font-bold text-white uppercase tracking-tight">
                            BATASAN NATIONAL HIGH SCHOOL EVACUATION HUB
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#38BDF8] shrink-0" />
                            <span>Barangay Batasan Hills • 850m (12m walk)</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-mono text-[11px]">Occupancy</span>
                            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                              40% Full
                            </span>
                          </div>
                          <div className="w-full bg-[#0B1120] h-2 rounded-full overflow-hidden border border-slate-800">
                            <div className="bg-sky-400 h-full w-[40%]" />
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-[#0B1120] text-emerald-400 border border-slate-800">✓ PWD Ramp</span>
                          <span className="px-2 py-0.5 rounded bg-[#0B1120] text-emerald-400 border border-slate-800">✓ Medic</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'qr_pass' && (
                    <div className="space-y-3 animate-fadeIn text-center">
                      <div className="text-xs font-mono font-bold uppercase text-slate-400 text-left">
                        OFFLINE EVACUEE IDENTITY TOKEN
                      </div>

                      <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-5 space-y-4 shadow-md">
                        {/* Standard QR Code with pure #FFFFFF background, #000000 modules, and square finder patterns */}
                        <div className="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto border border-slate-200">
                          <QRCode
                            value={profile.tokenHash || 'QC-EVC-5948'}
                            size={160}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            level="H"
                            className="mx-auto block"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-mono font-bold text-[#38BDF8] break-all">
                            {profile.tokenHash || 'QC-EVC-5948'}
                          </div>
                          <div className="text-sm font-bold text-white">
                            {profile.fullName || 'Juan M. Dela Cruz'}
                          </div>
                          <div className="text-xs text-amber-400 font-mono font-bold">
                            {profile.totalHousehold || 4} Registered Household Pax
                          </div>
                        </div>

                        {passSavedNotice && (
                          <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-[11px] font-mono flex items-center justify-center gap-1.5 animate-fadeIn">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Evacuee Pass Saved to Photos / Wallet!</span>
                          </div>
                        )}

                        <button
                          onClick={handleSavePass}
                          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Save Pass to Photos / Apple Wallet</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeModule === 'routes' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="text-xs font-mono font-bold uppercase text-slate-400">
                        LIVE ROAD & EVACUATION CORRIDORS
                      </div>

                      <div className="space-y-2.5 font-mono text-xs">
                        <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">Regalado Highway</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                              Passable
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">
                            Clear traffic flow for light and heavy emergency response transports.
                          </p>
                        </div>

                        <div className="bg-[#111C30] border border-red-500/40 rounded-xl p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-red-200 text-xs">Bistekville 2 Creek Access</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 font-bold">
                              FLOODED - DO NOT CROSS
                            </span>
                          </div>
                          <p className="text-[11px] text-red-300 font-sans">
                            Overtopping Tullahan creek boundary (0.92m flash water). Use Dahlia alternate route.
                          </p>
                        </div>

                        <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">Commonwealth Sub-arterial</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 font-bold">
                              Congested
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">
                            BDRRMC traffic marshals on-site directing shuttle caravans.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'checklist' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400">
                        <span>SURVIVAL GO-BAG</span>
                        <span className="text-[#38BDF8]">{checkedCount} of {checklist.length} Packed</span>
                      </div>

                      <div className="bg-[#111C30] border border-[#1E293B] rounded-xl p-3.5 space-y-2">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleChecklist(item.id)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#0B1120] transition-colors cursor-pointer text-xs"
                          >
                            <div className={`p-0.5 rounded ${item.checked ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {item.checked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            </div>
                            <span className={`${item.checked ? 'text-slate-200 line-through opacity-80' : 'text-white font-medium'}`}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Quick Switch Tabs */}
                <div className="bg-[#111C30] p-2 border-t border-[#1E293B] grid grid-cols-4 gap-1 text-[10px] font-mono text-center">
                  <button
                    onClick={() => setActiveModule('qr_pass')}
                    className={`py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                      activeModule === 'qr_pass' ? 'bg-[#0B1120] text-[#F59E0B]' : 'text-slate-400'
                    }`}
                  >
                    QR Pass
                  </button>
                  <button
                    onClick={() => setActiveModule('shelters')}
                    className={`py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                      activeModule === 'shelters' ? 'bg-[#0B1120] text-[#F59E0B]' : 'text-slate-400'
                    }`}
                  >
                    Shelters
                  </button>
                  <button
                    onClick={() => setActiveModule('routes')}
                    className={`py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                      activeModule === 'routes' ? 'bg-[#0B1120] text-[#F59E0B]' : 'text-slate-400'
                    }`}
                  >
                    Roads
                  </button>
                  <button
                    onClick={() => setActiveModule('checklist')}
                    className={`py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                      activeModule === 'checklist' ? 'bg-[#0B1120] text-[#F59E0B]' : 'text-slate-400'
                    }`}
                  >
                    Go-Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
