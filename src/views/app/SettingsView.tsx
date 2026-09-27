import React, { useState } from 'react';
import { 
  Building, 
  Bot, 
  ShieldCheck, 
  Layers, 
  User, 
  Sliders, 
  Check, 
  Sparkles, 
  Key, 
  Save, 
  AlertCircle
} from 'lucide-react';
import { UIState } from '../../types/design';

interface SettingsViewProps {
  uiState: UIState;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ uiState }) => {
  const [activeTab, setActiveTab] = useState<'organization' | 'ai' | 'security' | 'integrations' | 'account'>('ai');
  const [savedNotice, setSavedNotice] = useState(false);

  // Form states
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(95);
  const [aiMode, setAiMode] = useState<'autonomous' | 'assisted'>('autonomous');
  const [aiTone, setAiTone] = useState('concise_technical');
  const [orgName, setOrgName] = useState('Acme Global Ltd.');
  const [customDomain, setCustomDomain] = useState('support.acme.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  if (uiState === 'loading') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-72"></div>
        <div className="h-96 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workspace Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configure organization identity, AI confidence safety gates, and authentication security</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: 'ai' as const, label: 'AI Safety & Copilot', icon: Bot },
          { id: 'organization' as const, label: 'Organization', icon: Building },
          { id: 'security' as const, label: 'Security & SSO', icon: ShieldCheck },
          { id: 'integrations' as const, label: 'API & Integrations', icon: Layers },
          { id: 'account' as const, label: 'Personal Account', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-slate-900 text-white font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Configuration saved successfully. Propagated to all cluster nodes.</span>
        </div>
      )}

      {/* TAB 1: AI SAFETY & COPILOT SETTINGS */}
      {activeTab === 'ai' && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Confidence & Execution Mode</h3>
            <p className="text-slate-500">Determine when Nexora auto-resolves tickets vs creating drafts for human approval</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Execution Mode</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-4 rounded-xl border cursor-pointer ${aiMode === 'autonomous' ? 'border-[#4ade80] bg-[#f0fdf4]' : 'border-slate-200'}`}>
                  <input 
                    type="radio" 
                    name="aimode" 
                    checked={aiMode === 'autonomous'}
                    onChange={() => setAiMode('autonomous')}
                    className="hidden" 
                  />
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Autonomous Auto-Send</span>
                  </div>
                  <p className="text-slate-500 mt-1">Automatically send replies when confidence exceeds safety threshold.</p>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer ${aiMode === 'assisted' ? 'border-[#4ade80] bg-[#f0fdf4]' : 'border-slate-200'}`}>
                  <input 
                    type="radio" 
                    name="aimode" 
                    checked={aiMode === 'assisted'}
                    onChange={() => setAiMode('assisted')}
                    className="hidden" 
                  />
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span>Assisted Copilot Drafts Only</span>
                  </div>
                  <p className="text-slate-500 mt-1">Every AI generation generates a draft requiring 1-click human approval.</p>
                </label>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-slate-700">Minimum Auto-Send Confidence Threshold</label>
                <span className="font-mono font-bold text-emerald-700">{aiConfidenceThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="70" 
                max="99" 
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400">Questions scoring below {aiConfidenceThreshold}% will immediately escalate to agent triage.</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Response Voice & Tone</label>
              <select 
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800"
              >
                <option value="concise_technical">Concise & Highly Technical (Recommended for B2B SaaS)</option>
                <option value="empathic_friendly">Warm, Empathic & Friendly (Consumer Support)</option>
                <option value="executive">Formal & Executive (Enterprise Compliance)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save AI Configuration
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ORGANIZATION */}
      {activeTab === 'organization' && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Organization Profile</h3>
            <p className="text-slate-500">Workspace identity and customer facing brand markers</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization Name</label>
              <input 
                type="text" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" 
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Custom Support Domain (CNAME)</label>
              <input 
                type="text" 
                value={customDomain} 
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-mono" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-lg text-xs">
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SECURITY & SSO */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Security & Single Sign-On</h3>
            <p className="text-slate-500">Enforce enterprise identity provider authentication</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">SAML 2.0 Single Sign-On (Okta / Azure AD)</div>
                <div className="text-slate-500">Require all agents to sign in through your corporate IDP.</div>
              </div>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded">
                CONFIGURED
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">SCIM v2.0 User Provisioning</div>
                <div className="text-slate-500">Automatically synchronize seat allocation and group membership.</div>
              </div>
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded">
                ACTIVE
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Enforce Two-Factor Authentication (2FA)</div>
                <div className="text-slate-500">Mandatory hardware security key or TOTP token.</div>
              </div>
              <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold">
                Enforced
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTEGRATIONS */}
      {activeTab === 'integrations' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">API Keys & Webhooks</h3>
            <p className="text-slate-500">Manage REST API credentials and inbound notification endpoints</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Production Secret API Key</div>
                <div className="font-mono text-slate-400 mt-0.5">nex_live_9a8f••••••••••••••••3d81</div>
              </div>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-100">
                Rotate Key
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Webhook Receiver Endpoint</div>
                <div className="font-mono text-slate-400 mt-0.5">https://api.acme.com/webhooks/nexora</div>
              </div>
              <span className="text-emerald-700 font-mono font-medium">● 200 OK (14ms)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ACCOUNT */}
      {activeTab === 'account' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personal Profile</h3>
            <p className="text-slate-500">Manage your agent profile and notification preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-bold text-base flex items-center justify-center">
              AR
            </div>
            <div>
              <div className="font-bold text-slate-900">Alex Rivera</div>
              <div className="text-slate-500 font-mono">alex@acme.com</div>
              <div className="text-emerald-700 font-medium mt-1">Lead Agent & Workspace Admin</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
