import React, { useState } from 'react';
import { Upload, Link, Twitter } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';

export const MediaInput: React.FC = () => {
  const [url, setUrl] = useState('');
  const { addItem, addItems } = useMediaStore();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (url.includes('twitter.com') || url.includes('x.com')) {
      // Note: Twitter API integration would go here
      // For now, we'll just add the URL as a single image
      addItem({
        url,
        type: 'image',
        source: 'twitter'
      });
    } else {
      addItem({
        url,
        type: url.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image',
        source: 'url'
      });
    }
    setUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      addItem({
        url,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        source: 'file'
      });
    });
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter image URL or Twitter post URL..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Link size={20} />
          Add URL
        </button>
      </form>

      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2">
            <Upload size={20} />
            Upload Files
          </div>
        </label>
      </div>
    </div>
  );
};