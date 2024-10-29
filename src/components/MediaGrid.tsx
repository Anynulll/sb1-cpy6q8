import React from 'react';
import Masonry from 'react-masonry-css';
import { Download, Trash2, ExternalLink } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';
import type { MediaItem } from '../types';

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const MediaGrid: React.FC = () => {
  const { items, removeItem, setSlideShowIndex, toggleSlideShow } = useMediaStore();

  const handleImageClick = (index: number) => {
    setSlideShowIndex(index);
    toggleSlideShow();
  };

  const renderMediaItem = (item: MediaItem, index: number) => (
    <div key={item.id} className="relative group mb-4">
      <div className="relative overflow-hidden rounded-lg">
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt=""
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onClick={() => handleImageClick(index)}
          />
        ) : (
          <video
            src={item.url}
            className="w-full h-auto object-cover"
            controls
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => window.open(item.url, '_blank')}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors"
          >
            <ExternalLink size={20} />
          </button>
          <a
            href={item.url}
            download
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors"
          >
            <Download size={20} />
          </a>
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-red-600 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {items.map((item, index) => renderMediaItem(item, index))}
    </Masonry>
  );
};