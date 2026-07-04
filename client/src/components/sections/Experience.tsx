import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import experience from '@/data/experience';

export default function Experience() {
  if (!experience?.length) return null;

  return (
    <section id="experience" className="scroll-mt-20 bg-navy-900 py-16 sm:py-24">
      <Container>
        <SectionHeading index="04" eyebrow="Experience" title="Where I've worked" tone="dark" />

        <div className="space-y-6">
          {experience.map((job) => (
            <div
              key={`${job.role}-${job.company}`}
              className="border border-line-dark bg-navy-800/50 p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="font-display text-lg font-semibold text-paper">
                  {job.role} <span className="text-paper/50">— {job.company}</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-amber">
                  {job.duration}
                </span>
              </div>
              {job.location && <p className="mt-1 text-sm text-paper/50">{job.location}</p>}
              <ul className="mt-4 space-y-2">
                {job.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper/75">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
