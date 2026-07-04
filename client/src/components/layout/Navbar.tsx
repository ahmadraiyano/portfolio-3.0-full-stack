import { useEffect, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from '@/components/common/Container';
import personalInfo from '@/data/personalInfo';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close the mobile menu on route change.
  useEffect(() => setIsOpen(false), [location.pathname]);

  const goToSection = (id: string) => (event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-navy-900/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          {personalInfo.name.split(' ')[1]}
          <span className="text-amber">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={goToSection(link.id)}
              className="font-mono text-xs uppercase tracking-widest text-paper/70 transition-colors hover:text-amber"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`#${NAV_LINKS[NAV_LINKS.length - 1].id}`}
          onClick={goToSection('contact')}
          className="hidden rounded-md bg-amber px-4 py-2 font-mono text-xs uppercase tracking-widest text-navy-950 transition-colors hover:bg-amber-dark md:inline-flex"
        >
          Let&rsquo;s Talk
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md text-paper md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="border-t border-line-dark bg-navy-900 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={goToSection(link.id)}
                className="rounded-md px-3 py-3 font-mono text-sm uppercase tracking-widest text-paper/80 hover:bg-navy-800 hover:text-amber"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
