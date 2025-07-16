import { Dropdown, Tooltip } from '@digdir/designsystemet-react';
import { EarthIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import { LOCALSTORAGE_KEY } from '~/i18n/i18n';
import { LANGUAGES, type Language } from '~/i18n/types';
import styles from '../UtilityBar.module.css';

const languageLabels: Record<Language, string> = {
  nb: 'Bokmål',
  nn: 'Nynorsk',
  en: 'English',
  ns: 'Davvisámegiella',
};

export function LanguageDropdown() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const switchLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCALSTORAGE_KEY, lang);
    setOpen(false);
  };

  return (
    <Dropdown.TriggerContext>
      <Tooltip content={t(KEY.language_switch)} placement="left">
        <div>
          <Dropdown.Trigger
            className={styles.utilityButton}
            onClick={() => setOpen(!open)}
            aria-label={t(KEY.language_switch)}
          >
            <EarthIcon />
          </Dropdown.Trigger>
        </div>
      </Tooltip>
      <Dropdown open={open} onClose={() => setOpen(false)}>
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
