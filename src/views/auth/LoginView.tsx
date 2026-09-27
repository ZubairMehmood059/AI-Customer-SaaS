/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { UIState } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';
import { authStore, UserRole } from '../../store/authStore';
import { portalStore } from '../../store/portalStore';

interface LoginViewProps {
  uiState: UIState;
  onNavigateToSignup: () => void;
  onLoginSuccess: (role?: 'agent' | 'admin' | 'customer') => void;
  onNavigateHome: () => void;
  onNavigateToCustomerPortal?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  uiState,
  onNavigateToSignup,
  onLoginSuccess,
  onNavigateHome,
}) => {
  // Empty inputs by default - no default prefill or recommendations
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('agent');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (uiState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 animate-pulse">
          <div className="w-12 h-12 bg-slate-800 rounded-xl mx-auto"></div>
          <div className="h-6 bg-slate-800 rounded w-48 mx-auto"></div>
          <div className="space-y-4 pt-4">
            <div className="h-10 bg-slate-800 rounded-lg"></div>
            <div className="h-10 bg-slate-800 rounded-lg"></div>
            <div className="h-11 bg-slate-800 rounded-lg mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your work email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = authStore.login(cleanEmail, password, selectedRole);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
        setIsSubmitting(false);
        return;
      }

      // If user selected customer role, synchronize with customer portal store
      if (selectedRole === 'customer') {
        const matchingCustomer = portalStore.getAllCustomers().find(
          (c) => c.email.toLowerCase() === cleanEmail.toLowerCase()
        );
        if (!matchingCustomer) {
          portalStore.signupCustomer(
            res.user?.name || 'Customer User',
            cleanEmail,
            res.user?.orgName || 'Client Org'
          );
        } else {
          portalStore.loginCustomer(cleanEmail);
        }
      }

      setIsSubmitting(false);
      onLoginSuccess(selectedRole);
    }, 250);
  };

  return (
    <div 
      className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-between p-3.5 sm:p-6 md:p-8 bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.97)), url('/cyber_dashboard_bg.jpg')`
      }}
    >
      {/* Top Bar with Home navigation and Logo */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateHome}
            className="hover:opacity-85 transition-opacity shrink-0 focus:outline-none"
            title="Return to Nexora Home"
          >
            <BrandLogo size="md" />
          </button>
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
        </div>

        <div className="text-[11px] sm:text-xs text-slate-400 text-right">
          <span className="hidden xs:inline">Need an organization account? </span>
          <button 
            onClick={onNavigateToSignup} 
            className="text-[#4ade80] hover:underline font-semibold whitespace-nowrap"
          >
            Create account
          </button>
        </div>
      </header>

      {/* Center Sign In Card */}
      <div className="max-w-md w-full mx-auto my-6 sm:my-8 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-black/60">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#4ade80] flex items-center justify-center mx-auto mb-3 border border-slate-700 shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Sign in to Nexora</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Enter your credentials to access your support workspace
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 sm:p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Target Workspace Role Selector - sets destination without forcing dummy prefill */}
        <div className="mb-5">
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5 px-0.5">
            Select Target Workspace:
          </div>
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedRole('agent')}
              className={`flex-1 py-1.5 rounded-lg text-center font-medium transition-colors ${
                selectedRole === 'agent'
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Support Staff
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`flex-1 py-1.5 rounded-lg text-center font-medium transition-colors ${
                selectedRole === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Platform Admin
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`flex-1 py-1.5 rounded-lg text-center font-medium transition-colors ${
                selectedRole === 'customer'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Customer Portal
            </button>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                required
                autoComplete="email"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button 
                type="button" 
                onClick={() => setErrorMessage('Password reset instructions sent to your email.')}
                className="text-[11px] text-[#2dd4bf] hover:underline font-medium shrink-0"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                required
                autoComplete="current-password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                placeholder="Enter your password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-[#4ade80] focus:ring-0 w-3.5 h-3.5" 
              />
              <span className="text-[11px] sm:text-xs">Remember this browser session</span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#4ade80]/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-5 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-500">
            <span className="bg-slate-900 px-3">or authenticate via SSO</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <button 
            type="button" 
            onClick={() => {
              authStore.login(email || 'sso.user@company.com', 'ssotoken', selectedRole);
              onLoginSuccess(selectedRole);
            }}
            className="py-2.5 sm:py-3 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="font-bold text-white">Google</span> Workspace
          </button>
          <button 
            type="button" 
            onClick={() => {
              authStore.login(email || 'okta.user@enterprise.com', 'oktatoken', selectedRole);
              onLoginSuccess(selectedRole);
            }}
            className="py-2.5 sm:py-3 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="font-bold text-[#4ade80]">Okta</span> SAML SSO
          </button>
        </div>
      </div>

      {/* Bottom info */}
      <footer className="text-center text-[10px] sm:text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
        <span>TLS 256-bit encrypted · Multi-tenant authentication boundary</span>
      </footer>
    </div>
  );
};
