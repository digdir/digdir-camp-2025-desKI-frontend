import { createContext, useContext } from 'react';

export type ColorMode = 'light' | 'dark' | 'auto';

export const ColorMode = {
  Light: 'light' as ColorMode,
  Dark: 'dark' as ColorMode,
  Auto: 'auto' as ColorMode,
};

export type Setting = 'colorMode';

export const Setting = {
  ColorMode: 'colorMode' as Setting,
};

type SettingsMap = {
  [Setting.ColorMode]: ColorMode;
};

const defaultValues = {
  [Setting.ColorMode]: ColorMode.Auto,
};

export const UserSettingsContext = createContext<{
  [Setting.ColorMode]: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}>({
  [Setting.ColorMode]: ColorMode.Auto,
  setColorMode: () => {},
});

export const useColorMode = (): [
  ColorMode,
  (newColorMode: ColorMode) => void,
] => {
  const { [Setting.ColorMode]: colorMode, setColorMode } =
    useContext(UserSettingsContext);
  return [colorMode, setColorMode];
};

export const getSetting = (setting: Setting) => {
  const settings = JSON.parse(localStorage.getItem('settings') || '{}');
  return settings[setting] ?? defaultValues[setting];
};

export const setSettings = (updatedSettings: Partial<SettingsMap>) => {
  let settings = JSON.parse(localStorage.getItem('settings') || '{}');
  settings = { ...settings, ...updatedSettings };
  localStorage.setItem('settings', JSON.stringify(settings));

  window.dispatchEvent(new StorageEvent('storage', { key: 'settings' }));
};
