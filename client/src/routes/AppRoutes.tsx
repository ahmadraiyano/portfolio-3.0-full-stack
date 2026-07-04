import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ProjectDetails from '@/pages/ProjectDetails';
import NotFound from '@/pages/NotFound';
import Loader from '@/components/common/Loader';

// Everything admin-related — Firebase, the auth context, and the JWT
// route guard — is code-split behind this boundary so public visitors
// never download any of it.
const AdminRoot = lazy(() => import('./AdminRoot'));
const AdminProtected = lazy(() => import('./AdminProtected'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const ProjectForm = lazy(() => import('@/pages/admin/ProjectForm'));

const AdminFallback = <Loader label="Loading admin…" className="min-h-screen" />;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />

      <Route
        path="/admin"
        element={
          <Suspense fallback={AdminFallback}>
            <AdminRoot />
          </Suspense>
        }
      >
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminProtected />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
