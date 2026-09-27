import React from 'react';
import { 
  Building2, 
  Users, 
  MessageSquare, 
  Bot, 
  Database, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AdminDashboardViewProps {
  uiState: UIState;
  onNavigateToOrgs: () => void;
  onNavigateToHealth: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  uiState,
  onNavigateToOrgs,
  onNavigateToHealth,
}) => {
  if (uiState === 'loading') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-xl"></div>)}
        </div>
        <div className="h-80 bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Platform Status Alert Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-ping shrink-0"></div>
          <div>
            <span className="font-bold text-white">Platform Fleet Nominal</span>
            <span className="text-slate-400 ml-2 block sm:inline">All 5 microservices running within SLA tolerances. Zero critical outages in 45 days.</span>
          </div>
        </div>
        <button 
          onClick={onNavigateToHealth}
          className="text-amber-400 hover:underline font-mono text-[11px] shrink-0"
        >
          View Service Latencies →
        </button>
      </div>

      {/* 5 Admin KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Organizations</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">412</div>
          <div className="text-[11px] text-[#4ade80] font-mono mt-1">+28 this month</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Active Tenants</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">389</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">94.4% active 30d</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Platform Users</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">28,450</div>
          <div className="text-[11px] text-[#4ade80] font-mono mt-1">↑ +12.4% MoM</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Platform AI Token Usage</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">1.42B</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">Gemini Pro/Flash API</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 col-span-2 lg:col-span-1">
          <div className="text-xs text-slate-400">PGVector Storage</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">842 GB</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">4.8M vector chunks</div>
        </div>
      </div>

      {/* Main Grid: Global Traffic & Top Consuming Tenants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Global Platform Traffic */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Platform Throughput & Concurrent Chats</h3>
              <p className="text-xs text-slate-400">Aggregated across all 412 customer organizations</p>
            </div>
            <div className="text-xs font-mono text-[#4ade80]">Peak: 8,420 req/sec</div>
          </div>

          <div className="h-56 flex items-end gap-3 pt-4 border-b border-slate-800">
            {[
              { time: '00:00', h: 32 },
              { time: '04:00', h: 18 },
              { time: '08:00', h: 65 },
              { time: '12:00', h: 92 },
              { time: '16:00', h: 110 },
              { time: '20:00', h: 78 },
            ].map((pt, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full max-w-[42px] bg-gradient-to-t from-[#0f172a] to-amber-400/80 rounded-t-sm" style={{ height: `${(pt.h / 120) * 100}%` }}></div>
                <span className="text-[10px] font-mono text-slate-500">{pt.time}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs font-mono text-slate-400">
            <span>Average API Response Latency: 28ms</span>
            <span className="text-[#4ade80]">Inference Engine: 99.98% Available</span>
          </div>
        </div>

        {/* Top Consuming Organizations */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Top Tenant Volume</h3>
              <button 
                onClick={onNavigateToOrgs}
                className="text-xs text-amber-400 hover:underline font-medium"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Hyperbase Cloud', plan: 'Enterprise', volume: '182,400 tickets/mo', tokens: '142M tokens' },
                { name: 'Acme Global Ltd.', plan: 'Scale Pro', volume: '42,890 tickets/mo', tokens: '38M tokens' },
                { name: 'Stripe Payments', plan: 'Enterprise', volume: '31,200 tickets/mo', tokens: '29M tokens' },
                { name: 'Vercel Platform', plan: 'Enterprise', volume: '24,100 tickets/mo', tokens: '22M tokens' },
              ].map((org, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-semibold text-white">
                    <span>{org.name}</span>
                    <span className="font-mono text-amber-400 text-[11px]">{org.plan}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>{org.volume}</span>
                    <span>{org.tokens}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
