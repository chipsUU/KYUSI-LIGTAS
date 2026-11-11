import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Laptop, 
  QrCode, 
  MapPin, 
  CheckSquare, 
  Square, 
  Navigation,
  Volume2,
  Lock,
  ShieldCheck,
  CloudRain,
  Building
} from 'lucide-react';
import { INITIAL_SHELTERS, INITIAL_CHECKLIST } from '../data/mockData';
import { ChecklistItem } from '../types';
import { BdrrmcLoginPortal } from './BdrrmcLoginPortal';
import { WeatherForecastModal } from './WeatherForecastModal';
import { ShelterStatusModal } from './ShelterStatusModal';
import QRCode from 'react-qr-code';

interface AppWalkthroughProps {
  isSimulatedAlert: boolean;
  onToggleSimulateAlert: () => void;
  externalAuthenticated?: boolean;
  externalOfficer?: { name: string; role: string; id: string } | null;
  onExternalLogout?: () => void;
  defaultTab?: 'resident' | 'bdrrmc';
}

export const AppWalkthrough: React.FC<AppWalkthroughProps> = ({
  isSimulatedAlert,
  onToggleSimulateAlert,
  externalAuthenticated = false,
  externalOfficer = null,
  onExternalLogout,
  defaultTab = 'resident',
}) => {
  const [activeTab, setActiveTab] = useState<'resident' | 'bdrrmc'>(defaultTab);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [activeMobileScreen, setActiveMobileScreen] = useState<'qr_pass' | 'shelters' | 'routes' | 'checklist'>('qr_pass');
  const [sirenArmed, setSirenArmed] = useState<boolean>(true);
  const [burstSent, setBurstSent] = useState<boolean>(false);

  // Gatekeeper Login State for Tab 2
  const [isBdrrmcAuthenticated, setIsBdrrmcAuthenticated] = useState<boolean>(externalAuthenticated);
  const [officerProfile, setOfficerProfile] = useState<{ name: string; role: string; id: string } | null>(externalOfficer);
  const [showWeatherModal, setShowWeatherModal] = useState<boolean>(false);
  const [showShelterModal, setShowShelterModal] = useState<boolean>(false);

  useEffect(() => {
    if (externalAuthenticated) {
      setIsBdrrmcAuthenticated(true);
      setActiveTab('bdrrmc');
      if (externalOfficer) {
        setOfficerProfile(externalOfficer);
      }
    }
  }, [externalAuthenticated, externalOfficer]);

  const handleLoginSuccess = (officer: { name: string; role: string; id: string }) => {
    setOfficerProfile(officer);
    setIsBdrrmcAuthenticated(true);
  };

  const handleLogout = () => {
    setIsBdrrmcAuthenticated(false);
    setOfficerProfile(null);
    if (onExternalLogout) {
      onExternalLogout();
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleManualSirenBurst = () => {
    setBurstSent(true);
    setTimeout(() => setBurstSent(false), 2500);
  };

  return (
    <section id="the-app" className="py-16 md:py-24 bg-[#0F172A] text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase bg-[#1E293B] text-slate-300 px-3 py-1 border border-slate-700 rounded-md mb-3">
            <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Interactive Application Showcase</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.04em] leading-[0.88] text-white [text-wrap:balance]">
            Dual-Tier Interface in Action
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-normal font-sans">
            Switch between the citizen-facing Android application and the command-level web operations console 
            designed for barangay risk reduction officers.
          </p>

          {/* Main Tab Switcher */}
          <div className="mt-8 inline-flex p-1 bg-[#1E293B] border border-slate-700 rounded-xl shadow-lg font-mono">
            <button
              onClick={() => setActiveTab('resident')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] transition-all flex items-center gap-2 cursor-pointer rounded-lg ${
                activeTab === 'resident'
                  ? 'bg-[#0F172A] text-[#F59E0B] shadow-sm border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Resident Mobile View</span>
            </button>
            <button
              onClick={() => setActiveTab('bdrrmc')}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] transition-all flex items-center gap-2 cursor-pointer rounded-lg ${
                activeTab === 'bdrrmc'
                  ? 'bg-[#0F172A] text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Barangay (BDRRMC) Dashboard</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Resident Mobile View */}
        {activeTab === 'resident' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Mobile Navigation sub-tabs */}
            <div className="lg:col-span-4 space-y-4 font-mono">
              <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-5 shadow-lg">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pb-2 border-b border-slate-700">
                  Resident App Modules
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveMobileScreen('qr_pass')}
                    className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                      activeMobileScreen === 'qr_pass'
                        ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50 shadow-md'
                        : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-4 h-4" />
                      <span>Digital Evacuee QR Pass</span>
                    </div>
                    <span className="text-[10px] bg-[#0F172A] text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">Offline</span>
                  </button>

                  <button
                    onClick={() => setActiveMobileScreen('shelters')}
                    className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                      activeMobileScreen === 'shelters'
                        ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50 shadow-md'
                        : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4" />
                      <span>Shelters & Capacity</span>
                    </div>
                    <span className="text-[10px] bg-[#0F172A] text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">Live</span>
                  </button>

                  <button
                    onClick={() => setActiveMobileScreen('routes')}
                    className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                      activeMobileScreen === 'routes'
                        ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50 shadow-md'
                        : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4" />
                      <span>Road Accessibility Alerts</span>
                    </div>
                    <span className="text-[10px] bg-[#0F172A] text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">Hazard</span>
                  </button>

                  <button
                    onClick={() => setActiveMobileScreen('checklist')}
                    className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold uppercase flex items-center justify-between cursor-pointer transition-all ${
                      activeMobileScreen === 'checklist'
                        ? 'bg-[#0F172A] text-[#F59E0B] border-amber-500/50 shadow-md'
                        : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4" />
                      <span>72-Hour Go-Bag Checklist</span>
                    </div>
                    <span className="text-[10px] bg-[#0F172A] text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">
                      {checklist.filter((i) => i.checked).length}/{checklist.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Research highlight */}
              <div className="bg-[#1E293B] text-slate-300 border border-slate-700 rounded-xl p-4 text-xs font-sans font-medium leading-relaxed shadow-md">
                <strong className="text-[#F59E0B] font-bold font-mono uppercase block mb-1">Local Encrypted Tokens:</strong> 
                Even if cellular towers fail during a typhoon storm surge, 
                the resident's QR pass and offline checklist remain 100% accessible via local SQLite / IndexedDB encryption.
              </div>
            </div>

            {/* Right: Interactive Phone Preview (lg:col-span-8) */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="w-full max-w-[380px] bg-[#1E293B] border border-slate-700 rounded-[38px] p-4 shadow-2xl relative">
                {/* Mobile Camera notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-full flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                </div>

                <div className="bg-[#0F172A] rounded-[28px] overflow-hidden pt-8 pb-5 px-4 border border-slate-800 min-h-[580px] flex flex-col justify-between text-slate-100 font-mono">
                  {/* Phone Header */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold uppercase">
                      <div className="flex items-center gap-2">
                        <span className="font-display tracking-tight text-sm text-white">KYUSI-LIGTAS</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">
                          v1.4.2
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Brgy. Fairview</span>
                    </div>

                    {/* Active Warning Banner */}
                    <div className={`p-3 rounded-lg border my-3 text-xs ${
                      isSimulatedAlert 
                        ? 'bg-amber-950/40 text-[#F59E0B] border-amber-500/50' 
                        : 'bg-[#1E293B] text-slate-200 border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between font-bold uppercase">
                        <span>{isSimulatedAlert ? 'MANDATORY EVACUATION' : 'PREEMPTIVE ADVISORY'}</span>
                        <span className="text-[10px]">Sector 3</span>
                      </div>
                      <div className="text-[11px] font-sans font-normal text-slate-300 mt-1">
                        {isSimulatedAlert 
                          ? 'Water level 2.84m. Evacuate via Dahlia Ave immediately.' 
                          : 'Upstream surge expected in 35 mins. Prepare go-bags.'}
                      </div>
                    </div>

                    {/* SCREEN 1: Digital Evacuee QR Pass */}
                    {activeMobileScreen === 'qr_pass' && (
                      <div className="space-y-4">
                        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 text-center space-y-3">
                          <div className="text-xs font-bold uppercase tracking-tight text-slate-400">
                            Barangay Evacuee Pass
                          </div>
                          <div className="p-3 bg-white inline-block rounded-xl border border-slate-300 shadow-sm">
                            <QRCode
                              value="QC-EVC-8821"
                              size={150}
                              bgColor="#FFFFFF"
                              fgColor="#000000"
                              level="H"
                              className="mx-auto block"
                            />
                          </div>
                          <div>
                            <div className="font-display text-base tracking-tight uppercase text-white">Maria Elena Santos</div>
                            <div className="text-xs text-slate-400 font-sans font-medium">Head of Household · 4 Members</div>
                            <div className="text-[11px] font-bold bg-[#0F172A] text-[#F59E0B] inline-block px-2 py-0.5 mt-1 rounded border border-slate-700">
                              UID: QC-EVC-8821
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#1E293B] text-slate-200 p-3 rounded-xl border border-slate-700 text-xs space-y-1.5 font-bold">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Assigned:</span>
                            <span className="text-[#F59E0B]">Fairview HS Gym</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Cot:</span>
                            <span className="text-white">Room 204, Cot B-12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Special Needs:</span>
                            <span className="text-slate-300">Senior (72yo), Infant (8mo)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 2: Evacuation Centers & Capacity */}
                    {activeMobileScreen === 'shelters' && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase text-slate-400 mb-1">
                          Nearby Centers
                        </div>
                        {INITIAL_SHELTERS.map((s) => {
                          const pct = Math.round((s.currentCount / s.capacity) * 100);
                          return (
                            <div key={s.id} className="bg-[#1E293B] border border-slate-700 rounded-lg p-3 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-bold text-xs uppercase text-white">{s.name}</div>
                                  <div className="text-[10px] text-slate-400 font-sans">{s.barangay} · {s.distanceMeters}m ({s.walkMinutes}m walk)</div>
                                </div>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0F172A] text-[#F59E0B] border border-slate-700">
                                  {pct}% Full
                                </span>
                              </div>

                              <div className="w-full bg-slate-900 rounded-full border border-slate-700/80 h-2 overflow-hidden">
                                <div
                                  className="h-full bg-[#F59E0B]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>

                              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-700/80">
                                {s.petFriendly && <span className="text-slate-300">✓ Pets</span>}
                                {s.pwdAccessible && <span className="text-slate-300">✓ PWD Ramp</span>}
                                {s.medicalTeamPresent && <span className="text-slate-300">✓ Medic</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* SCREEN 3: Road Accessibility Alerts */}
                    {activeMobileScreen === 'routes' && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase text-slate-400 mb-1">
                          Flood Inundation & Passability
                        </div>

                        <div className="p-3 bg-red-950/40 text-red-200 border border-red-500/40 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-red-400">
                            <span>Commonwealth Underpass</span>
                            <span className="bg-red-900 text-white px-1 rounded text-[10px]">IMPASSABLE</span>
                          </div>
                          <div className="text-[11px] text-slate-300 font-sans">
                            Water depth: 1.1m. Closed to light vehicles.
                          </div>
                        </div>

                        <div className="p-3 bg-[#1E293B] border border-slate-700 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-white">
                            <span>Dahlia Avenue (+14m Elev)</span>
                            <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1 rounded text-[10px]">CLEAR</span>
                          </div>
                          <div className="text-[11px] text-slate-300 font-sans">
                            Primary pedestrian corridor to Gym.
                          </div>
                        </div>

                        <div className="p-3 bg-[#1E293B] border border-slate-700 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-white">
                            <span>Regalado Highway Extension</span>
                            <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 px-1 rounded text-[10px]">SLOW</span>
                          </div>
                          <div className="text-[11px] text-slate-300 font-sans">
                            Gutter-deep puddles; marshals on-site.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCREEN 4: Offline 72-Hour Go-Bag Checklist */}
                    {activeMobileScreen === 'checklist' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase mb-1">
                          <span className="text-slate-300">Emergency Go-Bag</span>
                          <span className="bg-[#1E293B] text-[#F59E0B] border border-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                            {checklist.filter((i) => i.checked).length}/{checklist.length} Packed
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                          {checklist.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => toggleChecklistItem(item.id)}
                              className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 cursor-pointer transition-colors ${
                                item.checked
                                  ? 'bg-[#1E293B] text-slate-400 border-slate-700'
                                  : 'bg-[#0F172A] text-slate-200 border-slate-800'
                              }`}
                            >
                              <div className="mt-0.5">
                                {item.checked ? (
                                  <CheckSquare className="w-4 h-4 text-[#F59E0B]" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500" />
                                )}
                              </div>
                              <span className={`text-[11px] font-sans ${item.checked ? 'line-through opacity-70' : 'text-slate-200'}`}>
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Footer Navigation */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-4 gap-1 text-center text-[10px] font-bold uppercase">
                    <button
                      onClick={() => setActiveMobileScreen('qr_pass')}
                      className={`p-1.5 rounded cursor-pointer ${activeMobileScreen === 'qr_pass' ? 'bg-[#1E293B] text-[#F59E0B]' : 'text-slate-400 hover:text-white'}`}
                    >
                      QR Pass
                    </button>
                    <button
                      onClick={() => setActiveMobileScreen('shelters')}
                      className={`p-1.5 rounded cursor-pointer ${activeMobileScreen === 'shelters' ? 'bg-[#1E293B] text-[#F59E0B]' : 'text-slate-400 hover:text-white'}`}
                    >
                      Shelters
                    </button>
                    <button
                      onClick={() => setActiveMobileScreen('routes')}
                      className={`p-1.5 rounded cursor-pointer ${activeMobileScreen === 'routes' ? 'bg-[#1E293B] text-[#F59E0B]' : 'text-slate-400 hover:text-white'}`}
                    >
                      Routes
                    </button>
                    <button
                      onClick={() => setActiveMobileScreen('checklist')}
                      className={`p-1.5 rounded cursor-pointer ${activeMobileScreen === 'checklist' ? 'bg-[#1E293B] text-[#F59E0B]' : 'text-slate-400 hover:text-white'}`}
                    >
                      Go-Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Barangay Disaster Committee (BDRRMC) Dashboard (Gated by Login Portal) */}
        {activeTab === 'bdrrmc' && (
          !isBdrrmcAuthenticated ? (
            <BdrrmcLoginPortal onLoginSuccess={handleLoginSuccess} />
          ) : (
            <div className="bg-[#1E293B] text-slate-100 border border-slate-700 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 font-mono animate-fadeIn">
              {/* Authenticated Officer Session Status Bar */}
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-700/80 gap-3 text-xs bg-[#0F172A] -mx-2 -mt-2 sm:-mx-4 sm:-mt-4 p-3 rounded-lg border border-slate-800">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400">Authenticated Clearance:</span>
                  <span className="text-white font-bold">{officerProfile?.name || 'Hon. Roberto C. Mendoza'}</span>
                  <span className="text-slate-400 font-sans">({officerProfile?.role || 'BDRRMC Incident Commander'})</span>
                  <span className="text-[10px] bg-[#1E293B] text-[#38BDF8] border border-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                    {officerProfile?.id || 'QC-BDRRMC-FRVW-501'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-300 hover:text-red-400 flex items-center gap-1.5 cursor-pointer uppercase font-bold py-1 px-2.5 rounded bg-[#1E293B] border border-slate-700 hover:border-red-500/40 transition-colors"
                  title="Lock console and return to login portal"
                >
                  <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Lock Console / Sign Out</span>
                </button>
              </div>

              {/* Top Bar of the Console */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-700 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse" />
                  <h3 className="font-display text-xl sm:text-2xl text-white uppercase tracking-tight">
                    BDRRMC Incident Management Command Console
                  </h3>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Quezon City District 5 · Fairview Operations Hub · Node-AI Sensor Grid
                </div>
              </div>

              {/* Siren Manual Override & Alert Toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSirenArmed(!sirenArmed)}
                  className={`px-3 py-2 border rounded-lg text-xs font-bold uppercase cursor-pointer transition-colors ${
                    sirenArmed 
                      ? 'bg-[#0F172A] text-emerald-400 border-emerald-500/40' 
                      : 'bg-[#0F172A] text-slate-500 border-slate-800'
                  }`}
                >
                  Siren: {sirenArmed ? 'ARMED (AUTO)' : 'DISARMED'}
                </button>

                <button
                  onClick={handleManualSirenBurst}
                  disabled={burstSent}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase text-[#0F172A] bg-[#F59E0B] hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{burstSent ? '10s Burst Sent!' : 'Manual 10s Horn Burst'}</span>
                </button>

                <button
                  onClick={onToggleSimulateAlert}
                  className="px-4 py-2 border border-slate-700 rounded-lg text-xs font-bold uppercase text-slate-200 bg-[#0F172A] hover:bg-slate-800 cursor-pointer"
                >
                  {isSimulatedAlert ? 'Reset Safe State' : 'Trigger Stage 3'}
                </button>
              </div>
            </div>

            {/* Interactive Dashboard Cards: Weather & Rainfall Forecast & Evacuation Shelter Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div
                onClick={() => setShowWeatherModal(true)}
                className="bg-[#0F172A] border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition-all duration-200 cursor-pointer hover:bg-slate-900 group flex flex-col justify-between space-y-3"
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-105 transition-transform">
                      <CloudRain className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">PAGASA RADAR FEED</div>
                      <h4 className="font-display text-sm uppercase text-white group-hover:text-sky-300">
                        Weather & Rainfall Forecast
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-[#F59E0B] border border-amber-500/30 uppercase font-bold">
                    Yellow Alert
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs py-1 border-y border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rainfall Rate</span>
                    <strong className="text-white">28.4 mm/h</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">3h Peak</span>
                    <strong className="text-sky-300">31.2 mm/h</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Basin Vector</span>
                    <strong className="text-slate-200">SW 32 km/h</strong>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-sans truncate">Tullahan catchment convective cells active.</span>
                  <span className="text-[#F59E0B] font-bold shrink-0">Open Radar →</span>
                </div>
              </div>

              <div
                onClick={() => setShowShelterModal(true)}
                className="bg-[#0F172A] border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition-all duration-200 cursor-pointer hover:bg-slate-900 group flex flex-col justify-between space-y-3"
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">RFID / QR HEADCOUNT</div>
                      <h4 className="font-display text-sm uppercase text-white group-hover:text-emerald-300">
                        Evacuation Shelter Status
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 uppercase font-bold">
                    3 Hubs
                  </span>
                </div>
                <div className="space-y-1.5 py-1 border-y border-slate-800">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300">Fairview HS Gym (92%)</span>
                    <span className="text-white font-bold">184 / 200</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[92%]" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-sans truncate">587 Evacuees · 163 Remaining Cots.</span>
                  <span className="text-emerald-400 font-bold shrink-0">View Hubs →</span>
                </div>
              </div>
            </div>

            {/* Grid of Command Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Module 1: Live Field Nodes Health */}
              <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Field Hydrology Stations</span>
                  <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[10px]">3 / 3 Online</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-[#1E293B] rounded-lg border border-slate-700">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>Node-T01 (Fairview Bridge)</span>
                      <span className="text-[#F59E0B]">1.42m</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Flow: 1.25 m/s</span>
                      <span className="text-emerald-400">Clear Drain</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1E293B] rounded-lg border border-slate-700">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>Node-T02 (Batasan Creek)</span>
                      <span className="text-[#F59E0B]">1.68m</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Flow: 1.82 m/s</span>
                      <span className="text-amber-300">Advisory</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1E293B] rounded-lg border border-slate-700">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>Node-T03 (Doña Imelda Weir)</span>
                      <span className="text-[#F59E0B]">1.10m</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                      <span>Flow: 0.95 m/s</span>
                      <span className="text-emerald-400">Safe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2: Shelter Occupancy by Classroom Zone */}
              <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Fairview HS Gym Zones</span>
                  <span className="bg-[#1E293B] text-[#F59E0B] border border-slate-700 px-1.5 py-0.5 rounded text-[10px]">246/300</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 font-bold mb-1">
                      <span>Zone A: Bleachers</span>
                      <span>80 / 80 (Full)</span>
                    </div>
                    <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-bold mb-1">
                      <span>Zone B: Classrooms 101-106</span>
                      <span>92 / 120 (76%)</span>
                    </div>
                    <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#F59E0B] h-full w-[76%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-bold mb-1">
                      <span>Zone C: Classrooms 201-206</span>
                      <span>74 / 100 (74%)</span>
                    </div>
                    <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[74%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                  <span>Overflow Hub:</span>
                  <span className="text-white font-bold">Batasan National HS Ready</span>
                </div>
              </div>

              {/* Module 3: Relief Pack Inventory & Distribution Audit */}
              <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>SSDD Relief Goods Ledger</span>
                  <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[10px]">Audited</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-[#1E293B] p-2.5 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">Family Food Packs (FFP)</div>
                      <div className="text-[10px] text-slate-400 font-sans">6kg rice, canned goods</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#F59E0B] font-black">142 Claimed</div>
                      <div className="text-[10px] text-slate-400">358 Stock</div>
                    </div>
                  </div>

                  <div className="bg-[#1E293B] p-2.5 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">Hygiene Kits</div>
                      <div className="text-[10px] text-slate-400 font-sans">Soap, toothbrush, sanitaries</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-black">142 Claimed</div>
                      <div className="text-[10px] text-slate-400">200 Stock</div>
                    </div>
                  </div>

                  <div className="bg-[#1E293B] p-2.5 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">Modular Sleeping Cots</div>
                      <div className="text-[10px] text-slate-400 font-sans">Foldable canvas beds</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-black">246 Issued</div>
                      <div className="text-[10px] text-slate-400">54 Stock</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
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
    </section>
  );
};
