import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

/**
 * Toast notification component
 */
const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle2,
            bgClass: 'bg-gray-800',
            textClass: 'text-white',
        },
        error: {
            icon: XCircle,
            bgClass: 'bg-gray-900',
            textClass: 'text-white',
        },
    };

    const { icon: Icon, bgClass, textClass } = config[type] || config.success;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="fixed bottom-8 right-8 z-50 max-w-sm"
                >
                    <div className={`${bgClass} ${textClass} rounded-lg shadow-2xl p-4 flex items-center gap-3`}>
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <p className="flex-1 font-medium">{message}</p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-1 rounded hover:bg-white/20 transition-colors"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
