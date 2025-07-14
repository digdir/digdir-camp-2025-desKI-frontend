import { Dropdown } from '@digdir/designsystemet-react';
import { EarthIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { LOCALSTORAGE_KEY } from '~/i18n/i18n';
import { LANGUAGES, type Language } from '~/i18n/types';
import styles from '../UtilityBar.module.css';

const languageLabels: Record<Language, string> = {
  nb: 'Bokmål',
  nn: 'Nynorsk',
  en: 'English',
};

export function LanguageDropdown() {
  const { i18n } = useTranslation();

  const switchLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCALSTORAGE_KEY, lang);
  };

  return (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger className={styles.utilityButton}>
        <EarthIcon />
      </Dropdown.Trigger>
      <Dropdown>
        <Dropdown.List>
          {(Object.values(LANGUAGES) as Language[]).map((lang) => (
            <Dropdown.Button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={styles.dropdownButton}
            >
              {languageLabels[lang]}
            </Dropdown.Button>
          ))}
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
}
