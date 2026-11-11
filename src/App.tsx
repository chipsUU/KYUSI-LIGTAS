import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkewedMarqueeSection } from './components/SkewedMarqueeSection';
import { DarkShowcaseSection } from './components/DarkShowcaseSection';
import { PredictiveEngine } from './components/PredictiveEngine';
import { TelemetryHardware } from './components/TelemetryHardware';
import { AlertDissemination } from './components/AlertDissemination';
import { ShelterScanner } from './components/ShelterScanner';
import { CentralGovernanceSync } from './components/CentralGovernanceSync';
import { AppWalkthrough } from './components/AppWalkthrough';
import { ImpactMetrics } from './components/ImpactMetrics';
import { Footer } from './components/Footer';
import { TechnicalSpecsModal } from './components/TechnicalSpecsModal';
import { DownloadApkModal } from './components/DownloadApkModal';
import { FloatingBottomBar } from './components/FloatingBottomBar';
import { AuthPortal } from './components/AuthPortal';
import { ModeratorDashboard } from './components/ModeratorDashboard';
import { ResidentAuth, ResidentProfile } from './components/ResidentAuth';
import { ResidentMobileApp } from './components/ResidentMobileApp';
import { PrivacySecurityModal } from './components/PrivacySecurityModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { getStoredSession, logoutUser, AppUser, subscribeToAuthChanges } from './services/supabase';
import { Radio, X } from 'lucide-react';

export type AppView = 
  | 'public-landing' 
  | 'auth-portal' 
  | 'moderator-dashboard' 
  | 'resident-auth' 
  | 'resident-app';

const DEFAULT_RESIDENT: ResidentProfile = {
  fullName: 'Juan M. Dela Cruz',
  barangay: 'Brgy. Fairview',
  contact: '+63 917 555 4921',
  adults: 2,
  children: 2,
  specialSectors: 1,
  totalHousehold: 5,
  passcode: '2026',
  tokenHash: 'QC-EVC-5948',
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('public-landing');
  const [currentUser, setCurrentUser] = useState<AppUser | null>(getStoredSession());

  // Resident Profile state with local storage persistence
  const [residentProfile, setResidentProfile] = useState<ResidentProfile | null>(() => {
    try {
      const raw = localStorage.getItem('kyusi_resident_profile_v1');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isSimulatedAlert, setIsSimulatedAlert] = useState<boolean>(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [showSimBanner, setShowSimBanner] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy'>('policy');

  const openPrivacyModal = (tab?: 'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy') => {
    if (tab) setPrivacyModalTab(tab);
    setIsPrivacyModalOpen(true);
  };

  // Sync hash routing if user changes url or reloads
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      if (
        hash === 'auth-portal' || 
        hash === 'moderator-dashboard' || 
        hash === 'public-landing' ||
        hash === 'resident-auth' ||
        hash === 'resident-app'
      ) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to Supabase Auth state changes (e.g. when user clicks real email verification link)
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setCurrentUser(user);
        if (user.emailVerified) {
          setCurrentView('moderator-dashboard');
          window.location.hash = 'moderator-dashboard';
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view;
  };

  const toggleSimulateAlert = () => {
    const nextState = !isSimulatedAlert;
    setIsSimulatedAlert(nextState);
    setShowSimBanner(nextState);
  };

  const scrollToAppDemo = () => {
    const el = document.getElementById('the-app');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    navigateToView('moderator-dashboard');
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    navigateToView('public-landing');
  };

  const handleResidentOnboardingComplete = (profile: ResidentProfile) => {
    setResidentProfile(profile);
    try {
      localStorage.setItem('kyusi_resident_profile_v1', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
    navigateToView('resident-app');
  };

  const handleResidentSignOut = () => {
    setResidentProfile(null);
    try {
      localStorage.removeItem('kyusi_resident_profile_v1');
    } catch (e) {
      console.error(e);
    }
    navigateToView('resident-auth');
  };

  // =========================================================================
  // VIEW: RESIDENT AUTH / ONBOARDING PORTAL (`resident-auth`)
  // =========================================================================
  if (currentView === 'resident-auth') {
    return (
      <>
        <ResidentAuth
          onBackToPublic={() => navigateToView('public-landing')}
          onEnterResidentApp={handleResidentOnboardingComplete}
          onOpenPrivacyModal={() => openPrivacyModal('policy')}
        />
        <PrivacySecurityModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          defaultTab={privacyModalTab}
          onPurgeAccount={() => {
            setResidentProfile(null);
            navigateToView('public-landing');
          }}
        />
      </>
    );
  }

  // =========================================================================
  // VIEW: RESIDENT MOBILE APP VIEW (`resident-app`)
  // =========================================================================
  if (currentView === 'resident-app') {
    return (
      <>
        <ResidentMobileApp
          profile={residentProfile || DEFAULT_RESIDENT}
          onSignOut={handleResidentSignOut}
          onBackToPublic={() => navigateToView('public-landing')}
          onOpenPrivacyModal={openPrivacyModal}
        />
        <PrivacySecurityModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          defaultTab={privacyModalTab}
          onPurgeAccount={() => {
            setResidentProfile(null);
            navigateToView('public-landing');
          }}
        />
      </>
    );
  }

  // =========================================================================
  // VIEW B: AUTH PORTAL (Moderator Sign In / Sign Up / Verification Pending)
  // =========================================================================
  if (currentView === 'auth-portal') {
    return (
      <AuthPortal
        onBackToPublic={() => navigateToView('public-landing')}
        onLoginSuccess={handleAuthSuccess}
      />
    );
  }

  // =========================================================================
  // VIEW C: MODERATOR DASHBOARD (Full Dedicated Administrative Command Console)
  // =========================================================================
  if (currentView === 'moderator-dashboard') {
    return (
      <ModeratorDashboard
        user={currentUser || {
          uid: 'qc-guest-mod',
          email: 'commander@gmail.com',
          displayName: 'Capt. Roberto C. Mendoza',
          role: 'Barangay Incident Commander',
          emailVerified: true,
        }}
        onSignOut={handleSignOut}
        onViewPublicSite={() => navigateToView('public-landing')}
      />
    );
  }

  // =========================================================================
  // VIEW A: PUBLIC LANDING (Civic Marketing & Technology Showcase Website)
  // =========================================================================
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0F172A] text-slate-100 flex flex-col font-sans selection:bg-[#F59E0B] selection:text-[#0F172A] relative">
      {/* Simulation Banner when emergency alert is engaged */}
      {isSimulatedAlert && showSimBanner && (
        <div className="bg-[#1E293B] text-[#F59E0B] px-4 py-3 text-xs font-mono font-bold uppercase tracking-[-0.02em] flex items-center justify-between z-50 sticky top-0 border-b border-amber-500/40 shadow-lg">
          <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
            <Radio className="w-4 h-4 shrink-0 text-[#F59E0B] animate-ping" />
            <span>
              <strong className="text-white">EMERGENCY SIMULATION ACTIVE:</strong> Upstream surge crest at Tullahan River (2.84m). 
              Remote 120dB sirens armed, SMS dispatch triggered, and Stage 3 mandatory evacuation protocols engaged.
            </span>
          </div>
          <button
            onClick={() => setShowSimBanner(false)}
            className="p-1 border border-amber-500/40 hover:bg-[#F59E0B] hover:text-[#0F172A] rounded transition-colors shrink-0 ml-2 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Fixed Navigation Bar with Resident Portal Trigger */}
      <Navbar
        isSimulatedAlert={isSimulatedAlert}
        onToggleSimulateAlert={toggleSimulateAlert}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
        onOpenResidentPortal={() => navigateToView('resident-auth')}
      />

      {/* Main Content Sections */}
      <main className={`flex-1 ${isSimulatedAlert && showSimBanner ? 'pt-28' : 'pt-16'}`}>
        {/* Section B: Hero Section with Fullscreen Headline & Metadata */}
        <Hero
          isSimulatedAlert={isSimulatedAlert}
          onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
          onScrollToDemo={scrollToAppDemo}
          onOpenResidentPortal={() => navigateToView('resident-auth')}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />

        {/* Full-width Skewed Marquee Section (-2deg, Background #0F172A / #1E293B) */}
        <SkewedMarqueeSection />

        {/* Dark Architecture Directory Section with 7vw Titles & Hover 45-deg Arrows */}
        <DarkShowcaseSection />

        {/* Section C.1: 30- to 60-Minute AI Predictive Flood Engine */}
        <PredictiveEngine />

        {/* Section C.2: Node-AI Field Telemetry Hardware Hub */}
        <TelemetryHardware />

        {/* Section C.3: Multi-Channel Automated Alert Dissemination */}
        <AlertDissemination
          isSimulatedAlert={isSimulatedAlert}
          onTriggerAlert={() => setIsSimulatedAlert(true)}
        />

        {/* Section C.4: Contactless RFID/QR Shelter Headcount & Relief Management */}
        <ShelterScanner />

        {/* Section C.5: Centralized QC iRISE-UP & Governance Integration */}
        <CentralGovernanceSync />

        {/* Section D: Interactive App Walkthrough (Tabbed UI Showcase) */}
        <AppWalkthrough
          isSimulatedAlert={isSimulatedAlert}
          onToggleSimulateAlert={toggleSimulateAlert}
          externalAuthenticated={!!currentUser?.emailVerified}
          externalOfficer={currentUser ? {
            name: currentUser.displayName || currentUser.email || 'Officer',
            role: currentUser.role,
            id: currentUser.email || 'QC-BDRRMC-FRVW',
          } : null}
          onExternalLogout={handleSignOut}
          defaultTab={currentUser?.emailVerified ? 'bdrrmc' : 'resident'}
        />

        {/* Section E: Impact & Performance Metrics Grid */}
        <ImpactMetrics />
      </main>

      {/* Section F: Centered 14vw CTA & Footer */}
      <Footer
        onOpenSpecsModal={() => setIsSpecsModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenPrivacyModal={openPrivacyModal}
      />

      {/* Persistent Floating Bottom Dock */}
      <FloatingBottomBar 
        onOpenAdminPortal={() => {
          if (currentUser?.emailVerified) {
            navigateToView('moderator-dashboard');
          } else {
            navigateToView('auth-portal');
          }
        }} 
      />

      {/* Modals */}
      <TechnicalSpecsModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />

      <DownloadApkModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <PrivacySecurityModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        defaultTab={privacyModalTab}
        onPurgeAccount={() => {
          setResidentProfile(null);
          navigateToView('public-landing');
        }}
      />

      {/* Offline Connectivity Notification */}
      <OfflineIndicator />
    </div>
  );
}
