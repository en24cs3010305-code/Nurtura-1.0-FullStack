import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PageHeader } from '../../components/common/PageHeader';
import { Send, Paperclip, CheckCheck, Search } from 'lucide-react';

export const DoctorMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'doctor',
      text: 'Hello Sarah! I reviewed Aarav’s 6-month growth entries. Weight velocity is steady along the 56th percentile. How is his transition to evening nap schedules going?',
      time: 'Yesterday 16:30'
    },
    {
      id: '2',
      sender: 'parent',
      text: 'Good afternoon Dr. Sharma! He is sleeping stretches of 6-7 hours now. We also started introducing single-ingredient sweet potato puree as discussed.',
      time: 'Yesterday 17:15'
    },
    {
      id: '3',
      sender: 'doctor',
      text: 'Wonderful. Keep purees soft and observe for any skin rashes. See you both at the clinic on Nov 28 for his 6-month immunization series.',
      time: 'Today 09:20'
    }
  ]);
  const [reply, setReply] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        sender: 'doctor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setReply('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinical Messages"
        subtitle="Patient communications with authorized parents and guardians"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
        {/* Left conversations */}
        <Card className="md:col-span-4 p-4 flex flex-col space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search patient..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128"
                  alt="Sarah"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">Sarah Jenkins</h4>
                    <span className="text-[10px] text-stone-400">09:20</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">Patient: Aarav Sharma (6M)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Chat */}
        <Card className="md:col-span-8 p-0 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Sarah Jenkins (Mother of Aarav)</h4>
              <p className="text-[10px] text-slate-500">Authorized Parent Communication</p>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">Verified Channel</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
            {messages.map((m) => {
              const isDoctor = m.sender === 'doctor';
              return (
                <div key={m.id} className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isDoctor
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 flex items-center gap-1">
                    {m.time} {isDoctor && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                  </span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Reply to Sarah with clinical guidance..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="flex-1 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <Button size="sm" type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white" rightIcon={<Send className="w-3.5 h-3.5" />}>
              Send Reply
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
