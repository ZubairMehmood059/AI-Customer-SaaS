/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewId, UIState } from './types/design';
import { TokensDrawer } from './components/design-system/TokensDrawer';
import { NewTicketModal } from './components/modals/NewTicketModal';

// Marketing
import { MarketingView } from './views/marketing/MarketingView';

// Auth
import { LoginView } from './views/auth/LoginView';
import { SignupView } from './views/auth/SignupView';

// SaaS Workspace
import { AppShell } from './views/app/AppShell';
import { DashboardView } from './views/app/DashboardView';
import { InboxView } from './views/app/InboxView';
import { CustomersView } from './views/app/CustomersView';
import { TicketsView } from './views/app/TicketsView';
import { KnowledgeBaseView } from './views/app/KnowledgeBaseView';
import { AnalyticsView } from './views/app/AnalyticsView';
import { TeamView } from './views/app/TeamView';
import { BillingView } from './views/app/BillingView';
import { SettingsView } from './views/app/SettingsView';

// Platform Admin
import { AdminShell } from './views/admin/AdminShell';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminOrganizationsView } from './views/admin/AdminOrganizationsView';
import { AdminSystemHealthView } from './views/admin/AdminSystemHealthView';
import { AdminUsageView } from './views/admin/AdminUsageView';
import { AdminAuditLogsView } from './views/admin/AdminAuditLogsView';

// Customer Portal
import { portalStore } from './store/portalStore';
import { PortalShell } from './views/portal/PortalShell';
import { PortalAuthView } from './views/portal/PortalAuthView';
import { PortalDashboardView } from './views/portal/PortalDashboardView';
import { PortalTicketsView } from './views/portal/PortalTicketsView';
import { PortalTicketDetailView } from './views/portal/PortalTicketDetailView';
import { PortalKnowledgeView } from './views/portal/PortalKnowledgeView';
import { PortalProfileView } from './views/portal/PortalProfileView';
import { PortalNewTicketModal } from './views/portal/PortalNewTicketModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewId>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/login') || hash.startsWith('#/login') || hash === '#login') {
        return 'auth-login';
      }
      if (path.startsWith('/signup') || hash.startsWith('#/signup') || hash === '#signup') {
        return 'auth-signup';
      }
      if (path.startsWith('/portal') || hash.startsWith('#/portal') || hash === '#portal') {
        const customer = portalStore.getCurrentCustomer();
        return customer ? 'portal-dashboard' : 'portal-auth';
      }
      if (path.startsWith('/admin') || hash.startsWith('#/admin') || hash === '#admin') {
        return 'admin-dashboard';
      }
      if (path.startsWith('/app') || hash.startsWith('#/app') || hash === '#app') {
        return 'app-dashboard';
      }
    }
    return 'marketing-home';
  });

  const [uiState, setUiState] = useState<UIState>('populated');
  const [tokensDrawerOpen, setTokensDrawerOpen] = useState(false);
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [portalNewTicketOpen, setPortalNewTicketOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('#4829');

  const isMarketingView = currentView.startsWith('marketing-');
  const isAuthView = currentView.startsWith('auth-');
  const isAdminView = currentView.startsWith('admin-');
  const isAppView = currentView.startsWith('app-');
  const isPortalView = currentView.startsWith('portal-');

  // Sync URL history state when views change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentView.startsWith('portal-')) {
        if (window.location.pathname !== '/portal') {
          window.history.pushState(null, '', '/portal');
        }
      } else if (currentView.startsWith('app-')) {
        if (window.location.pathname !== '/app') {
          window.history.pushState(null, '', '/app');
        }
      } else if (currentView.startsWith('admin-')) {
        if (window.location.pathname !== '/admin') {
          window.history.pushState(null, '', '/admin');
        }
      } else if (currentView === 'auth-login') {
        if (window.location.pathname !== '/login') {
          window.history.pushState(null, '', '/login');
        }
      } else if (currentView === 'auth-signup') {
        if (window.location.pathname !== '/signup') {
          window.history.pushState(null, '', '/signup');
        }
      } else if (currentView === 'marketing-home') {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        }
      }
    }
  }, [currentView]);

  // Support browser Back and Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/portal')) {
        const customer = portalStore.getCurrentCustomer();
        setCurrentView(customer ? 'portal-dashboard' : 'portal-auth');
      } else if (path.startsWith('/admin')) {
        setCurrentView('admin-dashboard');
      } else if (path.startsWith('/app')) {
        setCurrentView('app-dashboard');
      } else if (path.startsWith('/login')) {
        setCurrentView('auth-login');
      } else if (path.startsWith('/signup')) {
        setCurrentView('auth-signup');
      } else {
        setCurrentView('marketing-home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle section scrolling when a marketing sub-view is selected
  useEffect(() => {
    if (currentView.startsWith('marketing-') && currentView !== 'marketing-home') {
      const sectionMap: Record<string, string> = {
        'marketing-overview': 'overview',
        'marketing-ai-support': 'ai-support',
        'marketing-analytics': 'analytics',
        'marketing-rag': 'rag',
        'marketing-pricing': 'pricing',
        'marketing-faq': 'faq',
      };
      const elementId = sectionMap[currentView];
      if (elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [currentView]);

  const handleOpenPortalTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setCurrentView('portal-ticket-detail');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0f172a] text-slate-100">
      {/* Main Content Router */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* MARKETING HOMEPAGE & SUB-SECTIONS */}
        {isMarketingView && (
          <MarketingView
            uiState={uiState}
            onNavigateToApp={() => setCurrentView('app-dashboard')}
            onNavigateToAuth={(mode) => setCurrentView(mode === 'signup' ? 'auth-signup' : 'auth-login')}
            onNavigateToPortal={() => {
              const customer = portalStore.getCurrentCustomer();
              setCurrentView(customer ? 'portal-dashboard' : 'portal-auth');
            }}
          />
        )}

        {/* AUTH: LOGIN */}
        {currentView === 'auth-login' && (
          <LoginView
            uiState={uiState}
            onNavigateToSignup={() => setCurrentView('auth-signup')}
            onLoginSuccess={(role) => {
              if (role === 'admin') {
                setCurrentView('admin-dashboard');
              } else if (role === 'customer') {
                setCurrentView('portal-dashboard');
              } else {
                setCurrentView('app-dashboard');
              }
            }}
            onNavigateHome={() => setCurrentView('marketing-home')}
            onNavigateToCustomerPortal={() => setCurrentView('portal-dashboard')}
          />
        )}

        {/* AUTH: SIGNUP */}
        {currentView === 'auth-signup' && (
          <SignupView
            uiState={uiState}
            onNavigateToLogin={() => setCurrentView('auth-login')}
            onSignupSuccess={() => setCurrentView('app-dashboard')}
            onNavigateHome={() => setCurrentView('marketing-home')}
          />
        )}

        {/* SAAS WORKSPACE APPLICATION (SUPPORT TEAM) */}
        {isAppView && (
          <AppShell
            currentView={currentView}
            onNavigate={setCurrentView}
            onOpenNewTicketModal={() => setNewTicketModalOpen(true)}
          >
            {currentView === 'app-dashboard' && (
              <DashboardView
                uiState={uiState}
                onOpenConversation={() => setCurrentView('app-inbox')}
                onOpenNewTicket={() => setNewTicketModalOpen(true)}
              />
            )}

            {(currentView === 'app-inbox' || currentView === 'app-conversation') && (
              <InboxView uiState={uiState} />
            )}

            {currentView === 'app-customers' && (
              <CustomersView uiState={uiState} />
            )}

            {currentView === 'app-tickets' && (
              <TicketsView
                uiState={uiState}
                onOpenConversation={() => setCurrentView('app-inbox')}
              />
            )}

            {currentView === 'app-knowledge-base' && (
              <KnowledgeBaseView uiState={uiState} />
            )}

            {currentView === 'app-analytics' && (
              <AnalyticsView uiState={uiState} />
            )}

            {currentView === 'app-team' && (
              <TeamView uiState={uiState} />
            )}

            {currentView === 'app-billing' && (
              <BillingView uiState={uiState} />
            )}

            {currentView === 'app-settings' && (
              <SettingsView uiState={uiState} />
            )}
          </AppShell>
        )}

        {/* PLATFORM ADMIN CONSOLE */}
        {isAdminView && (
          <AdminShell
            currentView={currentView}
            onNavigate={setCurrentView}
          >
            {currentView === 'admin-dashboard' && (
              <AdminDashboardView
                uiState={uiState}
                onNavigateToOrgs={() => setCurrentView('admin-organizations')}
                onNavigateToHealth={() => setCurrentView('admin-system-health')}
              />
            )}

            {currentView === 'admin-organizations' && (
              <AdminOrganizationsView uiState={uiState} />
            )}

            {currentView === 'admin-system-health' && (
              <AdminSystemHealthView uiState={uiState} />
            )}

            {currentView === 'admin-usage' && (
              <AdminUsageView uiState={uiState} />
            )}

            {currentView === 'admin-audit' && (
              <AdminAuditLogsView uiState={uiState} />
            )}
          </AdminShell>
        )}

        {/* CUSTOMER PORTAL AUTH */}
        {currentView === 'portal-auth' && (
          <PortalAuthView
            onAuthSuccess={() => setCurrentView('portal-dashboard')}
            onNavigateHome={() => setCurrentView('marketing-home')}
            onNavigateToStaffApp={() => setCurrentView('app-dashboard')}
          />
        )}

        {/* CUSTOMER PORTAL SHELL & VIEWS */}
        {isPortalView && currentView !== 'portal-auth' && (
          <PortalShell
            currentView={currentView}
            onNavigate={setCurrentView}
            onOpenNewTicket={() => setPortalNewTicketOpen(true)}
          >
            {currentView === 'portal-dashboard' && (
              <PortalDashboardView
                onOpenNewTicket={() => setPortalNewTicketOpen(true)}
                onOpenTicket={handleOpenPortalTicket}
                onNavigateToKnowledge={() => setCurrentView('portal-knowledge')}
                onNavigateToTickets={() => setCurrentView('portal-tickets')}
              />
            )}

            {currentView === 'portal-tickets' && (
              <PortalTicketsView
                onOpenNewTicket={() => setPortalNewTicketOpen(true)}
                onOpenTicket={handleOpenPortalTicket}
              />
            )}

            {currentView === 'portal-ticket-detail' && (
              <PortalTicketDetailView
                ticketId={selectedTicketId}
                onBack={() => setCurrentView('portal-tickets')}
              />
            )}

            {currentView === 'portal-knowledge' && (
              <PortalKnowledgeView
                onOpenNewTicket={() => setPortalNewTicketOpen(true)}
              />
            )}

            {currentView === 'portal-profile' && (
              <PortalProfileView />
            )}
          </PortalShell>
        )}

      </div>

      {/* Global Modals & Slide-overs */}
      <TokensDrawer
        isOpen={tokensDrawerOpen}
        onClose={() => setTokensDrawerOpen(false)}
      />

      {/* Staff Workspace New Ticket Modal */}
      <NewTicketModal
        isOpen={newTicketModalOpen}
        onClose={() => setNewTicketModalOpen(false)}
        onSubmitSuccess={() => {
          setCurrentView('app-inbox');
        }}
      />

      {/* Customer Portal New Ticket Modal */}
      <PortalNewTicketModal
        isOpen={portalNewTicketOpen}
        onClose={() => setPortalNewTicketOpen(false)}
        onSuccess={(ticketId) => {
          setSelectedTicketId(ticketId);
          setCurrentView('portal-ticket-detail');
        }}
      />

    </div>
  );
}
