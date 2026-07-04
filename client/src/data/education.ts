import type { EducationItem } from '@/types';

/**
 * Educational background — add/remove entries as needed.
 * Only include qualifications above HSC per the brief; add HSC/SSC too if you'd like.
 */
const education: EducationItem[] = [
  {
    degree: 'BBA in Management',
    institution: 'Govt. Bangla College',
    duration: '2024 — Running',
    // result: 'CGPA 3.7 / 4.0',
    // description: 'Coursework included Data Structures & Algorithms, Database Systems, Web Engineering, and Software Development.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC), Business',
    institution: 'Govt. Bangla College',
    duration: '2021 — 2023',
    // result: 'GPA 5.00 / 5.00',
  },
];

export default education;
