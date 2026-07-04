import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Three placeholder projects that satisfy the "at least 3 projects" brief.
// Replace these with your real projects from the admin dashboard, or edit
// this file and re-run `npm run seed`.
const projects: Prisma.ProjectCreateInput[] = [
  {
    title: 'TaskFlow — Team Task Manager',
    slug: 'taskflow-team-task-manager',
    description:
      'A Kanban-style task manager for small teams, with real-time status updates, role-based access, and per-project boards.',
    techStack: ['React', 'Tailwind CSS', 'Express', 'PostgreSQL', 'Prisma', 'JWT'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/your-username/taskflow-client',
    challenges:
      'Keeping the board UI responsive while syncing drag-and-drop state with the server required debouncing updates and reconciling optimistic UI changes with the API response.',
    futurePlans:
      'Add real-time collaboration with WebSockets, activity logs per card, and a mobile app using the same API.',
    featured: true,
  },
  {
    title: 'ShopCart — E-commerce Storefront',
    slug: 'shopcart-ecommerce-storefront',
    description:
      'A full storefront with product search, cart, and checkout, backed by a PostgreSQL catalog and a secure JWT-protected admin panel for managing inventory.',
    techStack: ['React', 'Axios', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/your-username/shopcart-client',
    challenges:
      'Designing a schema that handled product variants (size/color) cleanly without duplicating rows, and keeping cart totals consistent between client and server.',
    futurePlans:
      'Integrate a real payment gateway, add order tracking, and introduce Redis caching for the product catalog.',
    featured: true,
  },
  {
    title: 'DevLink — Developer Networking Platform',
    slug: 'devlink-developer-networking',
    description:
      'A social platform where developers share profiles, posts, and project links. Includes Firebase Authentication, protected routes, and a PostgreSQL-backed feed.',
    techStack: ['React', 'Firebase Auth', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/your-username/devlink-client',
    challenges:
      'Bridging Firebase Authentication on the client with a custom Express API meant carefully verifying Firebase ID tokens server-side before issuing my own JWTs.',
    futurePlans:
      'Add direct messaging, notifications, and full-text search across profiles and posts.',
    featured: false,
  },
];

async function main() {
  console.log('Seeding projects…');
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`  ✓ ${project.title}`);
  }
  console.log('Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
