import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Building,
  CheckCircle2,
  X
} from 'lucide-react';

interface BdrrmcLoginPortalProps {
  onLoginSuccess: (officer: { name: string; role: string; id: string }) => void;
}

export const BdrrmcLoginPortal: React.FC<BdrrmcLoginPortalProps> = ({ onLoginSuccess }) => {
  const [lguId, setLguId] = useState('bdrrmc-lead@fairview.quezoncity.gov.ph');
  const [password, setPassword] = useState('KyusiLigtas2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['8', '4', '2', '1', '9', '0']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals for secondary links
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRequestAccessModal, setShowRequestAccessModal] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting or typing multiple chars
      const chars = value.replace(/[^0-9]/g, '').slice(0, 6).split('');
      const newOtp = [...otpDigits];
      chars.forEach((c, i) => {
        if (i < 6) newOtp[i] = c;
      });
      setOtpDigits(newOtp);
      return;
    }

    const cleaned = value.replace(/[^0-9]/g, '');
    const newOtp = [...otpDigits];
    newOtp[index] = cleaned;
    setOtpDigits(newOtp);

    // Auto-focus next input
    if (cleaned && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleAutofillDemo = () => {
    setLguId('capt.mendoza@fairview.quezoncity.gov.ph');
    setPassword('Fairview-Tullahan-2026');
    setOtpDigits(['9', '1', '4', '8', '2', '0']);
    setErrorMessage(null);
  };

  const handleSecureLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!lguId.trim()) {
      setErrorMessage('Please enter your Barangay ID or Official LGU Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please provide your secure access password.');
      return;
    }
    if (otpDigits.some((d) => !d)) {
      setErrorMessage('Please enter the complete 6-digit GovPass 2FA token.');
      return;
    }

    setIsLoading(true);

    // Realistic cryptographic handshaking delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Hon. Roberto C. Mendoza',
        role: 'BDRRMC Incident Commander',
        id: 'QC-BDRRMC-FRVW-501',
      });
    }, 750);
  };

  return (
    <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4 font-mono">
      {/* Centered Clean Login Card in surface slate #1E293B against main #0F172A */}
      <div className="w-full max-w-lg bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-9 relative overflow-hidden">
        {/* Subtle decorative top security line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent" />

        {/* Security Badge: Authorized Government Personnel Only with warning amber (#F59E0B) icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-slate-700 shadow-sm text-[11px] font-bold uppercase tracking-[-0.02em] text-slate-200">
            <ShieldAlert className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <span>Authorized Government Personnel Only</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-1.5 mb-7">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase">
            <Building className="w-4 h-4 text-[#38BDF8]" />
            <span>Quezon City DRRMC · Gateway Authentication</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
            BDRRMC Command Access
          </h3>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Restricted portal for Barangay Captains, Incident Marshals, and QCDRRMO Duty Operations.
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSecureLogin} className="space-y-5">
          {/* Input 1: Barangay ID / Official LGU Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-300 flex items-center justify-between">
              <span>Barangay ID / Official LGU Email</span>
              <span className="text-[10px] text-slate-500 font-normal">e.g. @quezoncity.gov.ph</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={lguId}
                onChange={(e) => setLguId(e.target.value)}
                placeholder="officer.id@quezoncity.gov.ph"
                className="w-full bg-[#0F172A] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Input 2: Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-300 flex items-center justify-between">
              <span>Password</span>
              <span className="text-[10px] text-slate-500 font-normal">8+ chars, biometric/token bound</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0F172A] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication (2FA): 6-Digit OTP */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase">
              <span className="text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>GovPass 2FA Token (6-Digit OTP)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-normal">Active Sync (TOTP)</span>
            </div>

            {/* 6 Digit Inputs */}
            <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-full text-center py-2.5 sm:py-3 bg-[#0F172A] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-lg text-sm sm:text-base font-bold text-white outline-none transition-all"
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-sans">
              Enter the rolling 30-second token from your QC LGU Authenticator or SMS emergency hotline.
            </p>
          </div>

          {/* Primary Action Button: Utilizing Primary Accent Blue (#38BDF8) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] bg-[#38BDF8] hover:bg-sky-400 text-[#0F172A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-sky-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying HMAC Handshake...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Quick Autofill Helper */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Testing evaluation mode?</span>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="text-[#F59E0B] hover:underline font-bold cursor-pointer"
          >
            ⚡ Autofill Demo Credentials
          </button>
        </div>

        {/* Secondary Links: Forgot Credentials? and Request System Access */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Forgot Credentials?
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={() => setShowRequestAccessModal(true)}
            className="text-[#38BDF8] hover:underline font-bold cursor-pointer"
          >
            Request System Access
          </button>
        </div>

        {/* Security Compliance Note */}
        <div className="mt-5 text-center text-[10px] text-slate-500 font-sans">
          Protected under RA 10173 & QC Ordinance SP-3440, S-2024. All access attempts are cryptographically audited with timestamped SHA-256 signatures.
        </div>
      </div>

      {/* Forgot Credentials Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2 text-white font-bold uppercase text-xs">
                <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
                <span>Credential Recovery Protocol</span>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              For security compliance, BDRRMC command credentials cannot be reset via public internet email links.
            </p>
            <div className="bg-[#0F172A] p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-bold uppercase text-[10px]">QCDRRMC Helpdesk Verification:</div>
              <div className="text-white font-bold">Quezon City Hall High-Risk Dispatch</div>
              <div className="text-slate-400">Hotline: (02) 8988-4242 ext. 8104</div>
              <div className="text-[#38BDF8] text-[11px]">bdrrmc-support@quezoncity.gov.ph</div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase border border-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request System Access Modal */}
      {showRequestAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2 text-white font-bold uppercase text-xs">
                <Building className="w-4 h-4 text-[#38BDF8]" />
                <span>New Official Access Clearance</span>
              </div>
              <button
                onClick={() => {
                  setShowRequestAccessModal(false);
                  setAccessRequested(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {accessRequested ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white uppercase">Request Dispatched to City Hall</div>
                <p className="text-slate-300 font-sans">
                  Your Barangay LGU credentials will be vetted by the Quezon City Disaster Management Council within 2 business hours.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Designated Barangay Captains, Kagawads, and shelter supervisors may request Node-AI console access by submitting official LGU affiliation.
                </p>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      Full Name & Rank
                    </label>
                    <input
                      type="text"
                      defaultValue="Kagawad Maria Santos"
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      Target Barangay Jurisdiction
                    </label>
                    <select className="w-full bg-[#0F172A] border border-slate-700 rounded p-2 text-white text-xs">
                      <option>Barangay Fairview (District 5)</option>
                      <option>Barangay Batasan Hills (District 2)</option>
                      <option>Barangay Doña Imelda (District 4)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowRequestAccessModal(false)}
                    className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-slate-300 rounded text-xs font-bold uppercase border border-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setAccessRequested(true)}
                    className="px-4 py-1.5 bg-[#38BDF8] hover:bg-sky-400 text-[#0F172A] rounded text-xs font-bold uppercase cursor-pointer"
                  >
                    Submit Clearance Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
