'use client';

import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gallery-dark">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="loading-text text-4xl font-serif mb-8"
        >
          Entering the Gallery...
        </motion.div>
        
        <motion.div
          className="w-64 h-1 bg-gallery-secondary rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gallery-accent"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gallery-light/70 text-sm mt-4"
        >
          Preparing your immersive experience...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;