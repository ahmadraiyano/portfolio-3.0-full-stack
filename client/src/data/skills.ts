import type { SkillGroup } from '@/types';

/**
 * Skills grouped by category. `level` is a 1–4 familiarity rating
 * rendered as filled dots (gauge style) in the Skills section.
 */
const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'React', level: 4 },
      { name: 'Axios', level: 4 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 4 },
      { name: 'Express.js', level: 4 },
      { name: 'JWT', level: 3 },
      { name: 'Firebase Auth', level: 3 },
    ],
  },
  {
    category: 'Database & ORM',
    items: [
      { name: 'PostgreSQL', level: 3 },
      { name: 'Prisma', level: 3 },
    ],
  },
  {
    category: 'Tools & Workflow',
    items: [
      { name: 'Postman', level: 4 },
      { name: 'Beekeeper Studio', level: 3 },
      { name: 'Git & GitHub', level: 4 },
      { name: 'Vite', level: 4 },
    ],
  },
];

export default skills;
