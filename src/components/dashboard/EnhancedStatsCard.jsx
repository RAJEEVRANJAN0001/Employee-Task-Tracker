import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Enhanced Stats Card with 3D tilt, circular progress, and trend indicators
 */
const EnhancedStatsCard = ({ title, value, total, trend, icon: Icon, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
    const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    // Calculate percentage
    const percentage = total ? Math.round((value / total) * 100) : 0;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 200 }}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05, y: -8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onHoverStart={() => setIsHovered(true)}
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-secondary-800/80 dark:to-secondary-900/60 backdrop-blur-xl border border-white/30 dark:border-secondary-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-400/30 rounded-full"
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "200%" : "-100%" }}
                transition={{ duration: 0.8 }}
            />

            <div className="relative z-10 flex items-center justify-between">
                {/* Left side - Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <motion.div
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 0.6 }}
                            className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-black shadow-lg"
                        >
                            <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <p className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
                            {title}
                        </p>
                    </div>

                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        className="mb-2"
                    >
                        <span className="text-4xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 dark:from-white dark:to-secondary-300 bg-clip-text text-transparent">
                            {value}
                        </span>
                        {total && (
                            <span className="text-lg text-secondary-500 dark:text-secondary-400 ml-1">
                                / {total}
                            </span>
                        )}
                    </motion.div>

                    {/* Trend indicator */}
                    {trend && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            {trend > 0 ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            <span>{Math.abs(trend)}%</span>
                        </motion.div>
                    )}
                </div>

                {/* Right side - Circular Progress */}
                {total && (
                    <div className="relative">
                        <svg className="w-24 h-24 transform -rotate-90">
                            {/* Background circle */}
                            <circle
                                cx="48"
                                cy="48"
                                r="45"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="none"
                                className="text-secondary-200 dark:text-secondary-700"
                            />
                            {/* Progress circle */}
                            <motion.circle
                                cx="48"
                                cy="48"
                                r="45"
                                stroke="url(#gradient)"
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{
                                    strokeDasharray: circumference,
                                }}
                            />
                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#374151" />
                                    <stop offset="100%" stopColor="#000000" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Percentage text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                                animate={{ scale: isHovered ? 1.2 : 1 }}
                                className="text-xl font-bold text-secondary-900 dark:text-white"
                            >
                                {percentage}%
                            </motion.span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom progress bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-black origin-left"
            />
        </motion.div>
    );
};

export default EnhancedStatsCard;
