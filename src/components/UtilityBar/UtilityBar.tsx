import { Button } from '@digdir/designsystemet-react';
import { EarthIcon } from '@navikt/aksel-icons';
import ColorModeSwitch from './ColorModeSwitch/ColorModeSwitch';
import styles from './UtilityBar.module.css';

export function UtilityBar() {
  return (
    <div className={styles.utilityBarContainer}>
      <ColorModeSwitch />
      <Button className={styles.utilityButton}>
        <EarthIcon />
      </Button>
    </div>
  );
}
