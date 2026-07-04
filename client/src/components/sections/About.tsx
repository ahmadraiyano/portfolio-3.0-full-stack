import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import personalInfo from '@/data/personalInfo';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading index="01" eyebrow="About" title="A little about me" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-5 text-base leading-relaxed text-ink-soft">
            {personalInfo.aboutMe.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* <div className="grid grid-cols-3 gap-4 self-start lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line-light lg:border-t lg:border-line-light">
            {personalInfo.resumeHighlights.map((stat) => (
              <div key={stat.label} className="py-0 lg:py-4">
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </Container>
    </section>
  );
}
