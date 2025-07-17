import { Card } from '@digdir/designsystemet-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '~/components/Logo/Logo';
import { KEY } from '~/i18n/constants';
import styles from './StartPage.module.css';

export function BrukerstotteStartPage() {
  const { t } = useTranslation();
  const solutions = t(KEY.brukerstotte_solutions_list, {
    returnObjects: true,
  }) as string[];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Logo />
          <div className={styles.serviceType}>Brukerstøtte</div>
        </div>
        <h2 className={styles.headerQuestion}>
          {t(KEY.initial_welcome_brukerstotte)}
        </h2>
      </div>
      <div className={styles.cardContainer}>
        {solutions.map((title) => (
          <Link
            key={title}
            to={`/brukerstotte/chatbot?solution=${title}`}
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
