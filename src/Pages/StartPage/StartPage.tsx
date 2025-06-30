import { Card } from '@digdir/designsystemet-react';
import { Link } from 'react-router-dom';
import { logoLight } from '~/assets';
import { solutions } from '~/data/solutions';
import styles from './StartPage.module.css';

export function StartPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <img src={logoLight} className={styles.logo} alt="desKI logo" />
        <h2 className={styles.headerQuestion}>
          Hei, hvilken løsning vil du ha hjelp med i dag?
        </h2>
      </div>
      <div className={styles.cardContainer}>
        {solutions.map((title) => (
          <Link
            key={title}
            to={`/chatbot?solution=${title}`}
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
