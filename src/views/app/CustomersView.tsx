import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Building, 
  Mail, 
  Clock, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Ticket,
  X,
  RefreshCw
} from 'lucide-react';
import { UIState } from '../../types/design';
import { portalStore, CustomerUser } from '../../store/portalStore';

interface CustomersViewProps {
  uiState: UIState;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ uiState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [portalCustomers, setPortalCustomers] = useState<CustomerUser[]>(() => portalStore.getAllCustomers());

  useEffect(() => {
    const refresh = () => setPortalCustomers(portalStore.getAllCustomers());
    const unsub = portalStore.subscribe(refresh);
    return unsub;
  }, []);

  const baseCustomers = [
    { id: 'c1', name: 'Sarah Reynolds', company: 'Stripe Payments', email: 'sarah@stripe.com', tickets: 5, aiInteractions: 14, sentiment: 'Positive (92%)', lastActive: '12m ago', spend: '$4,200/mo', plan: 'Enterprise' },
    { id: 'c2', name: 'David Vance', company: 'Figma Design', email: 'david@figma.com', tickets: 3, aiInteractions: 9, sentiment: 'Neutral (78%)', lastActive: '1h ago', spend: '$1,800/mo', plan: 'Scale Pro' },
    { id: 'c3', name: 'Mira Chen', company: 'Vercel Platform', email: 'mira@vercel.com', tickets: 8, aiInteractions: 28, sentiment: 'Positive (99%)', lastActive: '4h ago', spend: '$3,400/mo', plan: 'Enterprise' },
    { id: 'c4', name: 'Liam O’Connor', company: 'Retool Ops', email: 'liam@retool.com', tickets: 2, aiInteractions: 6, sentiment: 'Positive (88%)', lastActive: 'Yesterday', spend: '$800/mo', plan: 'Starter' },
    { id: 'c5', name: 'Jessica Miller', company: 'Linear App', email: 'jessica@linear.app', tickets: 11, aiInteractions: 42, sentiment: 'Positive (96%)', lastActive: '2d ago', spend: '$5,100/mo', plan: 'Enterprise' },
    { id: 'c6', name: 'Marcus Brody', company: 'Datadog Systems', email: 'marcus@datadoghq.com', tickets: 4, aiInteractions: 12, sentiment: 'Neutral (80%)', lastActive: '3d ago', spend: '$2,200/mo', plan: 'Scale Pro' },
  ];

  // Merge dynamic customers from portalStore if newly registered
  const registeredAdditions = portalCustomers
    .filter((pc) => !baseCustomers.some((bc) => bc.email.toLowerCase() === pc.email.toLowerCase()))
    .map((pc) => ({
      id: pc.id,
      name: pc.name,
      company: pc.company,
      email: pc.email,
      tickets: portalStore.getTicketsForCustomer(pc.id).length || 1,
      aiInteractions: 2,
      sentiment: 'Active (100%)',
      lastActive: 'Just now',
      spend: pc.plan === 'Enterprise' ? '$3,800/mo' : '$1,400/mo',
      plan: pc.plan,
    }));

  const customers = [...registeredAdditions, ...baseCustomers];

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
          <h3 className="text-lg font-bold text-slate-900">Failed to load customers</h3>
          <p className="text-xs text-slate-500">The CRM sync gateway returned a timeout.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold">
            Retry Sync
          </button>
        </div>
      </div>
    );
  }

  if (uiState === 'empty') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Customers Found</h3>
          <p className="text-xs text-slate-500">Customers will be automatically identified and profiled once incoming support emails or chat sessions arrive.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customer Intelligence</h2>
          <p className="text-xs text-slate-500 mt-0.5">Automated profile enrichment and sentiment tracking across all accounts</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input 
              type="text"
              placeholder="Search customer, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-slate-50">
            <Filter className="w-3.5 h-3.5 text-slate-500" /> Filter
          </button>
        </div>
      </div>

      {/* High-Density Customer Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Account Tier</th>
                <th className="py-3 px-4 text-center">Tickets</th>
                <th className="py-3 px-4 text-center">AI Interactions</th>
                <th className="py-3 px-4">Sentiment Score</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {customers.map((c) => (
                <tr 
                  key={c.id} 
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{c.company}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {c.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-800">{c.tickets}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-700 font-semibold">{c.aiInteractions}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-700 font-medium font-mono">{c.sentiment}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{c.lastActive}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-700 font-semibold group-hover:underline inline-flex items-center gap-1">
                      View Profile <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Slide-Over Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center">
                  {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-500">{selectedCustomer.company} · {selectedCustomer.plan}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Sentiment Profile</span>
                </div>
                <p className="text-emerald-900 leading-relaxed">
                  Highly satisfied enterprise customer. Active on production API endpoints. Frequent technical inquiries with rapid automated resolution acceptance.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Contract & Account
                </span>
                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Contract Value:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCustomer.spend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Customer Success:</span>
                    <span className="font-medium text-slate-800">Alex Rivera</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SLA Commitment:</span>
                    <span className="font-mono text-emerald-700">15m Urgent / 2h Normal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Recent Tickets (Last 30 Days)
                </span>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="font-semibold text-slate-800">#4829 · Webhook signature mismatch error 401</div>
                    <div className="text-[10px] text-slate-500 font-mono">Open · Priority: Urgent · AI Draft Ready</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="font-semibold text-slate-800">#4102 · Rate limit increase for batch sync</div>
                    <div className="text-[10px] text-slate-500 font-mono">Resolved · Closed in 42s by AI Copilot</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
