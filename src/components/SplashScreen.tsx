import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const { language } = useApp();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 700);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Editorial Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Center Animated Logo & Branding */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <Logo variant="vertical" size="xl" className="mb-8" />

        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-light mb-10 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>رائدة التطوير والاستثمار العقاري الفاخر بالمملكة</span>
        </div>

        {/* Loading Spinner bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#C5A059] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Quick Skip Button */}
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(onFinish, 300);
        }}
        className="absolute bottom-10 right-10 text-xs text-gray-400 hover:text-[#C5A059] flex items-center gap-1 bg-white/5 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md transition-colors"
      >
        <span>{language === 'ar' ? 'تخطي الشاشة' : 'Skip'}</span>
        {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
