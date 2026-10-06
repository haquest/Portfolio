// Site-wide content and links. Edit text here; components read from this file.

export const site = {
  name: 'Tanya Mirza',
  title: 'Tanya Mirza: Product Designer & UX Researcher',
  description:
    "Tanya Mirza is a product designer and HCI master's student at the University of Michigan, crafting intuitive, accessible, research-driven experiences. Open to full-time roles from Summer 2027.",
  jobTitle: 'Product Designer',
  locale: 'en_US',
  ogImage: '/og-default.png',
};

export const links = {
  resume: 'https://drive.google.com/file/d/1FcgDjws0EVd0dWotmqq4H8xMzLxfqjHm/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/tanyamirza/',
  email: 'htanya@umich.edu',
};

export const availability = {
  status: 'Available for Full-Time',
  detail: 'Starting Summer 2027',
  extra: 'Open to Relocate',
};

export const nav = [
  { label: 'Work', href: '/#projects' },
  { label: 'About', href: '/about' },
] as const;
