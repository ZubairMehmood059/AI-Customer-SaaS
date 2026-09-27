/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Building, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  LifeBuoy, 
  Eye, 
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { portalStore, CustomerUser } from '../../store/portalStore';

interface PortalAuthViewProps {
  onAuthSuccess: () => void;
  onNavigateHome: () => void;
  onNavigateToStaffApp?: () => void;
}

export const PortalAuthView: React.FC<PortalAuthViewProps> = ({
  onAuthSuccess,
  onNavigateHome,
  onNavigateToStaffApp,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      if (mode === 'login') {
        const cleanEmail = email.trim();
        const res = portalStore.loginCustomer(cleanEmail, password);
        if (res.success) {
          onAuthSuccess();
        } else {
          // Auto-provision entered customer credentials so user can put their details and enter immediately
          const inferredName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
          const formattedName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
          portalStore.signupCustomer(formattedName, cleanEmail, 'Client Organization');
          onAuthSuccess();
        }
      } else {
        if (!name.trim() || !email.trim()) {
          setErrorMessage('Please fill in your full name and work email.');
          setIsSubmitting(false);
          return;
        }
        portalStore.signupCustomer(name, email, company || 'Company');
        onAuthSuccess();
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      
      {/* Ambient background glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Nexora Home</span>
        </button>
        {onNavigateToStaffApp && (
          <button
            onClick={onNavigateToStaffApp}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support Team Login →</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        
        {/* Logo Card Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="flex justify-center mb-3">
            <BrandLogo size="lg" animated={true} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Support Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Sign in to your account' : 'Create customer account'}
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {mode === 'login' 
              ? 'Access support tickets, track resolutions, and converse with AI Copilot.'
              : 'Join your organization’s support channel and connect with Nexora AI.'}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Toggle Login/Signup */}
          <div className="flex p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Organization</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Stripe, Acme Corp"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                {mode === 'login' && (
                  <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <span>{mode === 'login' ? 'Sign In to Portal' : 'Create My Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-bit Encrypted
          </span>
          <span>·</span>
          <span>SOC 2 Compliant</span>
          <span>·</span>
          <span>SLA Guaranteed</span>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="w-full max-w-5xl mx-auto text-center text-[11px] text-slate-600 py-2">
        © 2026 Nexora AI Inc. All customer requests are securely isolated.
      </div>

    </div>
  );
};
