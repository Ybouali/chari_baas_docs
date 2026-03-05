// components/Header.tsx
import { motion, type Variants } from 'framer-motion';

export default function Header() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            } as const,
        },
    } satisfies Variants;

    const badgeVariants = {
        hover: {
            scale: 1.05,
            borderColor: 'rgba(255,255,255,0.6)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 10,
            },
        } as const,
    } satisfies Variants;

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden bg-linear-to-br from-chari-blue-900 via-chari-blue-700 to-chari-orange-900 text-white w-full py-12 px-2 md:py-12 md:px-8 rounded-2xl"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.3)_0%,transparent_50%)]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25)_0%,transparent_50%)]"
                />
            </div>

            <motion.div
                variants={containerVariants}
                className="relative max-w-5xl mx-auto text-center z-10"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 
                     bg-clip-text text-transparent bg-linear-to-r from-purple-300 via-indigo-300 to-pink-300
                     drop-shadow-xl"
                >
                    Explore ChariBaas APIs
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl font-medium text-indigo-200 mb-8"
                >
                    Test, learn, integrate – sandbox ready
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 text-lg md:text-xl font-semibold"
                >
                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-indigo-800/50 backdrop-blur-sm rounded-full border border-indigo-500/40 cursor-default"
                    >
                        <span className="text-indigo-300">81 endpoints</span>
                    </motion.div>

                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-purple-800/50 backdrop-blur-sm rounded-full border border-purple-500/40 cursor-default"
                    >
                        <span className="text-purple-300">v1.8</span>
                    </motion.div>

                    <motion.div
                        variants={badgeVariants}
                        whileHover="hover"
                        className="px-6 py-3 bg-pink-800/50 backdrop-blur-sm rounded-full border border-pink-500/40 cursor-default"
                    >
                        <span className="text-pink-300">Nov 2025</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.header>
    );
}
