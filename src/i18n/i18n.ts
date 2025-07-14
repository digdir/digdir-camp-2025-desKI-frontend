import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, nb } from './translations';
import { LANGUAGES } from './types';

export const LOCALSTORAGE_KEY = 'language';
export const defaultNS = 'common';

export const resources = {
  [LANGUAGES.NB]: { [defaultNS]: nb },
  [LANGUAGES.EN]: { [defaultNS]: en },
};

/**
 * Initializes i18n with the required configuration.
 */
i18n.use(initReactI18next).init({
  lng: localStorage.getItem(LOCALSTORAGE_KEY) || LANGUAGES.NB,
  fallbackLng: LANGUAGES.NB,
  resources,
  defaultNS,
  nsSeparator: false,
  debug: process.env.NODE_ENV === 'development',
});

export default i18n;
