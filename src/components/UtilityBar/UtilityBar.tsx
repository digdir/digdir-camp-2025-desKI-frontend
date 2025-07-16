import ColorModeSwitch from './ColorModeSwitch/ColorModeSwitch';
import { LanguageDropdown } from './LanguageDropdown/LanguageDropdown';
import styles from './UtilityBar.module.css';

export function UtilityBar() {
  return (
    <div className={styles.utilityBarContainer}>
      <ColorModeSwitch />
      <LanguageDropdown />
    </div>
  );
}
