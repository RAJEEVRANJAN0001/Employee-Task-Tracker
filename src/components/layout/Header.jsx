import { Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Header component with app title, search bar, and theme toggle
 */
const Header = ({ searchQuery, onSearchChange, theme, onToggleTheme }) => {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-30 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-lg border-b border-secondary-200 dark:border-secondary-700 shadow-sm"
        >
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* App Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">T</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">
                                Task Tracker
                            </h1>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                Employee Management Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Search Bar and Theme Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                            <input
                                type="text"
                                placeholder="Search employees or tasks..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                aria-label="Search employees or tasks"
                            />
                        </div>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onToggleTheme}
                            className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5 text-secondary-700 dark:text-secondary-300" />
                            ) : (
                                <Sun className="w-5 h-5 text-secondary-700 dark:text-secondary-300" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
