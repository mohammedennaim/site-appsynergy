import {
  Eye,
  Home,
  Layers,
  LayoutGrid,
  MessageCircle,
  Phone,
  Route,
  Users,
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { contactInfo } from './portfolio';

/**
 * Sidebar / mobile nav — icons mirror each agency section’s role:
 * Accueil · À propos · Expertises · Méthode · Réalisations · Vision · Contact
 */
export const navItems = [
  { icon: Home, key: 'home', href: '#accueil' },
  { icon: Users, key: 'about', href: '#apropos' },
  { icon: Layers, key: 'skills', href: '#competences' },
  { icon: Route, key: 'experience', href: '#experience' },
  { icon: LayoutGrid, key: 'projects', href: '#projets' },
  { icon: Eye, key: 'education', href: '#formation' },
  { icon: MessageCircle, key: 'contact', href: '#contact' },
] as const;

const phoneDigits = contactInfo.phone.replace(/\D/g, '');

export const socialLinks = [
  { icon: FaLinkedinIn, label: 'LinkedIn', href: contactInfo.linkedin },
  { icon: SiFacebook, label: 'Facebook', href: contactInfo.facebook },
  { icon: SiInstagram, label: 'Instagram', href: contactInfo.instagram },
  { icon: SiWhatsapp, label: 'WhatsApp', href: `https://wa.me/${phoneDigits}` },
  { icon: Phone, label: contactInfo.phone, href: `tel:+${phoneDigits}` },
];
