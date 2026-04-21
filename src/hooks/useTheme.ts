import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('dvd-shelf-theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dvd-shelf-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => t === 'light' ? 'dark' : 'light');

  return { theme, toggle, isDark: theme === 'dark' };
}
