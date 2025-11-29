/**
 * LocalStorage utility functions for persisting application state
 */

const STORAGE_KEYS = {
    EMPLOYEES: 'employee-task-tracker-employees',
    THEME: 'employee-task-tracker-theme',
    FILTERS: 'employee-task-tracker-filters',
};

/**
 * Load employees from localStorage or return null
 * @returns {Array|null} Employee data or null if not found
 */
export const loadEmployees = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading employees from localStorage:', error);
        return null;
    }
};

/**
 * Save employees to localStorage
 * @param {Array} employees - Employee data to save
 */
export const saveEmployees = (employees) => {
    try {
        localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    } catch (error) {
        console.error('Error saving employees to localStorage:', error);
    }
};

/**
 * Load theme preference from localStorage
 * @returns {string} 'light' or 'dark'
 */
export const loadTheme = () => {
    try {
        const theme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (theme) return theme;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    } catch (error) {
        console.error('Error loading theme from localStorage:', error);
        return 'light';
    }
};

/**
 * Save theme preference to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
export const saveTheme = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
        console.error('Error saving theme to localStorage:', error);
    }
};

/**
 * Load filter state from localStorage
 * @returns {Object|null} Filter state or null
 */
export const loadFilters = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FILTERS);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading filters from localStorage:', error);
        return null;
    }
};

/**
 * Save filter state to localStorage
 * @param {Object} filters - Filter state to save
 */
export const saveFilters = (filters) => {
    try {
        localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    } catch (error) {
        console.error('Error saving filters to localStorage:', error);
    }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllData = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};
