import { Dropdown } from '@digdir/designsystemet-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { logoLight } from '~/assets';
import { solutions } from '~/data/solutions';
import styles from './ChatbotPage.module.css';

export function ChatbotPage() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <img src={logoLight} className={styles.logo} alt="desKI logo" />
        <Dropdown.TriggerContext>
          <Dropdown.Trigger className={styles.dropdownTrigger} onClick={() => setOpen(!open)}>
            {/* TODO: Add context */}
            {searchParams.get('solution') || 'Select a solution'}
            {open ? (
              <ChevronDownIcon aria-hidden />
            ) : (
              <ChevronUpIcon aria-hidden />
            )}
          </Dropdown.Trigger>
          <Dropdown open={open} onClose ={() => setOpen(false)}>
            <Dropdown.List>
              {solutions.map((solution) => (
                <Dropdown.Button
                  key={solution}
                  className={styles.dropdownButton}
                >
                  {solution}
                </Dropdown.Button>
              ))}
            </Dropdown.List>
          </Dropdown>
        </Dropdown.TriggerContext>
      </div>
      <div className={styles.chatContainer}></div>
    </div>
  );
}
