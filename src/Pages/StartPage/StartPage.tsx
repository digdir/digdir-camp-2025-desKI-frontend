import { Card } from '@digdir/designsystemet-react';
import { Link } from 'react-router';
import { logoLight } from '~/assets';
import styles from './StartPage.module.css';

export function StartPage() {
  const solutions = [
    'ID-porten',
    'Maskinporten',
    'eFormidling',
    'eSignering',
    'Kontakt- og reservasjonsregisteret',
    'Digital postkasse til Innbyggere',
    'eInnsyn',
    'ELMA',
    'Ansattporten',
    'Peppol eGovernment',
    'Digital lommebok',
    'Other',
  ];
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <img src={logoLight} className={styles.logo} alt="desKI logo" />
        <h2 className={styles.headerQuestion}>
          Which solution can I help you with today?
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
