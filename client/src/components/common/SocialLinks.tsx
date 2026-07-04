import { Github, Linkedin, Facebook, Link as LinkIcon, type LucideIcon } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import socialLinks from '@/data/socialLinks';
import type { SocialLink } from '@/types';

const ICONS: Record<SocialLink['icon'], LucideIcon> = { Github, Linkedin, FaXTwitter, Facebook };

interface SocialLinksProps {
  tone?: 'light' | 'dark';
  size?: number;
  className?: string;
}

/** Row of icon buttons linking out to social profiles. */
export default function SocialLinks({ tone = 'light', size = 18, className = '' }: SocialLinksProps) {
  const isDark = tone === 'dark';
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = ICONS[link.icon] || LinkIcon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.name}
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-150 ${
              isDark
                ? 'border-line-dark text-paper/80 hover:border-amber hover:text-amber'
                : 'border-line-light text-ink-soft hover:border-amber-dark hover:text-amber-dark'
            }`}
          >
            <Icon size={size} strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}
