'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGalleryStore } from '@/stores/galleryStore';

const UI = () => {
  const { closeExhibit } = useGalleryStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        closeExhibit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [closeExhibit]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* タイトル */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-8 z-10"
      >
        <h1 className="text-3xl font-serif text-gallery-accent">
          Virtual Gallery
        </h1>
        <p className="text-gallery-light/70 text-sm mt-1">
          Explore my digital exhibitions
        </p>
      </motion.div>

      {/* ミニマップ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-8 right-8 w-48 h-32 bg-black/50 rounded-lg border border-gallery-accent/30 p-2"
      >
        <div className="text-xs text-gallery-light/70 mb-2">Gallery Map</div>
        <div className="w-full h-full bg-gallery-secondary/50 rounded relative">
          {/* プレイヤー位置ドット */}
          <div className="absolute w-2 h-2 bg-gallery-accent rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      {/* コントロールガイド */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-8 bg-black/50 rounded-lg p-4 border border-gallery-accent/30"
      >
        <div className="text-gallery-light text-sm space-y-1">
          <div><span className="text-gallery-accent">WASD</span> Move around</div>
          <div><span className="text-gallery-accent">SPACE</span> Interact</div>
          <div><span className="text-gallery-accent">ESC</span> Close</div>
        </div>
      </motion.div>
    </div>
  );
};

export default UI;