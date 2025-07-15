import { Button, Tooltip } from '@digdir/designsystemet-react';
import { MoonIcon, SunIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { KEY } from '~/i18n/constants';
import { ColorMode, useColorMode } from '~/lib/settings';
import styles from '../UtilityBar.module.css';

export default function ColorModeSwitch() {
  const { t } = useTranslation();
  const [colorMode, setColorMode] = useColorMode();

  // Fallback to system on first load — but only toggle light/dark manually
  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? ColorMode.Light : ColorMode.Dark;
    setColorMode(newMode);
  };

  const icon = colorMode === 'dark' ? <SunIcon /> : <MoonIcon />;

  const translatedThemeLabel = t(
    colorMode === 'dark' ? KEY.theme_light : KEY.theme_dark,
  );

  const tooltipText = t(KEY.theme_toggle, {
    theme: translatedThemeLabel,
  });

  return (
    <Tooltip content={tooltipText} placement="bottom">
      <Button
        variant="tertiary"
        className={styles.utilityButton}
        onClick={toggleColorMode}
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
