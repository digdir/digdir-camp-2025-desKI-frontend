import { logoLight } from '~/assets';
import styles from './StartPage.module.css';
import { Card } from '@digdir/designsystemet-react';

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
               <img src={logoLight} className={styles.logo}/>
               <h2 className={styles.headerQuestion}>Which solution can I help you with today?</h2>
            </div>
            <div className={styles.cardContainer}>
                {solutions.map((title) => (
                    <Card key={title} className={styles.solutionCard} variant='tinted'>
                        {title}
                    </Card>
                ))}
            </div>
        </div>
    );
}