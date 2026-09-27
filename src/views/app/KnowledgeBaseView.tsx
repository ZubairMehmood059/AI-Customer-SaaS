import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  UploadCloud, 
  Database, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  Trash2, 
  FileText, 
  ExternalLink,
  Sparkles,
  Plus
} from 'lucide-react';
import { UIState } from '../../types/design';

interface KnowledgeBaseViewProps {
  uiState: UIState;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ uiState }) => {
  const [testQuery, setTestQuery] = useState('How do we verify webhook signatures in python?');
  const [isSearching, setIsSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const sources = [
    { id: 'kb1', name: 'Developer Docs (Markdown)', type: 'GitHub Webhook', chunks: 1420, vectors: '1,420 vectors', status: 'Ready', lastIndexed: '8 mins ago', confidenceAvg: '98.4%' },
    { id: 'kb2', name: 'Billing & Subscriptions FAQ', type: 'Notion Sync', chunks: 280, vectors: '280 vectors', status: 'Ready', lastIndexed: '2h ago', confidenceAvg: '99.1%' },
    { id: 'kb3', name: 'Enterprise SLA Terms (PDF)', type: 'PDF Upload', chunks: 84, vectors: '84 vectors', status: 'Ready', lastIndexed: '1d ago', confidenceAvg: '96.5%' },
    { id: 'kb4', name: 'Zendesk Legacy Knowledge', type: 'REST Ingestion', chunks: 890, vectors: '890 vectors', status: 'Processing', lastIndexed: 'Re-indexing now...', confidenceAvg: 'In progress' },
    { id: 'kb5', name: 'SDK Python Quickstart', type: 'Manual Upload', chunks: 42, vectors: '42 vectors', status: 'Outdated', lastIndexed: '14d ago', confidenceAvg: 'Requires update' },
  ];

  const [sourcesList, setSourcesList] = useState(sources);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState('Notion Workspace');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleAddSource = () => {
    const name = newSourceName.trim() || `${newSourceType} Sync (${new Date().toLocaleDateString()})`;
    const newEntry = {
      id: `kb_${Date.now()}`,
      name,
      type: newSourceType,
      chunks: 340,
      vectors: '340 vectors',
      status: 'Ready',
      lastIndexed: 'Just now',
      confidenceAvg: '99.0%',
    };
    setSourcesList([newEntry, ...sourcesList]);
    setNewSourceName('');
    setShowAddModal(false);
    setSuccessNotice(`Ingested ${name} with 340 vector chunks into PGVector store.`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleDeleteSource = (id: string) => {
    setSourcesList(sourcesList.filter((s) => s.id !== id));
  };

  const handleReindex = (id: string) => {
    setSourcesList(
      sourcesList.map((s) => (s.id === id ? { ...s, lastIndexed: 'Just now', status: 'Ready' } : s))
    );
    setSuccessNotice('Vector re-indexing completed in 84ms.');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleRunTestQuery = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 350);
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
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Add Source */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Knowledge Base & Vector Index</h2>
          <p className="text-xs text-slate-500 mt-0.5">Enterprise RAG pipeline with semantic embeddings and real-time cosine retrieval</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Knowledge Source
        </button>
      </div>

      {/* RAG Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500">Total Indexed Documents</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">2,716</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% vector sync</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500">Vector Embeddings (PGVector)</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">2,716 chunks</div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">768 dimensions</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500">Median Retrieval Latency</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">114ms</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">Sub-150ms guarantee</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <div className="text-xs text-slate-500">Index Health Score</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">99.8%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">0 corrupted chunks</div>
        </div>
      </div>

      {/* Interactive Vector Search Sandbox */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4ade80]" />
            <h3 className="text-sm font-bold text-white">Live Semantic Vector Test Sandbox</h3>
          </div>
          <span className="text-[10px] font-mono text-[#2dd4bf]">COSINE SIMILARITY TESTER</span>
        </div>

        <div className="flex gap-2">
          <input 
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] font-sans"
            placeholder="Type a test customer inquiry to inspect retrieved knowledge chunks..."
          />
          <button 
            onClick={handleRunTestQuery}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Search className="w-3.5 h-3.5" /> Test Query
          </button>
        </div>

        {/* Retrieved Top Chunks Result */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">
              {isSearching ? 'Computing Embeddings & Cosine Ranks...' : `Top Retrieved Chunk (Score: ${testQuery.toLowerCase().includes('scim') ? '0.961' : testQuery.toLowerCase().includes('key') || testQuery.toLowerCase().includes('token') ? '0.994' : '0.948'} Cosine Match)`}
            </span>
            <span className="font-mono text-[11px]">Latency: 112ms · 512 tokens</span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            {testQuery.toLowerCase().includes('scim')
              ? `"RFC 7643 SCIM 2.0 schema: In Okta or Entra ID, configure Push Groups with Base URL https://api.nexora.ai/scim/v2. Map department attribute to Team RBAC role with 60-second periodic sync."`
              : testQuery.toLowerCase().includes('key') || testQuery.toLowerCase().includes('token')
              ? `"Zero-downtime key rolling: Generate secondary API token under Settings > API Keys. 24-hour grace overlap window ensures zero microservice 401s while staging and production microservices update."`
              : `"def verify_webhook_signature(raw_payload: bytes, signature_header: str, secret: str) -> bool:\n  t, v1 = parse_header(signature_header)\n  computed = hmac.new(secret.encode(), f'{t}.{raw_payload.decode()}'.encode(), hashlib.sha256).hexdigest()\n  return hmac.compare_digest(computed, v1)"`}
          </p>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>
              Source:{' '}
              {testQuery.toLowerCase().includes('scim')
                ? 'okta-scim-integration-guide.md (Chunk #4)'
                : testQuery.toLowerCase().includes('key') || testQuery.toLowerCase().includes('token')
                ? 'security-key-rotation-guide.md (Chunk #1)'
                : 'developer-webhooks-v2.md (Chunk #18)'}
            </span>
            <span className="text-[#4ade80]">High Relevance Confidence: 98.2%</span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Knowledge Sources Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Connected Knowledge Sources</h3>
          <span className="text-xs text-slate-500">{sourcesList.length} sources registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Source Name</th>
                <th className="py-3 px-4">Integration Type</th>
                <th className="py-3 px-4">Chunks Indexed</th>
                <th className="py-3 px-4">Indexing Status</th>
                <th className="py-3 px-4">Last Sync</th>
                <th className="py-3 px-4">AI Avg Accuracy</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {sourcesList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>{s.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{s.type}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{s.vectors}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono text-[11px] font-semibold ${
                      s.status === 'Ready' ? 'text-emerald-700' : s.status === 'Processing' ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      ● {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{s.lastIndexed}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-medium">{s.confidenceAvg}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button 
                        onClick={() => handleReindex(s.id)}
                        title="Re-index Now" 
                        className="p-1.5 hover:text-emerald-700 hover:bg-slate-100 rounded cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSource(s.id)}
                        title="Delete Source" 
                        className="p-1.5 hover:text-rose-600 hover:bg-slate-100 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Knowledge Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Knowledge Source</h3>
            <p className="text-xs text-slate-500">Select a connection to ingest documents into the PGVector RAG store.</p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Source Name (Optional)</label>
              <input 
                type="text"
                value={newSourceName}
                onChange={(e) => setNewSourceName(e.target.value)}
                placeholder="e.g. API Reference Docs v2"
                className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Source Type</label>
              <select 
                value={newSourceType}
                onChange={(e) => setNewSourceType(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none"
              >
                <option value="Notion Workspace">Notion Workspace</option>
                <option value="PDF Document Upload">PDF Document Upload</option>
                <option value="Markdown GitHub Repo">Markdown GitHub Repo</option>
                <option value="Zendesk Help Center">Zendesk Help Center</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-500 space-y-2">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
              <div>Drag & drop documentation files or click to browse</div>
              <div className="text-[10px] text-slate-400">PDF, Markdown, HTML up to 50MB</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddSource}
                className="px-4 py-2 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
              >
                Start Vector Ingestion
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
