import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/common/ProtectedRoute';

/** Nested layout for admin pages that require a signed-in session. */
export default function AdminProtected() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
