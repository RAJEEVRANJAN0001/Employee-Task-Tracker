import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Mail, LogOut, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = () => {
    const { user, logout, updatePassword } = useAuth();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
        setMessage({ text: '', type: '' });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        // Validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
            setMessage({ text: 'Please fill in all password fields', type: 'error' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ text: 'New password must be at least 6 characters long', type: 'error' });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setMessage({ text: 'New passwords do not match', type: 'error' });
            return;
        }

        setIsLoading(true);

        const result = await updatePassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });

        setIsLoading(false);

        if (result.success) {
            setMessage({ text: 'Password updated successfully!', type: 'success' });
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } else {
            setMessage({ text: result.error, type: 'error' });
        }
    };

    return (
        <div className="space-y-6">
            {/* User Information Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {user?.email}
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">User ID</p>
                            <p className="text-gray-900 dark:text-white font-mono">{user?.id?.slice(0, 8)}...</p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Account Type</p>
                            <p className="text-gray-900 dark:text-white">Standard</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Change Password Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Change Password</h3>
                </div>

                {/* Message */}
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-lg p-3 mb-4 ${message.type === 'success'
                                ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                                : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                            }`}
                    >
                        <p className={`text-sm ${message.type === 'success'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-red-700 dark:text-red-400'
                            }`}>
                            {message.text}
                        </p>
                    </motion.div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            placeholder="Enter new password (min 6 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all shadow-lg shadow-sky-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </motion.button>
                </form>
            </motion.div>

            {/* Logout Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Sign Out</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sign out of your account</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default AccountSettings;
