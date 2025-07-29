'use client';

import { Suspense } from 'react';
import VirtualGallery from '@/components/VirtualGallery';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  return (
    <main className="w-full h-screen bg-gallery-dark overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <VirtualGallery />
      </Suspense>
    </main>
  );
}