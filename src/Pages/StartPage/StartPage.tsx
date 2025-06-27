import { logoLight } from '~/assets';
import styles from './StartPage.module.css';
export function StartPage() {
return (
    <div className={styles.mainContainer}>
        <h1 className={styles.test}>Test</h1>
        <img src={logoLight} className={styles.logo}/>
    </div>
 );
}