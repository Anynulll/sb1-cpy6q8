import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';

export const DeletedItems: React.FC = () => {
  const { deletedItems, restoreItem } = useMediaStore();

  if (deletedItems.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Recently Deleted</h2>
      <div className="grid grid-cols-6 gap-4">
        {deletedItems.map((item) => (
          <div key={item.id} className="relative group">
            <img
              src={item.url}
              alt=""
              className="w-full h-32 object-cover rounded-lg opacity-50"
            />
            <button
              onClick={() => restoreItem(item.id)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <RotateCcw className="text-white" size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};