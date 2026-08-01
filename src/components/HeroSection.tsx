import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, MapPin, Building, Home as HomeIcon, TrendingUp, Key, 
  Gavel, Sparkles, Volume2, VolumeX, ArrowLeft, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { COMPANY_STATS } from '../data/mockData';

export const HeroSection: React.FC = () => {
  const { language, t, filterState, setFilterState, setActiveTab, quickCategoryFilter, setIsAiModalOpen } = useApp();
  const [isMuted, setIsMuted] = useState(true);

  const categories = [
    { id: 'buy', label: t.buy, icon: HomeIcon, color: 'from-amber-500 to-amber-700' },
    { id: 'sell', label: t.sell, icon: Key, color: 'from-emerald-500 to-teal-700' },
    { id: 'rent', label: t.rent, icon: Building, color: 'from-blue-500 to-indigo-700' },
    { id: 'projects', label: t.projects, icon: Building, color: 'from-yellow-500 to-amber-600' },
    { id: 'invest', label: t.investment, icon: TrendingUp, color: 'from-purple-500 to-indigo-800' },
    { id: 'auction', label: t.auctions, icon: Gavel, color: 'from-amber-600 to-orange-800' },
  ];

  const cities = ['الكل', 'الرياض', 'جدة', 'الخبر', 'المجمعة', 'الدمام'];

  const propertyTypes = [
    { id: 'all', label: 'جميع العقارات' },
    { id: 'villa', label: 'فيلا' },
    { id: 'apartment', label: 'شقة' },
    { id: 'penthouse', label: 'بنتهاوس' },
    { id: 'building', label: 'عمائر استثمارية' },
    { id: 'land', label: 'أرض' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('search');
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between bg-neutral-950 text-white overflow-hidden">
      {/* Video / Animated Background Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-50 contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-facade-41381-large.mp4" type="video/mp4" />
        </video>
        
        {/* Luxury Gold & Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
      </div>

      {/* Video Audio Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 left-6 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 transition-all"
        title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12 flex-1 flex flex-col justify-center">
        {/* Editorial Gold Eyebrow Badge */}
        <span className="text-[#C5A059] text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4 block">
          فخامة العيش في قلب المملكة
        </span>

        {/* Main Editorial Title */}
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight sm:leading-[1.1] max-w-4xl mb-4 sm:mb-6">
          اكتشف عقارات<br/>
          <span className="text-[#C5A059]">تفوق الخيال</span>
        </h1>

        <p className="text-gray-300 text-xs sm:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
          نقدم لك تجربة عقارية استثنائية تجمع بين الحداثة والقيم، في أكثر الوجهات تميزاً في الرياض وجدة والخبر.
        </p>

        {/* Smart Quick Search Box with Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-xl p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl mb-8 sm:mb-10 max-w-5xl">
          <form onSubmit={handleSearchSubmit} className="space-y-3 sm:space-y-4">
            {/* Quick Category Tab selection inside Search */}
            <div className="flex items-center gap-1.5 sm:gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
              {['buy', 'rent', 'invest', 'projects'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterState(prev => ({ ...prev, category: cat as any }))}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    filterState.category === cat
                      ? 'bg-[#C5A059] text-black shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat === 'buy' && t.buy}
                  {cat === 'rent' && t.rent}
                  {cat === 'invest' && t.investment}
                  {cat === 'projects' && t.projects}
                </button>
              ))}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Keyword Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'اسم الحي، المشروع، أو اسم العقار...' : 'Search by district or property...'}
                  value={filterState.searchQuery}
                  onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#C5A059] text-white rounded-full pr-9 pl-3 py-2.5 text-xs sm:text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* City Selection */}
              <div className="relative">
                <MapPin className="w-4 h-4 absolute right-3.5 top-3.5 text-[#C5A059]" />
                <select
                  value={filterState.city}
                  onChange={(e) => setFilterState(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#C5A059] text-white rounded-full pr-9 pl-3 py-2.5 text-xs sm:text-sm focus:outline-none appearance-none transition-colors cursor-pointer"
                >
                  <option value="all" className="bg-black text-white">جميع المدن (الرياض، جدة...)</option>
                  {cities.slice(1).map(c => (
                    <option key={c} value={c} className="bg-black text-white">{c}</option>
                  ))}
                </select>
              </div>

              {/* Property Type Selection */}
              <div className="relative">
                <Building className="w-4 h-4 absolute right-3.5 top-3.5 text-[#C5A059]" />
                <select
                  value={filterState.type}
                  onChange={(e) => setFilterState(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#C5A059] text-white rounded-full pr-9 pl-3 py-2.5 text-xs sm:text-sm focus:outline-none appearance-none transition-colors cursor-pointer"
                >
                  {propertyTypes.map(t => (
                    <option key={t.id} value={t.id} className="bg-black text-white">{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#d4b574] text-black font-bold rounded-full py-2.5 px-6 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>{t.applyFilters}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Category Buttons Grid */}
        <div className="mb-6 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">
            {language === 'ar' ? 'الأقسام والخدمات السريعة:' : 'Quick Navigation:'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => quickCategoryFilter(cat.id as any)}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A059]/60 hover:bg-white/10 flex flex-col items-center gap-1.5 sm:gap-2 group transition-all"
                >
                  <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#C5A059]/20 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-sm font-semibold text-gray-200 group-hover:text-[#C5A059]">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Company Statistics Banner */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-xl py-4 sm:py-6 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-bold text-[#C5A059] mb-0.5 sm:mb-1">
              +{COMPANY_STATS.completedProjects}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
              {language === 'ar' ? 'مشروع عقاري مكتمل' : 'Completed Projects'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-bold text-[#C5A059] mb-0.5 sm:mb-1">
              +{COMPANY_STATS.totalInvestmentSARBillions}B
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
              {language === 'ar' ? 'مليار ريال استثمارات' : 'Billion SAR Investments'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-bold text-[#C5A059] mb-0.5 sm:mb-1">
              +{COMPANY_STATS.deliveredUnits}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
              {language === 'ar' ? 'وحدة سكنية مسلمة' : 'Delivered Units'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-4xl font-bold text-[#C5A059] mb-0.5 sm:mb-1">
              {COMPANY_STATS.satisfactionPercent}%
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
              {language === 'ar' ? 'نسبة رضا العملاء' : 'Customer Satisfaction'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
