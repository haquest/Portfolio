// Experience shown on the About page, newest first. Each organization lists its roles in order.
// Logos live in src/assets/logos/ (square images look best).
import type { ImageMetadata } from 'astro';
import lsats from '../assets/logos/lsa-technology-services.png';
import atlas from '../assets/logos/atlas-digital.png';
import dpss from '../assets/logos/umich-dpss.png';
import yenika from '../assets/logos/yenika-editorial.png';
import posa from '../assets/logos/portrait-of-south-asia.png';

export interface Role {
  title: string;
  dates: string;
}

export interface Organization {
  name: string;
  logo: ImageMetadata;
  roles: Role[];
}

export const experience: Organization[] = [
  {
    name: 'University of Michigan LSA Technology Services',
    logo: lsats,
    roles: [
      { title: 'UX Research Intern', dates: 'Aug 2026 – Present' },
      { title: 'Student Coordinator', dates: 'Jun 2025 – Present' },
      { title: 'Project Management Intern', dates: 'May 2026 – Aug 2026' },
      { title: 'Service Desk Team', dates: 'Aug 2024 – Aug 2025' },
      { title: 'Desktop Support Team', dates: 'Feb 2023 – Aug 2024' },
    ],
  },
  {
    name: 'Atlas Digital Consulting Group',
    logo: atlas,
    roles: [
      { title: 'UX Designer', dates: 'Feb 2025 – Present' },
      { title: 'Project Manager', dates: 'Sep 2025 – Dec 2025' },
    ],
  },
  {
    name: 'University of Michigan Division of Public Safety and Security',
    logo: dpss,
    roles: [{ title: 'UX Design Intern', dates: 'Jan 2026 – May 2026' }],
  },
  {
    name: 'YENIKA Editorial',
    logo: yenika,
    roles: [{ title: 'Graphic Designer', dates: 'Sep 2024 – Apr 2025' }],
  },
  {
    name: 'Portrait of South Asia',
    logo: posa,
    roles: [{ title: 'Graphic Designer', dates: 'Jan 2024 – Apr 2025' }],
  },
];
