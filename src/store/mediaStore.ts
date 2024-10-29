import { create } from 'zustand';
import { MediaStore, MediaItem } from '../types';

export const useMediaStore = create<MediaStore>((set) => ({
  items: [],
  deletedItems: [],
  currentSlideIndex: 0,
  isSlideShowOpen: false,

  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        },
      ],
    })),

  addItems: (newItems) =>
    set((state) => ({
      items: [
        ...state.items,
        ...newItems.map((item) => ({
          ...item,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        })),
      ],
    })),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      return {
        items: state.items.filter((i) => i.id !== id),
        deletedItems: [...state.deletedItems, { ...item, deleted: true }],
      };
    }),

  restoreItem: (id) =>
    set((state) => {
      const item = state.deletedItems.find((i) => i.id === id);
      if (!item) return state;

      return {
        deletedItems: state.deletedItems.filter((i) => i.id !== id),
        items: [...state.items, { ...item, deleted: false }],
      };
    }),

  setSlideShowIndex: (index) => set({ currentSlideIndex: index }),
  toggleSlideShow: () => set((state) => ({ isSlideShowOpen: !state.isSlideShowOpen })),
}));