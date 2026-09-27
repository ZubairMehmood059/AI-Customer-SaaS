const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'views', 'marketing', 'MarketingView.tsx');
let content = fs.readFileSync(file, 'utf8');

// We will use a function to map existing button classes to the standard ones.
const replacements = [
  // Error state retry
  {
    search: /className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2"/g,
    replace: 'className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // Empty state enter saas
  {
    search: /className="px-5 py-2.5 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] text-slate-950 rounded-lg text-xs font-bold"/g,
    replace: 'className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"'
  },
  // Header portal link
  {
    search: /className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-full bg-emerald-500\/10 hover:bg-emerald-500\/20 border border-emerald-500\/30 hover:border-emerald-500\/60 transition-all flex items-center gap-1.5 cursor-pointer"/g,
    replace: 'className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"'
  },
  // Header login
  {
    search: /className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800\/80 transition-all cursor-pointer"/g,
    replace: 'className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"'
  },
  // Header signup
  {
    search: /className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] hover:opacity-95 rounded-full shadow-md hover:shadow-\[0_0_20px_rgba\(74,222,128,0\.35\)\] hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"/g,
    replace: 'className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all whitespace-nowrap"'
  },
  // Mobile nav 1
  {
    search: /className="w-full py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] hover:opacity-95 rounded-xl text-center shadow-sm"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"'
  },
  // Mobile nav 2
  {
    search: /className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl text-center shadow-sm"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // Mobile nav 3
  {
    search: /className="w-full py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl text-center border border-slate-800 transition-colors"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all"'
  },
  // Hero CTA 1
  {
    search: /className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] hover:from-\[#3ed175\] hover:to-\[#22c3ae\] rounded-xl shadow-lg shadow-\[#4ade80\]\/10 transition-all flex items-center justify-center gap-2 group"/g,
    replace: 'className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all group"'
  },
  // Hero CTA 2
  {
    search: /className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-200 bg-slate-900\/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"/g,
    replace: 'className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // Mockup escalate
  {
    search: /className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 rounded border border-slate-800"/g,
    replace: 'className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // Mockup verified
  {
    search: /className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] rounded"/g,
    replace: 'className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"'
  },
  // Mockup modify
  {
    search: /className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 rounded border border-slate-800"/g,
    replace: 'className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // Mockup approve
  {
    search: /className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-\[#4ade80\] hover:bg-\[#3ed175\] rounded transition-colors"/g,
    replace: 'className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"'
  },
  // Pricing starter
  {
    search: /className="w-full mt-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition-colors"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all mt-8"'
  },
  // Pricing pro
  {
    search: /className="w-full mt-8 py-3 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] hover:opacity-95 text-slate-950 rounded-xl text-xs font-bold transition-all"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all mt-8"'
  },
  // Pricing enterprise
  {
    search: /className="w-full mt-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition-colors"/g,
    replace: 'className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all mt-8"'
  },
  // Footer 1
  {
    search: /className="px-8 py-4 bg-gradient-to-r from-\[#4ade80\] to-\[#2dd4bf\] text-slate-950 font-bold rounded-xl text-sm shadow-xl shadow-\[#4ade80\]\/20 hover:opacity-95 transition-all"/g,
    replace: 'className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] hover:opacity-95 shadow-md rounded-xl transition-all"'
  },
  // Footer 2 (Note I replaced View SaaS Workspace with Explore Live Demo earlier, so the classes changed slightly)
  {
    search: /className="px-7 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-all"/g,
    replace: 'className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  },
  // One we missed from replace:
  {
    search: /className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"/g,
    replace: 'className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"'
  }
];

let newContent = content;
replacements.forEach(r => {
  newContent = newContent.replace(r.search, r.replace);
});

// Also manually fix the billing toggle which is a bit more complex since it has dynamic template literals
newContent = newContent.replace(
  /<button\s*onClick=\{\(\) => setBillingCycle\('monthly'\)\}\s*className=\{`px-4 py-1\.5 text-xs font-semibold rounded-lg transition-colors \$\{[\s\S]*?\}`\}\s*>\s*Monthly\s*<\/button>/,
  `<button 
                onClick={() => setBillingCycle('monthly')}
                className={\`inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl transition-all \${
                  billingCycle === 'monthly' 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
                }\`}
              >
                Monthly
              </button>`
);

newContent = newContent.replace(
  /<button\s*onClick=\{\(\) => setBillingCycle\('annual'\)\}\s*className=\{`px-4 py-1\.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 \$\{[\s\S]*?\}`\}\s*>\s*<span>Annual Billing<\/span>\s*<span className="text-xs bg-\[#4ade80\]\/20 text-\[#4ade80\] px-1\.5 py-0\.2 rounded font-mono">SAVE 20%<\/span>\s*<\/button>/,
  `<button 
                onClick={() => setBillingCycle('annual')}
                className={\`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all \${
                  billingCycle === 'annual' 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
                }\`}
              >
                <span>Annual Billing</span>
                <span className="text-xs bg-[#4ade80]/20 text-[#4ade80] px-1.5 py-0.2 rounded font-mono">SAVE 20%</span>
              </button>`
);


fs.writeFileSync(file, newContent, 'utf8');
console.log('Buttons replaced successfully');
