import { FC, ReactNode, useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion, useReducedMotionConfig } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import Logo from '../ui/Logo';
import { contactInfo } from '../../data/portfolio';
import { formatClock } from '../../utils/time';
import { useI18n } from '../../i18n/context';
import { ContactBackdrop } from '../ui/SectionBackdrops';

const phoneDigits = contactInfo.phone.replace(/\D/g, '');
const EASE = [0.16, 1, 0.3, 1] as const;

const socials: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  cursor: 'profile' | 'chat' | 'call';
  external?: boolean;
}[] = [
  { label: 'LinkedIn', href: contactInfo.linkedin, icon: FaLinkedinIn, cursor: 'profile', external: true },
  { label: 'Facebook', href: contactInfo.facebook, icon: SiFacebook, cursor: 'profile', external: true },
  { label: 'Instagram', href: contactInfo.instagram, icon: SiInstagram, cursor: 'profile', external: true },
  { label: 'WhatsApp', href: `https://wa.me/${phoneDigits}`, icon: SiWhatsapp, cursor: 'chat', external: true },
  { label: contactInfo.phone, href: `tel:+${phoneDigits}`, icon: Phone, cursor: 'call' },
];

const useLocalTime = (timeZone: string) => {
  const [time, setTime] = useState(() => formatClock(new Date(), timeZone));

  useEffect(() => {
    const tick = () => setTime(formatClock(new Date(), timeZone));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
};

const Cascade: FC<{
  delay?: number;
  as?: 'div' | 'li';
  className?: string;
  children: ReactNode;
}> = ({ delay = 0, as = 'div', className, children }) => {
  const reduceMotion = useReducedMotionConfig();
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

const ContactSection: FC = () => {
  const { t, pick, lang } = useI18n();
  const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime('Africa/Casablanca');
  const french = lang === 'fr';
  const reduceMotion = useReducedMotionConfig();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto;
    }
  };

  return (
    <section id="contact" className="agency-contact" aria-labelledby="contact-title">
      <ContactBackdrop />
      <header className="contact-header">
        <Cascade delay={0.02}>
          <div className="agency-location contact-brand">
            <img
              className="agency-about-wordmark"
              src="/brand/appsynergy-icon.png"
              alt="App Synergy"
              width={1228}
              height={272}
            />
            <i aria-hidden="true" />
            <span>{french ? 'Contact' : 'Contact'}</span>
          </div>
        </Cascade>
      </header>

      <div className="contact-main">
        <Cascade delay={0.06} className="contact-intro">
          <p className="contact-eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title">
            {t.contact.title} <em>{t.contact.accent}</em>
          </h2>
          <p className="contact-lead">{t.contact.description}</p>
        </Cascade>

        <Cascade delay={0.12} className="contact-email">
          <div className="contact-email-shell">
            <a href={mailto} data-cursor={t.contact.cursor.write} className="contact-email-link">
              <span className="contact-email-icon" aria-hidden="true">
                <Mail size={20} />
              </span>
              <span className="contact-email-address">{contactInfo.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? t.contact.copiedLabel : t.contact.copyLabel}
              className={`contact-copy${copied ? ' is-copied' : ''}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'check' : 'copy'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="contact-copy-inner"
                >
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  <span>{copied ? t.contact.copied : t.contact.copy}</span>
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </Cascade>

        <div className="contact-actions">
          {socials.map(({ label, href, icon: Icon, cursor, external }, index) => (
            <Cascade key={label} delay={0.16 + index * 0.05}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                data-cursor={t.contact.cursor[cursor]}
                className={`contact-action${label === 'WhatsApp' ? ' contact-action-primary' : ''}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{label}</span>
                {external && label !== 'WhatsApp' && <ArrowUpRight size={14} aria-hidden="true" />}
              </a>
            </Cascade>
          ))}
        </div>

        <ul className="contact-meta">
          <Cascade as="li" delay={0.38}>
            <MapPin size={16} aria-hidden="true" />
            <span>{pick(contactInfo.location)} · {t.contact.relocation}</span>
          </Cascade>
          <Cascade as="li" delay={0.44}>
            <Clock size={16} aria-hidden="true" />
            <span>
              <strong>{localTime}</strong> {t.contact.localTime}
            </span>
          </Cascade>
          <Cascade as="li" delay={0.5}>
            <Zap size={16} aria-hidden="true" />
            <span>{t.contact.response}</span>
          </Cascade>
        </ul>
      </div>

      <Cascade delay={0.42} className="contact-footer">
        <Logo variant="signature" tone="light" framed={false} decorative={false} animated="inView" delay={120} className="shrink-0" />
        <p>
          © {new Date().getFullYear()} <strong>APP SYNERGY</strong>. {t.contact.rights}
        </p>
      </Cascade>

      <div aria-hidden="true" className="contact-signature">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Synergy<span>.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
