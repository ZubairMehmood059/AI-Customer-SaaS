import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  ArrowUpRight, 
  Download, 
  ShieldCheck, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { UIState } from '../../types/design';

interface BillingViewProps {
  uiState: UIState;
}

export const BillingView: React.FC<BillingViewProps> = ({ uiState }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'Scale Pro' | 'Enterprise'>('Scale Pro');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectPlan = (plan: 'Scale Pro' | 'Enterprise') => {
    setCurrentPlan(plan);
    setShowUpgradeModal(false);
    setNotification(`Successfully switched workspace subscription to ${plan}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-72"></div>
        <div className="h-48 bg-slate-200 rounded-2xl"></div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Billing & Subscriptions</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your organization's subscription tier, usage consumption, and payment receipts</p>
        </div>

        <button 
          onClick={() => setShowUpgradeModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Zap className="w-4 h-4" /> Change Plan
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Plan Card & Usage Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Plan */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0f172a] text-white border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#4ade80] font-semibold">CURRENT ACTIVE TIER</span>
              <span className="font-mono text-[11px] bg-emerald-950 text-[#4ade80] px-2 py-0.5 rounded border border-emerald-800">
                Active · Renews Oct 12, 2026
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mt-3">{currentPlan} Plan</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                {currentPlan === 'Enterprise' ? '$399' : '$149'}
              </span>
              <span className="text-xs text-slate-400">/ month billed annually</span>
            </div>

            <div className="space-y-2 mt-6 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4ade80]" /> 
                {currentPlan === 'Enterprise' ? 'Unlimited team seats (4 active)' : 'Up to 15 team seats (4 active)'}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4ade80]" /> 
                {currentPlan === 'Enterprise' ? '100,000 monthly AI resolutions' : '20,000 monthly AI resolutions'}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4ade80]" /> 
                Unlimited Vector knowledge sources
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Payment method: Visa ending in 4242</span>
            <button className="text-[#4ade80] hover:underline font-semibold">Update Card</button>
          </div>
        </div>

        {/* Real-Time Consumption Meters */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Current Billing Cycle Consumption</h3>
            <p className="text-xs text-slate-500">Resets in 18 days</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">AI Autonomous Resolutions</span>
                <span className="font-mono text-slate-900 font-bold">14,280 / 20,000 (71.4%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#4ade80] h-full rounded-full" style={{ width: '71.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Vector Embeddings & Chunks</span>
                <span className="font-mono text-slate-900 font-bold">2,716 / 10,000 (27.1%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2dd4bf] h-full rounded-full" style={{ width: '27.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Active Seat Allocation</span>
                <span className="font-mono text-slate-900 font-bold">4 / 15 seats (26.6%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-800 h-full rounded-full" style={{ width: '26.6%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Invoices History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Invoice History</h3>
          <span className="text-xs text-slate-500 font-mono">Tax ID: US-89218210</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4">Plan Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {[
                { id: 'INV-2026-009', date: 'Sep 12, 2026', desc: `${currentPlan} — Monthly Renewal`, amount: currentPlan === 'Enterprise' ? '$399.00' : '$149.00', status: 'Paid' },
                { id: 'INV-2026-008', date: 'Aug 12, 2026', desc: 'Scale Pro — Monthly Renewal', amount: '$149.00', status: 'Paid' },
                { id: 'INV-2026-007', date: 'Jul 12, 2026', desc: 'Scale Pro — Monthly Renewal', amount: '$149.00', status: 'Paid' },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{inv.date}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{inv.desc}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{inv.amount}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] text-emerald-700 font-semibold">● {inv.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade / Change Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Change Workspace Subscription</h3>
                <p className="text-xs text-slate-500">Upgrade or adjust your multi-tenant support plan</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => handleSelectPlan('Scale Pro')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  currentPlan === 'Scale Pro'
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 text-sm">Scale Pro</div>
                <div className="text-xl font-bold font-mono text-emerald-700 mt-1">$149<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                <ul className="mt-3 space-y-1 text-slate-600 text-[11px]">
                  <li>✓ 15 Team Seats</li>
                  <li>✓ 20k AI Resolutions</li>
                  <li>✓ Standard SLA</li>
                </ul>
              </div>

              <div 
                onClick={() => handleSelectPlan('Enterprise')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  currentPlan === 'Enterprise'
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 text-sm">Enterprise</div>
                <div className="text-xl font-bold font-mono text-emerald-700 mt-1">$399<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                <ul className="mt-3 space-y-1 text-slate-600 text-[11px]">
                  <li>✓ Unlimited Team Seats</li>
                  <li>✓ 100k AI Resolutions</li>
                  <li>✓ 15m Urgent SLA</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
