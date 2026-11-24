import {
  Eye,
  Home,
  Layers,
  LayoutGrid,
  MessageCircle,
  Phone,
  Route,
  Smartphone,
  Sofa,
  Users,
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { contactInfo } from './portfolio';

/**
 * Sidebar / mobile nav — Accueil · À propos · Expertises · Méthode ·
 * Réalisations · Qarib · AROVA · Vision · Contact
 */
export const navItems = [
  { icon: Home, key: 'home', href: '#accueil' },
  { icon: Users, key: 'about', href: '#apropos' },
  { icon: Layers, key: 'skills', href: '#expertises' },
  { icon: Route, key: 'experience', href: '#experience' },
  { icon: LayoutGrid, key: 'projects', href: '#projets' },
  { icon: Smartphone, key: 'caseQarib', href: '#anatomie' },
  { icon: Sofa, key: 'caseArova', href: '#anatomie-arova' },
  { icon: Eye, key: 'vision', href: '#vision' },
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
