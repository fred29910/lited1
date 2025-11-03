import { createContext } from '@lit/context';

export type Theme = 'light' | 'dark';

export interface ThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContext>(
  Symbol('theme-context')
);
