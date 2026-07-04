import type { SocialLink } from '@/types';

/**
 * Social / contact links used in the Navbar, Hero and Footer.
 * `icon` must be one of: Github, Linkedin, Twitter, Facebook — add more
 * to the ICONS map in components/common/SocialLinks.tsx if you need others.
 */
const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: 'Github', url: 'https://github.com/ahmadraiyano' },
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/in/ahmadraiyano' },
  { name: 'X', icon: 'FaXTwitter', url: 'https://x.com/ahmadraiyano' },
  { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/ahmadraiyanofficial' },
];

export default socialLinks;
