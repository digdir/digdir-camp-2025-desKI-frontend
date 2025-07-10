import { Button } from '@digdir/designsystemet-react';
import { EarthIcon } from '@navikt/aksel-icons';
import styles from './UtilityBar.module.css';
import ColorModeSwitch from './ColorModeSwitch/ColorModeSwitch';

export function UtilityBar() {
  return (
    <div className={styles.utilityBarContainer}>
      <ColorModeSwitch/>
      <Button className={styles.utilityButton}>
        <EarthIcon />
      </Button>
    </div>
  );
}
