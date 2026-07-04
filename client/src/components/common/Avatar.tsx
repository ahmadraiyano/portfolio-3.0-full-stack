import { useState } from 'react';
import personalInfo from '@/data/personalInfo';

interface AvatarProps {
  className?: string;
}

/** Profile photo with a graceful initials fallback if the file is missing. */
export default function Avatar({ className = '' }: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = personalInfo.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-navy-800 font-display text-5xl font-semibold text-amber ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={personalInfo.photo}
      alt={personalInfo.name}
      onError={() => setErrored(true)}
      className={`object-cover ${className}`}
    />
  );
}
