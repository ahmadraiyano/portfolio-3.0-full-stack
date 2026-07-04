import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ExternalLink } from 'lucide-react';
import Container from '@/components/common/Container';
import useAuth from '@/hooks/useAuth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b border-line-light bg-navy-900">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/admin/dashboard" className="font-mono text-xs uppercase tracking-widest text-amber">
            Admin · Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-paper/50 sm:inline">{admin?.email}</span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-amber"
            >
              View Site <ExternalLink size={12} />
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-amber"
            >
              Logout <LogOut size={12} />
            </button>
          </div>
        </Container>
      </header>
      <main>{children}</main>
    </div>
  );
}
