import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SmartSearch } from './components/SmartSearch';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetail } from './components/PropertyDetail';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetail } from './components/ProjectDetail';
import { InteractiveMap } from './components/InteractiveMap';
import { CompareView } from './components/CompareView';
import { Calculators } from './components/Calculators';
import { AIAssistantModal } from './components/AIAssistantModal';
import { LiveChat } from './components/LiveChat';
import { AdminDashboard } from './components/AdminDashboard';
import { SplashScreen } from './components/SplashScreen';
import { Footer } from './components/Footer';
import { 
  Sparkles, MessageSquare, PhoneCall, Bot, 
  ArrowLeft, Building2, TrendingUp, ShieldCheck, CheckCircle2 
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, setActiveTab, properties, filterState, 
    setIsAiModalOpen, setIsChatOpen, articles, t, language 
  } = useApp();

  const [showSplash, setShowSplash] = useState(true);

  // Apply filters to property grid
  const filteredProperties = properties.filter(prop => {
    // Keyword search
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchTitle = prop.titleAr.toLowerCase().includes(q) || prop.titleEn.toLowerCase().includes(q);
      const matchLoc = prop.location.city.toLowerCase().includes(q) || prop.location.district.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc) return false;
    }

    // Category
    if (filterState.category !== 'all' && prop.category !== filterState.category) {
      return false;
    }

    // City
    if (filterState.city !== 'all' && prop.location.city !== filterState.city) {
      return false;
    }

    // District
    if (filterState.district !== 'all' && prop.location.district !== filterState.district) {
      return false;
    }

    // Type
    if (filterState.type !== 'all' && prop.type !== filterState.type) {
      return false;
    }

    // Max Price
    if (prop.priceSAR > filterState.maxPrice) {
      return false;
    }

    // Bedrooms
    if (filterState.bedrooms !== 'all' && prop.bedrooms < Number(filterState.bedrooms)) {
      return false;
    }

    return true;
  });

  const featuredProperties = properties.filter(p => p.featured);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#C5A059] selection:text-black flex flex-col justify-between relative overflow-hidden">
      {/* Background Subtle Gold Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/10 blur-[150px] -z-10 rounded-full pointer-events-none" />

      <div>
        {/* Header Navigation */}
        <Header />

        {/* Dynamic Main View switching based on activeTab */}
        <main>
          {activeTab === 'home' && (
            <div className="space-y-16">
              {/* Hero & Quick Search */}
              <HeroSection />

              {/* Featured Properties Showcase Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                      {t.featuredProperties}
                    </span>
                    <h2 className="text-3xl font-bold text-white">العقارات الحصرية البارزة</h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('properties')}
                    className="text-xs text-[#C5A059] font-bold hover:underline flex items-center gap-1.5 transition-all"
                  >
                    <span>مشاهدة كافة العقارات</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProperties.slice(0, 6).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </section>

              {/* Featured Major Projects */}
              <section>
                <ProjectsSection />
              </section>

              {/* AI Real Estate Banner CTA */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 max-w-2xl">
                    <span className="text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase block">
                      المساعد الاستثماري الذكي Gemini 3.6
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">
                      هل تبحث عن فرصة استثمارية أو عقار محدد؟
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-light">
                      استعن بالمساعد العقاري الذكي للحصول على توصيات فورية تناسب ميزانيتك وموقعك المفضل مع حساب تقريبي للتمويل والعائد الاستثماري.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="bg-[#C5A059] hover:bg-[#d4b574] text-black font-bold px-8 py-4 rounded-full text-sm flex items-center gap-3 shadow-xl transition-all flex-shrink-0"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>تحدث مع المساعد الذكي الآن</span>
                  </button>
                </div>
              </section>

              {/* Real Estate Articles & Market News */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                    التحليلات والأخبار
                  </span>
                  <h3 className="text-2xl font-bold text-white">{t.newsAndArticles}</h3>
                  <p className="text-xs text-gray-400 mt-1">مقالات وتحليلات السوق العقاري السعودي من خبراؤنا</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(articles || []).map((art) => (
                    <div key={art.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-5 space-y-3 shadow-lg backdrop-blur-md">
                      <img src={art.image} alt={art.titleAr} className="w-full h-40 object-cover rounded-xl" referrerPolicy="no-referrer" />
                      <span className="text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-full border border-[#C5A059]/20">
                        {language === 'ar' ? art.categoryAr : art.categoryEn}
                      </span>
                      <h4 className="font-bold text-sm text-white line-clamp-2">{language === 'ar' ? art.titleAr : art.titleEn}</h4>
                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">{language === 'ar' ? art.excerptAr : art.excerptEn}</p>
                      <div className="text-[10px] text-gray-400 pt-2 border-t border-white/10 flex justify-between">
                        <span>{art.author}</span>
                        <span>{art.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Properties Listing Tab */}
          {(activeTab === 'properties' || activeTab === 'search') && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <SmartSearch />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-gray-400">
                  تم العثور على <strong className="text-[#C5A059]">{filteredProperties.length}</strong> عقار مطابق
                </span>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-400">
                  <p className="text-base font-bold mb-2 text-white">لا توجد نتائج مطابقة لفلاتر البحث الحالية</p>
                  <p className="text-xs">جرب توسيع نطاق السعر أو اختيار مدينة أخرى.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Single Property Detail */}
          {activeTab === 'property-detail' && <PropertyDetail />}

          {/* Major Projects Listing */}
          {activeTab === 'projects' && <ProjectsSection />}

          {/* Project Detail View */}
          {activeTab === 'project-detail' && <ProjectDetail />}

          {/* Interactive Map */}
          {activeTab === 'map' && <InteractiveMap />}

          {/* Comparison View */}
          {activeTab === 'compare' && <CompareView />}

          {/* Calculators View */}
          {activeTab === 'calculators' && <Calculators />}

          {/* Admin Dashboard */}
          {activeTab === 'admin' && <AdminDashboard />}
        </main>
      </div>

      {/* Floating AI & Contact Floating Buttons */}
      <div className="fixed bottom-4 left-4 sm:bottom-10 sm:left-8 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="bg-[#C5A059] text-black p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          title="المساعد العقاري الذكي"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <a
          href="https://wa.me/966554999928"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-black p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          title="واتساب ماجا العقارية (+966 55 499 9928)"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* Modals & LiveChat Drawer */}
      <AIAssistantModal />
      <LiveChat />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
