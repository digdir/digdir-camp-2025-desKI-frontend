import { Button } from "@digdir/designsystemet-react";
import { MoonIcon, SunIcon } from "@navikt/aksel-icons";
import { ColorMode, useColorMode } from "~/lib/settings";
import styles from '../UtilityBar.module.css';

export default function ColorModeSwitch() {
  const [colorMode, setColorMode] = useColorMode();

  // Fallback to system on first load — but only toggle light/dark manually
  const toggleColorMode = () => {
    const newMode = colorMode === "dark" ? ColorMode.Light : ColorMode.Dark;
    setColorMode(newMode);
  };

  const colorModeText = () => {
    return colorMode === "dark" ? (
      <SunIcon/>
    ) : (
      <MoonIcon/>
    );
  };

  return (
    <Button
      variant="tertiary"
      className={styles.utilityButton}
      onClick={toggleColorMode}
    >
      {colorModeText()}
    </Button>
  );
}
