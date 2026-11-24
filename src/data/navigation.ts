import { Home, User, Code, Briefcase, Mail, GraduationCap, FolderGit2, Phone } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { contactInfo } from './portfolio';

/** `key` points to the translated label in `ui.nav` */
export const navItems = [
  { icon: Home, key: 'home', href: '#accueil' },
  { icon: User, key: 'about', href: '#apropos' },
  { icon: Code, key: 'skills', href: '#competences' },
  { icon: Briefcase, key: 'experience', href: '#experience' },
  { icon: FolderGit2, key: 'projects', href: '#projets' },
  { icon: GraduationCap, key: 'education', href: '#formation' },
  { icon: Mail, key: 'contact', href: '#contact' },
] as const;

const phoneDigits = contactInfo.phone.replace(/\D/g, '');

export const socialLinks = [
  { icon: FaLinkedinIn, label: 'LinkedIn', href: contactInfo.linkedin },
  { icon: SiFacebook, label: 'Facebook', href: contactInfo.facebook },
  { icon: SiInstagram, label: 'Instagram', href: contactInfo.instagram },
  { icon: SiWhatsapp, label: 'WhatsApp', href: `https://wa.me/${phoneDigits}` },
  { icon: Phone, label: contactInfo.phone, href: `tel:+${phoneDigits}` },
];
