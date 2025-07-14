import type { KEY } from './constants';

export type TranslationKeys = keyof typeof KEY;

export const LANGUAGES = {
  NB: 'nb',
  EN: 'en',
} as const;
