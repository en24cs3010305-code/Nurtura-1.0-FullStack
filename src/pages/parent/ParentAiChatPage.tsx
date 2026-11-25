import React, { useState } from 'react';
import { useBaby } from '../../contexts/BabyContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { aiService, AI_SUGGESTED_QUESTIONS } from '../../services/aiService';
import { ChatMessage } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  ShieldAlert,
  Baby,
  Check,
  Plus
} from 'lucide-react';

export const ParentAiChatPage: React.FC = () => {
  const { selectedBaby } = useBaby();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-ai',
      sender: 'assistant',
      text: `Hello! I am **Nurtura AI**, your newborn and infant care companion.

I have active context loaded for **${selectedBaby?.name || 'Aarav'}** (${selectedBaby?.ageText || '6 months old'}, ${selectedBaby?.currentWeightKg || 7.8} kg).

How can I help you today? You can select any of the suggested questions below or ask me about feeding routines, sleep guidelines, or pediatrician visit preparation.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setIsLoading(true);

    try {
      const assistantMsg = await aiService.queryAssistant(
        { question: textToSend },
        selectedBaby || undefined
      );
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'We encountered an error connecting to the prototype AI service. Please try again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `fresh-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. I am ready to assist you with ${selectedBaby?.name || 'your baby'}!`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nurtura AI Companion"
        subtitle="Educational infant health insights, milestone pacing, and pediatrician consultation guidance"
        actions={
          <Button variant="outline" size="sm" onClick={handleClear} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Clear Chat
          </Button>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Pediatric Safety Guardrail:</strong> Nurtura AI provides educational baby guidance and routine explanations. It does not diagnose illness, prescribe medication, or triage emergencies. In case of acute infant symptoms, contact emergency medical services immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px]">
        {/* Left Side: Suggested Queries & Context Card */}
        <Card className="lg:col-span-4 p-4 flex flex-col space-y-4 overflow-y-auto">
          {/* Baby Context Pill */}
          <div className="p-3 rounded-2xl bg-sage-50 dark:bg-darkBg-surface border border-sage-200 dark:border-darkBg-border space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600 flex items-center gap-1">
              <Baby className="w-3 h-3" /> Active Baby Context
            </span>
            <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
              {selectedBaby?.name || 'Aarav Sharma'}
            </h4>
            <p className="text-[11px] text-nurturaText-secondary">
              Age: {selectedBaby?.ageText || '6M'} • Weight: {selectedBaby?.currentWeightKg || 7.8} kg
            </p>
          </div>

          <div className="space-y-2 flex-1">
            <span className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              Suggested Pediatric Topics
            </span>
            <div className="space-y-1.5">
              {AI_SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-darkBg-border hover:border-sage-500 hover:bg-sage-50/60 dark:hover:bg-darkBg-surface text-left text-xs text-nurturaText-secondary hover:text-nurturaText-primary transition-all leading-snug"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Side: Chat Window */}
        <Card className="lg:col-span-8 p-0 flex flex-col overflow-hidden">
          {/* Chat Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/30 dark:bg-darkBg">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-sage-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1.5`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-sage-600 text-white rounded-br-xs'
                          : 'bg-white dark:bg-darkBg-card border border-stone-200/80 dark:border-darkBg-border text-nurturaText-primary dark:text-cream-100 rounded-bl-xs shadow-soft'
                      }`}
                    >
                      {m.text}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-400 px-1">
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="hover:text-stone-700 flex items-center gap-0.5"
                            title="Copy response"
                          >
                            {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                          <button className="hover:text-stone-700" title="Helpful">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="hover:text-stone-700" title="Not helpful">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sage-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-darkBg-card border border-stone-200/80 text-xs text-stone-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sage-500 animate-ping" />
                  Nurtura AI is analyzing recorded metrics...
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 sm:p-4 border-t border-stone-100 dark:border-darkBg-border bg-white dark:bg-darkBg-card flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about baby care, percentiles, feeding or vaccines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-stone-50 dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sage-600"
            />
            <Button size="sm" type="submit" isLoading={isLoading} rightIcon={<Send className="w-3.5 h-3.5" />}>
              Ask
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
