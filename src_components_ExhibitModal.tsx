'use client';

import { motion } from 'framer-motion';
import { useGalleryStore } from '@/stores/galleryStore';
import { X, ExternalLink, Github } from 'lucide-react';

interface Exhibit {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'website' | 'project' | 'artwork';
}

interface ExhibitModalProps {
  exhibit: Exhibit;
}

const ExhibitModal = ({ exhibit }: ExhibitModalProps) => {
  const { closeExhibit } = useGalleryStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
      onClick={closeExhibit}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-gallery-dark border border-gallery-accent/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden exhibit-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-gallery-accent/20">
          <div>
            <h2 className="text-2xl font-serif text-gallery-accent">
              {exhibit.title}
            </h2>
            <span className="text-gallery-light/70 text-sm capitalize">
              {exhibit.type}
            </span>
          </div>
          <button
            onClick={closeExhibit}
            className="p-2 rounded-full hover:bg-gallery-secondary/50 transition-colors"
          >
            <X className="w-6 h-6 text-gallery-light" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-6">
          {/* 画像プレビュー */}
          <div className="aspect-video bg-gallery-secondary rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gallery-light/50">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div>Preview Image</div>
                <div className="text-xs mt-1">{exhibit.image}</div>
              </div>
            </div>
          </div>

          {/* 説明 */}
          <div>
            <h3 className="text-lg font-semibold text-gallery-light mb-3">
              Description
            </h3>
            <p className="text-gallery-light/80 leading-relaxed">
              {exhibit.description}
            </p>
          </div>

          {/* 技術スタック */}
          <div>
            <h3 className="text-lg font-semibold text-gallery-light mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gallery-accent/20 text-gallery-accent rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gallery-accent text-gallery-dark rounded-lg hover:bg-gallery-accent/90 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border border-gallery-accent/30 text-gallery-accent rounded-lg hover:bg-gallery-accent/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Code
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExhibitModal;