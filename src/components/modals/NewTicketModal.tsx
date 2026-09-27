import React, { useState } from 'react';
import { X, Sparkles, Send, Paperclip } from 'lucide-react';
import { portalStore } from '../../store/portalStore';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const NewTicketModal: React.FC<NewTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [customer, setCustomer] = useState('sarah@stripe.com');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'Urgent' | 'High' | 'Normal' | 'Low'>('Normal');
  const [channel, setChannel] = useState<'Email' | 'Chat' | 'API'>('Email');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingCustomers = portalStore.getAllCustomers();
    const matchingCustomer = existingCustomers.find(c => c.email.toLowerCase() === customer.toLowerCase()) || existingCustomers[0];
    
    portalStore.createTicket({
      subject,
      category: 'General',
      priority,
      description,
      customer: matchingCustomer,
    });

    onSubmitSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Customer Work Email</label>
            <input 
              type="email"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="customer@domain.com"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subject</label>
            <input 
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of issue (e.g., Webhook signing error)"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none"
              >
                <option value="Urgent">Urgent (15m SLA)</option>
                <option value="High">High (1h SLA)</option>
                <option value="Normal">Normal (4h SLA)</option>
                <option value="Low">Low (24h SLA)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inbound Channel</label>
              <select 
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none"
              >
                <option value="Email">Customer Email</option>
                <option value="Chat">Live Web Chat</option>
                <option value="API">Developer API / SDK</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issue Description & Details</label>
            <textarea 
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact error code, steps to reproduce, or customer inquiry..."
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 resize-none font-sans"
            />
          </div>

          {/* AI Autonomous Assistance Notice */}
          <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              Upon creation, Nexora AI will immediately query the PGVector index to formulate a solution draft.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg shadow-xs hover:opacity-95"
            >
              Submit Ticket & Trigger AI
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
