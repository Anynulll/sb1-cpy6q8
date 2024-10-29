import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';

export const SlideShow: React.FC = () => {
  const { items, currentSlideIndex, isSlideShowOpen, setSlideShowIndex, toggleSlideShow } = useMediaStore();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isSlideShowOpen) return;

    switch (e.key) {
      case 'ArrowLeft':
        setSlideShowIndex(Math.max(0, currentSlideIndex - 1));
        break;
      case 'ArrowRight':
        setSlideShowIndex(Math.min(items.length - 1, currentSlideIndex + 1));
        break;
      case 'Escape':
        toggleSlideShow();
        break;
    }
  }, [isSlideShowOpen, currentSlideIndex, items.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!isSlideShowOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={toggleSlideShow}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={() => setSlideShowIndex(Math.max(0, currentSlideIndex - 1))}
        className="absolute left-4 text-white hover:text-gray-300 disabled:opacity-50"
        disabled={currentSlideIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-[90vw] max-h-[90vh]">
        <img
          src={items[currentSlideIndex]?.url}
          alt=""
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>

      <button
        onClick={() => setSlideShowIndex(Math.min(items.length - 1, currentSlideIndex + 1))}
        className="absolute right-4 text-white hover:text-gray-300 disabled:opacity-50"
        disabled={currentSlideIndex === items.length - 1}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};