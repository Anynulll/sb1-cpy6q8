import React from 'react';
import { MediaInput } from './components/MediaInput';
import { MediaGrid } from './components/MediaGrid';
import { SlideShow } from './components/SlideShow';
import { DeletedItems } from './components/DeletedItems';
import { Image } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Image size={24} className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Media Gallery</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MediaInput />
        <MediaGrid />
        <SlideShow />
        <DeletedItems />
      </main>
    </div>
  );
}

export default App;