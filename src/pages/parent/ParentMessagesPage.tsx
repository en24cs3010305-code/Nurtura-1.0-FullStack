import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import {
  Send,
  Paperclip,
  CheckCheck,
  Search,
  Stethoscope,
  Smile,
  ShieldAlert
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'parent' | 'doctor';
  text: string;
  time: string;
}

export const ParentMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'doctor',
      text: 'Hello Sarah! I reviewed Aarav’s 6-month growth entries. Weight velocity is steady along the 56th percentile. How is his transition to evening nap schedules going?',
      time: 'Yesterday 16:30'
    },
    {
      id: 'm2',
      sender: 'parent',
      text: 'Good afternoon Dr. Sharma! He is sleeping stretches of 6-7 hours now. We also started introducing single-ingredient sweet potato puree as discussed.',
      time: 'Yesterday 17:15'
    },
    {
      id: 'm3',
      sender: 'doctor',
      text: 'Wonderful. Keep purees soft and observe for any skin rashes. See you both at the clinic on Nov 28 for his 6-month immunization series.',
      time: 'Today 09:20'
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'parent',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        subtitle="Direct clinical communication with your designated pediatric care team"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[650px]">
        {/* Left conversations list */}
        <Card className="md:col-span-4 p-4 flex flex-col space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-darkBg-border text-xs bg-stone-50 dark:bg-darkBg-surface focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            <div className="p-3 rounded-2xl bg-sage-50 dark:bg-darkBg-surface border border-sage-200 dark:border-darkBg-border cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=128"
                  alt="Dr. Ananya Sharma"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100 truncate">
                      Dr. Ananya Sharma
                    </h4>
                    <span className="text-[10px] text-stone-400">09:20</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    See you both at the clinic on Nov 28...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Non-urgent messaging only. For pediatric emergencies, call 911 immediately.</span>
          </div>
        </Card>

        {/* Right Chat Area */}
        <Card className="md:col-span-8 p-0 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-stone-100 dark:border-darkBg-border flex items-center justify-between bg-stone-50/50 dark:bg-darkBg-surface">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=128"
                alt="Dr. Sharma"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <h4 className="text-xs font-heading font-bold text-nurturaText-primary dark:text-cream-100">
                  Dr. Ananya Sharma, MD
                </h4>
                <p className="text-[10px] text-emerald-600 font-medium">Pediatrician • Online</p>
              </div>
            </div>
            <span className="text-[11px] text-stone-400">Blossom Clinic Channel</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30 dark:bg-darkBg">
            {messages.map((m) => {
              const isMe = m.sender === 'parent';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-sage-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-darkBg-card border border-stone-200/80 dark:border-darkBg-border text-nurturaText-primary dark:text-cream-100 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 flex items-center gap-1">
                    {m.time} {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Composer */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-100 dark:border-darkBg-border bg-white dark:bg-darkBg-card flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-stone-400 hover:text-stone-600 rounded-xl"
              title="Attach clinical document"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Type your message to Dr. Sharma..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 py-2 px-3.5 bg-stone-50 dark:bg-darkBg-surface border border-stone-200 dark:border-darkBg-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sage-600"
            />
            <Button size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
