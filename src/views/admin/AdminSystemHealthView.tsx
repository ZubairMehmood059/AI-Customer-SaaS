import React from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Terminal,
  RefreshCw
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AdminSystemHealthViewProps {
  uiState: UIState;
}

export const AdminSystemHealthView: React.FC<AdminSystemHealthViewProps> = ({ uiState }) => {
  const services = [
    { name: 'API Gateway (Envoy / Express)', status: 'Operational', uptime: '99.99%', latency: '24ms', region: 'asia-east1', load: '18%' },
    { name: 'PostgreSQL Primary (Multi-Tenant Relational)', status: 'Operational', uptime: '100.00%', latency: '6ms', region: 'asia-east1-a', load: '32%' },
    { name: 'PGVector Embedding Store', status: 'Operational', uptime: '99.98%', latency: '14ms', region: 'asia-east1-a', load: '41%' },
    { name: 'AI Inference Service (Gemini Pro/Flash API)', status: 'Operational', uptime: '99.95%', latency: '182ms', region: 'Global Quota (Nominal)', load: '24%' },
    { name: 'Async Background Queue & Webhook Dispatcher', status: 'Operational', uptime: '99.99%', latency: '42 jobs/sec', region: 'Redis Cluster', load: '12%' },
    { name: 'Customer Email & Chat Socket Broker', status: 'Operational', uptime: '100.00%', latency: '12ms', region: 'asia-east1', load: '22%' },
  ];

  const recentIncidents = [
    { time: 'Sep 19, 04:12 UTC', service: 'AI Inference Service', event: 'Transient rate limit spike on Gemini API. Auto-routed to secondary fallback pool in 800ms.', status: 'Resolved' },
    { time: 'Sep 02, 18:40 UTC', service: 'Async Background Queue', event: 'Webhook retry backoff triggered during upstream Stripe endpoint maintenance.', status: 'Resolved' },
  ];

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-lg w-72"></div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-slate-800 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Platform System Health & Telemetry</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time heartbeat, database replica latency, and vector search cluster status</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#4ade80] bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
          <span>ALL CLUSTERS OPERATIONAL</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <div key={i} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-xs">{svc.name}</span>
              <span className="font-mono text-[10px] text-[#4ade80] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {svc.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 font-mono">
              <div className="flex justify-between"><span>Uptime 30d:</span> <span className="text-white">{svc.uptime}</span></div>
              <div className="flex justify-between"><span>Median Latency:</span> <span className="text-amber-400">{svc.latency}</span></div>
              <div className="flex justify-between"><span>Region / Node:</span> <span className="text-slate-300">{svc.region}</span></div>
            </div>

            {/* Load bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span>CPU / Memory Load</span>
                <span>{svc.load}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4ade80] h-full" style={{ width: svc.load }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Error Log Stream Simulation */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-mono">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-400">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">LIVE PLATFORM LOG STREAM (asia-east1)</span>
          </div>
          <span className="text-[10px]">Filter: INFO, WARN, ERROR</span>
        </div>

        <div className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <div className="text-slate-500">[2026-09-23 10:02:14] [gateway] POST /api/conversations/conv_4829/messages 200 OK (22ms)</div>
          <div className="text-emerald-400">[2026-09-23 10:02:14] [rag-engine] Tenant org_acme: retrieved 2 chunks from pgvector (similarity: 0.948, latency: 112ms)</div>
          <div className="text-slate-500">[2026-09-23 10:02:15] [ai-inference] Gemini Pro inference completed (tokens: 412 in / 128 out, latency: 138ms)</div>
          <div className="text-slate-500">[2026-09-23 10:02:18] [webhook-worker] Dispatching signature header 't=1758646938,v1=...' to stripe receiver 200 OK</div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
        <h3 className="font-bold text-white text-sm">Past Incidents (Last 30 Days)</h3>
        <div className="divide-y divide-slate-800">
          {recentIncidents.map((inc, i) => (
            <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-slate-200">{inc.service}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">{inc.event}</div>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                <span className="text-slate-500">{inc.time}</span>
                <span className="text-[#4ade80] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {inc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
