import React from 'react';
import { X, Copy, Check, Sparkles, Layers, Palette, Type, ShieldCheck } from 'lucide-react';

interface TokensDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TokensDrawer: React.FC<TokensDrawerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const brandColors = [
    { name: 'Mint Green (Primary)', hex: '#4ade80', role: 'Active states, AI highlight, gradients, hero accents', bg: 'bg-[#4ade80]', text: 'text-slate-900' },
    { name: 'Teal (Primary Accent)', hex: '#2dd4bf', role: 'Secondary gradients, confidence meters, data visual', bg: 'bg-[#2dd4bf]', text: 'text-slate-900' },
    { name: 'Deep Charcoal (Dark Brand)', hex: '#0f172a', role: 'Navigation, dark hero, footer, primary cards', bg: 'bg-[#0f172a]', text: 'text-white' },
    { name: 'Slate Black (Neutral)', hex: '#1e293b', role: 'Headings, primary body prose, structural text', bg: 'bg-[#1e293b]', text: 'text-white' },
    { name: 'Pure White (Neutral)', hex: '#ffffff', role: 'Content surface canvas, elevated clean cards', bg: 'bg-[#ffffff] border border-slate-200', text: 'text-slate-900' },
    { name: 'Mint Tint (Soft Surface)', hex: '#f0fdf4', role: 'AI suggestion panels, soft cards, light accents', bg: 'bg-[#f0fdf4] border border-emerald-200', text: 'text-emerald-950' },
    { name: 'Teal Tint (Soft Surface)', hex: '#f0fdfa', role: 'Dashboard backgrounds, hover states, metrics', bg: 'bg-[#f0fdfa] border border-teal-200', text: 'text-teal-950' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl h-full bg-[#0f172a] text-slate-100 shadow-2xl flex flex-col border-l border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#4ade80] to-[#2dd4bf] flex items-center justify-center text-slate-950 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Nexora AI Design System</h2>
              <p className="text-xs text-slate-400">Exact Brand Tokens, Typography Scale & Visual Architecture</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Brand Philosophy */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4ade80] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" /> Brand Philosophy
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nexora AI feels <strong className="text-white">intelligent, operational, modern, and trustworthy</strong>. Centered around deep charcoal surfaces, high-contrast typography, and a vivid mint-to-teal glow. Zero generic AI purple, zero fake fluff.
            </p>
          </div>

          {/* Color Tokens */}
          <section>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Palette className="w-4 h-4 text-[#2dd4bf]" /> Exact Brand Color Palette
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {brandColors.map((c) => (
                <div 
                  key={c.hex}
                  onClick={() => copyToClipboard(c.hex)}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg shrink-0 ${c.bg} shadow-inner flex items-center justify-center font-mono text-xs font-bold ${c.text}`}>
                      {c.hex.slice(1, 3)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#4ade80] transition-colors">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-400">{c.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400 group-hover:text-white">
                    <span>{c.hex}</span>
                    {copied === c.hex ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography Scale */}
          <section>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Type className="w-4 h-4 text-[#4ade80]" /> Typographic Hierarchy
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
              <div className="border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400 block mb-1">Display / Hero (36px — Inter Variable 800)</span>
                <p className="text-2xl font-extrabold text-white tracking-tight">Intelligent Support. Real-Time Insight.</p>
              </div>
              <div className="border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400 block mb-1">Heading 2 (24px — Inter Variable 700)</span>
                <p className="text-lg font-bold text-white">Automated Customer Resolution Engine</p>
              </div>
              <div className="border-b border-slate-800/60 pb-3">
                <span className="text-xs text-slate-400 block mb-1">Body Text (15px / 1.6 — Inter Variable 400 with OpenType Disambiguation)</span>
                <p className="text-sm text-slate-300">
                  Nexora retrieves indexed knowledge bases in under 150ms, formulating high-confidence answers with verified citations and instant human escalation triggers.
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Data & Tabular Figures (JetBrains Mono tabular-nums)</span>
                <p className="font-mono text-sm text-[#2dd4bf] tracking-tight">
                  LATENCY: 142ms · CONFIDENCE: 98.4% · CSAT: 4.92 / 5.00
                </p>
              </div>
            </div>
          </section>

          {/* Anti-Slop & Design Constitution Rules */}
          <section>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4 text-[#2dd4bf]" /> Design Governance Applied
            </div>
            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">✓</span>
                <span><strong>Zero-Pill Metadata:</strong> Unboxed timestamps, tags, and statuses separated by subtle mid-dots (`·`) instead of candy badges.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">✓</span>
                <span><strong>Single-Elevation Depth:</strong> Clean cards with 1px hairline borders; zero nested card-within-card clutter.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">✓</span>
                <span><strong>Tabular Numerals:</strong> All statistics, metrics, currency, and times use tabular figures to prevent layout jitter.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">✓</span>
                <span><strong>Brand Guardrails:</strong> Strictly mint (#4ade80), teal (#2dd4bf), deep charcoal (#0f172a), and white (#ffffff). No purple AI tropes.</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Nexora AI Design Preview v1.0</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            Close Tokens
          </button>
        </div>
      </div>
    </div>
  );
};
