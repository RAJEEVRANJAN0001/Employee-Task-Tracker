import { motion } from 'framer-motion';
import { User, Bell, Palette, Shield, Database, HelpCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Settings View - Application settings and preferences
 */
const SettingsView = ({ theme, onToggleTheme }) => {
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [autoSave, setAutoSave] = useState(true);

    const settingsSections = [
        {
            title: 'Appearance',
            icon: Palette,
            settings: [
                {
                    id: 'theme',
                    label: 'Dark Mode',
                    description: 'Toggle between light and dark theme',
                    type: 'toggle',
                    value: theme === 'dark',
                    onChange: onToggleTheme,
                },
            ],
        },
        {
            title: 'Notifications',
            icon: Bell,
            settings: [
                {
                    id: 'notifications',
                    label: 'Push Notifications',
                    description: 'Receive notifications for task updates',
                    type: 'toggle',
                    value: notifications,
                    onChange: () => setNotifications(!notifications),
                },
                {
                    id: 'email',
                    label: 'Email Updates',
                    description: 'Get email notifications for important updates',
                    type: 'toggle',
                    value: emailUpdates,
                    onChange: () => setEmailUpdates(!emailUpdates),
                },
            ],
        },
        {
            title: 'Data & Storage',
            icon: Database,
            settings: [
                {
                    id: 'autosave',
                    label: 'Auto-save',
                    description: 'Automatically save changes to localStorage',
                    type: 'toggle',
                    value: autoSave,
                    onChange: () => setAutoSave(!autoSave),
                },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold gradient-text">Settings</h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                    Manage your application preferences and settings
                </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {settingsSections.map((section, sectionIndex) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-secondary-700/50 shadow-lg p-6"
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-black">
                                <section.icon className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                                {section.title}
                            </h2>
                        </div>

                        {/* Settings Items */}
                        <div className="space-y-4">
                            {section.settings.map((setting) => (
                                <div
                                    key={setting.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/50 hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                                            {setting.label}
                                        </h3>
                                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                            {setting.description}
                                        </p>
                                    </div>

                                    {/* Toggle Switch */}
                                    {setting.type === 'toggle' && (
                                        <button
                                            onClick={setting.onChange}
                                            className={`
                        relative w-14 h-7 rounded-full transition-colors duration-200
                        ${setting.value
                                                    ? 'bg-gradient-to-r from-gray-700 to-black'
                                                    : 'bg-secondary-300 dark:bg-secondary-600'
                                                }
                      `}
                                            aria-label={`Toggle ${setting.label}`}
                                        >
                                            <motion.div
                                                animate={{ x: setting.value ? 28 : 2 }}
                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-secondary-700/50 shadow-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                                Account
                            </h2>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-secondary-600 dark:text-secondary-400">Name:</span>
                                <span className="font-semibold text-secondary-900 dark:text-secondary-100">John Doe</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary-600 dark:text-secondary-400">Role:</span>
                                <span className="font-semibold text-secondary-900 dark:text-secondary-100">Admin</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-secondary-600 dark:text-secondary-400">Email:</span>
                                <span className="font-semibold text-secondary-900 dark:text-secondary-100">john@example.com</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Help & Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-secondary-700/50 shadow-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
                                <HelpCircle className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                                Help & Support
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-secondary-50 dark:bg-secondary-900/50 hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                📚 Documentation
                            </button>
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-secondary-50 dark:bg-secondary-900/50 hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                💬 Contact Support
                            </button>
                            <button className="w-full text-left px-4 py-2 rounded-lg bg-secondary-50 dark:bg-secondary-900/50 hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                🐛 Report a Bug
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-100 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700/50 shadow-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gray-800">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Danger Zone
                        </h2>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="space-y-3">
                        <button className="w-full px-4 py-2 rounded-lg border-2 border-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 font-semibold">
                            Clear All Data
                        </button>
                        <button className="w-full px-4 py-2 rounded-lg border-2 border-gray-900 text-gray-900 dark:text-gray-200 hover:bg-gray-900 hover:text-white transition-all duration-200 font-semibold">
                            Reset to Defaults
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsView;
