'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getAuthClient } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
  error: null,
  clearError: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authInstance = getAuthClient();
    // Check for redirect result on page load
    getRedirectResult(authInstance).catch(() => {});

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const clearError = () => setError(null);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(getAuthClient(), provider);
      console.log('Google sign-in success:', result.user.email);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      const message = err instanceof Error ? err.message : 'Google prisijungimo klaida';
      console.error('Google sign-in error:', code, message);
      if (code === 'auth/popup-closed-by-user') return;
      if (code === 'auth/cancelled-popup-request') return;
      setError(`Klaida (${code}): ${message}`);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(getAuthClient(), email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Prisijungimo klaida';
      if (message.includes('invalid-credential') || message.includes('wrong-password')) {
        setError('Neteisingas el. paštas arba slaptažodis');
      } else if (message.includes('user-not-found')) {
        setError('Vartotojas nerastas. Užsiregistruokite.');
      } else if (message.includes('too-many-requests')) {
        setError('Per daug bandymų. Pabandykite vėliau.');
      } else {
        setError(message);
      }
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(getAuthClient(), email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registracijos klaida';
      if (message.includes('email-already-in-use')) {
        setError('Šis el. paštas jau užregistruotas');
      } else if (message.includes('weak-password')) {
        setError('Slaptažodis per trumpas (min. 6 simboliai)');
      } else if (message.includes('invalid-email')) {
        setError('Neteisingas el. pašto formatas');
      } else {
        setError(message);
      }
    }
  };

  const signOut = async () => {
    await firebaseSignOut(getAuthClient());
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
