import type { ExperienceItem } from '@/types';

/**
 * Professional experience. Leave the array empty ( [] ) if you don't have
 * any yet — the Experience section hides itself automatically when empty.
 */
const experience: ExperienceItem[] = [
  {
    role: 'Assistant IT',
    company: 'Penta Trading Ltd.',
    duration: 'Mar 2023 — Present',
    location: 'On-Site',
    points: [
      'Maintained and supported a Distributor Management System (DMS), ensuring reliable data flow, stable system operations, and consistent backend-driven workflows across business processes.',
      'Managed and validated structured operational data within internal systems, applying strong attention to data integrity, consistency, and performance of data-driven interfaces.',
      'Built and maintained reporting and record-management workflows used by internal teams, troubleshooting system and data-related issues while ensuring secure handling of sensitive business information.',
    ],
  },
];

export default experience;
