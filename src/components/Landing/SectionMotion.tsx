import { motion } from 'framer-motion';
import React from 'react';

const SectionMotion = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}>
      {children}
    </motion.div>
  );
};

export default SectionMotion;
