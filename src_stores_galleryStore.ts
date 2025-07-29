import { create } from 'zustand';

interface Exhibit {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  description: string;
  image: string;
  type: 'website' | 'project' | 'artwork';
}

interface GalleryState {
  currentExhibit: Exhibit | null;
  showModal: boolean;
  setCurrentExhibit: (exhibit: Exhibit | null) => void;
  setShowModal: (show: boolean) => void;
  openExhibit: (exhibit: Exhibit) => void;
  closeExhibit: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  currentExhibit: null,
  showModal: false,
  setCurrentExhibit: (exhibit) => set({ currentExhibit: exhibit }),
  setShowModal: (show) => set({ showModal: show }),
  openExhibit: (exhibit) => set({ currentExhibit: exhibit, showModal: true }),
  closeExhibit: () => set({ currentExhibit: null, showModal: false }),
}));