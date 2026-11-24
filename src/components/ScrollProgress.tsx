import { FC } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #BEA373, #D5BE91, #E6D5B4)',
                boxShadow: '0 0 12px rgba(213, 190, 145, 0.7)',
            }}
        />
    );
};

export default ScrollProgress;
