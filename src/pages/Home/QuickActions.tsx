import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Action = {
    name: string;
    screen: string;
};

function QuickActions() {
    const navigator = useNavigate();

    const actions: Action[] = [
        {
            name: 'Register Customer',
            screen: 'customer',
        },

        {
            name: 'Test Transfer',
            screen: 'operations',
        },
        {
            name: 'Setup Auth',
            screen: 'setup',
        },
        {
            name: 'View History',
            screen: 'tools',
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.14,
                delayChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 32, opacity: 0, scale: 0.96 },
        show: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 140,
                damping: 17,
            },
        },
    } as const;

    return (
        <div className="flex flex-col items-start p-6 w-full">
            {/* Title - Left aligned */}
            <motion.h1
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-3xl md:text-4xl font-bold text-chari-blue-900 mb-10 tracking-tight"
            >
                Quick Actions
            </motion.h1>

            {/* Horizontal row of buttons - Full width */}
            <motion.div
                className="flex flex-row w-full gap-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {actions.map((label, index) => {
                    const isSpecial = index === 1;
                    const isSuccess = index === 2;

                    return (
                        <motion.button
                            key={label.name}
                            variants={item}
                            whileHover={{
                                scale: 1.04,
                                y: -4,
                                boxShadow: 'var(--shadow-card-hover)',
                            }}
                            whileTap={{ scale: 0.975, y: 1 }}
                            className={`
                relative flex-1 px-6 py-4 rounded-xl font-semibold text-base md:text-lg text-white
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2
                overflow-hidden
                shadow-(--shadow-card)
                hover:shadow-(--shadow-card-hover)
                ${
                    isSpecial
                        ? 'bg-chari-orange-500 hover:bg-chari-orange-700 focus:ring-chari-orange-300'
                        : isSuccess
                        ? 'bg-chari-green-600 hover:bg-chari-green-700 focus:ring-chari-green-400'
                        : 'bg-chari-blue-600 hover:bg-chari-blue-700 focus:ring-chari-blue-300'
                }
              `}
                            onClick={() => navigator(label.screen)}
                        >
                            <span
                                className={`
                  absolute inset-0 bg-linear-to-r from-white/12 via-transparent to-white/5
                  opacity-0 hover:opacity-40 transition-opacity duration-500 pointer-events-none
                `}
                            />

                            <span className="relative z-10 block text-left">
                                {label.name}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default QuickActions;
