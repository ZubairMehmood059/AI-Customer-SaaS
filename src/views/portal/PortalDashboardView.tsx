/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowUpRight, 
  Search, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  MessageSquare,
  FileText,
  HelpCircle,
  Activity,
  Zap,
  Bot
} from 'lucide-react';
import { portalStore, SupportTicket, CustomerUser } from '../../store/portalStore';

interface PortalDashboardViewProps {
  onOpenNewTicket: () => void;
  onOpenTicket: (ticketId: string) => void;
  onNavigateToKnowledge: () => void;
  onNavigateToTickets: () => void;
}

export const PortalDashboardView: React.FC<PortalDashboardViewProps> = ({
  onOpenNewTicket,
  onOpenTicket,
  onNavigateToKnowledge,
  onNavigateToTickets,
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    const loadData = () => {
      const current = portalStore.getCurrentCustomer();
      setCustomer(current);
      if (current) {
        setTickets(portalStore.getTicketsForCustomer(current.id));
      } else {
        setTickets([]);
      }
    };
    loadData();
    const unsub = portalStore.subscribe(loadData);
    return unsub;
  }, []);

  const openTickets = tickets.filter((t) => t.status === 'Open');
  const pendingTickets = tickets.filter((t) => t.status === 'Pending');
  const resolvedTickets = tickets.filter((t) => t.status === 'Resolved');

  const firstName = customer ? customer.name.split(' ')[0] : 'there';

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* 1. Welcome & Hero Action Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nexora AI Copilot Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Track active enterprise tickets, converse in real-time with AI & dedicated engineers, or submit a new technical request.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToKnowledge}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Browse Guides</span>
            </button>
            <button
              onClick={onOpenNewTicket}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold text-xs shadow-lg hover:opacity-95 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Create Support Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Open Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{openTickets.length}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
            <span>● In progress / active SLA</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Pending Updates</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{pendingTickets.length}</div>
          <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-1 font-mono">
            <span>● AI / Agent formulating</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Resolved Requests</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{resolvedTickets.length}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
            <span>● Total closed requests</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Avg. Response Time</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">98ms</div>
          <div className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1 font-mono">
            <span>● Autonomous AI RAG</span>
          </div>
        </div>

      </div>

      {/* 3. Main Content: Active Tickets & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: My Active Tickets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Active Support Tickets</h2>
              <p className="text-xs text-slate-400">Recent tickets submitted by your organization</p>
            </div>
            {tickets.length > 0 && (
              <button
                onClick={onNavigateToTickets}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>View all ({tickets.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {tickets.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No tickets submitted yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Have an inquiry or encountering an error? Submit a request and our AI Copilot will respond with solutions immediately.
              </p>
              <button
                onClick={onOpenNewTicket}
                className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs"
              >
                Create First Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.slice(0, 4).map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => onOpenTicket(ticket.id)}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {ticket.id}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {ticket.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {ticket.subject}
                      </h4>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shrink-0 ${
                      ticket.status === 'Open'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : ticket.status === 'Pending'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      ● {ticket.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {ticket.createdAt}
                      </span>
                      {ticket.attachments && ticket.attachments.length > 0 && (
                        <span className="text-slate-400 font-mono">
                          📎 {ticket.attachments.length} file{ticket.attachments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 font-semibold text-emerald-400 group-hover:underline">
                      <span>Open Thread</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Self-Service & Help Guides */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Help Center & Guides</h2>
            <p className="text-xs text-slate-400">Instant answers to common developer inquiries</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            <div 
              onClick={onNavigateToKnowledge}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-400 mb-1">
                <span>Webhook Signature Verification (v2)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Step-by-step guide to HMAC-SHA256 timestamp signing and raw payload buffer handling.
              </p>
            </div>

            <div 
              onClick={onNavigateToKnowledge}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-400 mb-1">
                <span>SCIM 2.0 Identity & Okta Sync</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Configure auto-provisioning, push groups, and single sign-on attribute schemas.
              </p>
            </div>

            <div 
              onClick={onNavigateToKnowledge}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-400 mb-1">
                <span>Zero-Downtime API Key Rotation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Using 24-hour overlap grace periods to roll tokens across production clusters.
              </p>
            </div>

            {/* Direct Contact Support Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Need SLA Escalation?</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                Enterprise plan customers have 24/7 designated engineer routing with sub-15-minute response SLA.
              </p>
              <button
                onClick={onOpenNewTicket}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg font-bold text-xs transition-colors"
              >
                Submit Urgent Request →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
