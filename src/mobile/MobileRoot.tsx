import React, { useState, useEffect } from 'react';
import { ResidentAuth, ResidentProfile } from '../components/ResidentAuth';
import { ResidentMobileApp } from '../components/ResidentMobileApp';
import { PrivacySecurityModal } from '../components/PrivacySecurityModal';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

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

const RESIDENT_STORAGE_KEY = 'kyusi_resident_profile_v1';

export const MobileRoot: React.FC = () => {
  const [profile, setProfile] = useState<ResidentProfile | null>(() => {
    try {
      const raw = localStorage.getItem(RESIDENT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [currentScreen, setCurrentScreen] = useState<'auth' | 'app'>(() => {
    try {
      const raw = localStorage.getItem(RESIDENT_STORAGE_KEY);
      return raw ? 'app' : 'auth';
    } catch {
      return 'auth';
    }
  });

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<
    'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy'
  >('policy');

  // Initialize native status bar and hide splash screen
  useEffect(() => {
    const initNativeFeatures = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#0F172A' });
      } catch (e) {
        // Not running on a native device (e.g. desktop preview)
      }
      try {
        await SplashScreen.hide();
      } catch (e) {
        // Not on native device
      }
    };
    initNativeFeatures();
  }, []);

  // Hardware Back button handling on Android
  useEffect(() => {
    let backListener: any = null;

    const setupBackHandler = async () => {
      try {
        backListener = await CapApp.addListener('backButton', ({ canGoBack }) => {
          if (isPrivacyModalOpen) {
            setIsPrivacyModalOpen(false);
          } else if (currentScreen === 'app') {
            // Stay in app or confirm exit; on root screen we exit app
            CapApp.exitApp();
          } else {
            CapApp.exitApp();
          }
        });
      } catch (e) {
        // Not running in Capacitor environment
      }
    };

    setupBackHandler();

    return () => {
      if (backListener && typeof backListener.remove === 'function') {
        backListener.remove();
      }
    };
  }, [currentScreen, isPrivacyModalOpen]);

  const handleEnterResidentApp = (newProfile: ResidentProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(RESIDENT_STORAGE_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Could not persist resident profile', e);
    }
    setCurrentScreen('app');
  };

  const handleSignOut = () => {
    setProfile(null);
    try {
      localStorage.removeItem(RESIDENT_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear resident profile', e);
    }
    setCurrentScreen('auth');
  };

  const handleReturnToAuth = () => {
    setCurrentScreen('auth');
  };

  const handleOpenPrivacyModal = (
    tab?: 'policy' | 'consent' | 'minimization' | 'architecture' | 'autonomy'
  ) => {
    if (tab) setPrivacyModalTab(tab);
    setIsPrivacyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans select-none">
      {currentScreen === 'auth' ? (
        <ResidentAuth
          onEnterResidentApp={handleEnterResidentApp}
          onBackToPublic={handleReturnToAuth}
          onOpenPrivacyModal={handleOpenPrivacyModal}
        />
      ) : (
        <ResidentMobileApp
          profile={profile || DEFAULT_RESIDENT}
          onSignOut={handleSignOut}
          onBackToPublic={handleReturnToAuth}
          onOpenPrivacyModal={handleOpenPrivacyModal}
        />
      )}

      {/* RA 10173 Privacy & Data Governance Modal */}
      <PrivacySecurityModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        defaultTab={privacyModalTab}
      />
    </div>
  );
};
export default MobileRoot;
