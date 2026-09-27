import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  X
} from 'lucide-react';
import { UIState } from '../../types/design';

interface TeamViewProps {
  uiState: UIState;
}

export const TeamView: React.FC<TeamViewProps> = ({ uiState }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Agent');
  const [inviteNotice, setInviteNotice] = useState<string | null>(null);

  const initialMembers = [
    { id: 'm1', name: 'Alex Rivera', email: 'alex@acme.com', role: 'Organization Owner', activeTickets: 3, resolvedMonth: 142, csat: '4.95 / 5.0', status: 'Active' },
    { id: 'm2', name: 'Elena Rostova', email: 'elena@acme.com', role: 'Support Lead', activeTickets: 5, resolvedMonth: 118, csat: '4.91 / 5.0', status: 'Active' },
    { id: 'm3', name: 'Marcus Chen', email: 'marcus@acme.com', role: 'Support Agent', activeTickets: 4, resolvedMonth: 94, csat: '4.88 / 5.0', status: 'Active' },
    { id: 'm4', name: 'Sophia Miller', email: 'sophia@acme.com', role: 'Technical Auditor', activeTickets: 0, resolvedMonth: 0, csat: '—', status: 'Active' },
    { id: 'm5', name: 'Devon Ward', email: 'devon@acme.com', role: 'Support Agent', activeTickets: 0, resolvedMonth: 0, csat: '—', status: 'Invite Pending' },
  ];
  const [members, setMembers] = useState(initialMembers);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const newMember = {
      id: `m_${Date.now()}`,
      name: inviteEmail.split('@')[0].replace('.', ' '),
      email: inviteEmail.trim(),
      role: inviteRole === 'Admin' ? 'Administrator' : inviteRole === 'Lead' ? 'Support Lead' : 'Support Agent',
      activeTickets: 0,
      resolvedMonth: 0,
      csat: '—',
      status: 'Invite Pending',
    };
    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
    setInviteNotice(`Invitation dispatched to ${newMember.email} with ${newMember.role} privileges.`);
    setTimeout(() => setInviteNotice(null), 3500);
  };

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-72"></div>
        <div className="h-80 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {inviteNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{inviteNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Team Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage agent seat assignments, role-based access permissions, and workload capacity</p>
        </div>

        <button 
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Invite Team Member
        </button>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role & Permissions</th>
                <th className="py-3 px-4 text-center">Active Assigned</th>
                <th className="py-3 px-4 text-center">Resolved (Month)</th>
                <th className="py-3 px-4">Agent CSAT</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{m.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">{m.activeTickets}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">{m.resolvedMonth}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-medium">{m.csat}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono text-[11px] font-semibold ${
                      m.status === 'Active' ? 'text-emerald-700' : 'text-amber-600'
                    }`}>
                      ● {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-slate-400 hover:text-slate-700 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSendInvite} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Invite Team Member</h3>
              <button type="button" onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">Send an invitation email to add an agent or administrator to Acme Global Ltd.</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@acme.com"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Assignment</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="Agent">Support Agent (Respond, triage, view knowledge)</option>
                  <option value="Lead">Support Lead (Manage queues, view analytics, assign)</option>
                  <option value="Admin">Administrator (Manage billing, settings, API keys)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button 
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
