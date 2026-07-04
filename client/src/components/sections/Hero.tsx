import type { MouseEvent } from 'react';
import { Download, ArrowDown } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import SocialLinks from '@/components/common/SocialLinks';
import CornerMarks from '@/components/common/CornerMarks';
import Avatar from '@/components/common/Avatar';
import personalInfo from '@/data/personalInfo';

export default function Hero() {
  const scrollToProjects = (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-line-dark bg-navy-900 bp-grid-dark">
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Copy */}
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-amber">
              {personalInfo.designation} · {personalInfo.location}
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] text-paper sm:text-5xl lg:text-6xl">
              {personalInfo.name}
            </h1>
            <p className="mt-6 max-w-xl text-balance text-base text-paper/70 sm:text-lg">
              {personalInfo.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={personalInfo.resumeUrl} download variant="primary">
                <Download size={16} /> Download Resume
              </Button>
              <Button href="#projects" onClick={scrollToProjects} variant="secondary" className="text-paper">
                View Projects <ArrowDown size={16} />
              </Button>
            </div>

            <div className="mt-9">
              <SocialLinks tone="dark" />
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="relative border border-line-dark bg-navy-800 p-3">
              <CornerMarks tone="dark" />
              <Avatar className="aspect-[4/5] w-full" />
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-paper/40">
                <span>Portrait</span>
                <span>Scale 3:4</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Signature element: engineering drawing title block */}
      <div className="relative border-t border-line-dark bg-navy-950/60">
        <Container>
          <dl className="grid grid-cols-2 divide-x divide-line-dark border-x border-line-dark sm:grid-cols-4">
            {[
              { term: 'Name', desc: personalInfo.name },
              { term: 'Role', desc: personalInfo.designation },
              { term: 'Stack', desc: 'React · Node · PostgreSQL' },
              { term: 'Status', desc: personalInfo.availability },
            ].map((item) => (
              <div key={item.term} className="px-4 py-3 sm:px-6">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                  {item.term}
                </dt>
                <dd className="mt-1 truncate text-sm text-paper/85">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
