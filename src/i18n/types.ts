import type { KEY } from './constants';

export type TranslationKeys = keyof typeof KEY;

export const LANGUAGES = {
  NB: 'nb',
  NN: 'nn',
  EN: 'en',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
