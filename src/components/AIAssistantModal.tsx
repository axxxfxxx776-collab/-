import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, Bot, User, X, Loader2, ArrowLeft, Building2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const AIAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, language, properties } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'أهلاً بك! أنا المساعد العقاري الذكي لشركة "ماجا العقارية". كيف يمكنني مساعدتك اليوم؟ يمكنني اقتراح العقارات الفاخرة، حساب العائد الاستثماري، أو الإجابة على استفساراتك التمويلية.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAiModalOpen) return null;

  const quickPrompts = [
    'ترشيح فيلا فاخرة في شمال الرياض بمسبح',
    'ما هي أفضل الفرص الاستثمارية بعائد +9%؟',
    'أستفسر عن شقق الملقا وبوليفارد الرياض',
    'كيف يمكنني حجز موعد معاينة لمشروع ماجا؟'
  ];

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          language,
        })
      });

      const data = await res.json();
      const aiReplyText = data.reply || 'يسعدنا تقديم الاستشارة العقارية الفاخرة لك عبر الواتساب أو الهاتف: +966 55 499 9928.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'يسعدنا تقديم الاستشارة المباشرة عبر مستشاري ماجا العقارية عبر الواتساب: +966 55 499 9928.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl sm:rounded-3xl w-full max-w-2xl h-[90vh] sm:h-[80vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-amber-400 rounded-xl">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">المساعد العقاري الذكي - ماجا</h3>
              <p className="text-[11px] text-black/80 font-bold">مدعوم بالذكاء الاصطناعي الفائق</p>
            </div>
          </div>

          <button onClick={() => setIsAiModalOpen(false)} className="p-2 hover:bg-black/10 rounded-full">
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-xl flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-amber-400 border border-amber-500/30'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[80%] text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500/20 text-white border border-amber-500/30 rounded-tr-none'
                  : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[10px] text-neutral-500 block text-end mt-2">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold p-3 bg-neutral-900 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري تحليل استفسارك وإعداد التوصية...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-semibold whitespace-nowrap border border-neutral-700 transition-all flex-shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputPrompt);
          }}
          className="p-3 bg-neutral-900 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="اكتب استفسارك للمساعد العقاري..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold disabled:opacity-50 hover:scale-105 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
