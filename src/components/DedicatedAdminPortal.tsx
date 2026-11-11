import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Building, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Sparkles,
  MailCheck,
  Send
} from 'lucide-react';

interface DedicatedAdminPortalProps {
  onBackToPublic: () => void;
  onAuthenticate: (officer: { role: string; id: string; name: string }) => void;
}

export const DedicatedAdminPortal: React.FC<DedicatedAdminPortalProps> = ({
  onBackToPublic,
  onAuthenticate,
}) => {
  const [role, setRole] = useState('Barangay Incident Commander');
  const [email, setEmail] = useState('commander@gmail.com');
  const [passcode, setPasscode] = useState('QuezonCity-Tullahan-2026!');
  const [showPasscode, setShowPasscode] = useState(false);
  
  // Two-Factor Authentication (2FA): Magic Link Verification Block State
  const [magicLinkSent, setMagicLinkSent] = useState(true);
  const [magicLinkVerified, setMagicLinkVerified] = useState(true);
  const [isSendingLink, setIsSendingLink] = useState(false);
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modal for accreditation request
  const [showAccreditationModal, setShowAccreditationModal] = useState(false);
  const [accreditationSubmitted, setAccreditationSubmitted] = useState(false);

  const handleSendMagicLink = () => {
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid official email address first.');
      return;
    }
    setErrorMsg(null);
    setIsSendingLink(true);

    setTimeout(() => {
      setIsSendingLink(false);
      setMagicLinkSent(true);
      setMagicLinkVerified(false);
    }, 600);
  };

  const handleSimulateVerifyLink = () => {
    setMagicLinkVerified(true);
    setErrorMsg(null);
  };

  const handleAutofillDemo = () => {
    setRole('Barangay Incident Commander');
    setEmail('commander@gmail.com');
    setPasscode('QC-CivilDefense-2026');
    setMagicLinkSent(true);
    setMagicLinkVerified(true);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid official email address (e.g., commander@gmail.com).');
      return;
    }
    if (!passcode.trim()) {
      setErrorMsg('Please enter your passcode / security token.');
      return;
    }

    // Auto-verify magic link if not manually clicked yet for friction-free simulation
    if (!magicLinkVerified) {
      setMagicLinkVerified(true);
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthenticate({
        role,
        id: email,
        name: role === 'Barangay Incident Commander' 
          ? 'Capt. Roberto C. Mendoza' 
          : role === 'Shelter Registration Officer'
          ? 'Officer Jocelyn R. Villanueva'
          : 'Director Danilo G. Soriano',
      });
    }, 800);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-mono text-slate-100 select-none">
      {/* Subtle Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Atmospheric Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top-Left: "← Back to Public Site" Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToPublic}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold uppercase tracking-tight transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Public Site</span>
        </button>
      </div>

      {/* Top-Right System Status Ticker */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>QCDRRMC Secure Gateway: Online (TLS 1.3)</span>
      </div>

      {/* Centered High-Security Card bordered in #334155 */}
      <div className="relative z-10 w-full max-w-xl bg-[#0F172A]/95 border border-[#334155] rounded-2xl shadow-2xl p-6 sm:p-9 backdrop-blur-xl my-10">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold uppercase tracking-[-0.02em] text-slate-200">
            <Building className="w-3.5 h-3.5 text-amber-500" />
            <span>QCDRRMC / BDRRMC Official Gateway</span>
          </div>

          <span className="text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
            RESTRICTED LGU TIER
          </span>
        </div>

        {/* Title & Subtext */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
            KYUSI-LIGTAS Command & Moderator Gateway
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-md mx-auto italic">
            "Restricted system for accredited Barangay Marshals, Shelter Managers, and LGU Incident Commanders."
          </p>
        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Field 1: Role Select Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-300 block">
              Operational Role Clearance
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1E293B] border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all font-mono cursor-pointer"
              >
                <option value="Barangay Incident Commander">
                  Barangay Incident Commander
                </option>
                <option value="Shelter Registration Officer">
                  Shelter Registration Officer
                </option>
                <option value="QCDRRMC Central Monitor">
                  QCDRRMC Central Monitor
                </option>
              </select>
            </div>
          </div>

          {/* Field 2: Official LGU Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-300 block">
              LGU / BDRRMC Official Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., commander@gmail.com"
                className="w-full bg-[#1E293B] border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
            </div>
            {/* Helper Text in a muted color */}
            <p className="text-[11px] text-slate-400 font-sans">
              Format: name@gmail.com or bdrrmc@gmail.com
            </p>
          </div>

          {/* Field 3: Passcode / Security Token */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-300 flex items-center justify-between">
              <span>Passcode / Security Token</span>
              <span className="text-[10px] text-slate-500 font-normal">Encrypted Passphrase</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1E293B] border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Field 4: Two-Factor Authentication (2FA) - Magic Link Verification Block */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Two-Factor Authentication (2FA)</span>
              </span>
              <span className={`text-[10px] font-normal px-2 py-0.5 rounded border ${
                magicLinkVerified 
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' 
                  : magicLinkSent 
                  ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {magicLinkVerified ? 'Token Verified' : magicLinkSent ? 'Link Dispatched' : 'Magic Link Ready'}
              </span>
            </div>

            {/* Magic Link Container Block */}
            <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-3.5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#0F172A] border border-slate-700 text-sky-400 shrink-0 mt-0.5">
                  <MailCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white uppercase tracking-tight">
                    Magic Link Authentication
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-0.5">
                    {magicLinkVerified ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        Cryptographic session signature verified for {email || 'commander@gmail.com'}.
                      </span>
                    ) : magicLinkSent ? (
                      <span>
                        Secure single-use authorization token sent to <strong className="text-slate-200">{email || 'commander@gmail.com'}</strong>. Valid for 10 minutes.
                      </span>
                    ) : (
                      <span>
                        Request a zero-friction, cryptographic login link sent directly to your registered LGU inbox.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Magic Link Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/60">
                {!magicLinkSent ? (
                  <button
                    type="button"
                    onClick={handleSendMagicLink}
                    disabled={isSendingLink}
                    className="text-xs font-bold uppercase py-1.5 px-3 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingLink ? (
                      <>
                        <div className="w-3 h-3 border-2 border-sky-300 border-t-transparent rounded-full animate-spin" />
                        <span>Dispatching Link...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Magic Link to Email</span>
                      </>
                    )}
                  </button>
                ) : !magicLinkVerified ? (
                  <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                    <button
                      type="button"
                      onClick={handleSimulateVerifyLink}
                      className="text-xs font-bold uppercase py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Simulate Link Confirmation</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSendMagicLink}
                      className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Resend Link
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full text-[11px]">
                    <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 2FA Clearance Confirmed
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMagicLinkVerified(false);
                        setMagicLinkSent(false);
                      }}
                      className="text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Reset Token
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-[-0.02em] bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-sky-400/20 disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Clearance Matrix...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter Command Station</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Autofill Helper for Evaluators */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Testing evaluator?</span>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="text-amber-500 hover:underline font-bold cursor-pointer"
          >
            ⚡ Autofill Credentials
          </button>
        </div>

        {/* Request Access Link */}
        <div className="mt-5 pt-3 border-t border-slate-800 text-center text-xs">
          <button
            type="button"
            onClick={() => setShowAccreditationModal(true)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            Need moderator clearance?{' '}
            <span className="text-amber-500 group-hover:underline font-bold">
              Submit Barangay Accreditation Request.
            </span>
          </button>
        </div>

        {/* Legal & Security Safeguard Footer */}
        <div className="mt-5 text-center text-[10px] text-slate-500 font-sans">
          Unauthorized entry is prohibited under RA 10175 (Cybercrime Prevention Act) & QC Ordinance No. SP-3440, S-2024.
        </div>
      </div>

      {/* Accreditation Request Modal */}
      {showAccreditationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2 text-white font-bold uppercase text-xs">
                <Building className="w-4 h-4 text-amber-500" />
                <span>Barangay Accreditation Request</span>
              </div>
              <button
                onClick={() => {
                  setShowAccreditationModal(false);
                  setAccreditationSubmitted(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {accreditationSubmitted ? (
              <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white uppercase">Accreditation Dispatched</div>
                <p className="text-slate-300 font-sans">
                  Your credentials have been submitted to the Quezon City Disaster Management Council. Vetting takes 2 hours.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Accredited personnel may request credentials by providing official Barangay ID or appointment certificate.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Officer Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Kagawad Edgardo P. Santos"
                      className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Barangay Jurisdictional District
                    </label>
                    <select className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-2.5 text-white">
                      <option>District 5 - Barangay Fairview</option>
                      <option>District 2 - Barangay Batasan Hills</option>
                      <option>District 4 - Barangay Doña Imelda</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="edgardo.santos@gmail.com"
                      className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowAccreditationModal(false)}
                    className="px-3.5 py-2 bg-[#0F172A] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold uppercase border border-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setAccreditationSubmitted(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold uppercase cursor-pointer"
                  >
                    Submit Accreditation
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
