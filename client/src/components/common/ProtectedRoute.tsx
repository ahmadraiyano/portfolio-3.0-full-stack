import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Loader from './Loader';

/** Wraps /admin pages — bounces unauthenticated visitors to the login form. */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader label="Checking session…" className="min-h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
