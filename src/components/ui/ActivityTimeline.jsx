import { motion } from 'framer-motion';
import { CheckCircle2, Clock, UserPlus, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateFormatter';

/**
 * Activity Timeline Component
 */
const ActivityTimeline = () => {
    const activities = [
        {
            id: 1,
            type: 'task_completed',
            icon: CheckCircle2,
            color: 'green',
            user: 'Sarah Johnson',
            action: 'completed',
            target: 'Implement user authentication',
            time: '2025-11-28T23:00:00Z',
        },
        {
            id: 2,
            type: 'task_updated',
            icon: Clock,
            color: 'blue',
            user: 'Michael Chen',
            action: 'updated status to In Progress',
            target: 'User research interviews',
            time: '2025-11-28T22:30:00Z',
        },
        {
            id: 3,
            type: 'member_added',
            icon: UserPlus,
            color: 'purple',
            user: 'Admin',
            action: 'added',
            target: 'Alex Martinez to the team',
            time: '2025-11-28T20:00:00Z',
        },
        {
            id: 4,
            type: 'document_uploaded',
            icon: FileText,
            color: 'orange',
            user: 'Emily Rodriguez',
            action: 'uploaded',
            target: 'Q4 Roadmap Document',
            time: '2025-11-28T18:00:00Z',
        },
        {
            id: 5,
            type: 'comment',
            icon: MessageSquare,
            color: 'pink',
            user: 'David Kim',
            action: 'commented on',
            target: 'API rate limiting task',
            time: '2025-11-28T16:00:00Z',
        },
        {
            id: 6,
            type: 'milestone',
            icon: TrendingUp,
            color: 'indigo',
            user: 'System',
            action: 'achieved',
            target: '80% completion rate milestone',
            time: '2025-11-28T14:00:00Z',
        },
    ];

    const getColorClasses = (color) => {
        const monochrome = {
            bg: 'bg-gray-100 dark:bg-gray-800',
            text: 'text-gray-700 dark:text-gray-300',
            border: 'border-gray-300 dark:border-gray-600',
        };
        return monochrome;
    };

    return (
        <div className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-secondary-700/50 shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold gradient-text">Activity Timeline</h2>
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    View All
                </button>
            </div>

            <div className="relative space-y-6">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 opacity-20" />

                {activities.map((activity, index) => {
                    const colors = getColorClasses(activity.color);

                    return (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex gap-4"
                        >
                            {/* Icon */}
                            <div className={`relative z-10 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 border-2 ${colors.border}`}>
                                <activity.icon className={`w-5 h-5 ${colors.text}`} />
                            </div>

                            {/* Content */}
                            <motion.div
                                whileHover={{ x: 4 }}
                                className="flex-1 pb-6"
                            >
                                <div className="p-4 rounded-xl bg-secondary-50/50 dark:bg-secondary-900/30 border border-secondary-200 dark:border-secondary-700 hover:shadow-md transition-all duration-200">
                                    <p className="text-sm text-secondary-900 dark:text-secondary-100 mb-1">
                                        <span className="font-semibold">{activity.user}</span>
                                        {' '}{activity.action}{' '}
                                        <span className="font-semibold">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                        {formatRelativeTime(activity.time)}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Load More */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-secondary-300 dark:border-secondary-600 text-secondary-600 dark:text-secondary-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium"
            >
                Load More Activities
            </motion.button>
        </div>
    );
};

export default ActivityTimeline;
