import { Button } from "@digdir/designsystemet-react";
import { EarthIcon, MoonIcon } from "@navikt/aksel-icons";
import styles from "./UtilityBar.module.css";

export function UtilityBar() {
  return (
    <div className={styles.utilityBarContainer}>
      <Button className={styles.utilityButton}>
        <MoonIcon className={styles.moonIcon}/>
      </Button>
      <Button className={styles.utilityButton}>
        <EarthIcon/>
      </Button>
    </div>
  );
}
