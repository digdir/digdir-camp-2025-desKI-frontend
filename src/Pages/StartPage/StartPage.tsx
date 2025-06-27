import { logoLight } from '~/assets';
import styles from './StartPage.module.css';

export function StartPage() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
               <img src={logoLight} className={styles.logo}/>
               <h2 className={styles.headerQuestion}>Which solution can I help you with today?</h2>
            </div>
        </div>
    );
}