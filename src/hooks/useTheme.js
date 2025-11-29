import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/localStorage';

/**
 * Custom hook for managing dark mode theme
 * @returns {Object} { theme, toggleTheme, isDark }
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(() => loadTheme());

    useEffect(() => {
        // Apply theme to document root
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        // Save to localStorage
        saveTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const isDark = theme === 'dark';

    return { theme, toggleTheme, isDark };
};
