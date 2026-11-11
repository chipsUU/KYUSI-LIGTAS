/**
 * KYUSI-LIGTAS Firebase Authentication Service
 * 
 * ==============================================================================
 * FIREBASE CREDENTIALS CONFIGURATION:
 * 
 * To connect your live Firebase project:
 * 1. Go to Firebase Console (https://console.firebase.google.com/)
 * 2. Select or create your project: "KYUSI-LIGTAS-QCDRRMC"
 * 3. Go to Project Settings > General > Web Apps > Firebase SDK snippet > Config
 * 4. Enable Authentication > Sign-in method > Email/Password
 * 5. Enable Email Verification templates in Authentication > Templates
 * 6. Replace the placeholder values below with your project credentials:
 * ==============================================================================
 */

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

// <<< PASTE YOUR FIREBASE CREDENTIALS HERE >>>
export const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "AIzaSy_REPLACE_WITH_YOUR_FIREBASE_API_KEY",
  authDomain: "kyusi-ligtas-qcdrr.firebaseapp.com",
  projectId: "kyusi-ligtas-qcdrr",
  storageBucket: "kyusi-ligtas-qcdrr.appspot.com",
  messagingSenderId: "102938475610",
  appId: "1:102938475610:web:abcdef1234567890",
};

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: string;
  emailVerified: boolean;
}

// Detect if real Firebase credentials have been configured
const hasValidConfig = () => {
  return (
    FIREBASE_CONFIG.apiKey &&
    !FIREBASE_CONFIG.apiKey.includes("REPLACE_WITH_YOUR") &&
    FIREBASE_CONFIG.projectId &&
    !FIREBASE_CONFIG.projectId.includes("REPLACE_WITH_YOUR")
  );
};

// Simulated Local Auth Storage for Sandbox/Testing
const LOCAL_STORAGE_USERS_KEY = 'kyusi_auth_users_v1';
const LOCAL_STORAGE_SESSION_KEY = 'kyusi_auth_session_v1';

interface StoredUser {
  uid: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  emailVerified: boolean;
}

const getStoredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (!raw) {
      // Seed default accounts
      const defaultUsers: StoredUser[] = [
        {
          uid: 'qc-user-001',
          name: 'Capt. Roberto C. Mendoza',
          email: 'commander@gmail.com',
          passwordHash: 'password123',
          role: 'Barangay Incident Commander',
          emailVerified: true,
        },
        {
          uid: 'qc-user-002',
          name: 'Officer Jocelyn R. Villanueva',
          email: 'bdrrmc@gmail.com',
          passwordHash: 'password123',
          role: 'Shelter Registration Officer',
          emailVerified: false,
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save auth users:', e);
  }
};

export const getStoredSession = (): AppUser | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveStoredSession = (user: AppUser | null) => {
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to save session:', e);
  }
};

// --- AUTH LOGIC (Supports Live Firebase SDK and Seamless Evaluation Fallback) ---

export async function registerUser(
  fullName: string,
  email: string,
  role: string,
  password: string
): Promise<{ user: AppUser; requiresVerification: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();

  // If live Firebase credentials configured, use SDK
  if (hasValidConfig() && (window as any).FirebaseCDN) {
    try {
      const { initializeApp, getAuth, createUserWithEmailAndPassword, sendEmailVerification } = (window as any).FirebaseCDN;
      const app = initializeApp(FIREBASE_CONFIG);
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      
      // Immediately trigger verification email
      await sendEmailVerification(userCredential.user);

      const appUser: AppUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: fullName,
        role: role,
        emailVerified: userCredential.user.emailVerified,
      };

      saveStoredSession(appUser);
      return { user: appUser, requiresVerification: true };
    } catch (err: any) {
      console.warn('Firebase Live Auth Error, fallback engaged:', err);
      throw new Error(err.message || 'Firebase Registration Failed');
    }
  }

  // Simulated High-Fidelity Flow
  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An official account with this email already exists.');
  }

  const newUser: StoredUser = {
    uid: `qc-uid-${Date.now().toString(36)}`,
    name: fullName.trim(),
    email: normalizedEmail,
    passwordHash: password,
    role: role,
    emailVerified: false, // Default requires verification
  };

  users.push(newUser);
  saveStoredUsers(users);

  const appUser: AppUser = {
    uid: newUser.uid,
    email: newUser.email,
    displayName: newUser.name,
    role: newUser.role,
    emailVerified: false,
  };

  saveStoredSession(appUser);
  return { user: appUser, requiresVerification: true };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: AppUser; requiresVerification: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();

  // If live Firebase credentials configured, use SDK
  if (hasValidConfig() && (window as any).FirebaseCDN) {
    try {
      const { initializeApp, getAuth, signInWithEmailAndPassword } = (window as any).FirebaseCDN;
      const app = initializeApp(FIREBASE_CONFIG);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      
      const appUser: AppUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || normalizedEmail.split('@')[0],
        role: 'Barangay Incident Commander',
        emailVerified: userCredential.user.emailVerified,
      };

      saveStoredSession(appUser);
      return {
        user: appUser,
        requiresVerification: !userCredential.user.emailVerified,
      };
    } catch (err: any) {
      throw new Error(err.message || 'Firebase Sign-in Failed');
    }
  }

  // Simulated High-Fidelity Flow
  const users = getStoredUsers();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user || user.passwordHash !== password) {
    throw new Error('Invalid email or passcode. Please check credentials or register.');
  }

  const appUser: AppUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.name,
    role: user.role,
    emailVerified: user.emailVerified,
  };

  saveStoredSession(appUser);

  return {
    user: appUser,
    requiresVerification: !user.emailVerified,
  };
}

export async function resendVerificationEmail(email: string): Promise<boolean> {
  // If live Firebase SDK is active
  if (hasValidConfig() && (window as any).FirebaseCDN) {
    try {
      const { getAuth, sendEmailVerification } = (window as any).FirebaseCDN;
      const auth = getAuth();
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return true;
      }
    } catch (e) {
      console.warn('Failed to resend live verification:', e);
    }
  }

  // Simulated delay
  await new Promise((r) => setTimeout(r, 600));
  return true;
}

export async function checkEmailVerified(email: string): Promise<boolean> {
  // If live Firebase SDK is active
  if (hasValidConfig() && (window as any).FirebaseCDN) {
    try {
      const { getAuth } = (window as any).FirebaseCDN;
      const auth = getAuth();
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          const session = getStoredSession();
          if (session) {
            session.emailVerified = true;
            saveStoredSession(session);
          }
          return true;
        }
        return false;
      }
    } catch (e) {
      console.warn('Failed to check live verification:', e);
    }
  }

  // Simulated check: check local stored user
  const users = getStoredUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return !!user?.emailVerified;
}

export async function simulateUserVerified(email: string): Promise<AppUser | null> {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].emailVerified = true;
    saveStoredUsers(users);

    const appUser: AppUser = {
      uid: users[index].uid,
      email: users[index].email,
      displayName: users[index].name,
      role: users[index].role,
      emailVerified: true,
    };
    saveStoredSession(appUser);
    return appUser;
  }
  return null;
}

export async function logoutUser(): Promise<void> {
  if (hasValidConfig() && (window as any).FirebaseCDN) {
    try {
      const { getAuth, signOut } = (window as any).FirebaseCDN;
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  }
  saveStoredSession(null);
}
