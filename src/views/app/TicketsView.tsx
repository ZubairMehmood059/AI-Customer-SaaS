/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles, 
  User, 
  X,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { UIState } from '../../types/design';
import { portalStore, SupportTicket } from '../../store/portalStore';

interface TicketsViewProps {
  uiState: UIState;
  onOpenConversation: () => void;
}

export const TicketsView: React.FC<TicketsViewProps> = ({ uiState, onOpenConversation }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(portalStore.getAllTickets());
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Pending' | 'Resolved'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Urgent' | 'High' | 'Normal'>('All');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  useEffect(() => {
    const refresh = () => {
      setTickets(portalStore.getAllTickets());
    };
    refresh();
    const unsub = portalStore.subscribe(refresh);
    return unsub;
  }, []);

  const filteredTickets = tickets.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    return true;
  });

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-72"></div>
        <div className="h-96 bg-slate-200 rounded-2xl"></div>
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
          <h3 className="text-lg font-bold text-slate-900">Failed to load ticket database</h3>
          <p className="text-xs text-slate-500">Database connection pool exhausted.</p>
        </div>
      </div>
    );
  }

  if (uiState === 'empty' || tickets.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Tickets in this Filter</h3>
          <p className="text-xs text-slate-500">Try resetting status or priority filters to view the full queue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ticket Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Track SLAs, customer inquiries, and autonomous AI resolutions</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
          {(['All', 'Open', 'Pending', 'Resolved'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === st ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Subject & Details</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4">SLA Countdown</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredTickets.map((t) => (
                <tr 
                  key={t.id} 
                  onClick={() => setSelectedTicket(t)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{t.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {t.subject}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-sm">{t.description}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    <div>{t.customerName}</div>
                    <div className="text-[10px] text-slate-400">{t.customerCompany}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono text-[11px] font-semibold ${
                      t.status === 'Open' ? 'text-emerald-700' : t.status === 'Pending' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      ● {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span className={t.priority === 'Urgent' ? 'text-rose-600' : t.priority === 'High' ? 'text-amber-600' : 'text-slate-600'}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{t.assignee}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{t.slaRemaining}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-700 font-semibold group-hover:underline inline-flex items-center gap-1">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Slide-Over Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="font-mono text-xs text-slate-400">{selectedTicket.id}</span>
                <h3 className="text-base font-bold text-slate-900">{selectedTicket.subject}</h3>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-semibold text-slate-900">{selectedTicket.customerName} ({selectedTicket.customerCompany})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assignee:</span>
                  <span className="font-semibold text-slate-900">{selectedTicket.assignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current SLA:</span>
                  <span className="font-mono text-emerald-700 font-bold">{selectedTicket.slaRemaining}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Customer Description
                </span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Activity Timeline */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Ticket Activity Timeline
                </span>
                <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
                  {selectedTicket.timeline.map((event: any, i: number) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <div className="font-semibold text-slate-800">{event.event}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{event.actor} · {event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button 
                onClick={() => { setSelectedTicket(null); onOpenConversation(); }}
                className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Jump to Conversation</span>
              </button>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
