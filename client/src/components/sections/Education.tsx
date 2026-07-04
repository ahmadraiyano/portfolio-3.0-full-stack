import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import education from '@/data/education';

export default function Education() {
  if (!education?.length) return null;

  return (
    <section id="education" className="scroll-mt-20 bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading index="03" eyebrow="Education" title="Educational background" />

        <div className="relative border-l border-line-light pl-8">
          {education.map((item) => (
            <div key={item.degree} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-amber-dark bg-paper" />
              <p className="font-mono text-xs uppercase tracking-widest text-amber-dark">
                {item.duration}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.degree}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {item.institution}
                {item.result ? ` · ${item.result}` : ''}
              </p>
              {item.description && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
