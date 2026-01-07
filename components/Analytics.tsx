import React, { useEffect, useState } from 'react';
import { getVisitStats } from '../services/analyticsService';
import type { VisitRecord, VisitStats } from '../types';
import { BarChart3, Users, Globe, Clock, Monitor, MapPin } from 'lucide-react';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVisitStats();
      setStats(data);
    } catch (err) {
      setError('加载统计数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBrowserInfo = (userAgent: string = '') => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tactical-green mx-auto mb-4"></div>
          <p className="text-slate-400 font-mono text-sm">加载统计数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <button
            onClick={loadStats}
            className="px-4 py-2 bg-tactical-green text-black font-mono text-sm hover:bg-tactical-green/80 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // 获取最近7天的数据
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const maxDailyVisits = Math.max(...Object.values(stats.dailyCounts), 1);

  return (
    <div className="min-h-screen bg-black text-white font-sans py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-military font-bold mb-4 text-tactical-green tracking-widest">
            [ ACCESS ANALYTICS ]
          </h1>
          <p className="text-slate-400 font-mono text-sm">访问统计面板</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-tactical-gray/30 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tactical-green/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-tactical-green" />
              </div>
              <div>
                <p className="text-slate-400 font-mono text-xs mb-1">总访问量</p>
                <p className="text-2xl font-bold text-white">{stats.totalVisits.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-tactical-gray/30 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tactical-green/20 rounded-lg">
                <Users className="w-6 h-6 text-tactical-green" />
              </div>
              <div>
                <p className="text-slate-400 font-mono text-xs mb-1">独立访客</p>
                <p className="text-2xl font-bold text-white">{stats.uniqueIPCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-tactical-gray/30 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tactical-green/20 rounded-lg">
                <Globe className="w-6 h-6 text-tactical-green" />
              </div>
              <div>
                <p className="text-slate-400 font-mono text-xs mb-1">平均访问</p>
                <p className="text-2xl font-bold text-white">
                  {stats.uniqueIPCount > 0 
                    ? (stats.totalVisits / stats.uniqueIPCount).toFixed(1)
                    : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近7天访问趋势 */}
        <div className="bg-slate-900/50 border border-tactical-gray/30 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-military font-bold mb-6 text-tactical-green">
            [ 最近7天访问趋势 ]
          </h2>
          <div className="flex items-end gap-2 h-48">
            {last7Days.map((date) => {
              const count = stats.dailyCounts[date] || 0;
              const height = (count / maxDailyVisits) * 100;
              return (
                <div key={date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: '180px' }}>
                    <div
                      className="w-full bg-tactical-green/60 hover:bg-tactical-green transition-colors rounded-t"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${date}: ${count} 次访问`}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    {new Date(date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}
                  </p>
                  <p className="text-xs text-tactical-green font-mono font-bold">{count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 最近访问记录 */}
        <div className="bg-slate-900/50 border border-tactical-gray/30 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-military font-bold text-tactical-green">
              [ 最近访问记录 ]
            </h2>
            <button
              onClick={loadStats}
              className="px-4 py-2 bg-tactical-green/20 text-tactical-green font-mono text-xs hover:bg-tactical-green/30 transition-colors"
            >
              刷新
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-tactical-gray/30">
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">时间</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">IP 地址</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">区域</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">浏览器</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">分辨率</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">语言</th>
                  <th className="pb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">时区</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="border-b border-tactical-gray/10 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.created_at ? formatDate(visit.created_at) : '-'}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.ip_address || '-'}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.region ? (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-tactical-green" />
                          {visit.region}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {getBrowserInfo(visit.user_agent)}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.screen_width && visit.screen_height
                        ? `${visit.screen_width}×${visit.screen_height}`
                        : '-'}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.language || '-'}
                    </td>
                    <td className="py-3 text-xs font-mono text-slate-300">
                      {visit.timezone || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {stats.recentVisits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-mono text-sm">暂无访问记录</p>
            </div>
          )}
        </div>

        {/* 返回按钮 */}
        <div className="mt-12 text-center">
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-3 bg-tactical-green text-black font-mono text-sm font-bold hover:bg-tactical-green/80 transition-colors"
          >
            [ 返回主页 ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

