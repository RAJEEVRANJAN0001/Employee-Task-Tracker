import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Bell,
    Settings,
    FileText,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Home
} from 'lucide-react';

/**
 * Sidebar Navigation Component - Office-style collapsible sidebar
 */
const Sidebar = ({ activeView, onViewChange, onBackToLanding, isCollapsed, onToggleCollapse, employeeCount = 0, taskCount = 0 }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
        { id: 'employees', icon: Users, label: 'Employees', badge: employeeCount.toString() },
        { id: 'tasks', icon: FileText, label: 'Tasks', badge: taskCount.toString() },
        { id: 'settings', icon: Settings, label: 'Settings', badge: null },
    ];

    const bottomItems = [
        { id: 'landing', icon: Home, label: 'Home', action: onBackToLanding },
    ];

    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border-r border-secondary-200 dark:border-secondary-700 z-40 flex flex-col"
        >
            {/* Logo Section */}
            <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center justify-between">
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                                    <span className="text-white font-bold text-xl">T</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg gradient-text">TaskTracker</h2>
                                    <p className="text-xs text-secondary-500">Pro Edition</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onToggleCollapse}
                        className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onViewChange(item.id)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeView === item.id
                                    ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg shadow-gray-500/30'
                                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                                }
              `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />

                            {!isCollapsed && (
                                <>
                                    <span className="flex-1 text-left font-medium">{item.label}</span>
                                    {item.badge && (
                                        <span className={`
                      px-2 py-0.5 rounded-full text-xs font-semibold
                      ${activeView === item.id
                                                ? 'bg-white/20 text-white'
                                                : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                            }
                    `}>
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </motion.button>
                    ))}
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700 space-y-2">
                {bottomItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={item.action || (() => onViewChange(item.id))}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="flex-1 text-left font-medium">{item.label}</span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* User Profile (if not collapsed) */}
            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border-t border-secondary-200 dark:border-secondary-700"
                >
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-50 dark:bg-secondary-900/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center">
                            <span className="text-white font-semibold">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-secondary-900 dark:text-secondary-100 truncate">
                                John Doe
                            </p>
                            <p className="text-xs text-secondary-500 truncate">Admin</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                            aria-label="Logout"
                        >
                            <LogOut className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.aside>
    );
};

export default Sidebar;
