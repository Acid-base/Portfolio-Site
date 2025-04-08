import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

const PageTransition: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      data-testid="page-transition"
      aria-live="polite"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
