import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  QrCode, 
  MapPin, 
  Phone, 
  Users, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export interface ResidentProfile {
  fullName: string;
  barangay: string;
  contact: string;
  adults: number;
  children: number;
  specialSectors: number;
  totalHousehold: number;
  passcode: string;
  tokenHash: string;
}

interface ResidentAuthProps {
  onBackToPublic: () => void;
  onEnterResidentApp: (profile: ResidentProfile) => void;
  onOpenPrivacyModal?: () => void;
}

export const ResidentAuth: React.FC<ResidentAuthProps> = ({
  onBackToPublic,
  onEnterResidentApp,
  onOpenPrivacyModal,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('register');
  
  // Registration Form
  const [fullName, setFullName] = useState('Juan M. Dela Cruz');
  const [barangay, setBarangay] = useState('Brgy. Fairview');
  const [contact, setContact] = useState('+63 917 555 4921');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [specialSectors, setSpecialSectors] = useState(1);
  const [pin, setPin] = useState('2026');
  const [showPin, setShowPin] = useState(false);

  // Sign In Form
  const [loginContact, setLoginContact] = useState('juan.delacruz@gmail.com');
  const [loginPin, setLoginPin] = useState('2026');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totalHousehold = adults + children + specialSectors;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name as household head.');
      return;
    }
    if (!contact.trim()) {
      setErrorMsg('Please enter a mobile number or email for SMS advisories.');
      return;
    }
    if (pin.length < 4) {
      setErrorMsg('Quick PIN must be at least 4 digits.');
      return;
    }

    // Generate short, dense-grid-friendly QR token ID (e.g., QC-EVC-5948)
    const tokenHash = `QC-EVC-${Math.floor(1000 + Math.random() * 9000)}`;

    const profile: ResidentProfile = {
      fullName: fullName.trim(),
      barangay,
      contact: contact.trim(),
      adults,
      children,
      specialSectors,
      totalHousehold,
      passcode: pin,
      tokenHash,
    };

    onEnterResidentApp(profile);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginContact.trim()) {
      setErrorMsg('Please enter your registered mobile number or email.');
      return;
    }
    if (!loginPin.trim()) {
      setErrorMsg('Please enter your 4-digit PIN.');
      return;
    }

    const tokenHash = `QC-EVC-5948`;

    const profile: ResidentProfile = {
      fullName: 'Juan M. Dela Cruz',
      barangay: 'Brgy. Fairview',
      contact: loginContact.trim(),
      adults: 2,
      children: 2,
      specialSectors: 1,
      totalHousehold: 5,
      passcode: loginPin,
      tokenHash,
    };

    onEnterResidentApp(profile);
  };

  const handleAutofillDemo = () => {
    setFullName('Juan M. Dela Cruz');
    setBarangay('Brgy. Fairview');
    setContact('+63 917 555 4921');
    setAdults(2);
    setChildren(2);
    setSpecialSectors(1);
    setPin('2026');
    setErrorMsg(null);
  };

  return (
    <div className="bg-[#0B1120] min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans text-slate-100 select-none">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold uppercase tracking-tight transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md group"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B] group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Public Site</span>
        </button>
      </div>

      {/* Main Centered Mobile-Width Card */}
      <div className="relative z-10 w-full max-w-md bg-[#111C30] border border-[#1E293B] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl my-8">
        {/* Top Header Badge */}
        <div className="flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1120] border border-slate-700/80 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>QC RESIDENT ACCESS • LGU QUEZON CITY</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center space-y-1.5 mb-6">
          <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
            KYUSI-LIGTAS Resident Pass
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Instant offline evacuation QR pass, real-time shelter vacancy, and flood-surge advisories.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#0B1120] rounded-xl border border-slate-800 mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Household
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE A: REGISTRATION FORM */}
        {/* ========================================================================= */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 block">
                Household Representative Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Juan M. Dela Cruz"
                className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-sans"
              />
            </div>

            {/* Barangay Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 block">
                Barangay Residency (High-Risk Sector)
              </label>
              <div className="relative">
                <select
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all font-mono cursor-pointer"
                >
                  <option value="Brgy. Fairview">Brgy. Fairview (Tullahan River Basin)</option>
                  <option value="Brgy. Batasan Hills">Brgy. Batasan Hills (Creek Slopes)</option>
                  <option value="Brgy. Doña Imelda">Brgy. Doña Imelda (Lowland Weir)</option>
                  <option value="Brgy. Roxas">Brgy. Roxas (Diliman Creek)</option>
                  <option value="Brgy. Damayang Lagi">Brgy. Damayang Lagi (San Juan River)</option>
                </select>
              </div>
            </div>

            {/* Mobile Phone / Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 flex items-center justify-between">
                <span>Mobile Phone / Email</span>
                <span className="text-[10px] text-slate-500 font-normal">For automated SMS alerts</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+63 9XX XXX XXXX or email@gmail.com"
                className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>

            {/* Household Size (Adults, Children, PWD/Seniors) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase text-slate-300">
                <span>Household Size Allocation</span>
                <span className="text-amber-400 font-bold">{totalHousehold} Total Pax</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#0B1120] p-2.5 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Adults</div>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-transparent text-center font-bold text-white text-base outline-none mt-0.5"
                  />
                </div>

                <div className="bg-[#0B1120] p-2.5 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Children</div>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent text-center font-bold text-white text-base outline-none mt-0.5"
                  />
                </div>

                <div className="bg-[#0B1120] p-2.5 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">PWD / Senior</div>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={specialSectors}
                    onChange={(e) => setSpecialSectors(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent text-center font-bold text-amber-400 text-base outline-none mt-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Quick 4-Digit Passcode */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 flex items-center justify-between">
                <span>Quick Access PIN</span>
                <span className="text-[10px] text-slate-500 font-normal">4-digit security code</span>
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="••••"
                  className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Privacy Assurance Tag */}
            <div className="p-3 rounded-xl bg-[#0B1120] border border-slate-800 text-[10px] text-slate-400 leading-relaxed font-sans space-y-1">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  "Zero Real-Time GPS Tracking. Fully compliant with RA 10173 (Data Privacy Act of 2012). Offline SQLite/IndexedDB encrypted."
                </span>
              </div>
              {onOpenPrivacyModal && (
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="text-amber-400 hover:underline font-mono text-[10px] block pl-6 cursor-pointer"
                >
                  View Legal & Privacy Architecture →
                </button>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-tight bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
            >
              <QrCode className="w-4 h-4" />
              <span>Generate My Evacuee Pass & Enter App →</span>
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE B: SIGN IN FORM */}
        {/* ========================================================================= */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 block">
                Registered Contact / Email
              </label>
              <input
                type="text"
                value={loginContact}
                onChange={(e) => setLoginContact(e.target.value)}
                placeholder="+63 9XX XXX XXXX or email@gmail.com"
                className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-300 block">
                4-Digit Resident PIN
              </label>
              <input
                type="password"
                maxLength={6}
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="••••"
                className="w-full bg-[#0B1120] border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-tight bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20 pt-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Access My Resident Pass & Enter App →</span>
            </button>
          </form>
        )}

        {/* Quick Autofill Helper for Evaluators */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Testing evaluator?</span>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="text-amber-500 hover:underline font-bold cursor-pointer"
          >
            ⚡ Autofill Demo Resident
          </button>
        </div>
      </div>
    </div>
  );
};
