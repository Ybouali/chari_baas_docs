import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type CardType = {
    children: ReactNode;
};

function Card({ children }: CardType) {
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        } as const,
        hover: {
            y: -8,
            boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 15,
            },
        } as const,
    } satisfies Variants;

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-card p-6 border border-neutral-100 dark:border-neutral-700 cursor-default"
        >
            {children}
        </motion.div>
    );
}

export default Card;
