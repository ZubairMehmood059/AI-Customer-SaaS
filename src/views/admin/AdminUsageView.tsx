import React, { useState } from 'react';
import { 
  BarChart4, 
  Cpu, 
  Database, 
  Layers, 
  TrendingUp, 
  Download, 
  Filter 
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AdminUsageViewProps {
  uiState: UIState;
}

export const AdminUsageView: React.FC<AdminUsageViewProps> = ({ uiState }) => {
  const [metricFilter, setMetricFilter] = useState<'tokens' | 'vectors' | 'conversations'>('tokens');

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-lg w-72"></div>
        <div className="h-80 bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Global AI Usage & Consumption</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track multi-tenant model API consumption, token quotas, and vector database sizing</p>
        </div>

        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export Billing Metrics CSV
        </button>
      </div>

      {/* Model Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gemini Pro Inference</span>
            <Cpu className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">892,104,200</div>
          <div className="text-[11px] text-slate-400">Input: 62% · Output: 38% · Complex reasoning</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gemini Flash Latency Pool</span>
            <Cpu className="w-4 h-4 text-[#4ade80]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">528,490,110</div>
          <div className="text-[11px] text-slate-400">Low-latency triage and intent categorization</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>PGVector Embeddings</span>
            <Database className="w-4 h-4 text-[#2dd4bf]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">4.82M chunks</div>
          <div className="text-[11px] text-slate-400">Total 768-dim embeddings stored</div>
        </div>
      </div>

      {/* Usage by Tenant Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-white text-sm">Tenant Consumption Breakdown (Current Billing Cycle)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Organization</th>
                <th className="py-2.5 px-4">Tier</th>
                <th className="py-2.5 px-4 font-mono">Conversations</th>
                <th className="py-2.5 px-4 font-mono">Tokens Used</th>
                <th className="py-2.5 px-4 font-mono">RAG Vector Docs</th>
                <th className="py-2.5 px-4 font-mono">API Calls</th>
                <th className="py-2.5 px-4 text-right">Quota Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {[
                { name: 'Hyperbase Cloud', tier: 'Enterprise', convs: '182,400', tokens: '142.4M', docs: '12,400', calls: '840K', quota: 'Nominal (42%)' },
                { name: 'Acme Global Ltd.', tier: 'Scale Pro', convs: '42,890', tokens: '38.1M', docs: '2,716', calls: '190K', quota: 'Nominal (71%)' },
                { name: 'Stripe Payments', tier: 'Enterprise', convs: '31,200', tokens: '29.2M', docs: '4,100', calls: '140K', quota: 'Nominal (24%)' },
                { name: 'Vercel Platform', tier: 'Enterprise', convs: '24,100', tokens: '22.0M', docs: '3,800', calls: '110K', quota: 'Nominal (18%)' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{row.name}</td>
                  <td className="py-3 px-4 font-mono text-amber-400">{row.tier}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{row.convs}</td>
                  <td className="py-3 px-4 font-mono text-[#4ade80]">{row.tokens}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{row.docs}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{row.calls}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-300">{row.quota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
