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
  Plus, 
  Sparkles,
  Paperclip,
  Tag,
  ArrowUpDown,
  X
} from 'lucide-react';
import { portalStore, SupportTicket, CustomerUser } from '../../store/portalStore';

interface PortalTicketsViewProps {
  onOpenNewTicket: () => void;
  onOpenTicket: (ticketId: string) => void;
}

export const PortalTicketsView: React.FC<PortalTicketsViewProps> = ({
  onOpenNewTicket,
  onOpenTicket,
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Pending' | 'Resolved'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const categories = ['All', 'API & Webhooks', 'SCIM & Identity', 'Billing & Accounts', 'Security & Keys', 'Platform & Infrastructure', 'General'];

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSubject = t.subject.toLowerCase().includes(q);
      const matchId = t.id.toLowerCase().includes(q) || t.ticketNumber.includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      if (!matchSubject && !matchId && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & New Request Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, review, and track all requests submitted by {customer?.company || 'your team'}
          </p>
        </div>

        <button
          onClick={onOpenNewTicket}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Request</span>
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {(['All', 'Open', 'Pending', 'Resolved'] as const).map((st) => {
              const count = st === 'All' ? tickets.length : tickets.filter((t) => t.status === st).length;
              const isActive = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{st}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ticket #, subject, or keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Tickets List View */}
      {filteredTickets.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No tickets match your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || categoryFilter !== 'All' || statusFilter !== 'All'
              ? 'Try resetting the search query or selecting a different status filter.'
              : 'You have not submitted any support tickets yet.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            {(searchQuery || categoryFilter !== 'All' || statusFilter !== 'All') && (
              <button
                onClick={() => { setStatusFilter('All'); setCategoryFilter('All'); setSearchQuery(''); }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={onOpenNewTicket}
              className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onOpenTicket(ticket.id)}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    {ticket.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono">
                    {ticket.category}
                  </span>
                  <span className={`text-xs font-mono font-semibold ${
                    ticket.priority === 'Urgent'
                      ? 'text-rose-400'
                      : ticket.priority === 'High'
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}>
                    [{ticket.priority} Priority]
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                    ticket.status === 'Open'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : ticket.status === 'Pending'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    ● {ticket.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                {ticket.subject}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                {ticket.description}
              </p>

              {/* Footer Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Created: {ticket.createdAt}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Assignee: <span className="text-slate-200 font-semibold">{ticket.assignee}</span>
                  </span>
                  {ticket.attachments && ticket.attachments.length > 0 && (
                    <>
                      <span className="hidden sm:inline text-slate-700">|</span>
                      <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                        <Paperclip className="w-3 h-3 text-emerald-400" />
                        <span>{ticket.attachments.length} attachment{ticket.attachments.length > 1 ? 's' : ''}</span>
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                  <span>View Thread</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
