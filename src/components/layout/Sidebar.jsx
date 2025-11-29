import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    Home,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Sidebar Component - Navigation sidebar with user profile
 */
const Sidebar = ({
    activeView,
    onViewChange,
    onBackToLanding,
    isCollapsed,
    onToggleCollapse,
    employeeCount,
    taskCount,
}) => {
    const { user } = useAuth();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
        { id: 'employees', label: 'Employees', icon: Users, count: employeeCount },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: taskCount },
        { id: 'settings', label: 'Settings', icon: Settings, count: null },
    ];

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl border-r border-secondary-200 dark:border-secondary-700 shadow-xl z-50"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                    <div className="flex items-center justify-between">
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center">
                                        <CheckSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-lg text-secondary-900 dark:text-white">
                                            Task Tracker
                                        </h1>
                                        <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                            v2.0
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={onToggleCollapse}
                            className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                            ) : (
                                <ChevronLeft className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onViewChange(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg'
                                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="flex items-center justify-between flex-1"
                                        >
                                            <span className="font-medium">{item.label}</span>
                                            {item.count !== null && (
                                                <span
                                                    className={`
                                                        px-2 py-1 rounded-full text-xs font-semibold
                                                        ${isActive
                                                            ? 'bg-white/20 text-white'
                                                            : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300'
                                                        }
                                                    `}
                                                >
                                                    {item.count}
                                                </span>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
                    <div className={`flex items-center gap-3 p-3 rounded-xl bg-secondary-50 dark:bg-secondary-800 ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {getInitials(user?.name)}
                        </div>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex-1 min-w-0"
                                >
                                    <p className="font-semibold text-sm text-secondary-900 dark:text-white truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
