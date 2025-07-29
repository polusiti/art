'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { Game } from '@/game/Game';

interface GameCanvasProps {
  className?: string;
}

const GameCanvas = forwardRef<HTMLCanvasElement, GameCanvasProps>(
  ({ className }, ref) => {
    const gameRef = useRef<Game | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (!canvasRef.current) return;

      gameRef.current = new Game(canvasRef.current);
      gameRef.current.start();

      return () => {
        if (gameRef.current) {
          gameRef.current.destroy();
        }
      };
    }, []);

    return (
      <canvas
        ref={(canvas) => {
          canvasRef.current = canvas;
          if (typeof ref === 'function') {
            ref(canvas);
          } else if (ref) {
            ref.current = canvas;
          }
        }}
        className={`w-full h-full ${className}`}
        width={window?.innerWidth || 1920}
        height={window?.innerHeight || 1080}
      />
    );
  }
);

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;