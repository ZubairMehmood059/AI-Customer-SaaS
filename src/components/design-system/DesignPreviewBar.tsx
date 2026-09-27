import React from 'react';
import { 
  ViewId, 
  UIState, 
  ViewportMode 
} from '../../types/design';
import { 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Inbox, 
  ChevronDown,
  Palette,
  ExternalLink,
  Shield,
  LayoutGrid
} from 'lucide-react';

interface DesignPreviewBarProps {
  currentView: ViewId;
  onViewChange: (view: ViewId) => void;
  uiState: UIState;
  onUIStateChange: (state: UIState) => void;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  onOpenTokens: () => void;
}

export const DesignPreviewBar: React.FC<DesignPreviewBarProps> = ({
  currentView,
  onViewChange,
  uiState,
  onUIStateChange,
  viewportMode,
  onViewportChange,
  onOpenTokens,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const viewCategories = [
    {
      group: 'Public & Marketing',
      views: [
        { id: 'marketing-home' as ViewId, label: '01. Public Homepage (All 12 Sections)', route: '/' },
        { id: 'marketing-ai-support' as ViewId, label: '02. AI Support Deep Dive', route: '/#ai-support' },
        { id: 'marketing-analytics' as ViewId, label: '03. Real-Time Analytics Feature', route: '/#analytics' },
        { id: 'marketing-rag' as ViewId, label: '04. Knowledge Base & RAG Pipeline', route: '/#rag-pipeline' },
        { id: 'marketing-pricing' as ViewId, label: '05. Pricing & Tiers', route: '/#pricing' },
        { id: 'marketing-faq' as ViewId, label: '06. FAQ & System Questions', route: '/#faq' },
      ],
    },
    {
      group: 'Authentication',
      views: [
        { id: 'auth-login' as ViewId, label: '07. Login Experience', route: '/auth/login' },
        { id: 'auth-signup' as ViewId, label: '08. Signup & Onboarding', route: '/auth/signup' },
      ],
    },
    {
      group: 'SaaS Workspace (/app)',
      views: [
        { id: 'app-dashboard' as ViewId, label: '09. SaaS Dashboard & KPIs', route: '/app' },
        { id: 'app-inbox' as ViewId, label: '10. Unified Inbox Queue', route: '/app/inbox' },
        { id: 'app-conversation' as ViewId, label: '11. Conversation & AI Copilot View', route: '/app/inbox/conv_4829' },
        { id: 'app-customers' as ViewId, label: '12. Customers Intelligence', route: '/app/customers' },
        { id: 'app-tickets' as ViewId, label: '13. Ticket Management Grid', route: '/app/tickets' },
        { id: 'app-knowledge-base' as ViewId, label: '14. Knowledge Base & Vector Index', route: '/app/knowledge-base' },
        { id: 'app-analytics' as ViewId, label: '15. Detailed Analytics & Deflection', route: '/app/analytics' },
        { id: 'app-team' as ViewId, label: '16. Team & Workload', route: '/app/team' },
        { id: 'app-billing' as ViewId, label: '17. Billing, Subscriptions & Invoices', route: '/app/billing' },
        { id: 'app-settings' as ViewId, label: '18. Workspace & AI Settings', route: '/app/settings' },
      ],
    },
    {
      group: 'Platform Admin Panel (/admin)',
      views: [
        { id: 'admin-dashboard' as ViewId, label: '19. Admin Fleet Dashboard', route: '/admin' },
        { id: 'admin-organizations' as ViewId, label: '20. Admin Organizations Management', route: '/admin/organizations' },
        { id: 'admin-system-health' as ViewId, label: '21. Admin System Health & Latency', route: '/admin/system-health' },
        { id: 'admin-usage' as ViewId, label: '22. Admin Usage & Token Consumption', route: '/admin/usage' },
        { id: 'admin-audit' as ViewId, label: '23. Admin Cryptographic Audit Logs', route: '/admin/audit' },
      ],
    },
  ];

  const currentViewObj = viewCategories.flatMap(c => c.views).find(v => v.id === currentView);

  return (
    <div className="sticky top-0 z-40 bg-[#090e17] text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Brand tag & View Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <span className="w-6 h-6 rounded bg-gradient-to-tr from-[#4ade80] to-[#2dd4bf] flex items-center justify-center text-[#0f172a] font-black text-xs shadow-sm">
              N
            </span>
            <span className="text-white text-sm hidden sm:inline font-semibold">NEXORA AI</span>
            <span className="text-[10px] bg-slate-800 text-[#4ade80] px-1.5 py-0.5 rounded border border-slate-700/80 font-mono">
              DESIGN PREVIEW
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              <span className="text-slate-400">View:</span>
              <span className="text-white font-semibold">{currentViewObj?.label.slice(4)}</span>
              <span className="font-mono text-[11px] text-[#2dd4bf] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                {currentViewObj?.route}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                <div className="absolute left-0 mt-1.5 w-80 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-40 p-2 space-y-3">
                  {viewCategories.map((group) => (
                    <div key={group.group}>
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {group.group}
                      </div>
                      <div className="space-y-0.5">
                        {group.views.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => {
                              onViewChange(v.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                              currentView === v.id
                                ? 'bg-[#4ade80]/15 text-[#4ade80] font-semibold border border-[#4ade80]/30'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <span className="truncate">{v.label}</span>
                            <span className="font-mono text-[10px] text-slate-400 shrink-0 ml-2">
                              {v.route}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: State Toggles (Populated, Loading, Empty, Error) */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 px-1.5 font-medium">State:</span>
          {(['populated', 'loading', 'empty', 'error'] as UIState[]).map((state) => (
            <button
              key={state}
              onClick={() => onUIStateChange(state)}
              className={`px-2.5 py-1 rounded-md text-[11px] capitalize font-medium transition-all ${
                uiState === state
                  ? 'bg-slate-800 text-white shadow-xs border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {state === 'populated' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ade80] mr-1.5"></span>}
              {state === 'loading' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>}
              {state === 'empty' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>}
              {state === 'error' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 mr-1.5"></span>}
              {state}
            </button>
          ))}
        </div>

        {/* Right: Viewport Toggle & Design Tokens Modal */}
        <div className="flex items-center gap-2">
          {/* Viewport switch */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => onViewportChange('desktop')}
              title="Desktop 1440px Preview"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => onViewportChange('mobile')}
              title="Mobile 390px Viewport Preview"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Frame</span>
            </button>
          </div>

          {/* Tokens button */}
          <button
            onClick={onOpenTokens}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#4ade80]/20 to-[#2dd4bf]/20 hover:from-[#4ade80]/30 hover:to-[#2dd4bf]/30 border border-[#4ade80]/40 text-[#4ade80] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design Tokens</span>
          </button>
        </div>

      </div>
    </div>
  );
};
