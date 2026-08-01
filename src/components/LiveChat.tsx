import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, X, PhoneCall, User, CheckCheck, ShieldCheck } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const { isChatOpen, setIsChatOpen, userProfile } = useApp();
  const [messages, setMessages] = useState<{ id: string; sender: 'user' | 'agent'; text: string; time: string }[]>([
    {
      id: 'c-1',
      sender: 'agent',
      text: 'مرحباً بك في خدمة المحادثة المباشرة لشركة ماجا العقارية! أنا م. فهد العصيمي مستشار المبيعات المباشر. كيف أستطيع خدمتك اليوم؟',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `c-${Date.now()}`,
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate Agent Auto Reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `c-reply-${Date.now()}`,
          sender: 'agent',
          text: 'شكراً لتواصلك معنا! يسعدني إفادتك بكافة التفاصيل وإرسال الملفات أو حجز موعد معاينة. يمكنك أيضاً التحدث فوراً هاتفياً أو عبر الواتساب على +966554999928.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-16 sm:bottom-24 left-3 right-3 sm:left-auto sm:right-8 z-50 w-auto sm:w-full sm:max-w-sm bg-neutral-900 border border-amber-500/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[440px] sm:h-[500px]">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400">
              M
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">مبيعات ماجا العقارية</h4>
            <span className="text-[10px] text-emerald-400 font-bold block">متواجد الآن لمساعدتك</span>
          </div>
        </div>

        <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-950">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-amber-500 text-black font-bold rounded-tr-none'
                : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
            }`}>
              {m.text}
            </div>
            <span className="text-[9px] text-neutral-500 mt-1 flex items-center gap-1">
              {m.time}
              {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-amber-400" />}
            </span>
          </div>
        ))}
      </div>

      {/* Direct Call Quick Bar */}
      <div className="p-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs px-4">
        <a href="tel:+966554999928" className="text-amber-400 hover:underline flex items-center gap-1 font-bold">
          <PhoneCall className="w-3.5 h-3.5" /> +966 55 499 9928
        </a>
        <span className="text-neutral-500 text-[10px]">استجابة فورية</span>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-black flex items-center gap-2">
        <input
          type="text"
          placeholder="اكتب رسالتك..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-amber-500 text-black font-bold rounded-xl"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
