import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  BarChart3, 
  Inbox, 
  Users, 
  Ticket, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Layers, 
  Database, 
  FileText, 
  Lock, 
  Clock, 
  Activity, 
  HelpCircle,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import { UIState } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';

interface MarketingViewProps {
  uiState: UIState;
  onNavigateToApp: () => void;
  onNavigateToAuth: (mode: 'login' | 'signup') => void;
  onNavigateToPortal?: () => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({
  uiState,
  onNavigateToApp,
  onNavigateToAuth,
  onNavigateToPortal,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [ragActiveStep, setRagActiveStep] = useState<number>(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (uiState === 'loading') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-8 max-w-6xl mx-auto space-y-12 animate-pulse">
        <div className="h-16 bg-slate-800 rounded-xl w-full"></div>
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <div className="h-8 bg-slate-800 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto"></div>
          <div className="h-12 bg-slate-800 rounded-lg w-48 mx-auto mt-6"></div>
        </div>
        <div className="h-96 bg-slate-800/60 rounded-2xl border border-slate-700"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-48 bg-slate-800 rounded-xl"></div>
          <div className="h-48 bg-slate-800 rounded-xl"></div>
          <div className="h-48 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (uiState === 'error') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0f172a] text-white p-6">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Failed to load marketing catalog</h2>
          <p className="text-sm text-slate-400">Network handshake timed out while fetching platform pricing and configuration schemas.</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Request
          </button>
        </div>
      </div>
    );
  }

  if (uiState === 'empty') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0f172a] text-white p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">No public campaigns active</h2>
          <p className="text-sm text-slate-400">The public marketing site is currently in maintenance mode or staged for internal review.</p>
          <button 
            onClick={onNavigateToApp}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"
          >
            Enter SaaS Workspace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-[#4ade80]/30 selection:text-white">
      
      {/* 1. TOP NAVIGATION (Unique Floating Pill Navbar - Rounded Both Sides, Border & Hover Effects) */}
      <div className="sticky top-3 sm:top-5 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <header className="max-w-6xl mx-auto pointer-events-auto transition-all duration-300">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/75 hover:border-[#4ade80]/60 rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl shadow-black/60 hover:shadow-[0_8px_30px_rgba(74,222,128,0.18)] transition-all duration-300 flex items-center justify-between gap-3 group">
            
            {/* Zone 1: Brand wordmark & logo */}
            <a href="#hero" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
              <BrandLogo size="md" animated={true} />
            </a>

            {/* Zone 2: Clean navigation links with pill hover highlight */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm font-medium text-slate-300">
              <a href="#overview" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">Platform</a>
              <a href="#ai-support" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">AI Support</a>
              <a href="#analytics" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">Analytics</a>
              <a href="#rag-pipeline" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">Knowledge RAG</a>
              <a href="#security" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">Security</a>
              <a href="#pricing" className="px-3 py-1.5 rounded-full hover:text-white hover:bg-slate-800/80 transition-all">Pricing</a>
            </nav>

            {/* Zone 3: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {onNavigateToPortal && (
                <button 
                  onClick={onNavigateToPortal}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Customer Portal</span>
                </button>
              )}
              <button 
                onClick={() => onNavigateToAuth('login')}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all whitespace-nowrap"
              >
                Start Free Trial
              </button>
              
              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Mobile menu drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
                <a 
                  href="#overview" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  Platform
                </a>
                <a 
                  href="#ai-support" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  AI Support
                </a>
                <a 
                  href="#analytics" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  Analytics
                </a>
                <a 
                  href="#rag-pipeline" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  Knowledge RAG
                </a>
                <a 
                  href="#security" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  Security
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  Pricing
                </a>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                {onNavigateToPortal && (
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigateToPortal(); }}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"
                  >
                    Enter Customer Portal
                  </button>
                )}
                <button 
                  onClick={() => { setMobileMenuOpen(false); onNavigateToAuth('signup'); }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
                >
                  Start Free Trial
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); onNavigateToApp(); }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"
                >
                  Enter SaaS Workspace Demo
                </button>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        className="relative pt-20 pb-24 overflow-hidden border-b border-slate-800 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.94)), url('/cyber_dashboard_bg.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
            <span>Next-Gen Enterprise Support Platform</span>
            <span className="text-slate-500">·</span>
            <span className="text-[#2dd4bf]">Sub-150ms Knowledge Retrieval</span>
          </div>

          {/* Strong Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Intelligent Support. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4ade80] via-[#2dd4bf] to-[#6ee7b7] bg-clip-text text-transparent">
              Real-Time Insight.
            </span>
          </h1>

          {/* Supporting Prose */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Nexora AI unifies your customer conversations, resolves Tier-1 inquiries autonomously with zero hallucination, and equips human agents with live intelligence.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onNavigateToApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              <span>Explore Live Demo</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Hero Dashboard Preview Card */}
          <div className="relative max-w-5xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-black/80 overflow-hidden text-left">
            {/* Window bar */}
            <div className="h-10 bg-slate-950 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0"></span>
                <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline truncate">app.nexora.ai / workspace / inbox</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400 font-mono shrink-0">
                <span className="text-[#4ade80]">● AI Co-pilot Ready</span>
                <span className="hidden sm:inline">Latency: 114ms</span>
              </div>
            </div>

            {/* Inner Dashboard View */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left summary & KPIs */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Autonomous Resolution Rate</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-white font-mono">78.4%</span>
                    <span className="text-xs text-[#4ade80] font-mono flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2% MoM
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] h-full rounded-full" style={{ width: '78.4%' }}></div>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Active Queue</span>
                    <span className="text-white font-mono font-semibold">14 tickets</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Median First Response</span>
                    <span className="text-[#2dd4bf] font-mono font-semibold">1.2 mins</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">CSAT Score</span>
                    <span className="text-white font-mono font-semibold">4.92 / 5.00</span>
                  </div>
                </div>
              </div>

              {/* Right: Live Ticket Simulation */}
              <div className="lg:col-span-8 bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center">
                        SR
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Sarah Reynolds · Stripe Payments Inc.</div>
                        <div className="text-xs text-slate-400">Query regarding webhook signature mismatch</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded border border-[#4ade80]/20">
                      High Priority
                    </span>
                  </div>

                  {/* Customer message */}
                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 mb-3 border border-slate-800/80">
                    "Hi, we deployed our v2 endpoint but webhook verification is failing with error code 401. How do we retrieve the active signing secret from dashboard?"
                  </div>

                  {/* AI Suggested Response */}
                  <div className="p-3.5 bg-[#0f172a] rounded-lg border border-[#4ade80]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#4ade80] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Nexora AI Recommended Solution
                      </span>
                      <span className="font-mono text-slate-400">Confidence: <strong className="text-[#4ade80]">98.2%</strong></span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      "To retrieve your current endpoint secret, navigate to <strong>Developers &gt; Webhooks &gt; Signing Secrets</strong>. Ensure your payload verification uses the raw request buffer rather than parsed JSON."
                    </p>
                    <div className="text-xs text-slate-400 flex items-center gap-2 pt-1 border-t border-slate-800">
                      <span>Source: developer-docs-v2.pdf (pg. 14)</span>
                      <span>·</span>
                      <span>Retrieved in 112ms</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-4 mt-3 border-t border-slate-800">
                  <button className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all">
                    Escalate to Human
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all">
                    Send Verified Response
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800/60 max-w-4xl mx-auto">
            <p className="text-xs tracking-wide text-slate-500 font-semibold mb-6">
              Trusted by high-growth engineering and customer operations teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70">
              <span className="text-sm font-bold tracking-tight text-slate-400 font-mono">HYPERBASE</span>
              <span className="text-sm font-bold tracking-tight text-slate-400 font-mono">VECTORFLOW</span>
              <span className="text-sm font-bold tracking-tight text-slate-400 font-mono">KINETIC LABS</span>
              <span className="text-sm font-bold tracking-tight text-slate-400 font-mono">PULSE CLOUD</span>
              <span className="text-sm font-bold tracking-tight text-slate-400 font-mono">SYNTHEX CORP</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUCT OVERVIEW (6 Capabilities Asymmetric Grid) */}
      <section id="overview" className="py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
              Unified Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Engineered for absolute accuracy and zero hallucination.
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Replace fragmented tools with an intelligent operating system that automates repetitive volume and empowers support engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Capability 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Autonomous Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Processes incoming customer issues, matches exact organizational policy, and formulates verified responses with source citations.
              </p>
              <div className="text-xs font-mono text-emerald-700 font-medium pt-2">
                Avg Resolution: 42s · 0% Hallucination
              </div>
            </div>

            {/* Capability 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unified Omni-Inbox</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Centralize email, live chat, and developer webhooks into a unified high-density workspace with multi-agent collision detection.
              </p>
              <div className="text-xs font-mono text-teal-700 font-medium pt-2">
                Real-Time WebSocket Sync
              </div>
            </div>

            {/* Capability 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Customer Intelligence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Live customer sentiment scoring, lifetime value signals, previous ticket history, and intent categorization displayed alongside chats.
              </p>
              <div className="text-xs font-mono text-slate-600 font-medium pt-2">
                Automatic Sentiment Tracking
              </div>
            </div>

            {/* Capability 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Precision Ticket Operations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Configurable SLA timers, automated priority routing, custom tag workflows, and seamless escalation to engineering squads.
              </p>
              <div className="text-xs font-mono text-emerald-700 font-medium pt-2">
                SLA Compliance: 99.4%
              </div>
            </div>

            {/* Capability 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Vector Knowledge Base & RAG</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect Notion, Markdown docs, PDFs, and API specs. Nexora indexes semantic chunks and retrieves pertinent excerpts in real-time.
              </p>
              <div className="text-xs font-mono text-teal-700 font-medium pt-2">
                Sub-150ms PGVector Search
              </div>
            </div>

            {/* Capability 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#4ade80] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Deep Operational Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Comprehensive data aggregation on deflection rate, ticket resolution velocity, agent workloads, and CSAT trends.
              </p>
              <div className="text-xs font-mono text-slate-600 font-medium pt-2">
                Exportable CSV & Audit Ready
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. AI SUPPORT DEEP DIVE */}
      <section id="ai-support" className="py-24 bg-[#0f172a] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4ade80]">
                Autonomous Resolution Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Not a chatbot. <br />An expert support copilot.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Unlike primitive chatbots that guess or repeat canned phrases, Nexora analyzes context, checks your authentic knowledge documents, computes confidence scores, and escalates when uncertainty exceeds your configured safety threshold.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Confidence Scoring & Safety Gates</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Automate replies only when model confidence exceeds 95%; otherwise suggest to an agent.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Direct Citation Transparency</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Every AI recommendation explicitly highlights the source document and page number.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Seamless Human Escalation</h3>
                    <p className="text-xs text-slate-400 mt-0.5">One click routes complex or frustrated customers directly to tier-2 human specialists.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Simulated UI */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-ping"></span>
                  <span className="font-semibold text-white">Live AI Support Thread</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 font-mono">ID: #4092</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400">Sentiment:</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Positive (88%)</span>
                </div>
              </div>

              {/* Customer msg */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">
                  AK
                </div>
                <div className="bg-slate-800/90 rounded-xl rounded-tl-none p-3.5 text-xs text-slate-200 max-w-lg">
                  <p className="font-semibold text-slate-100 mb-1">Alex Kowalski <span className="font-normal text-slate-400 text-xs">· 2 mins ago</span></p>
                  "We want to enforce SAML SSO across our 120 team members. Does our enterprise plan support Okta SCIM provisioning out of the box?"
                </div>
              </div>

              {/* AI Suggestion Box */}
              <div className="ml-11 bg-gradient-to-br from-slate-950 to-slate-900 border border-[#4ade80]/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#4ade80] font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Nexora AI Synthesized Answer</span>
                  </div>
                  <div className="font-mono text-xs text-slate-300">
                    Confidence: <span className="text-[#4ade80] font-bold">96.8%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "Yes, Okta SCIM v2.0 provisioning is fully supported on your Enterprise tier. You can configure automatic user sync and group mappings directly in <strong>Settings &gt; Security &gt; SSO &gt; Provisioning</strong>. Group role assignments will automatically sync within 60 seconds of directory updates."
                </p>

                {/* Grounding Source Citation */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-[#2dd4bf]" />
                    <span className="font-medium">Source: enterprise-sso-spec-v3.md</span>
                    <span className="text-slate-500">· Section 4.2 (SCIM Directory Sync)</span>
                  </div>
                  <span className="text-[#4ade80] font-mono text-xs">Verified Match</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all">
                    Modify Draft
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all">
                    Approve & Auto-Resolve
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. REAL-TIME ANALYTICS FEATURE */}
      <section id="analytics" className="py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 block">
                Executive Telemetry
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                Real-time operational insight without manual reporting.
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Monitor deflection rates, response latencies, and agent workload distributions with instant precision.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <span className="px-3 py-1 rounded bg-white text-slate-900 font-semibold shadow-xs">Last 30 Days</span>
              <span className="px-3 py-1 text-slate-500 hover:text-slate-900 cursor-pointer">Last 90 Days</span>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Total Volume Handled</span>
              <div className="text-2xl font-extrabold text-[#0f172a] font-mono mt-1">42,890</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">↑ +24% vs last period</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">AI Autonomous Resolution</span>
              <div className="text-2xl font-extrabold text-[#0f172a] font-mono mt-1">78.4%</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">↑ +14.2% deflection</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Median First Response</span>
              <div className="text-2xl font-extrabold text-[#0f172a] font-mono mt-1">1.2 mins</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">↓ 86% faster than human-only</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Customer CSAT</span>
              <div className="text-2xl font-extrabold text-[#0f172a] font-mono mt-1">4.92 / 5.0</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">98.6% positive ratings</div>
            </div>
          </div>

          {/* Visual Chart Simulation */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <div className="flex flex-col gap-3 mb-6">
              <div>
                <h3 className="text-sm font-bold text-white">Daily Support Volume vs AI Deflection</h3>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono mt-1">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]"></span> AI Resolved (78%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf]"></span> Human Assisted (22%)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Comparing human agent escalations with automated AI resolutions</p>
              </div>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-48 flex items-end gap-1.5 sm:gap-3 pt-6 border-b border-slate-800">
              {[
                { day: 'Mon', total: 85, ai: 68 },
                { day: 'Tue', total: 92, ai: 74 },
                { day: 'Wed', total: 78, ai: 60 },
                { day: 'Thu', total: 110, ai: 88 },
                { day: 'Fri', total: 124, ai: 98 },
                { day: 'Sat', total: 45, ai: 39 },
                { day: 'Sun', total: 52, ai: 46 },
                { day: 'Mon', total: 96, ai: 76 },
                { day: 'Tue', total: 104, ai: 82 },
                { day: 'Wed', total: 88, ai: 70 },
                { day: 'Thu', total: 115, ai: 92 },
                { day: 'Fri', total: 130, ai: 105 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
                  <div className="w-full max-w-[28px] bg-slate-800 rounded-t-sm flex flex-col justify-end overflow-hidden" style={{ height: `${(bar.total / 140) * 100}%` }}>
                    <div className="w-full bg-[#2dd4bf]" style={{ height: `${((bar.total - bar.ai) / bar.total) * 100}%` }}></div>
                    <div className="w-full bg-[#4ade80]" style={{ height: `${(bar.ai / bar.total) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. KNOWLEDGE BASE / RAG PIPELINE */}
      <section id="rag-pipeline" className="py-24 bg-[#0f172a] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf] mb-2 block">
              Vector Pipeline Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Knowledge Source → Retrieval → Context → AI Response
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Explore how Nexora turns your raw documentation into deterministic, verified answers with zero training lag.
            </p>
          </div>

          {/* Interactive Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            {[
              { num: '01', title: 'Connect Sources', desc: 'Sync Notion, Zendesk, Markdown & PDFs with automatic webhook change detection.', icon: Database },
              { num: '02', title: 'Vector Ingestion', desc: 'Semantically chunked and embedded via PGVector embeddings with metadata indexing.', icon: Layers },
              { num: '03', title: 'Sub-150ms Retrieval', desc: 'Queries match top-k chunks by cosine similarity with strict relevance gating.', icon: Search },
              { num: '04', title: 'Grounded Output', desc: 'Context-conditioned synthesis with explicit page citations and safety guards.', icon: Sparkles },
            ].map((step, idx) => {
              const Icon = step.icon;
              const isSelected = ragActiveStep === idx;
              return (
                <div 
                  key={step.num}
                  onClick={() => setRagActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800 border-[#4ade80] shadow-lg shadow-[#4ade80]/10' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#4ade80]' : 'text-slate-500'}`}>
                      {step.num}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#4ade80]' : 'text-slate-400'}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800 mb-4">
              <span className="font-mono text-[#2dd4bf]">STAGE INSPECTOR: Step 0{ragActiveStep + 1}</span>
              <span className="font-mono">INDEX STATUS: OPTIMIZED (2.4M VECTORS)</span>
            </div>
            
            {ragActiveStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1">Notion Knowledge Base</div>
                  <div className="text-slate-400">142 articles · Last synced 4m ago</div>
                  <div className="text-[#4ade80] font-mono mt-2">● Auto-sync Active</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1">Developer Docs (Markdown)</div>
                  <div className="text-slate-400">89 files · GitHub Webhook Hooked</div>
                  <div className="text-[#4ade80] font-mono mt-2">● Auto-sync Active</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1">Product Manuals (PDF)</div>
                  <div className="text-slate-400">24 uploaded manuals · 1,420 pages</div>
                  <div className="text-[#4ade80] font-mono mt-2">● Indexed (OCR Ready)</div>
                </div>
              </div>
            )}

            {ragActiveStep === 1 && (
              <div className="font-mono text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-lg">
                <div className="text-[#4ade80]">{`// PGVector Chunking & Embedding Pipeline`}</div>
                <div>Chunk size: 512 tokens · Overlap: 64 tokens</div>
                <div>Embedding model: text-embedding-004 (768 dimensions)</div>
                <div>Metadata: &#123; tenant_id: "org_acme", doc_type: "billing_faq", version: "2026.1" &#125;</div>
              </div>
            )}

            {ragActiveStep === 2 && (
              <div className="space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4ade80] font-mono font-bold shrink-0">Query:</span>
                    <span className="text-xs">"How does the enterprise SLA guarantee uptime and refunds?"</span>
                  </div>
                  <span className="font-mono text-[#2dd4bf] text-xs shrink-0">Retrieved in 138ms</span>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-slate-400 space-y-1">
                  <div className="text-white font-medium">Top Match: enterprise-sla-terms.pdf (Cosine Similarity: 0.941)</div>
                  <p className="italic text-slate-400">"Section 8.1: Uptime below 99.9% initiates a pro-rated 10% credit; below 99.0% initiates a 25% credit within 30 days."</p>
                </div>
              </div>
            )}

            {ragActiveStep === 3 && (
              <div className="p-4 bg-slate-950 rounded-lg border border-[#4ade80]/30 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#4ade80] font-bold">
                  <span>Synthesized Response with Grounding Citation</span>
                  <span className="font-mono text-slate-400">Latency: 412ms</span>
                </div>
                <p className="text-slate-200">
                  "Our Enterprise SLA provides a 99.9% uptime commitment. If uptime drops below 99.9% in a given billing cycle, your account automatically receives a 10% invoice credit; drops below 99.0% receive a 25% credit upon submitting a claim within 30 days."
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (5 Steps) */}
      <section className="py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
              Implementation Playbook
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              From onboarding to autonomous resolution in five steps.
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { step: '1', title: 'Connect support data & inbound channels', desc: 'Route customer inquiries from your email domains, live chat widget, or webhooks directly into the unified inbox.' },
              { step: '2', title: 'Add and index knowledge sources', desc: 'Upload existing help docs, Notion pages, and technical manuals. Nexora indexes semantic embeddings automatically.' },
              { step: '3', title: 'Nexora understands context & intent', desc: 'Incoming tickets are analyzed for customer sentiment, urgency, category, and historical interaction trends.' },
              { step: '4', title: 'AI assists or resolves autonomously', desc: 'High-confidence questions are answered instantly with citations; edge cases generate suggested drafts for agent approval.' },
              { step: '5', title: 'Team monitors performance & iterates', desc: 'Review deflection analytics, fine-tune knowledge chunks, and track CSAT improvement in real-time.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#0f172a] text-[#4ade80] font-mono font-bold flex items-center justify-center shrink-0">
                  0{item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTEGRATIONS */}
      <section id="integrations" className="py-24 bg-[#0f172a] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4ade80] mb-2 block">
            Ecosystem Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Connects effortlessly with your existing stack.
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-14">
            Pre-built connectors sync conversations, customer records, and knowledge sources with real-time webhooks.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Slack', type: 'Agent alerts & escalate' },
              { name: 'Zendesk', type: 'Ticket 2-way sync' },
              { name: 'Salesforce', type: 'CRM & Account data' },
              { name: 'Stripe', type: 'Billing & Plan status' },
              { name: 'Jira Software', type: 'Bug escalation' },
              { name: 'REST Webhooks', type: 'Custom endpoints' },
            ].map((tool) => (
              <div key={tool.name} className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#4ade80] transition-colors text-center">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-[#4ade80] flex items-center justify-center mx-auto mb-3">
                  {tool.name === 'REST Webhooks' ? (
                    <Zap className="w-5 h-5 text-[#4ade80]" />
                  ) : (
                    <img src={`https://cdn.simpleicons.org/${tool.name.toLowerCase().split(' ')[0]}/4ade80`} className="w-5 h-5" alt={tool.name} />
                  )}
                </div>
                <div className="text-sm font-bold text-white">{tool.name}</div>
                <div className="text-xs text-slate-400 mt-1">{tool.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECURITY & ENTERPRISE COMPLIANCE */}
      <section id="security" className="py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
              Enterprise Security Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Complete tenant isolation. Zero model leakage.
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Customer data is strictly sandboxed. Your knowledge vectors are never used to train public models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Multi-Tenant Scoping</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Database queries and vector lookups enforce strict tenant ID scoping at the SQL layer. One organization can never view another's data.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Role-Based Access Control</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Granular permissions distinguish Platform Admins, Organization Owners, Support Leads, and Read-Only Auditors with full session auditing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Immutable Audit Logs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every administrative configuration change, export, role transition, and AI threshold adjustment is cryptographically recorded with actor IPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="pricing" className="py-24 bg-[#0f172a] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4ade80] mb-2 block">
              Transparent Scaling Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Predictable pricing for support teams of any size.
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              All plans include complete RAG vector search, AI confidence gating, and unified inbox.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl mt-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  billingCycle === 'monthly' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-slate-800 text-[#4ade80] shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-xs bg-[#4ade80]/20 text-[#4ade80] px-1.5 py-0.2 rounded font-mono">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Plan 1: Starter */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">For growing teams</span>
                <h3 className="text-xl font-bold text-white mt-1">Starter</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {billingCycle === 'annual' ? '$49' : '$59'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Essential AI automation for up to 3 agents.</p>
                <div className="space-y-3 mt-8 text-xs text-slate-300 border-t border-slate-800 pt-6">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Up to 3 team members</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> 2,500 AI resolutions / mo</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> 5 Knowledge Base sources</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Sub-150ms Vector search</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Standard email & chat inbox</div>
                </div>
              </div>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all mt-8"
              >
                Choose Starter
              </button>
            </div>

            {/* Plan 2: Pro / Scale (Featured) */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-[#4ade80] relative flex flex-col justify-between shadow-2xl shadow-[#4ade80]/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs text-[#4ade80] font-mono">For scaling operations</span>
                <h3 className="text-xl font-bold text-white mt-1">Scale Pro</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {billingCycle === 'annual' ? '$149' : '$179'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Comprehensive AI automation for scaling teams.</p>
                <div className="space-y-3 mt-8 text-xs text-slate-200 border-t border-slate-800 pt-6">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Up to 15 team members</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> 20,000 AI resolutions / mo</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Unlimited Knowledge sources</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Custom AI confidence thresholds</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Real-time Analytics & SLA manager</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Zendesk, Slack & Stripe integration</div>
                </div>
              </div>
              <button 
                onClick={() => onNavigateToAuth('signup')}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all mt-8"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">For large organizations</span>
                <h3 className="text-xl font-bold text-white mt-1">Enterprise</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">Custom</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Dedicated infrastructure, SSO, and custom SLA.</p>
                <div className="space-y-3 mt-8 text-xs text-slate-300 border-t border-slate-800 pt-6">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Unlimited seats & volume</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> Dedicated private PGVector instance</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> SAML SSO & SCIM Okta sync</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> 99.99% Uptime SLA commitment</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#4ade80]" /> 24/7 dedicated engineering support</div>
                </div>
              </div>
              <button 
                onClick={onNavigateToApp}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all mt-8"
              >
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className="py-24 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Everything you need to know about Nexora AI.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How does Nexora guarantee zero hallucinations?', a: 'Nexora enforces strict Retrieval-Augmented Generation (RAG). Responses are conditioned exclusively on chunks retrieved with high cosine similarity from your uploaded documents. If the relevance score is below the threshold, the model declines to invent facts and triggers human escalation.' },
              { q: 'What knowledge formats can I import into the vector database?', a: 'You can connect Notion workspaces, Markdown docs via GitHub repositories, Zendesk help centers, raw PDF manuals, and REST webhook feeds. Re-indexing occurs automatically upon document updates.' },
              { q: 'Can human agents override AI drafts before sending?', a: 'Yes. In the unified inbox, agents have full review controls. You can set the workspace to "Autonomous Mode" (auto-send above 95% confidence) or "Assisted Mode" (drafts generated for 1-click human agent approval).' },
              { q: 'Is our proprietary knowledge used to train foundation models?', a: 'Never. Your documents, conversation transcripts, and vector embeddings reside strictly inside isolated tenant boundaries and are never utilized for model fine-tuning.' },
              { q: 'How long does onboarding take?', a: 'Most teams connect their email and index their first knowledge documents in under 15 minutes. The SaaS dashboard and unified inbox are operational immediately.' },
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 text-left font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${expandedFaq === i ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CONVERSION CTA */}
      <section 
        className="py-24 bg-[#0f172a] text-white relative overflow-hidden border-t border-slate-800 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.95)), url('/cyber_dashboard_bg.jpg')`
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Accelerate your customer support with Nexora AI.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Deploy in minutes. Deflect repetitive tickets autonomously. Empower human agents with real-time intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigateToAuth('signup')}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"
            >
              Start Free 14-Day Trial
            </button>
            <button 
              onClick={onNavigateToApp}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              Explore Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[#090e17] border-t border-slate-800/80 text-slate-400 text-xs py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Intelligent Support. Real-Time Insight. The next-generation autonomous customer support operating system.
            </p>
            <div className="text-xs text-slate-500 font-mono pt-2">
              All systems nominal · Latency: 114ms
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#ai-support" className="hover:text-white transition-colors">AI Support</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Unified Inbox</a></li>
              <li><a href="#rag-pipeline" className="hover:text-white transition-colors">Vector RAG</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Enterprise</h3>
            <ul className="space-y-2">
              {onNavigateToPortal && (
                <li><span className="cursor-pointer text-emerald-400 hover:text-emerald-300 font-semibold transition-colors" onClick={onNavigateToPortal}>Customer Portal →</span></li>
              )}
              <li><a href="#security" className="hover:text-white transition-colors">Security & RBAC</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Tenant Isolation</a></li>
              <li><span className="cursor-pointer hover:text-white transition-colors" onClick={onNavigateToApp}>Admin Console</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Legal & Trust</h3>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer">Security Whitepaper</span></li>
              <li><span className="hover:text-white cursor-pointer">GDPR Compliance</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Nexora AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>SOC 2 Type II Certified</span>
            <span>·</span>
            <span>256-Bit TLS Encryption</span>
            <span>·</span>
            <span className="text-[#4ade80]">v1.0 Design Preview</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
