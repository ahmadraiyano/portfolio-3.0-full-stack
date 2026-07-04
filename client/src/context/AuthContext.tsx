import { useEffect, useState, useCallback, type ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/config/firebase';
import { loginWithFirebaseToken, getCurrentAdmin } from '@/services/authService';
import type { AdminProfile } from '@/types';
import { AuthContext, type AuthContextValue } from './authContext.types';

const TOKEN_KEY = 'portfolio_admin_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Re-hydrate the session on refresh: if a backend JWT is stored, confirm
  // it's still valid before trusting the admin area.
  useEffect(() => {
    if (!auth) {
      // Firebase isn't configured yet — nothing to hydrate, just stop loading
      // so the public site (and a helpful message on /admin/login) can render.
      localStorage.removeItem(TOKEN_KEY);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (firebaseUser && storedToken) {
        try {
          const currentAdmin = await getCurrentAdmin();
          setAdmin(currentAdmin);
        } catch {
          localStorage.removeItem(TOKEN_KEY);
          setAdmin(null);
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setAdmin(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError('');
    if (!auth) {
      throw new Error(
        'Firebase is not configured yet. Add your Firebase credentials to client/.env — see the README.'
      );
    }
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await credential.user.getIdToken();
    const { token, admin: adminProfile } = await loginWithFirebaseToken(idToken);
    localStorage.setItem(TOKEN_KEY, token);
    setAdmin(adminProfile);
    return adminProfile;
  }, []);

  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  const value: AuthContextValue = {
    admin,
    isAuthenticated: Boolean(admin),
    loading,
    error,
    isFirebaseConfigured,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
