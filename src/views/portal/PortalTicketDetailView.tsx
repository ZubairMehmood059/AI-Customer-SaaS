/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Paperclip, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  User, 
  FileText, 
  Download, 
  X, 
  ShieldCheck, 
  RefreshCw,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  portalStore, 
  SupportTicket, 
  TicketMessage, 
  Attachment, 
  CustomerUser 
} from '../../store/portalStore';

interface PortalTicketDetailViewProps {
  ticketId: string;
  onBack: () => void;
}

export const PortalTicketDetailView: React.FC<PortalTicketDetailViewProps> = ({
  ticketId,
  onBack,
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [ticket, setTicket] = useState<SupportTicket | undefined>(portalStore.getTicketById(ticketId));
  const [messages, setMessages] = useState<TicketMessage[]>(portalStore.getMessagesForTicket(ticketId));
  const [replyText, setReplyText] = useState('');
  const [stagedAttachments, setStagedAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoAiAssistance, setAutoAiAssistance] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const refreshData = () => {
      setCustomer(portalStore.getCurrentCustomer());
      setTicket(portalStore.getTicketById(ticketId));
      setMessages(portalStore.getMessagesForTicket(ticketId));
    };
    refreshData();
    const unsub = portalStore.subscribe(refreshData);
    return unsub;
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!ticket) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Ticket Not Found</h2>
        <p className="text-xs text-slate-400">The ticket {ticketId} does not exist or has been archived.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
        >
          Return to Tickets
        </button>
      </div>
    );
  }

  const [uploadError, setUploadError] = useState<string | null>(null);

  const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.txt', '.log', '.json', '.csv', '.zip', '.md'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (stagedAttachments.length + files.length > 5) {
      setUploadError('Maximum 5 files can be attached per reply.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const newAttachments: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const lowerName = file.name.toLowerCase();
      const hasAllowed = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      if (!hasAllowed) {
        setUploadError(`File type not allowed for "${file.name}". Supported: PDF, images, logs, json, zip.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError(`File "${file.name}" exceeds the 25 MB safety limit.`);
        continue;
      }

      const sizeKb = (file.size / 1024).toFixed(1);
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKb} KB`;
      newAttachments.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: sizeStr,
        type: file.type || 'application/octet-stream',
      });
    }

    setStagedAttachments([...stagedAttachments, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeStagedAttachment = (attId: string) => {
    setStagedAttachments(stagedAttachments.filter((a) => a.id !== attId));
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() && stagedAttachments.length === 0) return;

    setIsSubmitting(true);
    const authorName = customer?.name || 'Customer';
    const authorEmail = customer?.email || 'customer@domain.com';

    portalStore.addMessage({
      ticketId: ticket.id,
      sender: 'customer',
      author: authorName,
      authorEmail,
      content: replyText.trim(),
      attachments: stagedAttachments,
    });

    setReplyText('');
    setStagedAttachments([]);
    setIsSubmitting(false);

    // If auto AI copilot assistance is active, trigger an autonomous instant solution after a short delay
    if (autoAiAssistance) {
      setTimeout(() => {
        portalStore.addMessage({
          ticketId: ticket.id,
          sender: 'ai',
          author: 'Nexora AI Copilot',
          content: `Thanks for the additional context, ${authorName.split(' ')[0]}! Our autonomous vector system has logged this update. If this requires engineering validation, our support agents will verify the payload parameters.`,
        });
      }, 1000);
    }
  };

  const toggleResolutionStatus = () => {
    const newStatus = ticket.status === 'Resolved' ? 'Open' : 'Resolved';
    portalStore.updateTicketStatus(ticket.id, newStatus, customer?.name || 'Customer');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
            title="Back to Tickets"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {ticket.id}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {ticket.category}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
              {ticket.subject}
            </h1>
          </div>
        </div>

        {/* Right Status Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
            ticket.status === 'Open'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : ticket.status === 'Pending'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            <span>{ticket.status}</span>
          </span>

          <button
            onClick={toggleResolutionStatus}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              ticket.status === 'Resolved'
                ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {ticket.status === 'Resolved' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reopen Ticket</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark as Resolved</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Thread Conversation + Sidebar Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Message History & Reply Box */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Thread Scroll Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 min-h-[420px] max-h-[680px] overflow-y-auto">
            
            {/* Initial description card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span className="font-semibold text-slate-200">Ticket Request Details</span>
                <span className="font-mono text-[11px]">{ticket.createdAt}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {ticket.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{att.name}</span>
                      <span className="text-slate-500 text-[10px]">({att.size})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Conversation Messages */}
            <div className="space-y-4">
              {messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isAi = msg.sender === 'ai';
                const isAgent = msg.sender === 'agent';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    {/* Author & Timestamp */}
                    <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400">
                      {isAi && (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold font-mono">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>Nexora AI Copilot</span>
                          {msg.confidence && (
                            <span className="bg-emerald-500/20 text-emerald-300 px-1 rounded text-[10px]">
                              {msg.confidence}
                            </span>
                          )}
                        </span>
                      )}
                      {isAgent && (
                        <span className="font-semibold text-cyan-400 flex items-center gap-1">
                          <User className="w-3 h-3 text-cyan-400" />
                          <span>{msg.author}</span>
                        </span>
                      )}
                      {isCustomer && (
                        <span className="font-semibold text-slate-300">
                          {msg.author} (You)
                        </span>
                      )}
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                        isCustomer
                          ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-br-xs'
                          : isAi
                          ? 'bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30 text-emerald-100 rounded-bl-xs shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {/* AI Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-emerald-500/20 space-y-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
                            Referenced Knowledge Sources
                          </div>
                          {msg.citations.map((cite, i) => (
                            <div
                              key={i}
                              className="text-[11px] font-mono text-emerald-300/90 flex items-center justify-between gap-2 bg-emerald-950/60 px-2 py-1 rounded"
                            >
                              <span className="truncate">📄 {cite.doc} · {cite.section}</span>
                              <span className="text-[10px] text-emerald-500 shrink-0">{cite.latency}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-700/50 flex flex-wrap gap-2">
                          {msg.attachments.map((att) => (
                            <div
                              key={att.id}
                              className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
                            >
                              <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{att.name}</span>
                              <span className="text-slate-500 text-[10px]">({att.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

          </div>

          {/* Reply Form Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            
            {/* Staged Attachments Preview */}
            {stagedAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                {stagedAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate max-w-[150px]">{att.name}</span>
                    <span className="text-slate-500 text-[10px]">({att.size})</span>
                    <button
                      type="button"
                      onClick={() => removeStagedAttachment(att.id)}
                      className="text-slate-400 hover:text-rose-400 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply, provide additional logs, or ask questions..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-sans"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Attach Files</span>
                  </button>

                  <label className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoAiAssistance}
                      onChange={(e) => setAutoAiAssistance(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span>AI Copilot Auto-Response</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (!replyText.trim() && stagedAttachments.length === 0)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  <span>Send Reply</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {uploadError && (
                <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}
            </form>

          </div>

        </div>

        {/* Right 1 Col: Ticket Meta & SLA Drawer */}
        <div className="space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ticket Metadata & SLA
            </h3>

            <div className="space-y-3 text-xs divide-y divide-slate-800">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Status:</span>
                <span className={`font-mono font-bold ${
                  ticket.status === 'Open' ? 'text-emerald-400' : ticket.status === 'Pending' ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {ticket.status}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Priority:</span>
                <span className={`font-mono font-bold ${
                  ticket.priority === 'Urgent' ? 'text-rose-400' : ticket.priority === 'High' ? 'text-amber-400' : 'text-slate-300'
                }`}>
                  {ticket.priority}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Assigned Handler:</span>
                <span className="text-slate-200 font-semibold">{ticket.assignee}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Target SLA:</span>
                <span className="font-mono text-emerald-400 font-bold">{ticket.slaRemaining}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Created:</span>
                <span className="text-slate-300">{ticket.createdAt}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Last Activity:</span>
                <span className="text-slate-300">{ticket.updatedAt}</span>
              </div>
            </div>

            {/* Quick Resolution Notice */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enterprise SLA Guarantee</span>
              </div>
              <p>
                All replies are archived with immutable cryptographic timestamps for SOC 2 compliance.
              </p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Activity History
            </h3>
            <div className="space-y-3 border-l-2 border-slate-800 pl-3.5 ml-1 text-xs">
              {ticket.timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></div>
                  <div className="font-semibold text-slate-200">{item.event}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {item.actor} · {item.time}
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
