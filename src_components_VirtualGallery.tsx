'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGalleryStore } from '@/stores/galleryStore';
import GameCanvas from './GameCanvas';
import UI from './UI';
import ExhibitModal from './ExhibitModal';

const VirtualGallery = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentExhibit, showModal } = useGalleryStore();

  useEffect(() => {
    // シミュレート読み込み時間
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gallery-dark">
        <div className="text-center">
          <div className="loading-text text-4xl font-serif mb-4">
            Welcome to the Gallery
          </div>
          <div className="w-64 h-1 bg-gallery-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gallery-accent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <GameCanvas ref={canvasRef} />
      <UI />
      
      <AnimatePresence>
        {showModal && currentExhibit && (
          <ExhibitModal exhibit={currentExhibit} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualGallery;