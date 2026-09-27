import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  MoreVertical, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AdminOrganizationsViewProps {
  uiState: UIState;
}

export const AdminOrganizationsView: React.FC<AdminOrganizationsViewProps> = ({ uiState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);

  const [organizations, setOrganizations] = useState([
    { id: 'org_1', name: 'Hyperbase Cloud Inc.', slug: 'hyperbase', plan: 'Enterprise', status: 'Active', users: 142, volume: '182,400 / mo', storage: '48.2 GB', created: 'Jan 10, 2025' },
    { id: 'org_2', name: 'Acme Global Ltd.', slug: 'acme-global', plan: 'Scale Pro', status: 'Active', users: 15, volume: '42,890 / mo', storage: '12.4 GB', created: 'Mar 15, 2025' },
    { id: 'org_3', name: 'Stripe Payments', slug: 'stripe-pay', plan: 'Enterprise', status: 'Active', users: 84, volume: '31,200 / mo', storage: '28.1 GB', created: 'Feb 02, 2025' },
    { id: 'org_4', name: 'Vercel Platform', slug: 'vercel', plan: 'Enterprise', status: 'Active', users: 56, volume: '24,100 / mo', storage: '19.5 GB', created: 'Apr 20, 2025' },
    { id: 'org_5', name: 'Retool Ops', slug: 'retool-ops', plan: 'Starter', status: 'Active', users: 4, volume: '4,200 / mo', storage: '2.1 GB', created: 'May 04, 2025' },
    { id: 'org_6', name: 'Linear App Corp', slug: 'linear', plan: 'Enterprise', status: 'Active', users: 38, volume: '18,900 / mo', storage: '14.0 GB', created: 'Jun 11, 2025' },
    { id: 'org_7', name: 'Apex Testing Sandbox', slug: 'apex-test', plan: 'Trial', status: 'Suspended', users: 1, volume: '12 / mo', storage: '0.1 GB', created: 'Aug 29, 2025' },
  ]);

  const filteredOrgs = organizations.filter((org) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return org.name.toLowerCase().includes(q) || org.slug.toLowerCase().includes(q) || org.plan.toLowerCase().includes(q);
  });

  const toggleOrgStatus = (orgId: string) => {
    setOrganizations(organizations.map(o => {
      if (o.id === orgId) {
        const nextStatus = o.status === 'Active' ? 'Suspended' : 'Active';
        return { ...o, status: nextStatus };
      }
      return o;
    }));
    if (selectedOrg && selectedOrg.id === orgId) {
      setSelectedOrg({
        ...selectedOrg,
        status: selectedOrg.status === 'Active' ? 'Suspended' : 'Active',
      });
    }
  };

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-lg w-72"></div>
        <div className="h-96 bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Platform Organizations & Tenants</h2>
          <p className="text-xs text-slate-400 mt-0.5">Multi-tenant scoping oversight, tier provisioning, and tenant suspension</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Search tenant name or slug..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Slug / ID</th>
                <th className="py-3 px-4">Tier Plan</th>
                <th className="py-3 px-4 text-center">Users</th>
                <th className="py-3 px-4">Monthly Volume</th>
                <th className="py-3 px-4">PGVector Storage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {filteredOrgs.map((org) => (
                <tr 
                  key={org.id} 
                  onClick={() => setSelectedOrg(org)}
                  className="hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold text-white">{org.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{org.slug}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-amber-400 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {org.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-200">{org.users}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{org.volume}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{org.storage}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono text-[11px] font-semibold ${
                      org.status === 'Active' ? 'text-[#4ade80]' : 'text-rose-400'
                    }`}>
                      ● {org.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-amber-400 hover:underline font-semibold inline-flex items-center gap-1">
                      Manage <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Modal / Inspector */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-slate-400">{selectedOrg.id}</span>
                <h3 className="text-base font-bold text-white">{selectedOrg.name}</h3>
              </div>
              <button onClick={() => setSelectedOrg(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Subscription:</span>
                <span className="font-bold text-amber-400">{selectedOrg.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Status:</span>
                <span className="font-mono text-[#4ade80]">{selectedOrg.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Provisioned Storage:</span>
                <span className="font-mono text-white">{selectedOrg.storage}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button 
                onClick={() => setSelectedOrg(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
              >
                Impersonate Workspace (Read-Only)
              </button>
              <button 
                onClick={() => toggleOrgStatus(selectedOrg.id)}
                className={`w-full py-2 rounded-lg font-semibold border transition-colors ${
                  selectedOrg.status === 'Active'
                    ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/40'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {selectedOrg.status === 'Active' ? 'Suspend Organization Tenant' : 'Reactivate Organization Tenant'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
