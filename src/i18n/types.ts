import type { KEY } from './constants';

export type TranslationKeys = keyof typeof KEY;

export const LANGUAGES = {
  NB: 'nb',
  EN: 'en',
  NN: 'nn',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

