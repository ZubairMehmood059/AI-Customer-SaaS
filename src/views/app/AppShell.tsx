import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Inbox, 
  Users, 
  Ticket, 
  BookOpen, 
  BarChart3, 
  UserCheck, 
  CreditCard, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  ChevronDown, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Building,
  Home
} from 'lucide-react';
import { ViewId } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';
import { authStore, AuthUser } from '../../store/authStore';

interface AppShellProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  onOpenNewTicketModal: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  onOpenNewTicketModal,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(authStore.getCurrentUser());

  useEffect(() => {
    const unsub = authStore.subscribe(() => {
      setCurrentUser(authStore.getCurrentUser());
    });
    return unsub;
  }, []);

  const userName = currentUser?.name || 'Alex Rivera';
  const userOrg = currentUser?.orgName || 'Acme Global Ltd.';
  const userInitials = authStore.getInitials(userName);

  const mainNavItems = [
    { id: 'app-dashboard' as ViewId, label: 'Overview', icon: LayoutDashboard, route: '/app' },
    { id: 'app-inbox' as ViewId, label: 'Inbox', icon: Inbox, route: '/app/inbox', badge: '5' },
    { id: 'app-customers' as ViewId, label: 'Customers', icon: Users, route: '/app/customers' },
    { id: 'app-tickets' as ViewId, label: 'Tickets', icon: Ticket, route: '/app/tickets', badge: '14' },
    { id: 'app-knowledge-base' as ViewId, label: 'Knowledge Base', icon: BookOpen, route: '/app/knowledge-base' },
    { id: 'app-analytics' as ViewId, label: 'Analytics', icon: BarChart3, route: '/app/analytics' },
    { id: 'app-team' as ViewId, label: 'Team', icon: UserCheck, route: '/app/team' },
  ];

  const utilityNavItems = [
    { id: 'app-billing' as ViewId, label: 'Billing & Usage', icon: CreditCard, route: '/app/billing' },
    { id: 'app-settings' as ViewId, label: 'Settings', icon: Settings, route: '/app/settings' },
  ];

  const getBreadcrumb = () => {
    switch (currentView) {
      case 'app-dashboard': return 'Acme Corp / Overview';
      case 'app-inbox': return 'Acme Corp / Unified Inbox';
      case 'app-conversation': return 'Acme Corp / Inbox / Thread #4829';
      case 'app-customers': return 'Acme Corp / Customer Intelligence';
      case 'app-tickets': return 'Acme Corp / Tickets';
      case 'app-knowledge-base': return 'Acme Corp / Knowledge Base & Vector Index';
      case 'app-analytics': return 'Acme Corp / Operational Analytics';
      case 'app-team': return 'Acme Corp / Team Directory';
      case 'app-billing': return 'Acme Corp / Billing & Plans';
      case 'app-settings': return 'Acme Corp / Workspace Settings';
      default: return 'Acme Corp / Workspace';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col md:flex-row">
      
      {/* SIDEBAR (Desktop 260px) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0f172a] text-slate-300 border-r border-slate-800 shrink-0 select-none">
        
        {/* Brand & Workspace Selector */}
        <div className="p-4 border-b border-slate-800">
          <div className="mb-4">
            <button 
              onClick={() => onNavigate('marketing-home')}
              className="hover:opacity-90 transition-opacity text-left cursor-pointer focus:outline-none"
              title="Return to Home Page"
            >
              <BrandLogo size="md" showSubtitle={true} subtitle="SaaS Workspace" animated={true} />
            </button>
          </div>

          {/* Org Selector */}
          <div className="relative">
            <button
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 text-xs transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="w-5 h-5 rounded bg-emerald-500/20 text-[#4ade80] flex items-center justify-center font-bold text-[10px]">
                  {userOrg.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold truncate">{userOrg}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>

            {orgDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-30 p-1.5 space-y-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Organization</div>
                <button className="w-full text-left px-2 py-1.5 rounded-lg bg-[#4ade80]/15 text-[#4ade80] font-medium flex items-center justify-between">
                  <span>{userOrg}</span>
                  <span className="text-[10px] font-mono bg-emerald-950 px-1.5 py-0.2 rounded">Scale Pro</span>
                </button>
                <button className="w-full text-left px-2 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center justify-between">
                  <span>Staging Sandbox</span>
                  <span className="text-[10px] font-mono text-slate-500">Free</span>
                </button>
                <div className="border-t border-slate-800 my-1"></div>
                <button 
                  onClick={() => onNavigate('portal-dashboard')}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-2 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span>Customer Support Portal</span>
                </button>
                <button 
                  onClick={() => onNavigate('admin-dashboard')}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-amber-400 hover:bg-amber-400/10 flex items-center gap-2 font-medium"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Platform Admin Console</span>
                </button>
                <button 
                  onClick={() => onNavigate('marketing-home')}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-2 font-medium"
                >
                  <Home className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Return to Home Page</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Workspace
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'app-inbox' && currentView === 'app-conversation');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold border-l-2 border-[#4ade80] shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4ade80]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="px-3 pt-6 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Preferences & Account
          </div>
          {utilityNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold border-l-2 border-[#4ade80]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4ade80]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          {/* Direct Return to Home navigation in sidebar */}
          <button
            onClick={() => onNavigate('marketing-home')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Return to Home Page</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-600" />
          </button>
        </div>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-800 bg-[#0b1120]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#4ade80] text-xs font-bold flex items-center justify-center border border-emerald-500/30 shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden min-w-0">
                <div className="text-xs font-semibold text-white truncate">{userName}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser?.email || 'agent@workspace.io'}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                authStore.logout();
                onNavigate('marketing-home');
              }}
              title="Sign Out to Home"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* MOBILE TOPBAR (Visible on small screens) */}
      <div className="md:hidden bg-[#0f172a] text-white p-3 sm:p-3.5 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
        <button 
          onClick={() => onNavigate('marketing-home')} 
          className="focus:outline-none flex items-center gap-2"
          title="Return to Home"
        >
          <BrandLogo size="sm" showSubtitle={false} />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('marketing-home')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
            title="Return to Home"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Home</span>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#0f172a] border-r border-slate-800 h-full p-4 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <BrandLogo size="sm" showSubtitle={true} subtitle="Workspace" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
                  Workspace
                </div>
                {mainNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 rounded-lg flex items-center justify-between text-xs transition-colors ${
                      currentView === item.id 
                        ? 'bg-slate-800 text-[#4ade80] font-bold' 
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="font-mono text-[10px] bg-slate-800 text-[#4ade80] px-1.5 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-3 space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
                  Management
                </div>
                {utilityNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs transition-colors ${
                      currentView === item.id 
                        ? 'bg-slate-800 text-[#4ade80] font-bold' 
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-amber-400 hover:bg-amber-400/10 transition-colors flex items-center gap-2 font-medium"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Platform Admin Console</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button 
                onClick={() => { onNavigate('marketing-home'); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-900 flex items-center justify-between transition-colors"
              >
                <span>Exit to Marketing Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
        
        {/* TOPBAR (Strict Breadcrumbs & Actions) */}
        <header className="h-14 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-20">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs overflow-hidden">
            <span className="text-slate-600 font-medium truncate max-w-[130px] sm:max-w-none">{getBreadcrumb()}</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
            <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI Copilot Active (114ms)</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative hidden lg:block">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input 
                type="text" 
                placeholder="Search tickets, customers, docs... (Cmd+K)" 
                className="w-64 xl:w-72 bg-slate-100 hover:bg-slate-200/60 focus:bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all font-sans"
              />
            </div>

            {/* Direct Return to Home Page button */}
            <button 
              onClick={() => onNavigate('marketing-home')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Return to Nexora Home Page"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Home</span>
            </button>

            {/* Quick Ticket Action */}
            <button 
              onClick={onOpenNewTicketModal}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 rounded-lg flex items-center gap-1.5 shadow-xs whitespace-nowrap transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Ticket</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => onNavigate('app-inbox')}
                title="Notifications"
                className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
              </button>
            </div>

            {/* User Profile Avatar */}
            <div 
              className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-500/40"
              title={`Logged in as ${userName} (${currentUser?.email || 'agent'})`}
            >
              {userInitials}
            </div>
          </div>

        </header>

        {/* Viewport Content */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
