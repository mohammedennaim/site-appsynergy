export type Lang = 'fr' | 'en';

/** A value written in both languages */
export type Localized<T = string> = Record<Lang, T>;

export interface ContactInfo {
  emails: string[];
  phone: string;
  location: Localized;
}

export interface Skill {
  /** Stable key, used for the domain icon */
  id: string;
  name: Localized;
  description: Localized;
  /** Short outcomes shown in the expanded panel */
  highlights: Localized[];
  items: Localized[];
  color: string;
}

export interface Experience {
  company: string;
  position: Localized;
  period: Localized;
  location: string;
  description: Localized;
  color: string;
  tasks?: Localized<string[]>;
  technologies?: Localized[];
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
  image: string;
  /** Real app screenshots, shown in phone frames instead of the cover image */
  screens?: string[];
  /** Hex color of the app's own branding, used behind the screenshots */
  brandColor?: string;
  /** Short chips shown on the expanded card */
  highlights?: Localized<string[]>;
  /** Concrete deliverables listed in the card details panel */
  details?: Localized<string[]>;
}

export interface VisionPrinciple {
  institution: string;
  degree: Localized;
  period: string;
  description?: Localized;
}
