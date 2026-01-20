import { useState } from 'react';
import { MANDATORY_QUESTIONS } from '../config/mandatoryQuestions';

export default function QuestionReference() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 z-50"
      >
        <span className="text-xl">📋</span>
        <span className="hidden md:inline">Question Guide</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">🎯 Mandatory 5-Step Discovery Flow</h2>
                  <p className="text-slate-400 text-sm">Every cold call must include these questions (or variations)</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-4">
              {MANDATORY_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleStep(q.id)}
                    className="w-full p-4 flex items-start gap-4 hover:bg-slate-700/30 transition-colors text-left"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {q.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{q.category}</h3>
                      <p className="text-slate-300 text-sm italic">"{q.question}"</p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${expandedStep === q.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded Content */}
                  {expandedStep === q.id && (
                    <div className="p-4 pt-0 space-y-3">
                      <div className="pl-12">
                        <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                          <p className="text-orange-400 text-xs font-semibold mb-1">PURPOSE:</p>
                          <p className="text-slate-300 text-sm">{q.purpose}</p>
                        </div>

                        <div>
                          <p className="text-slate-400 text-xs font-semibold mb-2">ACCEPTABLE VARIATIONS:</p>
                          <ul className="space-y-1">
                            {q.acceptableVariations.map((variation, idx) => (
                              <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                                <span className="text-orange-400 mt-1">•</span>
                                <span className="italic">"{variation}"</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <p className="text-slate-400 text-xs font-semibold mb-1">KEY THEMES:</p>
                          <div className="flex flex-wrap gap-2">
                            {q.keyThemes.map((theme, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded"
                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 bg-slate-900/50">
              <p className="text-slate-400 text-sm text-center">
                💡 <strong>Remember:</strong> The exact words don't matter — the intent and flow do.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
