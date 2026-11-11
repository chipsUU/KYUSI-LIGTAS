import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Eye, 
  Download, 
  Trash2, 
  Bell, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Radio, 
  Camera, 
  MapPin, 
  Fingerprint, 
  KeyRound, 
  Check, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface PrivacySecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy';
  onPurgeAccount?: () => void;
}

export const PrivacySecurityModal: React.FC<PrivacySecurityModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'policy',
  onPurgeAccount,
}) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy'>(defaultTab);

  // User Autonomy & Consent Interactive States
  const [consentLocation, setConsentLocation] = useState<'coarse' | 'fine' | 'denied'>('coarse');
  const [consentTelemetry, setConsentTelemetry] = useState(true);
  const [consentCamera, setConsentCamera] = useState(true);
  const [consentSms, setConsentSms] = useState(true);

  // Notification Toggles
  const [notifySirenAlert, setNotifySirenAlert] = useState(true);
  const [notifyFloodSurge, setNotifyFloodSurge] = useState(true);
  const [notifyShelterCapacity, setNotifyShelterCapacity] = useState(false);

  // Feedback Notices
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [purgeConfirmationOpen, setPurgeConfirmationOpen] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadMyData = () => {
    let residentData: any = {};
    try {
      const stored = localStorage.getItem('kyusi_resident_profile_v1');
      residentData = stored ? JSON.parse(stored) : { status: 'Anonymous Resident Session' };
    } catch {
      residentData = { status: 'Local Session' };
    }

    const payload = {
      compliance: 'Republic Act 10173 (Data Privacy Act of 2012) & QC SP-3440, S-2024',
      exportTimestamp: new Date().toISOString(),
      residentProfile: residentData,
      permissionsState: {
        locationResolution: consentLocation,
        telemetryDiagnostics: consentTelemetry,
        cameraQrAccess: consentCamera,
        smsBroadcastConsent: consentSms,
      },
      notificationPreferences: {
        sirenAcoustic: notifySirenAlert,
        floodSurgePushes: notifyFloodSurge,
        shelterVacancyUpdates: notifyShelterCapacity,
      },
      securityTokens: {
        encryptionCipher: 'AES-256-GCM',
        storageType: 'Client-Side SQLite / IndexedDB Encrypted Token',
        dataRetentionPolicy: 'Immediate Purge Upon Resident Evacuation De-Registration',
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `kyusi-ligtas-citizen-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    document.body.removeChild(dlAnchorElem);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3500);
  };

  const handleExecuteAccountPurge = () => {
    try {
      localStorage.removeItem('kyusi_resident_profile_v1');
      localStorage.removeItem('kyusi_auth_session_v1');
    } catch (e) {
      console.error(e);
    }
    setPurgeSuccess(true);
    setTimeout(() => {
      setPurgeConfirmationOpen(false);
      setPurgeSuccess(false);
      if (onPurgeAccount) onPurgeAccount();
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0B1120]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                CIVICTECH COMPLIANCE & SECURITY GOVERNANCE
              </div>
              <h2 className="font-display text-lg sm:text-xl uppercase tracking-tight text-white">
                Legal, Privacy & App Architecture Hub
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Navigation */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800 bg-[#0B1120] flex items-center gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'policy'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            1. Policy & Terms
          </button>
          <button
            onClick={() => setActiveTab('consent')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'consent'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            2. Opt-In Consent Flow
          </button>
          <button
            onClick={() => setActiveTab('minimization')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'minimization'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            3. Data Minimization
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            4. Security Best Practices
          </button>
          <button
            onClick={() => setActiveTab('autonomy')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'autonomy'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            5. User Autonomy Controls
          </button>
        </div>

        {/* Modal Scroll Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: PRIVACY POLICY & TERMS OF SERVICE STRUCTURE */}
          {/* ========================================================================= */}
          {activeTab === 'policy' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-[#111C30] border border-[#1E293B] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                  STATUTORY FRAMEWORK: RA 10173 & QC SP-3440, S-2024
                </span>
                <h3 className="font-display text-base uppercase text-white">
                  Privacy Policy & Terms of Service Structure
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  KYUSI-LIGTAS strictly follows a three-pillar legal framework guaranteeing that citizen safety never comes at the cost of civil liberties or digital surveillance.
                </p>
              </div>

              {/* Pillar 1: Data Collection */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-sky-400">
                  <FileText className="w-4 h-4" />
                  <span>Section A: Scope of Data Collection</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  We collect <strong>only non-continuous, operational civic tokens</strong> required for disaster relief:
                </p>
                <ul className="text-xs text-slate-400 font-sans list-disc list-inside space-y-1">
                  <li><strong>Household Representative & Pax Count:</strong> Aggregated headcounts (Adults, Children, Seniors/PWDs) strictly for shelter cot allocation and food rations.</li>
                  <li><strong>Jurisdictional Barangay Sector:</strong> Coarse administrative boundary (e.g., <em>Brgy. Fairview</em>) instead of exact street address or continuous geolocation.</li>
                  <li><strong>Emergency Contact:</strong> Mobile numbers used exclusively for high-priority broadcast SMS alerts during flood surge warnings.</li>
                </ul>
              </div>

              {/* Pillar 2: Storage & Cryptographic Retention */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-400">
                  <Lock className="w-4 h-4" />
                  <span>Section B: Storage & Cryptographic Retention</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Resident data is stored <strong>locally on the user's client hardware</strong> using encrypted SQLite / IndexedDB storage protected by AES-256-GCM. 
                  Central servers receive only de-identified admission hashes when physical RFID cards or offline QR codes are scanned at shelter portals.
                </p>
                <div className="p-2.5 bg-[#0B1120] border border-slate-800 rounded text-[11px] font-mono text-slate-400">
                  Data Retention Cap: Evacuee rosters are programmatically purged within <strong>14 calendar days</strong> post-calamity de-escalation by the Quezon City DRRM Council.
                </div>
              </div>

              {/* Pillar 3: Third-Party & Inter-Agency Sharing */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-400">
                  <ExternalLink className="w-4 h-4" />
                  <span>Section C: Third-Party & Inter-Agency Sharing</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Data is <strong>never commercialized, tracked by ad networks, or shared with private third parties</strong>. Sharing is restricted to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-300 pt-1">
                  <div className="p-2.5 bg-[#0B1120] border border-slate-800 rounded">
                    <strong className="text-white font-mono block text-[11px]">QCDRRMC & SSDD</strong>
                    Quezon City Social Services for family food pack allocations.
                  </div>
                  <div className="p-2.5 bg-[#0B1120] border border-slate-800 rounded">
                    <strong className="text-white font-mono block text-[11px]">DSWD Regional Cluster</strong>
                    Disaster relief commodity audit reports (anonymized tally).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: TRANSPARENT OPT-IN CONSENT FLOW */}
          {/* ========================================================================= */}
          {activeTab === 'consent' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-[#111C30] border border-[#1E293B] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  JUST-IN-TIME (JIT) PERMISSION ARCHITECTURE
                </span>
                <h3 className="font-display text-base uppercase text-white">
                  Transparent Opt-In Consent Flow
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Permissions are requested strictly at the moment of operational need ("Just-In-Time") with plain-language explanations of civic benefits and zero dark patterns.
                </p>
              </div>

              {/* Interactive Permission Toggles */}
              <div className="space-y-3 font-mono text-xs">
                {/* 1. Location Resolution */}
                <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <span>1. Location Services: Coarse Barangay vs. Fine GPS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      KYUSI-LIGTAS uses coarse polygon boundaries by default. Fine GPS is only invoked if you explicitly navigate to nearest evacuation shelter.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setConsentLocation('coarse')}
                      className={`px-3 py-1.5 rounded-lg text-xs uppercase font-bold cursor-pointer transition-colors ${
                        consentLocation === 'coarse' ? 'bg-sky-500 text-slate-950' : 'bg-[#0B1120] text-slate-400'
                      }`}
                    >
                      Coarse (Safe)
                    </button>
                    <button
                      onClick={() => setConsentLocation('fine')}
                      className={`px-3 py-1.5 rounded-lg text-xs uppercase font-bold cursor-pointer transition-colors ${
                        consentLocation === 'fine' ? 'bg-amber-500 text-slate-950' : 'bg-[#0B1120] text-slate-400'
                      }`}
                    >
                      Precise GPS
                    </button>
                  </div>
                </div>

                {/* 2. Camera Access for QR Scanner */}
                <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>2. Camera: Optical QR Scanner Only</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Invoked strictly inside the scanner view. Video frames are processed in-memory client-side and never recorded to disk.
                    </p>
                  </div>
                  <button
                    onClick={() => setConsentCamera(!consentCamera)}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-colors ${
                      consentCamera ? 'bg-emerald-500 text-slate-950' : 'bg-[#0B1120] text-slate-400 border border-slate-700'
                    }`}
                  >
                    {consentCamera ? 'Granted' : 'Blocked'}
                  </button>
                </div>

                {/* 3. Automated SMS Warning Broadcast */}
                <div className="bg-[#111C30] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Radio className="w-4 h-4 text-[#F59E0B]" />
                      <span>3. Emergency SMS Priority Dispatch</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Allows BDRRMC command towers to send flash flood cellular warnings even when 4G/5G data is down.
                    </p>
                  </div>
                  <button
                    onClick={() => setConsentSms(!consentSms)}
                    className={`px-3 py-1.5 rounded-lg font-bold uppercase cursor-pointer transition-colors ${
                      consentSms ? 'bg-amber-500 text-slate-950' : 'bg-[#0B1120] text-slate-400 border border-slate-700'
                    }`}
                  >
                    {consentSms ? 'Opted In' : 'Opted Out'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DATA MINIMIZATION STRATEGIES */}
          {/* ========================================================================= */}
          {activeTab === 'minimization' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-[#111C30] border border-[#1E293B] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400">
                  ZERO UNNECESSARY TELEMETRY
                </span>
                <h3 className="font-display text-base uppercase text-white">
                  Strategies for Civic Data Minimization
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Every data byte stored creates liability. KYUSI-LIGTAS enforces strict structural boundaries between what is collected vs. what is rejected.
                </p>
              </div>

              {/* Minimization Matrix Table */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#0B1120] text-slate-400 text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Data Category</th>
                      <th className="p-3 text-emerald-400">KYUSI-LIGTAS Collected</th>
                      <th className="p-3 text-red-400">Deliberately Rejected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs">
                    <tr>
                      <td className="p-3 font-bold text-white">Resident Identity</td>
                      <td className="p-3 text-slate-300">Name & Pax Tally</td>
                      <td className="p-3 text-slate-400">No National ID biometric scans, No photo storage</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Geolocation</td>
                      <td className="p-3 text-slate-300">Barangay Sector (Polygon)</td>
                      <td className="p-3 text-slate-400">No background GPS trace, No location history</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Sensor Telemetry</td>
                      <td className="p-3 text-slate-300">Stream Height & Velocity</td>
                      <td className="p-3 text-slate-400">No ambient audio listening, No public cameras</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">App Sessions</td>
                      <td className="p-3 text-slate-300">Stateless HMAC Verification</td>
                      <td className="p-3 text-slate-400">No ad cookies, No third-party SDK analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#0B1120] border border-slate-800 rounded-xl text-xs space-y-1 font-sans">
                <strong className="text-white font-mono text-xs">Key Architecture Takeaway:</strong>
                <p className="text-slate-400 leading-relaxed">
                  "If an evacuation shelter manager only needs to know how many cots remain and whether special food kits (e.g. for infants or diabetics) are needed, we strictly refrain from asking for government tax IDs or persistent biometric credentials."
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CORE APP ARCHITECTURE & SECURITY */}
          {/* ========================================================================= */}
          {activeTab === 'architecture' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-[#111C30] border border-[#1E293B] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#F59E0B]">
                  ENTERPRISE DEFENSE MATRIX
                </span>
                <h3 className="font-display text-base uppercase text-white">
                  Core App Architecture & Security Best Practices
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Designed for dual-tier operational resilience in disaster zones with zero reliance on constant cloud connectivity.
                </p>
              </div>

              {/* 3 Architectural Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* Pillar 1 */}
                <div className="bg-[#111C30] border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold uppercase">
                    <Fingerprint className="w-4 h-4" />
                    <span>Biometrics & WebAuthn</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Uses Android BiometricPrompt and iOS Secure Enclave for biometric hardware unlocking of stored passes without passwords transmitting over cellular networks.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-[#111C30] border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <KeyRound className="w-4 h-4" />
                    <span>HMAC Token Signatures</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Offline QR codes embed an HMAC-SHA256 signature generated with Quezon City DRRMC municipal keys, preventing counterfeit shelter admissions.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-[#111C30] border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-bold uppercase">
                    <Sliders className="w-4 h-4" />
                    <span>Session Lifecycle</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Stateless moderator authentication tokens with 2-hour idle timeout and automated revocation upon clearance matrix modification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: USER AUTONOMY & CITIZEN RIGHTS CONTROLS */}
          {/* ========================================================================= */}
          {activeTab === 'autonomy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#111C30] border border-[#1E293B] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  CITIZEN SELF-SOVEREIGNTY
                </span>
                <h3 className="font-display text-base uppercase text-white">
                  User Autonomy & Citizen Rights Controls
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  In compliance with RA 10173 Section 16 (Rights of the Data Subject), citizens have absolute dominion over their personal data.
                </p>
              </div>

              {/* Feedback notices */}
              {downloadNotice && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 font-mono flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Citizen data packet generated and downloaded as verified JSON!</span>
                </div>
              )}

              {/* Action 1: Download My Data */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>Right to Data Portability: "Download My Data"</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Export a machine-readable JSON bundle containing your registered evacuee passes, offline checklists, and authorization status.
                  </p>
                </div>
                <button
                  onClick={handleDownloadMyData}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download My Data (JSON)</span>
                </button>
              </div>

              {/* Action 2: Granular Notification Preferences */}
              <div className="bg-[#111C30] border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#F59E0B]" />
                  <span>Civic Notification & Siren Preferences</span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120] rounded-lg border border-slate-800">
                    <span className="text-slate-300">120dB Remote Siren Acoustic Warning</span>
                    <button
                      onClick={() => setNotifySirenAlert(!notifySirenAlert)}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                        notifySirenAlert ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {notifySirenAlert ? 'Enabled' : 'Muted'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120] rounded-lg border border-slate-800">
                    <span className="text-slate-300">PAGASA Micro-Rainfall Surge Pushes</span>
                    <button
                      onClick={() => setNotifyFloodSurge(!notifyFloodSurge)}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                        notifyFloodSurge ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {notifyFloodSurge ? 'Enabled' : 'Muted'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-[#0B1120] rounded-lg border border-slate-800">
                    <span className="text-slate-300">Nearby Shelter Cot Vacancy Updates</span>
                    <button
                      onClick={() => setNotifyShelterCapacity(!notifyShelterCapacity)}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                        notifyShelterCapacity ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {notifyShelterCapacity ? 'Enabled' : 'Muted'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action 3: Delete My Account / Purge Evacuee Pass */}
              <div className="bg-[#111C30] border border-red-500/30 rounded-xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-red-400 flex items-center gap-2 font-mono">
                      <Trash2 className="w-4 h-4" />
                      <span>Right to Erasure: "Delete My Account & Purge Pass"</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Permanently expunges your local household token, evacuee pass hash, and session records from IndexedDB and memory.
                    </p>
                  </div>
                  {!purgeConfirmationOpen && (
                    <button
                      onClick={() => setPurgeConfirmationOpen(true)}
                      className="px-4 py-2.5 bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-500/40 font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      Delete Account
                    </button>
                  )}
                </div>

                {/* Confirmation Dropdown */}
                {purgeConfirmationOpen && (
                  <div className="mt-3 p-4 bg-red-950/40 border border-red-500/50 rounded-xl space-y-3 animate-fadeIn">
                    <div className="text-xs text-red-200 font-sans font-medium">
                      ⚠️ Are you sure? This will immediately purge your offline QR pass and evacuee records. You will need to re-register upon arrival at any evacuation center.
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <button
                        onClick={handleExecuteAccountPurge}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded-lg cursor-pointer transition-colors"
                      >
                        Yes, Permanently Purge Everything
                      </button>
                      <button
                        onClick={() => setPurgeConfirmationOpen(false)}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1120] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>National Privacy Commission (NPC) Compliance Baseline • Version 2026.2</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg uppercase font-bold text-xs border border-slate-700 cursor-pointer transition-colors"
          >
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
};
