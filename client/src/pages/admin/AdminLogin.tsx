import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Container from '@/components/common/Container';
import useAuth from '@/hooks/useAuth';

interface LoginFormState {
  email: string;
  password: string;
}

interface NavigationState {
  from?: string;
}

export default function AdminLogin() {
  const { login, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      const from = (location.state as NavigationState | null)?.from || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 bp-grid-dark px-4">
      <Container className="flex justify-center">
        <div className="w-full max-w-sm border border-line-dark bg-navy-950/60 p-8">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber">
            <Lock size={14} /> Admin Access
          </div>
          <h1 className="font-display text-2xl font-semibold text-paper">Sign in</h1>
          <p className="mt-1 text-sm text-paper/50">Manage your portfolio content.</p>

          {!isFirebaseConfigured && (
            <p className="mt-4 border border-amber/40 bg-amber/10 p-3 font-mono text-[11px] leading-relaxed text-amber">
              Firebase isn&rsquo;t configured yet. Add your Firebase credentials to
              client/.env — see the README — before signing in.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full border border-line-dark bg-navy-900 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full border border-line-dark bg-navy-900 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-amber focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="font-mono text-xs text-amber">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-amber px-4 py-3 font-mono text-xs uppercase tracking-widest text-navy-950 transition-colors hover:bg-amber-dark disabled:opacity-50"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
