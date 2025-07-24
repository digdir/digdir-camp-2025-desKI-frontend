import { Dropdown } from '@digdir/designsystemet-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SOLUTIONS_NO } from '~/data/solutions';
import { KEY } from '~/i18n/constants';
import { slugify } from '~/utils/slugify';
import styles from './DropdownMenu.module.css';

function formatSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * DropdownMenu displays translated support solutions in a dropdown.
 * URLs use Norwegian slugs (from SOLUTIONS_NO) for consistency.
 * Only used in the 'servicedesk' route.
 */

export function DropdownMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/');
  const source = pathParts[1]; // 'servicedesk'
  const currentSlug = pathParts[2] || '';

  // Get translated solutions (order must match SOLUTIONS_NO)
  const translatedSolutions = t(KEY.solutions_list, {
    returnObjects: true,
  }) as string[];

  // Map Norwegian name -> translated name
  const solutionMap = SOLUTIONS_NO.reduce(
    (acc, noName, index) => {
      acc[noName] = translatedSolutions[index];
      return acc;
    },
    {} as Record<string, string>,
  );

  // Find which Norwegian solution matches the slug
  const norwegianName = SOLUTIONS_NO.find(
    (name) => slugify(name) === currentSlug,
  );

  // Display name: translated if found, fallback to formatted slug
  const currentSolution =
    norwegianName && solutionMap[norwegianName]
      ? solutionMap[norwegianName]
      : formatSlug(currentSlug);

  const handleSelect = (norwegianName: string) => {
    const slug = slugify(norwegianName);
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
          {SOLUTIONS_NO.map((norwegianName) => (
            <Dropdown.Button
              key={norwegianName}
              onClick={() => handleSelect(norwegianName)}
              className={styles.dropdownButton}
            >
              {solutionMap[norwegianName] || norwegianName}
            </Dropdown.Button>
          ))}
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
}
