import { FC, ReactNode, useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import Logo from '../ui/Logo';
import { contactInfo } from '../../data/portfolio';
import { formatClock } from '../../utils/time';
import { useSectionRange } from '../../hooks/useScrollReveal';
import { useI18n } from '../../i18n/context';
import { ContactBackdrop } from '../ui/SectionBackdrops';

const phoneDigits = contactInfo.phone.replace(/\D/g, '');

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
  range: [number, number];
  as?: 'div' | 'li';
  className?: string;
  children: ReactNode;
}> = ({ range, as = 'div', className, children }) => {
  const progress = useSectionRange(range[0], range[1]);
  const y = useTransform(progress, [0, 1], [22, 0]);
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag style={{ opacity: progress, y }} className={className}>
      {children}
    </Tag>
  );
};

const pillRange = (index: number): [number, number] => [0.14 + index * 0.05, 0.38 + index * 0.05];
const infoRange = (index: number): [number, number] => [0.44 + index * 0.06, 0.64 + index * 0.06];

const ContactSection: FC = () => {
  const { t, pick, lang } = useI18n();
  const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`;
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime('Africa/Casablanca');
  const french = lang === 'fr';

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
      </header>

      <div className="contact-main">
        <div className="contact-intro">
          <p className="contact-eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title">
            {t.contact.title} <em>{t.contact.accent}</em>
          </h2>
          <p className="contact-lead">{t.contact.description}</p>
        </div>

        <Cascade range={[0.02, 0.28]} className="contact-email">
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
            <Cascade key={label} range={pillRange(index)}>
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
          <Cascade as="li" range={infoRange(0)}>
            <MapPin size={16} aria-hidden="true" />
            <span>{pick(contactInfo.location)} · {t.contact.relocation}</span>
          </Cascade>
          <Cascade as="li" range={infoRange(1)}>
            <Clock size={16} aria-hidden="true" />
            <span>
              <strong>{localTime}</strong> {t.contact.localTime}
            </span>
          </Cascade>
          <Cascade as="li" range={infoRange(2)}>
            <Zap size={16} aria-hidden="true" />
            <span>{t.contact.response}</span>
          </Cascade>
        </ul>
      </div>

      <footer className="contact-footer">
        <Logo variant="signature" framed={false} decorative={false} animated="inView" delay={120} className="shrink-0" />
        <p>
          © {new Date().getFullYear()} <strong>APP SYNERGY</strong>. {t.contact.rights}
        </p>
      </footer>

      <Signature />
    </section>
  );
};

const Signature: FC = () => {
  const progress = useSectionRange(0.28, 0.9);
  const y = useTransform(progress, (p) => `${58 - 28 * p}%`);

  return (
    <div aria-hidden="true" className="contact-signature">
      <motion.p style={{ y, opacity: progress }}>
        Synergy<span>.</span>
      </motion.p>
    </div>
  );
};

export default ContactSection;
