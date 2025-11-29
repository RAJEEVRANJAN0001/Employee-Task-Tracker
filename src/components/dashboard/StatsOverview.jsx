import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, AlertCircle, TrendingUp, ListTodo } from 'lucide-react';
import EnhancedStatsCard from './EnhancedStatsCard';

/**
 * StatsOverview component displaying key metrics with enhanced animations
 */
const StatsOverview = ({ stats }) => {
    const cards = [
        {
            title: 'Total Tasks',
            value: stats.totalTasks,
            icon: ListTodo,
            trend: 12,
            delay: 0,
        },
        {
            title: 'Completed',
            value: stats.completedTasks,
            total: stats.totalTasks,
            icon: CheckCircle2,
            trend: 8,
            delay: 0.1,
        },
        {
            title: 'In Progress',
            value: stats.inProgressTasks,
            total: stats.totalTasks,
            icon: Clock,
            trend: 5,
            delay: 0.2,
        },
        {
            title: 'Pending',
            value: stats.pendingTasks,
            total: stats.totalTasks,
            icon: AlertCircle,
            trend: -2,
            delay: 0.3,
        },
        {
            title: 'Team Members',
            value: stats.totalEmployees,
            icon: Users,
            trend: 4,
            delay: 0.4,
        },
        {
            title: 'Productivity',
            value: stats.productivity,
            icon: TrendingUp,
            trend: 1.5,
            delay: 0.5,
        },
    ];

    return (
        <div className="mb-8">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6"
            >
                Dashboard Overview
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <EnhancedStatsCard key={card.title} {...card} />
                ))}
            </div>
        </div>
    );
};

export default StatsOverview;
