import Container from '@/components/common/Container';
import SocialLinks from '@/components/common/SocialLinks';
import personalInfo from '@/data/personalInfo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-navy-900">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-paper">
            {personalInfo.name}
            <span className="text-amber">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-paper/60">{personalInfo.tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-paper/40">
            Elsewhere
          </span>
          <SocialLinks tone="dark" />
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-paper/40 sm:flex-row">
          <span>
            &copy; {year} {personalInfo.name}. All rights reserved.
          </span>
          <span className="font-mono">Built with React · Express · PostgreSQL</span>
        </Container>
      </div>
    </footer>
  );
}
