import Container from '@/components/common/Container';
import SectionHeading from '@/components/common/SectionHeading';
import skills from '@/data/skills';

// function LevelDots({ level }: { level: number }) {
//   return (
//     <div className="flex gap-1" aria-hidden="true">
//       {[1, 2, 3, 4].map((dot) => (
//         <span
//           key={dot}
//           className={`h-1.5 w-1.5 rounded-full ${dot <= level ? 'bg-amber' : 'bg-paper/15'}`}
//         />
//       ))}
//     </div>
//   );
// }

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-navy-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Skills Matrix"
          title="Tools I build with"
          description="A working snapshot of the stack I reach for most — grouped the way I'd organize a real project."
          tone="dark"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.category} className="bg-navy-900 p-6">
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-amber">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-paper/85">{skill.name}</span>
                    {/* <LevelDots level={skill.level} /> */}
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
