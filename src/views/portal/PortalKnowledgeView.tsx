/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Code2, 
  Shield, 
  Zap, 
  CreditCard, 
  ChevronRight,
  ChevronDown,
  Plus
} from 'lucide-react';

interface PortalKnowledgeViewProps {
  onOpenNewTicket: () => void;
}

interface Article {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  readTime: string;
  confidence: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art_1',
    category: 'API & Webhooks',
    title: 'Webhook Signature Verification (v2 Payload Format)',
    summary: 'How to calculate and verify HMAC-SHA256 signatures with timestamp validation to prevent replay attacks and 401 mismatches.',
    content: `Nexora AI signs all webhook delivery events using HMAC-SHA256. 

### Signature Header Format
Each request includes the following HTTP header:
\`Nexora-Signature: t=1711540920,v1=9f82ab...c129\`

### Step-by-Step Verification
1. Extract the timestamp \`t\` and signature \`v1\` from the \`Nexora-Signature\` header.
2. Prepare the signed payload string by concatenating the timestamp, a period (\`.\`), and the raw unparsed request body buffer:
   \`signedPayload = t + "." + rawBody\`
3. Compute the HMAC-SHA256 hash using your Endpoint Signing Secret.
4. Compare your generated hexadecimal digest with \`v1\` using a constant-time comparison (e.g., \`crypto.timingSafeEqual\`).
5. Ensure the timestamp \`t\` is within your acceptable tolerance window (recommended: 300 seconds).

> **Important**: Do not JSON-parse the body prior to calculating the hash, as differences in whitespace or property ordering will cause signature verification failure.`,
    readTime: '3 min read',
    confidence: '99.2%',
  },
  {
    id: 'art_2',
    category: 'SCIM & Identity',
    title: 'Configuring SCIM 2.0 Group Provisioning with Okta',
    summary: 'Guide to auto-provisioning enterprise seats, sync attribute schemas, and map Okta user groups directly to workspace roles.',
    content: `Enterprise accounts support automatic directory synchronization via RFC 7643 / 7644 SCIM 2.0 standards.

### SCIM Base URL & Token
- **Base URL**: \`https://api.nexora.ai/scim/v2\`
- **Authentication**: HTTP Bearer Token (generated under Settings > Security > SCIM API Key).

### Supported Attributes
- \`userName\` (Work email address)
- \`name.givenName\` and \`name.familyName\`
- \`emails[type eq "work"].value\`
- \`groups\` (Mapped to Team RBAC policies)

### Push Groups Configuration
In the Okta Admin Console, navigate to Applications > Nexora AI > Push Groups. Select user groups to push. Changes in Okta group membership are automatically reflected in Nexora within 60 seconds.`,
    readTime: '4 min read',
    confidence: '98.5%',
  },
  {
    id: 'art_3',
    category: 'Security & Keys',
    title: 'Zero-Downtime API Key Rotation Strategy',
    summary: 'Rolling your production REST API credentials using 24-hour overlap grace windows.',
    content: `To ensure zero downtime across production clusters during security token rotations:

1. Navigate to **Workspace Settings > API Keys**.
2. Click **Generate Secondary Key**.
3. Both primary and secondary keys are active simultaneously for 24 hours.
4. Deploy the new secondary token to your environment variables and microservices.
5. Once traffic on the old key reaches 0 req/sec, click **Promote Secondary to Primary** and revoke the old key.`,
    readTime: '2 min read',
    confidence: '99.4%',
  },
  {
    id: 'art_4',
    category: 'Billing & Accounts',
    title: 'Updating VAT / Tax ID Numbers and Invoicing Entities',
    summary: 'How European and international businesses can register VAT numbers and change invoicing details.',
    content: `For customers based in the EU, UK, Canada, and Australia:

- Navigate to **Account Settings > Billing**.
- In the **Tax Information** panel, select your country and enter your valid VIES / HMRC VAT number.
- Our Stripe billing integration validates the VAT format instantly and automatically updates all future invoice PDFs with reverse charge compliance.`,
    readTime: '2 min read',
    confidence: '97.8%',
  },
  {
    id: 'art_5',
    category: 'API & Webhooks',
    title: 'Rate Limits & Autonomous Retry Strategies',
    summary: 'Understanding standard and enterprise rate limits (10,000 req/min) and implementing exponential backoff with jitter.',
    content: `Nexora API endpoints enforce rate limits on a sliding 60-second window.

### Headers Returned
- \`X-RateLimit-Limit\`: Maximum requests per minute allocated.
- \`X-RateLimit-Remaining\`: Remaining requests in current window.
- \`X-RateLimit-Reset\`: Unix timestamp when the limit resets.

### Handling HTTP 429
When receiving HTTP 429 Too Many Requests, inspect the \`Retry-After\` header and backoff exponentially:
\`backoffDelay = min(maxDelay, baseDelay * (2 ** retryCount) + randomJitter())\``,
    readTime: '3 min read',
    confidence: '98.9%',
  },
];

export const PortalKnowledgeView: React.FC<PortalKnowledgeViewProps> = ({
  onOpenNewTicket,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = ['All', 'API & Webhooks', 'SCIM & Identity', 'Security & Keys', 'Billing & Accounts'];

  const filteredArticles = ARTICLES.filter((art) => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q) || art.content.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Verified Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Help Center & Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Search comprehensive guides for API integrations, webhook signatures, authentication, and directory synchronization.
        </p>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-5.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation, error codes, webhook guides..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-inner"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No articles matched your search</h3>
            <p className="text-xs text-slate-400">
              Couldn't find what you were looking for? Submit a ticket directly to our engineers.
            </p>
            <button
              onClick={onOpenNewTicket}
              className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-xl text-xs"
            >
              Ask Support Team
            </button>
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isExpanded = expandedArticle === art.id;
            return (
              <div
                key={art.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all space-y-3 shadow-xs"
              >
                <div
                  onClick={() => setExpandedArticle(isExpanded ? null : art.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                        {art.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white shrink-0 mt-1">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-3 animate-in fade-in duration-150 leading-relaxed font-sans">
                    <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap">
                      {art.content}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Accuracy Confidence: {art.confidence}</span>
                      </span>
                      <button
                        onClick={onOpenNewTicket}
                        className="text-slate-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                      >
                        <span>Still having trouble? Open a ticket</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Need More Assistance Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Can’t find what you need?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Our autonomous AI Copilot and on-call support engineers are ready 24/7.
          </p>
        </div>
        <button
          onClick={onOpenNewTicket}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Support Request</span>
        </button>
      </div>

    </div>
  );
};
