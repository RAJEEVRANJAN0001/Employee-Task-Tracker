import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateFormatter';

/**
 * Notifications Panel Component
 */
const NotificationsPanel = ({ isOpen, onClose }) => {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Task Completed',
            message: 'Sarah Johnson completed "Implement user authentication"',
            time: '2025-11-28T23:00:00Z',
            unread: true,
        },
        {
            id: 2,
            type: 'info',
            title: 'New Task Assigned',
            message: 'You have been assigned to "Code review for payment module"',
            time: '2025-11-28T22:30:00Z',
            unread: true,
        },
        {
            id: 3,
            type: 'warning',
            title: 'Deadline Approaching',
            message: 'Task "Q4 roadmap planning" is due in 2 days',
            time: '2025-11-28T20:00:00Z',
            unread: false,
        },
        {
            id: 4,
            type: 'info',
            title: 'Team Update',
            message: 'Michael Chen updated the design system documentation',
            time: '2025-11-28T18:00:00Z',
            unread: false,
        },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return { Icon: CheckCircle2, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800' };
            case 'warning':
                return { Icon: AlertCircle, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800' };
            case 'info':
            default:
                return { Icon: Info, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800' };
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-xl border-l border-secondary-200 dark:border-secondary-700 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold gradient-text">Notifications</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                                    aria-label="Close notifications"
                                >
                                    <X className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                                </motion.button>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
                                    2 New
                                </span>
                                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                                    Mark all as read
                                </button>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {notifications.map((notification, index) => {
                                const { Icon, color, bg } = getIcon(notification.type);

                                return (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, x: -4 }}
                                        className={`
                      p-4 rounded-xl border transition-all duration-200 cursor-pointer
                      ${notification.unread
                                                ? 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
                                                : 'bg-secondary-50/50 dark:bg-secondary-900/30 border-secondary-200 dark:border-secondary-700'
                                            }
                    `}
                                    >
                                        <div className="flex gap-3">
                                            {/* Icon */}
                                            <div className={`p-2 rounded-lg ${bg} flex-shrink-0`}>
                                                <Icon className={`w-5 h-5 ${color}`} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                                                        {notification.title}
                                                    </h3>
                                                    {notification.unread && (
                                                        <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-secondary-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatRelativeTime(notification.time)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
                            <button className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:shadow-lg transition-all duration-200">
                                View All Notifications
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationsPanel;
