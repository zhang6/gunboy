import { supabase } from './supabaseClient';
import type { VisitRecord, VisitStats } from '../types';

/**
 * 获取访问者的 IP 地址
 */
async function getVisitorIP(): Promise<string> {
  try {
    // 使用多个 IP 检测服务作为备选
    const services = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://api.ip.sb/ip',
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000) // 3秒超时
        });
        const data = await response.json();
        if (data.ip) return data.ip;
        if (typeof data === 'string') return data.trim();
      } catch (e) {
        continue;
      }
    }
    return 'unknown';
  } catch (error) {
    console.error('获取 IP 地址失败:', error);
    return 'unknown';
  }
}

/**
 * 获取IP所属的区域（国家/地区）
 */
async function getIPRegion(ip: string): Promise<string | undefined> {
  // 检查是否启用IP地理位置查询
  const enableIPGeo = import.meta.env.VITE_ENABLE_IP_GEO === 'true';
  if (!enableIPGeo || ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return undefined;
  }

  try {
    // 使用ipapi.co获取地理位置信息（免费且支持中文）
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5秒超时
    });
    
    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    
    // 优先返回国家名称，如果没有则返回国家代码
    if (data.country_name) {
      return data.country_name;
    }
    if (data.country) {
      return data.country;
    }
    
    return undefined;
  } catch (error) {
    console.error('获取IP地理位置失败:', error);
    return undefined;
  }
}

/**
 * 记录网站访问
 */
export async function recordVisit(): Promise<void> {
  try {
    const ip = await getVisitorIP();
    const userAgent = navigator.userAgent || 'unknown';
    const referrer = document.referrer || '';
    const path = window.location.pathname;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const language = navigator.language || '';
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // 获取IP所属区域（如果启用）
    const region = await getIPRegion(ip);

    const visitData: VisitRecord = {
      ip_address: ip,
      user_agent: userAgent,
      referrer: referrer,
      path: path,
      screen_width: screenWidth,
      screen_height: screenHeight,
      language: language,
      timezone: timezone,
      region: region,
    };

    const { error } = await supabase
      .from('visits')
      .insert([visitData]);

    if (error) {
      console.error('记录访问失败:', error);
    }
  } catch (error) {
    console.error('记录访问时发生错误:', error);
  }
}

/**
 * 获取访问统计数据
 */
export async function getVisitStats(): Promise<VisitStats> {
  try {
    // 获取总访问数
    const { count: totalVisits, error: countError } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // 获取唯一 IP 数
    const { data: uniqueIPs, error: ipError } = await supabase
      .from('visits')
      .select('ip_address')
      .not('ip_address', 'is', null);

    if (ipError) throw ipError;

    const uniqueIPCount = new Set(uniqueIPs?.map(v => v.ip_address)).size;

    // 获取最近访问记录
    const { data: recentVisits, error: recentError } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (recentError) throw recentError;

    // 按日期统计
    const { data: dailyStats, error: dailyError } = await supabase
      .from('visits')
      .select('created_at')
      .order('created_at', { ascending: false });

    if (dailyError) throw dailyError;

    // 处理每日统计
    const dailyCounts: Record<string, number> = {};
    dailyStats?.forEach(visit => {
      if (visit.created_at) {
        const date = new Date(visit.created_at).toISOString().split('T')[0];
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      }
    });

    return {
      totalVisits: totalVisits || 0,
      uniqueIPCount,
      recentVisits: recentVisits || [],
      dailyCounts,
    };
  } catch (error) {
    console.error('获取访问统计失败:', error);
    throw error;
  }
}

