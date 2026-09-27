/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  BookOpen, 
  User, 
  Plus, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink, 
  Sparkles,
  Shield,
  LifeBuoy,
  Bell,
  CheckCircle2,
  Users,
  Home
} from 'lucide-react';
import { ViewId } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';
import { portalStore, CustomerUser } from '../../store/portalStore';

interface PortalShellProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  onOpenNewTicket: () => void;
  children: React.ReactNode;
}

export const PortalShell: React.FC<PortalShellProps> = ({
  currentView,
  onNavigate,
  onOpenNewTicket,
  children,
}) => {
  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser | null>(portalStore.getCurrentCustomer());
  const [allCustomers, setAllCustomers] = useState<CustomerUser[]>(portalStore.getAllCustomers());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [switchDropdownOpen, setSwitchDropdownOpen] = useState(false);

  useEffect(() => {
    const unsub = portalStore.subscribe(() => {
      setCurrentCustomer(portalStore.getCurrentCustomer());
      setAllCustomers(portalStore.getAllCustomers());
    });
    return unsub;
  }, []);

  const navItems = [
    { id: 'portal-dashboard' as ViewId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portal-tickets' as ViewId, label: 'My Tickets', icon: Ticket },
    { id: 'portal-knowledge' as ViewId, label: 'Help Center & Guides', icon: BookOpen },
    { id: 'portal-profile' as ViewId, label: 'Account & Organization', icon: User },
  ];

  const handleLogout = () => {
    portalStore.logoutCustomer();
    onNavigate('portal-auth');
  };

  const handleSwitchCustomer = (custId: string) => {
    portalStore.switchCustomer(custId);
    setSwitchDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const initials = currentCustomer?.name
    ? currentCustomer.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'CU';

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand + Portal Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('marketing-home')} 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
              title="Return to Nexora Home"
            >
              <BrandLogo size="md" showSubtitle={false} animated={true} />
            </button>
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Customer Portal</span>
            </div>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('marketing-home')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all cursor-pointer"
              title="Return to Nexora Home"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Home</span>
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'portal-tickets' && currentView === 'portal-ticket-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Create Support Request Button */}
            <button
              onClick={onOpenNewTicket}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 rounded-lg shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Request</span>
              <span className="sm:hidden">Request</span>
            </button>

            {/* Customer Profile & Demo Switcher Dropdown */}
            {currentCustomer ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-600 transition-all text-xs focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 font-bold text-xs flex items-center justify-center shadow-xs">
                    {initials}
                  </div>
                  <div className="hidden lg:block text-left max-w-[120px] truncate">
                    <div className="font-semibold text-slate-100 text-xs truncate leading-tight">{currentCustomer.name}</div>
                    <div className="text-[10px] text-slate-400 truncate leading-tight">{currentCustomer.company}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 text-xs animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => {
                      setUserDropdownOpen(false);
                      setSwitchDropdownOpen(false);
                    }}
                  >
                    <div className="p-2 border-b border-slate-800">
                      <div className="font-bold text-white text-sm">{currentCustomer.name}</div>
                      <div className="text-slate-400 text-[11px] truncate">{currentCustomer.email}</div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {currentCustomer.company}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                          {currentCustomer.plan}
                        </span>
                      </div>
                    </div>

                    {/* Quick Profile Navigation */}
                    <div className="py-1">
                      <button
                        onClick={() => { onNavigate('portal-profile'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account & Preferences</span>
                      </button>
                      <button
                        onClick={() => { onNavigate('portal-tickets'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2"
                      >
                        <Ticket className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Support Requests</span>
                      </button>
                    </div>

                    {/* Customer Account Switcher for Demo Testing */}
                    <div className="pt-1 border-t border-slate-800">
                      <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Switch Demo Account</span>
                        <Users className="w-3 h-3 text-slate-500" />
                      </div>
                      <div className="space-y-1 mt-1 max-h-36 overflow-y-auto">
                        {allCustomers.map((cust) => (
                          <button
                            key={cust.id}
                            onClick={() => handleSwitchCustomer(cust.id)}
                            className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] flex items-center justify-between transition-colors ${
                              cust.id === currentCustomer.id
                                ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="truncate">{cust.name} ({cust.company.split(' ')[0]})</span>
                            {cust.id === currentCustomer.id && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="pt-1.5 mt-1.5 border-t border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-500/15 text-rose-400 flex items-center gap-2 text-[11px]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Portal</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('portal-auth')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-150">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => { onNavigate('marketing-home'); setMobileMenuOpen(false); }}
                className="text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Nexora Home</span>
              </button>
              <button
                onClick={() => { onNavigate('app-dashboard'); setMobileMenuOpen(false); }}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium"
              >
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Support Team Console</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#090e17] border-t border-slate-800/80 text-slate-400 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <BrandLogo size="sm" showWordmark={true} />
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Customer Support Portal</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <button onClick={() => onNavigate('portal-knowledge')} className="hover:text-slate-300">
              Knowledge Base
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('portal-tickets')} className="hover:text-slate-300">
              My Support Tickets
            </button>
            <span>·</span>
            <span className="text-slate-500 font-mono">TLS 256-Bit Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
