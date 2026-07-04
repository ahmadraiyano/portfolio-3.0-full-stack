import type { PersonalInfo } from '@/types';

/**
 * Central place for all personal/static content shown across the site.
 * Edit the values below — everything in the UI reads from here.
 */
const personalInfo: PersonalInfo = {
  name: 'Ahmad Raiyan',
  designation: 'Full Stack Developer',
  tagline: 'I design and build reliable web applications end to end — from database schema to pixel-perfect UI.',
  location: 'Dhaka, Bangladesh',
  email: 'ahmadraiyanofficial@gmail.com',
  phone: '+880 1605-354356',
  whatsapp: '+880 1605-354356', // optional — used to build a wa.me link
  availability: 'Open to opportunities',

  // Put your photo at client/public/images/profile.jpg (or update this path)
  photo: '/images/profile.jpeg',

  // Put your resume PDF at client/public/resume.pdf — the Hero button
  // downloads this file directly once it exists.
  resumeUrl: '/resume.pdf',

  aboutMe: [
    "I got into programming because I was always interested in technology, and I made a deliberate choice to pursue it more seriously. What started as curiosity about how websites and software actually work turned into learning how to build them myself. Over time, I moved from simple experiments to creating full projects, and that path naturally developed into a focused journey in full-stack development that I continue to grow in.",
    "I enjoy the full picture of an application: how the front end, back end, and data all come together to create a seamless experience for the user. I like understanding not just how each part works on its own, but how they interact, communicate, and depend on each other to make a system functional and efficient. Seeing an idea evolve from concept to a fully working product, where every layer plays a role, is what keeps me motivated and constantly learning.",
    "Outside of coding, I enjoy traveling and meeting new people. Exploring different places gives me a fresh perspective and helps me step away from screens and routines for a while. I also value conversations with people from different backgrounds, as they often bring new ideas and ways of thinking that I wouldn’t encounter otherwise.",
  ],

  resumeHighlights: [
    { label: 'Experience', value: '1+ yrs' },
    { label: 'Projects shipped', value: '10+' },
    { label: 'Primary stack', value: 'PERN' },
  ],
};

export default personalInfo;
