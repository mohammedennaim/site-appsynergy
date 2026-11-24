import { createContext, useContext } from 'react';
import type { MotionValue } from 'framer-motion';

/**
 * 0 → 1 while the visitor reads the enclosing pinned section: from the moment it has
 * mostly appeared until it starts to leave. `null` when sections are not pinned
 * (reduced motion), in which case scroll-driven content should show its final state.
 */
export const SectionProgressContext = createContext<MotionValue<number> | null>(null);

export const useSectionProgress = () => useContext(SectionProgressContext);

/**
 * 0 → 1 over the part of the reading where the section is fully on screen and held in place
 * (its pinned dwell), for content that should only move once the section has stopped.
 */
export const PinnedProgressContext = createContext<MotionValue<number> | null>(null);

export const usePinnedProgress = () => useContext(PinnedProgressContext);

/** 0 → 1 as the next section enters. Unavailable with reduced motion. */
export const SectionExitProgressContext = createContext<MotionValue<number> | null>(null);

export const useSectionExitProgress = () => useContext(SectionExitProgressContext);

/** 0 → 1 as the section enters. Unavailable with reduced motion or on the first section. */
export const SectionEntryProgressContext = createContext<MotionValue<number> | null>(null);

export const useSectionEntryProgress = () => useContext(SectionEntryProgressContext);
