/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building, Mail, User, Lock, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle, Check } from 'lucide-react';
import { UIState } from '../../types/design';
import { BrandLogo } from '../../components/common/BrandLogo';
import { authStore } from '../../store/authStore';

interface SignupViewProps {
  uiState: UIState;
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
  onNavigateHome: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({
  uiState,
  onNavigateToLogin,
  onSignupSuccess,
  onNavigateHome,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  // Empty initial fields - no default prefill
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    orgName: '',
    teamSize: '5-20 agents',
    channel: 'email_and_chat',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Please create a secure password (minimum 6 characters).');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.orgName.trim()) {
      setErrorMessage('Please enter your organization or company name.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = authStore.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        orgName: formData.orgName,
        teamSize: formData.teamSize,
        role: 'agent',
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to create workspace. Please check your details.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      onSignupSuccess();
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
          <span className="hidden xs:inline">Already have an account? </span>
          <button 
            onClick={onNavigateToLogin} 
            className="text-[#4ade80] hover:underline font-semibold whitespace-nowrap"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Center Card */}
      <div className="max-w-md w-full mx-auto my-6 sm:my-8 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-black/60">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Create your Nexora workspace</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">14-day unrestricted trial. No credit card required.</p>
          
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={`w-12 sm:w-16 h-1 rounded-full transition-colors ${step === 1 ? 'bg-[#4ade80]' : 'bg-slate-700'}`}></span>
            <span className={`w-12 sm:w-16 h-1 rounded-full transition-colors ${step === 2 ? 'bg-[#4ade80]' : 'bg-slate-700'}`}></span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1.5 uppercase tracking-wider">
            Step {step} of 2: {step === 1 ? 'Account Setup' : 'Workspace Details'}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 sm:p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errorMessage) setErrorMessage(null);
                  }}
                  required
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errorMessage) setErrorMessage(null);
                  }}
                  required
                  autoComplete="email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                  placeholder="Enter your work email (e.g. alex@company.com)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Create Secure Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errorMessage) setErrorMessage(null);
                  }}
                  required
                  autoComplete="new-password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#4ade80]/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98"
            >
              <span>Continue: Setup Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Organization / Company Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input 
                  type="text" 
                  value={formData.orgName}
                  onChange={(e) => {
                    setFormData({ ...formData, orgName: e.target.value });
                    if (errorMessage) setErrorMessage(null);
                  }}
                  required
                  autoFocus
                  placeholder="e.g. Acme Corporation"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Support Team Size</label>
              <select 
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#4ade80] transition-colors cursor-pointer"
              >
                <option value="1-4 agents">1-4 support agents</option>
                <option value="5-20 agents">5-20 support agents</option>
                <option value="20-50 agents">20-50 support agents</option>
                <option value="50+ agents">50+ support agents (Enterprise)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Support Channels</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'email_and_chat' })}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                    formData.channel === 'email_and_chat' 
                      ? 'bg-[#4ade80]/15 border-[#4ade80] text-white shadow-xs' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">Email & Chat</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Unified omnichannel</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'api_and_portal' })}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                    formData.channel === 'api_and_portal' 
                      ? 'bg-[#4ade80]/15 border-[#4ade80] text-white shadow-xs' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">API & Portal</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Headless integration</div>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 border border-slate-800 hover:bg-slate-800 text-slate-300 font-medium rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-3 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-[#4ade80]/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Creating Workspace...</span>
                ) : (
                  <>
                    <span>Launch Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom info */}
      <footer className="text-center text-[10px] sm:text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
        <span>Enterprise GDPR & SOC 2 Type II Certified Cloud Sandbox</span>
      </footer>
    </div>
  );
};
