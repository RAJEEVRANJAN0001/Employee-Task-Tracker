import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Confetti Animation Component
 */
const Confetti = ({ trigger, duration = 3000 }) => {
    const [particles, setParticles] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (trigger) {
            // Generate confetti particles
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: -20,
                rotation: Math.random() * 360,
                color: ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'][Math.floor(Math.random() * 6)],
                size: Math.random() * 10 + 5,
                velocity: {
                    x: (Math.random() - 0.5) * 4,
                    y: Math.random() * 3 + 2,
                },
            }));

            setParticles(newParticles);
            setIsActive(true);

            // Clear after duration
            const timer = setTimeout(() => {
                setIsActive(false);
                setParticles([]);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return (
        <AnimatePresence>
            {isActive && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{
                                x: particle.x,
                                y: particle.y,
                                rotate: particle.rotation,
                                opacity: 1,
                            }}
                            animate={{
                                y: window.innerHeight + 100,
                                x: particle.x + particle.velocity.x * 100,
                                rotate: particle.rotation + 720,
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: duration / 1000,
                                ease: 'easeIn',
                            }}
                            style={{
                                position: 'absolute',
                                width: particle.size,
                                height: particle.size,
                                backgroundColor: particle.color,
                                borderRadius: '2px',
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};

export default Confetti;
