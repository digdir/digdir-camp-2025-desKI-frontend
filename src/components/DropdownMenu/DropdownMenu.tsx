import { Dropdown } from '@digdir/designsystemet-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { KEY } from '~/i18n/constants';
import { slugify } from '~/utils/slugify';
import styles from './DropdownMenu.module.css';

function formatSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DropdownMenu() {
  const { t } = useTranslation();
  const solutions = t(KEY.solutions_list, { returnObjects: true }) as string[];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/');
  const source = pathParts[1]; // 'servicedesk'
  const currentSlug = pathParts[2] || '';
  const currentSolution =
    solutions.find((s) => slugify(s) === currentSlug) ||
    formatSlug(currentSlug);

  const handleSelect = (solution: string) => {
    const slug = slugify(solution);
    navigate(`/${source}/${slug}`);
    setOpen(false);
  };

  return (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger
        className={styles.dropdownTrigger}
        onClick={() => setOpen(!open)}
        aria-label={t(KEY.select_solution)}
      >
        {currentSolution}
        <ChevronDownIcon aria-hidden />
      </Dropdown.Trigger>
      <Dropdown open={open} onClose={() => setOpen(false)}>
        <Dropdown.List>
          {solutions.map((solution) => (
            <Dropdown.Button
              key={solution}
              onClick={() => handleSelect(solution)}
              className={styles.dropdownButton}
            >
              {solution}
            </Dropdown.Button>
          ))}
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
}
