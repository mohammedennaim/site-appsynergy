export type Lang = 'fr' | 'en';

/** A value written in both languages */
export type Localized<T = string> = Record<Lang, T>;

export interface ContactInfo {
  email: string;
  phone: string;
  location: Localized;
  linkedin: string;
  facebook: string;
  instagram: string;
}

export interface Skill {
  /** Stable key, used for the domain icon */
  id: string;
  name: Localized;
  description: Localized;
  /** Short outcomes shown in the expanded panel */
  highlights: Localized[];
  items: string[];
  color: string;
}

export interface Experience {
  company: string;
  position: Localized;
  period: Localized;
  location: string;
  description: Localized;
  color: string;
  type: 'Stage' | 'CDI' | 'CDD' | 'Freelance';
  /** Position still running: highlighted in the hero, the timeline and the education pipeline */
  current?: boolean;
  tasks?: Localized<string[]>;
  technologies?: string[];
  skills?: Localized<string[]>;
}

export interface Project {
  /** Stable key, independent of the translated title */
  id: string;
  title: Localized;
  /** Short label shown above the title, e.g. "Application mobile" */
  category: Localized;
  description: Localized;
  tech: string[];
  color: string;
  /** Omitted when the source code is private */
  github?: string;
  demo?: string;
  demoLabel?: Localized;
  appStore?: string;
  image: string;
  /** Real app screenshots, shown in phone frames instead of the cover image */
  screens?: string[];
  /** Hex color of the app's own branding, used behind the screenshots */
  brandColor?: string;
  highlights?: Localized<string[]>;
}

export interface Education {
  institution: string;
  degree: Localized;
  period: string;
  description?: Localized;
}
