import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

/**
 * Layout route for everything under /admin. Firebase + the auth context
 * are only loaded when a visitor actually navigates here — the public
 * portfolio pages never pull in the Firebase SDK.
 */
export default function AdminRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
