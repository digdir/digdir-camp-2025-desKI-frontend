import { Card } from '@digdir/designsystemet-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '~/components/Logo/Logo';
import { KEY } from '~/i18n/constants';
import { slugify } from '~/utils/slugify';
import styles from './StartPage.module.css';

/**
 * Displays the initial landing page where users choose a solution to get help with.
 * Clicking a card routes to the chatbot page with the selected solution.
 */
export function StartPage() {
  const { t } = useTranslation();
  const solutions = t(KEY.solutions_list, { returnObjects: true }) as string[];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Logo />
        <h2 className={styles.headerQuestion}>{t(KEY.initial_welcome)}</h2>
      </div>
      <div className={styles.cardContainer}>
        {solutions.map((title) => (
          <Link
            key={title}
            to={`/servicedesk/${slugify(title)}`}
            className={styles.cardLink}
          >
            <Card className={styles.solutionCard} variant="tinted">
              {title}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
