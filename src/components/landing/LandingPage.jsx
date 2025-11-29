import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Users,
    Zap,
    Shield,
    BarChart3,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import ModernClock from './ModernClock';
import { CornerArrowCard, GlassmorphicCard, FlipCard } from '../ui/InteractiveCards';


/**
 * Landing Page Component - Hero and Features
 */
const LandingPage = ({ onGetStarted }) => {
    const features = [
        {
            icon: Users,
            title: 'Team Management',
            description: 'Manage your entire team with beautiful employee cards and real-time task tracking',
            gradient: 'from-gray-700 to-gray-900',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Built with React and Vite for blazing fast performance and smooth interactions',
            gradient: 'from-gray-600 to-gray-800',
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Get insights with comprehensive metrics and productivity analytics at a glance',
            gradient: 'from-gray-700 to-black',
        },
        {
            icon: Shield,
            title: 'Data Persistence',
            description: 'Your data is safely stored locally and persists across browser sessions',
            gradient: 'from-gray-600 to-gray-900',
        },
        {
            icon: Sparkles,
            title: 'Beautiful UI',
            description: 'Modern design with dark mode, smooth animations, and glassmorphism effects',
            gradient: 'from-gray-800 to-black',
        },
        {
            icon: TrendingUp,
            title: 'Boost Productivity',
            description: 'Track progress, filter tasks, and manage workflows efficiently in one place',
            gradient: 'from-gray-700 to-gray-900',
        },
    ];



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-900">
            {/* Animated Liquid Wave Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Liquid Wave Animation with Multiple Layers */}
                <svg className="absolute w-full h-full opacity-40" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    {/* Bottom Wave Layer - Darkest */}
                    <motion.path
                        d="M0,400L48,380C96,360,192,320,288,310C384,300,480,320,576,350C672,380,768,420,864,420C960,420,1056,380,1152,360C1248,340,1344,340,1392,340L1440,340L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                        fill="#0a0a0a"
                        fillOpacity="0.8"
                        animate={{
                            d: [
                                "M0,400L48,380C96,360,192,320,288,310C384,300,480,320,576,350C672,380,768,420,864,420C960,420,1056,380,1152,360C1248,340,1344,340,1392,340L1440,340L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,450L48,430C96,410,192,370,288,360C384,350,480,370,576,400C672,430,768,470,864,470C960,470,1056,430,1152,410C1248,390,1344,390,1392,390L1440,390L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,380L48,360C96,340,192,300,288,290C384,280,480,300,576,330C672,360,768,400,864,400C960,400,1056,360,1152,340C1248,320,1344,320,1392,320L1440,320L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                            ]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Middle Wave Layer */}
                    <motion.path
                        d="M0,500L48,480C96,460,192,420,288,400C384,380,480,380,576,400C672,420,768,460,864,470C960,480,1056,460,1152,440C1248,420,1344,400,1392,390L1440,380L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                        fill="#1a1a1a"
                        fillOpacity="0.6"
                        animate={{
                            d: [
                                "M0,500L48,480C96,460,192,420,288,400C384,380,480,380,576,400C672,420,768,460,864,470C960,480,1056,460,1152,440C1248,420,1344,400,1392,390L1440,380L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,520L48,500C96,480,192,440,288,420C384,400,480,400,576,420C672,440,768,480,864,490C960,500,1056,480,1152,460C1248,440,1344,420,1392,410L1440,400L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,480L48,460C96,440,192,400,288,380C384,360,480,360,576,380C672,400,768,440,864,450C960,460,1056,440,1152,420C1248,400,1344,380,1392,370L1440,360L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                            ]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />

                    {/* Top Wave Layer - Lightest */}
                    <motion.path
                        d="M0,600L48,580C96,560,192,520,288,510C384,500,480,520,576,540C672,560,768,580,864,580C960,580,1056,560,1152,550C1248,540,1344,540,1392,540L1440,540L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                        fill="#2a2a2a"
                        fillOpacity="0.4"
                        animate={{
                            d: [
                                "M0,600L48,580C96,560,192,520,288,510C384,500,480,520,576,540C672,560,768,580,864,580C960,580,1056,560,1152,550C1248,540,1344,540,1392,540L1440,540L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,580L48,560C96,540,192,500,288,490C384,480,480,500,576,520C672,540,768,560,864,560C960,560,1056,540,1152,530C1248,520,1344,520,1392,520L1440,520L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
                                "M0,620L48,600C96,580,192,540,288,530C384,520,480,540,576,560C672,580,768,600,864,600C960,600,1056,580,1152,570C1248,560,1344,560,1392,560L1440,560L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                            ]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    {/* Floating Particles for Liquid Effect */}
                    {[...Array(15)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={Math.random() * 1440}
                            cy={400 + Math.random() * 300}
                            r={2 + Math.random() * 4}
                            fill="#ffffff"
                            fillOpacity="0.1"
                            animate={{
                                cy: [
                                    400 + Math.random() * 300,
                                    350 + Math.random() * 300,
                                    400 + Math.random() * 300
                                ],
                                cx: [
                                    Math.random() * 1440,
                                    Math.random() * 1440,
                                    Math.random() * 1440
                                ],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            {/* Main Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                            >
                                <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-black dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                                    Task Management
                                </span>
                                <br />
                                <span className="text-secondary-900 dark:text-white">
                                    Made Beautiful
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                            >
                                A modern, interactive dashboard for managing your team's tasks with stunning UI,
                                real-time updates, and powerful analytics.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-8"
                            >
                                <ModernClock onClick={onGetStarted} />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm text-secondary-900 dark:text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700"
                                >
                                    View Demo
                                </motion.button>
                            </motion.div>

                        </motion.div>
                    </div>
                </section>

                {/* Interactive Showcase Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-gray-700 to-black dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                    Interactive Experience
                                </span>
                            </h2>
                            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
                                Explore our interactive card designs with stunning animations
                            </p>
                        </motion.div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
                            {/* Corner Arrow Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <CornerArrowCard
                                    title="Team Management"
                                    description="Manage your entire team with beautiful employee cards and real-time task tracking. Stay organized and productive."
                                />
                            </motion.div>

                            {/* Glassmorphic Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <GlassmorphicCard
                                    icon={Sparkles}
                                    title="Premium Design"
                                    description="Experience modern design with glassmorphism effects, smooth animations, and stunning visual feedback that makes every interaction delightful."
                                />
                            </motion.div>

                            {/* Flip Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex justify-center"
                            >
                                <FlipCard
                                    frontTitle="Analytics Dashboard"
                                    frontContent="Get insights with comprehensive metrics and productivity analytics at a glance"
                                    backTitle="Available Now"
                                    backContent="Smooth 3D transitions"
                                />
                            </motion.div>

                            {/* Additional Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <CornerArrowCard
                                    title="Task Tracking"
                                    description="Create, assign, and monitor tasks with status updates. Filter by status and get real-time insights into team progress."
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <GlassmorphicCard
                                    icon={BarChart3}
                                    title="Analytics"
                                    description="Get comprehensive insights with real-time metrics, productivity analytics, and visual charts that help you make data-driven decisions."
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="flex justify-center"
                            >
                                <FlipCard
                                    frontTitle="Boost Productivity"
                                    frontContent="Track progress, filter tasks, and manage workflows efficiently in one place"
                                    backTitle="Available Now"
                                    backContent="Modern & Responsive"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-800 via-gray-900 to-black p-12 shadow-2xl">
                            {/* Animated Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
                            </div>

                            <div className="relative z-10 text-center text-white">
                                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                                    Join thousands of teams already managing their tasks with our beautiful,
                                    intuitive platform. No credit card required.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onGetStarted}
                                    className="px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
                                >
                                    Start Managing Tasks Now
                                    <ArrowRight className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
