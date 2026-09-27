import React from 'react';
import { 
  ShieldAlert, 
  Building2, 
  Activity, 
  BarChart4, 
  FileText, 
  LayoutDashboard, 
  ArrowLeft, 
  Server, 
  Lock, 
  Cpu, 
  Database,
  ExternalLink,
  Home
} from 'lucide-react';
import { ViewId } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';

interface AdminShellProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({
  currentView,
  onNavigate,
  children,
}) => {
  const adminNavItems = [
    { id: 'admin-dashboard' as ViewId, label: 'Fleet Overview', icon: LayoutDashboard },
    { id: 'admin-organizations' as ViewId, label: 'Organizations & Tenants', icon: Building2 },
    { id: 'admin-system-health' as ViewId, label: 'System Health & Latency', icon: Activity },
    { id: 'admin-usage' as ViewId, label: 'Global AI Usage & Storage', icon: BarChart4 },
    { id: 'admin-audit' as ViewId, label: 'Cryptographic Audit Logs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#070c14] text-slate-100 flex flex-col selection:bg-amber-400/30 selection:text-white">
      
      {/* Platform Admin Top Header */}
      <header className="bg-[#0b121e] border-b border-slate-800 px-3.5 sm:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
          <button 
            onClick={() => onNavigate('marketing-home')}
            className="hover:opacity-85 transition-opacity focus:outline-none shrink-0"
            title="Return to Nexora Home"
          >
            <BrandLogo size="md" showWordmark={false} animated={true} />
          </button>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 truncate">
              <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight truncate">NEXORA PLATFORM ADMIN</span>
              <span className="hidden xs:inline-block font-mono text-[9px] sm:text-[10px] bg-amber-500/15 text-amber-300 px-1.5 sm:px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                ROOT PRIVILEGES
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">Cluster: asia-east1 · Multi-Tenant Supervisor</div>
          </div>
        </div>

        {/* Right Switch Back to Workspace button & Return Home */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
            <span>FLEET: 100% HEALTHY</span>
          </div>

          <button 
            onClick={() => onNavigate('marketing-home')}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            title="Return to Nexora Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Nexora Home</span>
            <span className="sm:hidden">Home</span>
          </button>

          <button 
            onClick={() => onNavigate('portal-dashboard')}
            className="px-2.5 sm:px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Customer Portal</span>
          </button>

          <button 
            onClick={() => onNavigate('app-dashboard')}
            className="px-2.5 sm:px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 whitespace-nowrap cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> 
            <span className="hidden sm:inline">Back to Workspace</span>
            <span className="sm:hidden">Workspace</span>
          </button>
        </div>
      </header>

      {/* Admin Nav Bar */}
      <div className="bg-[#0d1626] border-b border-slate-800/80 px-3 sm:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-colors shrink-0 ${
                  isActive 
                    ? 'bg-slate-800 text-amber-300 font-bold border border-amber-400/40 shadow-xs' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-900 bg-[#060a10] px-6 py-3 text-center text-[10px] text-slate-500 font-mono flex items-center justify-between">
        <span>NEXORA-SUPERVISOR-V1.0</span>
        <span>AUDIT ENGINE ACTIVE · SIGNATURE: 0x8F92...B31</span>
      </footer>

    </div>
  );
};
