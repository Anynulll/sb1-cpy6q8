export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  source: 'url' | 'file' | 'twitter';
  timestamp: number;
  deleted?: boolean;
}

export interface MediaStore {
  items: MediaItem[];
  deletedItems: MediaItem[];
  currentSlideIndex: number;
  isSlideShowOpen: boolean;
  addItem: (item: Omit<MediaItem, 'id' | 'timestamp'>) => void;
  addItems: (items: Omit<MediaItem, 'id' | 'timestamp'>[]) => void;
  removeItem: (id: string) => void;
  restoreItem: (id: string) => void;
  setSlideShowIndex: (index: number) => void;
  toggleSlideShow: () => void;
}