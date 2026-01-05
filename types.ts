export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}
