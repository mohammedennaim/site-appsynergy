import {
  Eye,
  Home,
  LayoutGrid,
  MessageCircle,
  Phone,
  Smartphone,
  Sofa,
  Users,
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { contactInfo } from './portfolio';

export const navItems = [
  { icon: Home, key: 'home', href: '#accueil' },
  { icon: Users, key: 'about', href: '#apropos' },
  { icon: LayoutGrid, key: 'projects', href: '#projets' },
  { icon: Smartphone, key: 'caseQarib', href: '#anatomie' },
  { icon: Sofa, key: 'caseArova', href: '#anatomie-arova' },
  { icon: Eye, key: 'vision', href: '#vision' },
  { icon: MessageCircle, key: 'contact', href: '#contact' },
] as const;

const phoneDigits = contactInfo.phone.replace(/\D/g, '');

export const socialLinks = [
  { icon: SiWhatsapp, label: 'WhatsApp', href: `https://wa.me/${phoneDigits}` },
  { icon: Phone, label: contactInfo.phone, href: `tel:+${phoneDigits}` },
];
