import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UserPlus, Calendar, FileText, Download, Upload, Zap } from 'lucide-react';

/**
 * Quick Actions Menu - Floating speed dial
 */
const QuickActionsMenu = ({ onAddTask, onAction }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const actions = [
        { id: 'add-task', icon: Plus, label: 'Add Task', color: 'from-gray-700 to-black', action: onAddTask },
        { id: 'add-member', icon: UserPlus, label: 'Add Member', color: 'from-gray-600 to-gray-800' },
        { id: 'schedule', icon: Calendar, label: 'Schedule Meeting', color: 'from-gray-700 to-gray-900' },
        { id: 'export', icon: Download, label: 'Export Data', color: 'from-gray-800 to-black' },
        { id: 'import', icon: Upload, label: 'Import Data', color: 'from-gray-600 to-gray-800' },
    ];

    return (
        <div className="fixed bottom-8 right-24 z-30">
            {/* Action Buttons */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-20 right-0 space-y-3"
                    >
                        {actions.map((action, index) => (
                            <motion.button
                                key={action.id}
                                initial={{ opacity: 0, x: 20, y: 20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: 20, y: 20 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.1, x: -8 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (action.action) action.action();
                                    else if (onAction) onAction(action.id);
                                    setIsOpen(false);
                                }}
                                className="group flex items-center gap-3 w-full"
                            >
                                {/* Label */}
                                <span className="px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {action.label}
                                </span>

                                {/* Icon Button */}
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                                    <action.icon className="w-6 h-6 text-white" />
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
          ${isOpen
                        ? 'bg-gray-700 hover:bg-gray-800'
                        : 'bg-gray-900 hover:shadow-2xl'
                    }
        `}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? (
                        <Plus className="w-6 h-6 text-white" />
                    ) : (
                        <Zap className="w-6 h-6 text-white" />
                    )}
                </motion.div>

                {/* Pulse effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />
                )}
            </motion.button>
        </div>
    );
};

// Add React import at the top
import React from 'react';

export default QuickActionsMenu;
