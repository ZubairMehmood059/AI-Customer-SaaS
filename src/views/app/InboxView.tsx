/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Smile, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Building, 
  Mail, 
  Tag, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Bot, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  ExternalLink,
  Shield,
  ArrowUpRight,
  RefreshCw,
  MessageSquare,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { UIState } from '../../types/design';
import { portalStore, SupportTicket, TicketMessage } from '../../store/portalStore';

interface InboxViewProps {
  uiState: UIState;
}

export const InboxView: React.FC<InboxViewProps> = ({ uiState }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(portalStore.getAllTickets());
  const [activeTicketId, setActiveTicketId] = useState<string>('#4829');
  const [mobilePane, setMobilePane] = useState<'list' | 'thread' | 'profile'>('list');
  const [filter, setFilter] = useState<'all' | 'ai_review' | 'escalated' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [aiDraftInserted, setAiDraftInserted] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const all = portalStore.getAllTickets();
      setTickets(all);
      if (all.length > 0 && !all.some((t) => t.id === activeTicketId || t.ticketNumber === activeTicketId)) {
        setActiveTicketId(all[0].id);
      }
    };
    refresh();
    const unsub = portalStore.subscribe(refresh);
    return unsub;
  }, [activeTicketId]);

  const activeTicket = tickets.find((t) => t.id === activeTicketId || t.ticketNumber === activeTicketId) || tickets[0];
  const messages: TicketMessage[] = activeTicket ? portalStore.getMessagesForTicket(activeTicket.id) : [];

  const handleSendReply = () => {
    if (!replyText.trim() || !activeTicket) return;
    
    portalStore.addMessage({
      ticketId: activeTicket.id,
      sender: 'agent',
      author: 'Alex Rivera (Support Engineer)',
      authorEmail: 'alex@nexora.ai',
      content: replyText.trim(),
    });

    setReplyText('');
    setAiDraftInserted(false);
  };

  const handleInsertAiSuggestion = () => {
    if (!activeTicket) return;
    setReplyText(
      `Hi ${activeTicket.customerName.split(' ')[0]}, Alex from Nexora Engineering here. We checked your endpoint configuration: please verify the signing secret under Settings > Webhooks and ensure your proxy passes the raw body buffer to HMAC-SHA256 to avoid signature verification mismatch.`
    );
    setAiDraftInserted(true);
  };

  const handleStatusChange = (newStatus: SupportTicket['status']) => {
    if (!activeTicket) return;
    portalStore.updateTicketStatus(activeTicket.id, newStatus, 'Alex Rivera (Support Agent)');
  };

  const handlePriorityChange = (newPriority: SupportTicket['priority']) => {
    if (!activeTicket) return;
    portalStore.updateTicketPriority(activeTicket.id, newPriority, 'Alex Rivera (Support Agent)');
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'resolved' && t.status !== 'Resolved') return false;
    if (filter === 'escalated' && t.priority !== 'Urgent') return false;
    if (filter === 'ai_review' && !t.aiSuggested) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.customerName.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.customerCompany.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (uiState === 'loading') {
    return (
      <div className="h-[78vh] flex gap-4 animate-pulse">
        <div className="w-80 bg-slate-200 rounded-xl"></div>
        <div className="flex-1 bg-slate-200 rounded-xl"></div>
        <div className="w-72 bg-slate-200 rounded-xl"></div>
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
          <h3 className="text-lg font-bold text-slate-900">Failed to load conversation queue</h3>
          <p className="text-xs text-slate-500">Live WebSocket connection to the inbox broker interrupted.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reconnect
          </button>
        </div>
      </div>
    );
  }

  if (uiState === 'empty' || tickets.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Inbox Zero Reached!</h3>
          <p className="text-xs text-slate-500">All customer conversations and tickets have been resolved or delegated to automated AI rules.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4 max-w-7xl mx-auto overflow-hidden">
      
      {/* 1. LEFT PANE: CONVERSATION LIST (320px) */}
      <div className={`${mobilePane === 'list' ? 'flex' : 'hidden'} md:flex w-full md:w-80 lg:w-88 bg-white border border-slate-200 rounded-2xl flex-col shrink-0 shadow-xs overflow-hidden`}>
        
        {/* Filter & Search Header */}
        <div className="p-3.5 border-b border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Support Queue</h2>
              <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                {tickets.length}
              </span>
            </div>
            <div className="text-[11px] font-mono text-emerald-600">● Live Two-Way Sync</div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter customer or subject..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-colors ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('ai_review')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-colors ${filter === 'ai_review' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              AI Review
            </button>
            <button 
              onClick={() => setFilter('escalated')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-colors ${filter === 'escalated' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Escalated
            </button>
            <button 
              onClick={() => setFilter('resolved')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-colors ${filter === 'resolved' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredTickets.map((conv) => {
            const isSelected = activeTicket && (activeTicket.id === conv.id);
            return (
              <div
                key={conv.id}
                onClick={() => { setActiveTicketId(conv.id); setMobilePane('thread'); }}
                className={`p-3.5 text-xs transition-colors cursor-pointer ${
                  isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-500' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900 truncate">{conv.customerName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{conv.createdAt}</span>
                </div>

                <div className="text-slate-700 font-medium truncate mb-1">{conv.subject}</div>
                <div className="text-slate-500 text-[11px] line-clamp-1 mb-2">{conv.description}</div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className={conv.priority === 'Urgent' ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                      {conv.priority}
                    </span>
                    <span>·</span>
                    <span className={conv.status === 'Open' ? 'text-emerald-700 font-semibold' : conv.status === 'Pending' ? 'text-amber-600' : 'text-slate-500'}>
                      {conv.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>{conv.confidence || '96.5%'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 2. CENTER PANE: ACTIVE CONVERSATION & AI SUGGESTION (Flex-1) */}
      {activeTicket && (
        <div className={`${mobilePane === 'thread' ? 'flex' : 'hidden'} md:flex flex-1 bg-white border border-slate-200 rounded-2xl flex-col shadow-xs overflow-hidden`}>
          
          {/* Conversation Header */}
          <div className="p-3 sm:p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-hidden">
              {/* Mobile Back Button */}
              <button
                onClick={() => setMobilePane('list')}
                className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/80 flex items-center gap-1 text-xs font-semibold shrink-0"
                aria-label="Back to inbox queue"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Queue</span>
              </button>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 truncate">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{activeTicket.customerName}</h3>
                  <span className="text-xs text-slate-500 hidden sm:inline">· {activeTicket.customerCompany}</span>
                  <span className="font-mono text-[10px] sm:text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded shrink-0 font-bold">
                    {activeTicket.id}
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate">Subject: {activeTicket.subject}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
              {/* Mobile customer details button */}
              <button
                onClick={() => setMobilePane('profile')}
                className="lg:hidden p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-medium flex items-center gap-1"
                title="View Customer Profile"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Context</span>
              </button>

              {/* Status Selector */}
              <select 
                value={activeTicket.status} 
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg text-xs px-2 py-1 text-slate-700 font-medium focus:outline-none"
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>

              {/* Priority Selector */}
              <select 
                value={activeTicket.priority} 
                onChange={(e) => handlePriorityChange(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg text-xs px-2 py-1 text-slate-700 font-medium focus:outline-none"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfdfd]">
            {messages.map((m) => (
              <div key={m.id} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                  <span className="font-semibold text-slate-700">{m.author}</span>
                  <span className="font-mono">{m.timestamp}</span>
                </div>

                {m.sender === 'customer' ? (
                  <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-800 leading-relaxed max-w-2xl space-y-2">
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-2">
                        {m.attachments.map((att) => (
                          <div key={att.id} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 flex items-center gap-1">
                            <Paperclip className="w-3 h-3 text-emerald-600" />
                            <span>{att.name}</span>
                            <span className="text-slate-400">({att.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : m.sender === 'ai' ? (
                  <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 text-white rounded-2xl p-4.5 text-xs leading-relaxed max-w-2xl border border-slate-800 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                      <span className="text-[#4ade80] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Nexora AI Autonomous Draft
                      </span>
                      <span className="font-mono text-slate-400">Confidence: <strong className="text-[#4ade80]">{m.confidence || '97.5%'}</strong></span>
                    </div>

                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{m.content}</p>

                    {/* Grounded Citations */}
                    {m.citations && (
                      <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800 space-y-1.5 text-[11px]">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Grounded Knowledge Citations</div>
                        {m.citations.map((c, i) => (
                          <div key={i} className="flex items-center justify-between text-slate-300">
                            <div className="flex items-center gap-1.5 truncate">
                              <FileText className="w-3 h-3 text-[#2dd4bf] shrink-0" />
                              <span className="font-medium truncate">{c.doc}</span>
                              <span className="text-slate-500 font-sans truncate">· {c.section}</span>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-400 shrink-0">{c.latency}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button 
                        onClick={handleInsertAiSuggestion}
                        className="px-3 py-1.5 bg-[#4ade80] hover:bg-[#3ed175] text-slate-950 font-bold rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" /> Apply to Composer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl rounded-tr-xs p-4 text-xs text-slate-800 leading-relaxed max-w-2xl ml-auto space-y-2">
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="pt-2 border-t border-emerald-200/60 flex flex-wrap gap-2">
                        {m.attachments.map((att) => (
                          <div key={att.id} className="px-2 py-1 bg-white border border-emerald-200 rounded text-[10px] font-mono text-slate-700 flex items-center gap-1">
                            <Paperclip className="w-3 h-3 text-emerald-600" />
                            <span>{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Quick Suggestion Banner */}
          <div className="p-3 bg-[#f0fdf4] border-t border-emerald-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">AI Assistant ready for {activeTicket.customerName}.</span>
            </div>
            <button 
              onClick={handleInsertAiSuggestion}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
            >
              Insert suggested solution
            </button>
          </div>

          {/* Composer */}
          <div className="p-3.5 border-t border-slate-200 bg-white">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Type your response to ${activeTicket.customerName}... (or apply AI suggestion above)`}
              rows={3}
              className="w-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none font-sans"
            />
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-1.5 hover:text-slate-600 rounded"><Paperclip className="w-4 h-4" /></button>
                <button className="p-1.5 hover:text-slate-600 rounded"><Smile className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setReplyText('')}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
                <button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. RIGHT PANE: CUSTOMER CONTEXT & AI SIGNALS (280px) */}
      {activeTicket && (
        <div className={`${mobilePane === 'profile' ? 'fixed inset-3 z-50 flex' : 'hidden'} lg:flex w-full lg:w-72 bg-white border border-slate-200 rounded-2xl flex-col shrink-0 shadow-lg lg:shadow-xs p-4 space-y-6 overflow-y-auto`}>
          
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900">Customer Context</span>
            <button 
              onClick={() => setMobilePane('thread')}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Thread</span>
            </button>
          </div>

          {/* Customer Profile Card */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white text-base font-bold flex items-center justify-center mx-auto mb-2 border-2 border-[#4ade80]">
              {activeTicket.customerName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <h4 className="text-sm font-bold text-slate-900">{activeTicket.customerName}</h4>
            <p className="text-xs text-slate-500">Customer Contact</p>
            <div className="text-[11px] font-mono text-emerald-700 mt-1 font-semibold">{activeTicket.customerCompany}</div>
          </div>

          {/* AI Intent & Sentiment Telemetry */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              AI Intent & Category
            </span>
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800">{activeTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SLA Target:</span>
                <span className="font-semibold text-emerald-700">{activeTicket.slaRemaining}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Confidence:</span>
                <span className="font-mono text-emerald-700">{activeTicket.confidence || '97.8%'}</span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Customer Details
            </span>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{activeTicket.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{activeTicket.customerCompany}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Created {activeTicket.createdAt}</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
