import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  Building2, Search, Heart, Scale, Bell, Sparkles, MessageSquare, 
  Sun, Moon, Globe, User, ShieldAlert, Menu, X, PhoneCall 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, setLanguage, theme, toggleTheme, t, 
    activeTab, setActiveTab, favorites, comparisonList, 
    notifications, setIsAiModalOpen, setIsChatOpen, userProfile 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'properties', label: t.properties },
    { id: 'projects', label: t.projects },
    { id: 'map', label: t.map },
    { id: 'calculators', label: t.calculators },
    { id: 'compare', label: `${t.compare} (${comparisonList.length})` },
    { id: 'favorites', label: t.favorites },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top Banner Bar */}
      <div className="bg-[#C5A059]/10 border-b border-[#C5A059]/20 text-[#C5A059] py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs font-bold flex justify-between items-center gap-2 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="bg-[#C5A059] text-black px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex-shrink-0">
            MAGA VIP
          </span>
          <span className="text-gray-300 font-normal truncate">
            {language === 'ar' ? 'العروض الحصرية والمشاريع الكبرى | الرياض - جدة - الخبر' : 'Exclusive Luxury Developments | Riyadh - Jeddah - Khobar'}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-gray-300 flex-shrink-0">
          <a href="tel:+966554999928" className="hover:text-[#C5A059] flex items-center gap-1 transition-colors">
            <PhoneCall className="w-3 h-3 text-[#C5A059]" /> +966 55 499 9928
          </a>
          <span>|</span>
          <a href="mailto:magaksa2030@gmail.com" className="hover:text-[#C5A059] transition-colors">
            magaksa2030@gmail.com
          </a>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer group flex-shrink-0"
        >
          <Logo size="sm" className="sm:hidden" />
          <Logo size="md" className="hidden sm:flex" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#C5A059] bg-white/10 border border-[#C5A059]/40 font-bold'
                    : 'text-gray-400 hover:text-[#C5A059]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#C5A059] text-black font-bold text-xs hover:bg-[#d4b574] transition-all shadow-md"
            title="المساعد العقاري الذكي"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline sm:inline">{t.aiAssistant}</span>
          </button>

          {/* Desktop Only Tools */}
          <div className="hidden md:flex items-center gap-2">
            {/* Live Chat Button */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-gray-300 hover:text-[#C5A059] transition-all relative"
              title={t.liveChat}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A059] rounded-full animate-ping" />
            </button>

            {/* Favorites Counter */}
            <button
              onClick={() => setActiveTab('favorites')}
              className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-gray-300 hover:text-[#C5A059] transition-all relative"
              title={t.favorites}
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-black text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-[#C5A059] transition-all"
              title="تغيير المظهر"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile / Admin Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="p-2 rounded-full border border-[#C5A059]/40 text-[#C5A059] hover:bg-white/10 transition-all flex items-center gap-1.5"
              title={t.profile}
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-semibold text-white">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="bg-[#C5A059] text-black px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold hover:bg-[#d4b574] transition-all"
            title="تغيير اللغة"
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-full border border-white/10 text-white hover:text-[#C5A059]"
            aria-label="القائمة"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-[#C5A059]/30 px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3.5 py-3 rounded-xl text-start font-semibold text-xs sm:text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 font-bold'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Additional Mobile Quick Actions */}
          <div className="pt-3 border-t border-neutral-800 grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setActiveTab('favorites');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-[#C5A059]"
            >
              <Heart className="w-4 h-4 text-[#C5A059]" />
              <span>{t.favorites} ({favorites.length})</span>
            </button>

            <button
              onClick={() => {
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-[#C5A059]"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A059]" />
              <span>{t.liveChat}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-[#C5A059]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#C5A059]" /> : <Moon className="w-4 h-4 text-[#C5A059]" />}
              <span>المظهر</span>
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-neutral-800 text-[#C5A059] font-bold rounded-xl flex items-center justify-center gap-2 border border-[#C5A059]/30 text-xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.admin} (لوحة التحكم)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
