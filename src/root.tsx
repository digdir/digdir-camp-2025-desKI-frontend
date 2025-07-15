import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UtilityBar } from './components/UtilityBar/UtilityBar';
import {
  type ColorMode,
  Setting,
  UserSettingsContext,
  getSetting,
  setSettings,
} from './lib/settings';

// Loader for React Router
export async function clientLoader() {
  const colorMode = getSetting(Setting.ColorMode);

  const darkMode =
    colorMode === 'dark' ||
    (colorMode === 'auto' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    colorMode,
    darkMode,
  };
}

// Root layout component used by the router.
export default function RootLayout() {
  const [colorMode, setColorModeState] = useState<ColorMode>(
    getSetting(Setting.ColorMode),
  );

  // Updates the color mode both in state and in localStorage.
  const setColorMode = (newMode: ColorMode) => {
    setColorModeState(newMode);
    setSettings({ [Setting.ColorMode]: newMode });
  };

  // Dynamically apply theme class
  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const shouldUseDark =
      colorMode === 'dark' || (colorMode === 'auto' && prefersDark);

    const html = document.documentElement;
    html.setAttribute('data-color-scheme', shouldUseDark ? 'dark' : 'light');
    html.classList.remove('dark', 'light');
    html.classList.add(shouldUseDark ? 'dark' : 'light');
  }, [colorMode]);

  return (
    <UserSettingsContext.Provider
      value={{ [Setting.ColorMode]: colorMode, setColorMode }}
    >
      <div id="app-root">
        <UtilityBar />
        <main>
          <Outlet />
        </main>
      </div>
    </UserSettingsContext.Provider>
  );
}
