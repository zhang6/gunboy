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

export interface VisitRecord {
  id?: number;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  path?: string;
  screen_width?: number;
  screen_height?: number;
  language?: string;
  timezone?: string;
  region?: string; // IP所属区域（国家/地区）
  created_at?: string;
}

export interface VisitStats {
  totalVisits: number;
  uniqueIPCount: number;
  recentVisits: VisitRecord[];
  dailyCounts: Record<string, number>;
}