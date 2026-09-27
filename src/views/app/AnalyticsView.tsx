import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Smile, 
  Bot, 
  Users, 
  Calendar, 
  Download, 
  ChevronDown, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AnalyticsViewProps {
  uiState: UIState;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ uiState }) => {
  const [timeRange, setTimeRange] = useState('30d');

  if (uiState === 'loading') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-72"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>)}
        </div>
        <div className="h-80 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Date Picker */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Operational Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Automated deflection telemetry, resolution speeds, and human agent efficiency</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <button 
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded font-medium ${timeRange === '7d' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'}`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded font-medium ${timeRange === '30d' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'}`}
            >
              30 Days
            </button>
            <button 
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1 rounded font-medium ${timeRange === '90d' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500'}`}
            >
              90 Days
            </button>
          </div>

          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50">
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV
          </button>
        </div>
      </div>

      {/* 4 Core Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs text-slate-500">Autonomous Deflection</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">78.4%</div>
          <div className="text-[11px] text-emerald-700 font-mono mt-1">↑ +14.2% MoM</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs text-slate-500">Customer CSAT</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">4.92 / 5.0</div>
          <div className="text-[11px] text-emerald-600 font-mono mt-1">98.7% positive ratings</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs text-slate-500">Avg Resolution Time</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">1m 12s</div>
          <div className="text-[11px] text-emerald-600 font-mono mt-1">↓ 84% speedup</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs text-slate-500">Escalation Rate</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">5.4%</div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">Target is &lt;10%</div>
        </div>
      </div>

      {/* Deflection & Sentiment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Weekly Resolution Trends</h3>
          <p className="text-xs text-slate-500 mb-6">Autonomous AI completions vs human agent handling</p>

          <div className="h-56 flex items-end gap-3 pt-4 border-b border-slate-100">
            {[
              { label: 'W1', ai: 72, human: 28 },
              { label: 'W2', ai: 75, human: 25 },
              { label: 'W3', ai: 78, human: 22 },
              { label: 'W4', ai: 81, human: 19 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full max-w-[48px] bg-slate-100 rounded-t-sm flex flex-col justify-end overflow-hidden h-full">
                  <div className="w-full bg-slate-300" style={{ height: `${bar.human}%` }}></div>
                  <div className="w-full bg-[#4ade80]" style={{ height: `${bar.ai}%` }}></div>
                </div>
                <span className="text-xs text-slate-500 font-mono">{bar.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#4ade80] rounded"></span> AI Autonomous (81% peak)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-slate-300 rounded"></span> Human Handled (19%)</span>
          </div>
        </div>

        {/* Sentiment & Category Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Customer Sentiment Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Classified via real-time emotional analysis</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-700 font-semibold">Positive & Satisfied</span>
                  <span className="font-mono font-bold text-slate-900">82.4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ade80] h-full" style={{ width: '82.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-semibold">Neutral / Investigative</span>
                  <span className="font-mono font-bold text-slate-900">14.6%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2dd4bf] h-full" style={{ width: '14.6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-600 font-semibold">Urgent / Frustrated</span>
                  <span className="font-mono font-bold text-slate-900">3.0%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: '3.0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mt-6 text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-1">Top Inbound Categories:</span>
            <div className="flex justify-between py-0.5"><span>API & Webhooks</span> <span className="font-mono font-bold">42%</span></div>
            <div className="flex justify-between py-0.5"><span>Billing & Invoices</span> <span className="font-mono font-bold">28%</span></div>
            <div className="flex justify-between py-0.5"><span>SSO & SCIM</span> <span className="font-mono font-bold">18%</span></div>
          </div>
        </div>

      </div>

    </div>
  );
};
