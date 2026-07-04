import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/** Shell used by all public-facing pages (Home, Project details, 404). */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
