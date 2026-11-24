import { FC } from 'react';
import { useI18n } from '../../i18n/context';

interface PhoneShowcaseProps {
  screens: string[];
  brandColor: string;
  title: string;
  /** Position and height of the phone group inside the showcase */
  stageClassName?: string;
}

// Side phones sit lower, smaller and tilted; the center one leads
const FRAMES = [
  'h-[86%] mt-[7%] -mr-[5%] -rotate-[8deg] z-10 opacity-85',
  'h-full z-20',
  'h-[86%] mt-[7%] -ml-[5%] rotate-[8deg] z-10 opacity-85',
];

/**
 * Real app screenshots fanned out in phone frames over the app's brand glow.
 * Kept in the upper half so the project copy below stays on a clean background.
 */
const PhoneShowcase: FC<PhoneShowcaseProps> = ({ screens, brandColor, title, stageClassName = 'top-[7%] h-[50%]' }) => {
  const { t } = useI18n();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B0B0F]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 50% at 50% 22%, ${brandColor}50 0%, ${brandColor}12 50%, transparent 78%)`,
        }}
      />
      <div className={`absolute inset-x-0 flex justify-center items-start ${stageClassName}`}>
        {screens.slice(0, 3).map((src, index) => (
          <div
            key={src}
            className={`relative aspect-[9/19.5] rounded-[1.5rem] p-[4px] bg-[#111] border border-white/15
              shadow-[0_30px_60px_-12px_rgba(0,0,0,0.85)] ${FRAMES[index]}`}
          >
            <img
              src={src}
              alt={t.projects.screenAlt(title, index + 1)}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full h-full object-cover object-top rounded-[1.25rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneShowcase;
