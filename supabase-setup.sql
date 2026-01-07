-- Supabase 访问统计表结构
-- 在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 创建 visits 表
CREATE TABLE IF NOT EXISTS visits (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  path TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  timezone TEXT,
  region TEXT, -- IP所属区域（国家/地区）
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_ip_address ON visits(ip_address);

-- 启用 Row Level Security (RLS)
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许插入（记录访问）
CREATE POLICY "允许插入访问记录" ON visits
  FOR INSERT
  WITH CHECK (true);

-- 创建策略：允许读取（查看统计）
CREATE POLICY "允许读取访问记录" ON visits
  FOR SELECT
  USING (true);

-- 注意：如果需要更严格的权限控制，可以修改上述策略
-- 例如，只允许特定用户查看统计数据

