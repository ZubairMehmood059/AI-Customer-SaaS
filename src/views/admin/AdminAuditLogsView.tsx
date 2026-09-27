import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  ChevronRight,
  X
} from 'lucide-react';
import { UIState } from '../../types/design';

interface AdminAuditLogsViewProps {
  uiState: UIState;
}

export const AdminAuditLogsView: React.FC<AdminAuditLogsViewProps> = ({ uiState }) => {
  const [selectedAudit, setSelectedAudit] = useState<any | null>(null);

  const logs = [
    {
      id: 'aud_9841',
      actor: 'platform.admin@nexora.internal',
      action: 'tenant.plan_upgraded',
      target: 'org_acme (Acme Global Ltd.)',
      timestamp: '2026-09-23 09:14:22 UTC',
      ip: '198.51.100.42 (Tokyo VPC Gateway)',
      device: 'Internal Bastion CLI / macOS',
      details: {
        previous_tier: 'Scale Starter ($49/mo)',
        new_tier: 'Scale Pro ($149/mo)',
        seats_provisioned: 15,
        ai_resolution_limit: 20000,
      },
    },
    {
      id: 'aud_9840',
      actor: 'security.daemon@nexora.internal',
      action: 'sso.scim_sync_enforced',
      target: 'org_stripe (Stripe Payments)',
      timestamp: '2026-09-23 08:30:00 UTC',
      ip: '10.240.0.18 (k8s-worker-asia)',
      device: 'Kubernetes DaemonSet Cron',
      details: {
        provider: 'Okta Enterprise SAML 2.0',
        users_synced: 84,
        deactivated: 0,
      },
    },
    {
      id: 'aud_9839',
      actor: 'platform.admin@nexora.internal',
      action: 'rag.vector_reindex_triggered',
      target: 'org_hyperbase (Hyperbase Cloud)',
      timestamp: '2026-09-22 23:41:10 UTC',
      ip: '198.51.100.42 (Tokyo VPC Gateway)',
      device: 'Nexora Supervisor Dashboard',
      details: {
        index_table: 'kb_embeddings_v2',
        chunks_reprocessed: 12400,
        latency_reduction_ms: 18,
      },
    },
    {
      id: 'aud_9838',
      actor: 'compliance.auditor@nexora.internal',
      action: 'tenant.suspended_temporary',
      target: 'org_apex_test (Apex Testing Sandbox)',
      timestamp: '2026-09-21 16:04:19 UTC',
      ip: '203.0.113.89 (US-East VPN)',
      device: 'Firefox 130.0 / Ubuntu Linux',
      details: {
        reason: 'Expired demo cluster credentials',
        operator_ticket: 'SEC-4091',
      },
    },
  ];

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-lg w-72"></div>
        <div className="h-80 bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Cryptographic Platform Audit Trail</h2>
          <p className="text-xs text-slate-400 mt-0.5">Immutable write-once log of all privileged root operator and daemon actions</p>
        </div>

        <div className="font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          <span>WORM LOG STORAGE · SHA-256 SIGNED</span>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Tenant</th>
                <th className="py-3 px-4">Source IP & Device</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedAudit(log)}
                  className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{log.id}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{log.actor}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">{log.action}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">{log.target}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs truncate font-mono">{log.ip}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-amber-400 group-hover:underline font-semibold inline-flex items-center gap-1">
                      Payload <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Payload Inspector Drawer */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-[10px] text-amber-400">{selectedAudit.id}</span>
                <h3 className="text-sm font-bold text-white">{selectedAudit.action}</h3>
              </div>
              <button onClick={() => setSelectedAudit(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-[11px] text-slate-300">
              <div><span className="text-slate-500">Actor:</span> {selectedAudit.actor}</div>
              <div><span className="text-slate-500">Target:</span> {selectedAudit.target}</div>
              <div><span className="text-slate-500">Timestamp:</span> {selectedAudit.timestamp}</div>
              <div><span className="text-slate-500">Client Info:</span> {selectedAudit.device} · {selectedAudit.ip}</div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Event Payload (JSON Document)
              </span>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-400 font-mono overflow-x-auto">
                {JSON.stringify(selectedAudit.details, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
