import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

interface NavigationState {
  scrollTo?: string;
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Supports the Navbar's "navigate here then scroll" flow when the user
  // clicks a section link from a different page (e.g. a project details page).
  useEffect(() => {
    const targetId = (location.state as NavigationState | null)?.scrollTo;
    if (targetId) {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </MainLayout>
  );
}
