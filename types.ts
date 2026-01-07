export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  id?: number; // 用于唯一标识消息，特别是在流式更新时
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
