-- 数据库迁移脚本：为现有 visits 表添加 region 字段
-- 如果表已存在但缺少 region 字段，执行此脚本

-- 添加 region 字段（如果不存在）
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'visits' 
    AND column_name = 'region'
  ) THEN
    ALTER TABLE visits ADD COLUMN region TEXT;
    RAISE NOTICE '已添加 region 字段';
  ELSE
    RAISE NOTICE 'region 字段已存在，跳过';
  END IF;
END $$;

