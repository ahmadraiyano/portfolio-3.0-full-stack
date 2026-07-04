import { createContext } from 'react';
import type { AdminProfile } from '@/types';

export interface AuthContextValue {
  admin: AdminProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  isFirebaseConfigured: boolean;
  login: (email: string, password: string) => Promise<AdminProfile>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
