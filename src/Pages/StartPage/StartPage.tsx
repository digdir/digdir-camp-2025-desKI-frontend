import { Card } from '@digdir/designsystemet-react';
import { logoLight } from '~/assets';
import styles from './StartPage.module.css';

/*
  * StartPage component that displays a list of solutions that the user can select to get help with.
  * Each solution is displayed as a card.
  * The component is styled using CSS modules.
  * @returns {JSX.Element} The rendered StartPage component.
*/

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

  /*
    * The main container for the StartPage component.
  */
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
          <Card key={title} className={styles.solutionCard} variant="tinted">
            {title}
          </Card>
        ))}
      </div>
    </div>
  );
}
