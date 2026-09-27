export type ViewId = 
  // Marketing & Public
  | 'marketing-home'
  | 'marketing-overview'
  | 'marketing-ai-support'
  | 'marketing-analytics'
  | 'marketing-rag'
  | 'marketing-pricing'
  | 'marketing-faq'
  // Auth
  | 'auth-login'
  | 'auth-signup'
  // SaaS Application
  | 'app-dashboard'
  | 'app-inbox'
  | 'app-conversation'
  | 'app-customers'
  | 'app-tickets'
  | 'app-knowledge-base'
  | 'app-analytics'
  | 'app-team'
  | 'app-billing'
  | 'app-settings'
  // Customer Portal
  | 'portal-dashboard'
  | 'portal-tickets'
  | 'portal-ticket-detail'
  | 'portal-new-ticket'
  | 'portal-knowledge'
  | 'portal-profile'
  | 'portal-auth'
  // Admin Panel
  | 'admin-dashboard'
  | 'admin-organizations'
  | 'admin-system-health'
  | 'admin-usage'
  | 'admin-audit';

export type UIState = 'populated' | 'loading' | 'empty' | 'error';
export type ViewportMode = 'desktop' | 'mobile';

export interface ViewCategory {
  id: string;
  label: string;
  views: {
    id: ViewId;
    label: string;
    description: string;
    route: string;
  }[];
}
