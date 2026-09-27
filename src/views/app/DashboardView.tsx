import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Ticket, 
  Bot, 
  Clock, 
  Smile, 
  TrendingUp, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Users, 
  RefreshCw 
} from 'lucide-react';
import { UIState } from '../../types/design';
import { portalStore, SupportTicket } from '../../store/portalStore';

interface DashboardViewProps {
  uiState: UIState;
  onOpenConversation: () => void;
  onOpenNewTicket: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  uiState,
  onOpenConversation,
  onOpenNewTicket,
}) => {
  const [liveTickets, setLiveTickets] = useState<SupportTicket[]>(() => portalStore.getAllTickets());

  useEffect(() => {
    const handleUpdate = () => {
      setLiveTickets(portalStore.getAllTickets());
    };
    const unsub = portalStore.subscribe(handleUpdate);
    return unsub;
  }, []);
  if (uiState === 'loading') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-80 bg-slate-200 rounded-xl"></div>
          <div className="lg:col-span-4 h-80 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="h-64 bg-slate-200 rounded-xl"></div>
      </div>
    );
  }

  if (uiState === 'error') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Failed to aggregate dashboard metrics</h3>
          <p className="text-xs text-slate-500">The telemetry service encountered an error while querying multi-tenant conversation events.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reconnect Service
          </button>
        </div>
      </div>
    );
  }

  if (uiState === 'empty') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Welcome to Nexora AI</h3>
          <p className="text-xs text-slate-500">No support conversations or tickets have been ingested yet. Connect your email or create your first ticket to see live analytics.</p>
          <button 
            onClick={onOpenNewTicket}
            className="px-5 py-2.5 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs shadow-xs"
          >
            Create First Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner Notice */}
      <div className="p-4 bg-[#0f172a] text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#4ade80] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Autonomous AI Engine Active</span>
              <span className="font-mono text-[10px] bg-emerald-950 text-[#4ade80] px-1.5 py-0.2 rounded border border-emerald-800">
                98.2% Confidence Mode
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Nexora resolved 32 tickets autonomously in the last 4 hours with 0 escalations.
            </div>
          </div>
        </div>
        <button 
          onClick={onOpenConversation}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-[#4ade80] rounded-lg transition-colors whitespace-nowrap"
        >
          View AI Resolved Queue →
        </button>
      </div>

      {/* 5 KPIs Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Conversations</span>
            <MessageSquare className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">1,842</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> +18.4% this week
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Open Tickets</span>
            <Ticket className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">14</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1 font-mono">
            3 urgent · 11 normal
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>AI Autonomous Deflection</span>
            <Bot className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-2">78.4%</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> +6.2% vs target
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Median Response Time</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">1.2m</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 font-mono">
            -4.8m human baseline
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Customer CSAT</span>
            <Smile className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">4.92 / 5</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 font-mono">
            98.7% positive ratings
          </div>
        </div>

      </div>

      {/* Main Grid: Support Volume Chart + AI Confidence Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Support Volume Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Support Volume & AI Auto-Resolution</h3>
              <p className="text-xs text-slate-500">Hourly breakdown for today (Acme Global Ltd.)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#4ade80]"></span> AI Resolved (78%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-300"></span> Human Escalated (22%)</span>
            </div>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-56 flex items-end gap-2.5 pt-6 border-b border-slate-100">
            {[
              { hour: '08:00', total: 42, ai: 34 },
              { hour: '09:00', total: 68, ai: 52 },
              { hour: '10:00', total: 95, ai: 76 },
              { hour: '11:00', total: 112, ai: 89 },
              { hour: '12:00', total: 84, ai: 66 },
              { hour: '13:00', total: 72, ai: 58 },
              { hour: '14:00', total: 104, ai: 82 },
              { hour: '15:00', total: 120, ai: 96 },
              { hour: '16:00', total: 98, ai: 79 },
              { hour: '17:00', total: 64, ai: 50 },
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full max-w-[34px] bg-slate-100 rounded-t-sm flex flex-col justify-end overflow-hidden" style={{ height: `${(d.total / 130) * 100}%` }}>
                  <div className="w-full bg-slate-300" style={{ height: `${((d.total - d.ai) / d.total) * 100}%` }}></div>
                  <div className="w-full bg-[#4ade80] group-hover:bg-[#3ed175] transition-colors" style={{ height: `${(d.ai / d.total) * 100}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{d.hour}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
            <span>Peak traffic: 15:00 (120 inquiries)</span>
            <span className="font-mono text-emerald-700">Average AI Latency: 138ms</span>
          </div>
        </div>

        {/* AI Confidence & Real-Time Performance */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">AI Accuracy & Safety Gates</h3>
            <p className="text-xs text-slate-500 mb-4">Distribution of model confidence scores</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">High Confidence (&gt;95%)</span>
                  <span className="font-mono text-slate-900 font-bold">78.4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ade80] h-full" style={{ width: '78.4%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400">Auto-resolved without human intervention</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Medium Confidence (85% - 95%)</span>
                  <span className="font-mono text-slate-900 font-bold">16.2%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2dd4bf] h-full" style={{ width: '16.2%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400">Draft created for 1-click agent review</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Escalated to Human (&lt;85%)</span>
                  <span className="font-mono text-slate-900 font-bold">5.4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: '5.4%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400">Directly assigned to specialized human tier</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 mt-4 text-xs text-emerald-950">
            <div className="font-bold flex items-center gap-1.5 mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safety Threshold Enforced</span>
            </div>
            <p className="text-[11px] text-emerald-800">No response is sent unless cosine citation match exceeds 0.88.</p>
          </div>
        </div>

      </div>

      {/* Recent High-Priority Tickets Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Queue & Priority Tickets</h3>
            <p className="text-xs text-slate-500">Live support threads requiring attention</p>
          </div>
          <button 
            onClick={onOpenConversation}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Open Unified Inbox <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Ticket</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-4">AI Suggested Status</th>
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Assignee</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {(liveTickets.length > 0 ? liveTickets.slice(0, 6) : [
                { id: '#4829', customerName: 'Sarah Reynolds', customerCompany: 'Stripe', subject: 'Webhook signature mismatch error 401', status: 'Open', priority: 'Urgent', assignee: 'Alex Rivera' },
                { id: '#4828', customerName: 'David Vance', customerCompany: 'Figma', subject: 'SCIM group provisioning failure', status: 'Pending', priority: 'High', assignee: 'Nexora AI Copilot' },
                { id: '#4827', customerName: 'Mira Chen', customerCompany: 'Vercel', subject: 'How to rotate production API token?', status: 'Resolved', priority: 'Normal', assignee: 'Nexora AI' },
                { id: '#4826', customerName: 'Liam O’Connor', customerCompany: 'Retool', subject: 'Invoice billing address update', status: 'Resolved', priority: 'Low', assignee: 'Nexora AI' },
              ]).map((t: any) => {
                const priorityColor = t.priority === 'Urgent' ? 'text-rose-600' : t.priority === 'High' ? 'text-amber-600' : 'text-slate-600';
                const customerDisplay = t.customerCompany ? `${t.customerName} (${t.customerCompany})` : (t.customer || t.customerName);
                const statusBadge = t.status === 'Open' ? 'AI Grounded' : t.status === 'Pending' ? 'In Progress' : 'Resolved';
                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={onOpenConversation}>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{t.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{customerDisplay}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{t.subject}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <Sparkles className="w-3 h-3 text-[#4ade80]" />
                        {statusBadge}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      <span className={priorityColor}>{t.priority}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{t.assignee}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-emerald-700 hover:underline font-semibold">Review →</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
