/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Paperclip, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { portalStore, Attachment, SupportTicket, CustomerUser } from '../../store/portalStore';

interface PortalNewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (ticketId: string) => void;
}

export const PortalNewTicketModal: React.FC<PortalNewTicketModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('API & Webhooks');
  const [priority, setPriority] = useState<SupportTicket['priority']>('Normal');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB limit
  const MAX_FILES = 5;
  const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.pdf', '.txt', '.log', '.json', '.csv', '.zip', '.md'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachments.length + files.length > MAX_FILES) {
      setUploadError(`Maximum ${MAX_FILES} attachments allowed per ticket.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const newFiles: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const lowerName = file.name.toLowerCase();
      const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      if (!hasAllowedExt) {
        setUploadError(`File type not allowed for "${file.name}". Supported: PDF, images, logs, json, zip.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError(`File "${file.name}" exceeds the 25 MB safety limit.`);
        continue;
      }

      const sizeKb = (file.size / 1024).toFixed(1);
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKb} KB`;
      newFiles.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: sizeStr,
        type: file.type || 'application/octet-stream',
      });
    }

    setAttachments([...attachments, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (attId: string) => {
    setAttachments(attachments.filter((a) => a.id !== attId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    const newTicket = portalStore.createTicket({
      subject,
      category,
      priority,
      description,
      attachments,
      customer: customer || undefined,
    });

    // Reset form
    setSubject('');
    setDescription('');
    setAttachments([]);
    setIsSubmitting(false);

    onSuccess(newTicket.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create Support Ticket</h2>
              <p className="text-[11px] text-slate-400">
                Submitting as <span className="text-emerald-400 font-semibold">{customer?.name}</span> ({customer?.company})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Subject */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Ticket Subject / Title</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Webhook delivery failure on production endpoint"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="API & Webhooks">API & Webhooks</option>
                <option value="SCIM & Identity">SCIM & Identity</option>
                <option value="Billing & Accounts">Billing & Accounts</option>
                <option value="Security & Keys">Security & Keys</option>
                <option value="Platform & Infrastructure">Platform & Infrastructure</option>
                <option value="General">General Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="Urgent">Urgent (15m Response SLA)</option>
                <option value="High">High (1h Response SLA)</option>
                <option value="Normal">Normal (4h Response SLA)</option>
                <option value="Low">Low (24h Response SLA)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Issue Description & Reproduction Steps
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the unexpected behavior, provide payload snippets, endpoint paths, or error messages..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-sans"
            />
          </div>

          {/* Attachments Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">Attachments</label>
              <span className="text-[11px] text-slate-500">Logs, screenshots, configs (max 25MB)</span>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate max-w-[140px]">{att.name}</span>
                    <span className="text-slate-500 text-[10px]">({att.size})</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(att.id)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

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
              className="w-full py-2.5 px-3 border border-dashed border-slate-700 hover:border-emerald-500/50 bg-slate-950/60 hover:bg-slate-950 rounded-xl text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Paperclip className="w-4 h-4 text-emerald-400" />
              <span>Choose files to attach</span>
            </button>

            {uploadError && (
              <div className="mt-2 p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          {/* AI Autonomous Assistance Notice */}
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              Upon submission, Nexora AI will query our PGVector knowledge index in real-time to formulate an instant response and notify on-duty support engineers.
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Request</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
