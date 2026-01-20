import { useState } from 'react';
import { getSystemPrompt } from '../config/systemPrompt';

export default function ColdCallReviewer() {
  const [transcript, setTranscript] = useState('');
  const [outcome, setOutcome] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      setError('Please paste a transcript first');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your Anthropic API key');
      setShowApiKeyInput(true);
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const userMessage = outcome
        ? `Please review this cold call transcript.\n\n**Call Outcome:** ${outcome}\n\n**Transcript:**\n${transcript}`
        : `Please review this cold call transcript.\n\n**Transcript:**\n${transcript}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: getSystemPrompt(),
          messages: [
            { role: 'user', content: userMessage }
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error.message || 'Something went wrong');
      } else {
        const textContent = data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n');
        setReview(textContent);
      }
    } catch (err) {
      setError('Failed to get review. Please check your API key and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
    setOutcome('');
    setReview('');
    setError('');
  };

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3 pb-2 border-b border-slate-700">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-semibold text-orange-400 mt-5 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.includes(':**')) {
        const parts = line.split(':**');
        return (
          <p key={i} className="mt-2">
            <span className="font-semibold text-white">{parts[0].replace(/\*\*/g, '')}:</span>
            <span className="text-slate-300">{parts[1]?.replace(/\*\*/g, '')}</span>
          </p>
        );
      }
      if (line.startsWith('| ') && line.includes(' | ')) {
        const cells = line.split(' | ').map(c => c.replace(/^\||\|$/g, '').trim());
        const isHeader = line.includes('Area') || line.includes('Step') || line.includes('---');
        if (line.includes('---')) return null;
        return (
          <div key={i} className={`grid gap-2 py-1 px-2 ${isHeader ? 'bg-slate-700/50 font-semibold text-white' : 'text-slate-300'} ${i % 2 === 0 ? 'bg-slate-800/30' : ''} text-sm`} style={{gridTemplateColumns: cells.length === 3 ? '1fr 1fr 3fr' : cells.length === 4 ? '0.5fr 2fr 0.7fr 2fr' : `repeat(${cells.length}, 1fr)`}}>
            {cells.map((cell, j) => <span key={j} className={cell.includes('✅') ? 'text-green-400' : cell.includes('❌') ? 'text-red-400' : ''}>{cell}</span>)}
          </div>
        );
      }
      if (line.startsWith('> **')) {
        return <blockquote key={i} className="border-l-3 border-orange-500 pl-4 py-1 my-2 bg-slate-800/50 rounded-r text-slate-300 italic">{line.replace('> ', '').replace(/\*\*/g, '')}</blockquote>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={i} className="border-l-2 border-slate-600 pl-4 py-1 text-slate-400 italic">{line.replace('> ', '')}</blockquote>;
      }
      if (line.startsWith('- **')) {
        const content = line.replace('- **', '').replace('**', ':');
        return <p key={i} className="ml-4 my-1 text-slate-300">• <span className="font-semibold text-white">{content.split(':')[0]}:</span>{content.split(':').slice(1).join(':')}</p>;
      }
      if (line.startsWith('- ')) {
        return <p key={i} className="ml-4 my-1 text-slate-300">• {line.replace('- ', '')}</p>;
      }
      if (line.match(/^\d+\. \*\*/)) {
        const content = line.replace(/^\d+\. \*\*/, '').replace('**', ':');
        return <p key={i} className="ml-4 my-2 text-slate-300"><span className="font-semibold text-white">{line.match(/^\d+/)[0]}. {content.split(':')[0]}:</span>{content.split(':').slice(1).join(':')}</p>;
      }
      if (line.match(/^\d+\. /)) {
        return <p key={i} className="ml-4 my-1 text-slate-300">{line}</p>;
      }
      if (line.startsWith('---')) {
        return <hr key={i} className="my-4 border-slate-700" />;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      return <p key={i} className="text-slate-300 my-1">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 mb-3">
            <span className="text-orange-400 text-sm font-medium">Salesfire SDR Tool</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">🔥 Cold Call Reviewer</h1>
          <p className="text-slate-400 text-sm md:text-base">Paste your transcript for supportive, actionable feedback</p>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4 md:p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🔑</span>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Anthropic API Key</h3>
                <p className="text-slate-400 text-sm mb-3">
                  Enter your API key from{' '}
                  <a
                    href="https://console.anthropic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 underline"
                  >
                    console.anthropic.com
                  </a>
                </p>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-sm md:text-base"
                />
              </div>
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4 md:p-6 mb-6">
          {!showApiKeyInput && apiKey && (
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <span>🔑 API key configured</span>
              <button
                onClick={() => setShowApiKeyInput(true)}
                className="text-orange-400 hover:text-orange-300 underline"
              >
                Change
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              📝 Call Transcript
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your call transcript here...

Example:
SDR: Hi, this is Katie from Salesfire. Do you have 30 seconds?
Prospect: Uh, sure, what's this about?
SDR: I noticed you're using Klaviyo..."
              className="w-full h-48 md:h-64 bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 resize-none text-sm md:text-base"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              📊 Call Outcome (optional)
            </label>
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-sm md:text-base"
            >
              <option value="">Select outcome...</option>
              <option value="Demo booked">✅ Demo booked</option>
              <option value="Follow-up scheduled">📅 Follow-up scheduled</option>
              <option value="No meeting - objection">❌ No meeting - objection</option>
              <option value="Voicemail left">📞 Voicemail left</option>
              <option value="Gatekeeper - no connect">🚪 Gatekeeper - no connect</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading || !transcript.trim()}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Reviewing your call...
                </>
              ) : (
                <>🔥 Review My Call</>
              )}
            </button>
            <button
              onClick={handleClear}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 px-4 md:px-6 rounded-xl transition-colors text-sm md:text-base"
            >
              Clear
            </button>
          </div>
        </div>

        {review && (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4 md:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
              <span className="text-2xl">📋</span>
              <h2 className="text-xl font-semibold text-white">Your Feedback</h2>
            </div>
            <div className="text-sm md:text-base">
              {renderMarkdown(review)}
            </div>
          </div>
        )}

        <div className="text-center text-slate-500 text-xs md:text-sm">
          <p>Built for Salesfire SDRs • Every dial is progress 💪</p>
          <p className="mt-1 text-slate-600">Remember: The fact you're reviewing your calls puts you ahead of 90% of reps</p>
        </div>
      </div>
    </div>
  );
}
