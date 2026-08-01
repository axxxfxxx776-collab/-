import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types';
import { MapPin, Navigation, Building2, Eye, X, Layers, TrendingUp } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { properties, language, t, openPropertyDetail } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('الكل');
  const [activeProperty, setActiveProperty] = useState<Property | null>(properties[0]);

  const filteredProperties = properties.filter(p => {
    if (selectedCity === 'الكل') return true;
    return p.location.city === selectedCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <MapPin className="w-4 h-4" />
            <span>خريطة ماجا العقارية التفاعلية</span>
          </div>
          <h2 className="text-3xl font-black text-white">{t.map}</h2>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['الكل', 'الرياض', 'جدة', 'الخبر', 'المجمعة'].map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-amber-500 text-black shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {city === 'الكل' ? 'جميع المدن' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas Frame Container */}
      <div className="relative h-[650px] w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-neutral-950 shadow-2xl">
        {/* Stylized Dark Satellite Map Tiles Background simulation */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-neutral-950/80" />

        {/* Top Control Bar on Map */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
          <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-neutral-800 text-xs font-bold text-amber-400 flex items-center gap-2">
            <Navigation className="w-4 h-4 animate-pulse" />
            <span>معروض {filteredProperties.length} موقع عقاري مميز</span>
          </div>

          <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-neutral-800 text-[11px] font-semibold text-neutral-300">
            المملكة العربية السعودية
          </div>
        </div>

        {/* Property Map Markers (Interactive Coordinates overlay) */}
        <div className="absolute inset-0 z-10">
          {filteredProperties.map((prop, index) => {
            // Relative position mapping simulation for Saudi cities
            const positions: Record<string, { top: string; left: string }> = {
              'prop-01': { top: '35%', left: '55%' },
              'prop-02': { top: '65%', left: '25%' },
              'prop-03': { top: '38%', left: '52%' },
              'prop-04': { top: '30%', left: '58%' },
              'prop-05': { top: '40%', left: '80%' },
              'prop-06': { top: '33%', left: '50%' },
              'prop-07': { top: '25%', left: '42%' },
            };

            const pos = positions[prop.id] || { top: `${30 + index * 8}%`, left: `${40 + index * 6}%` };
            const isActive = activeProperty?.id === prop.id;

            return (
              <div
                key={prop.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveProperty(prop)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs shadow-2xl transition-all duration-300 transform hover:scale-110 ${
                    isActive
                      ? 'bg-amber-400 text-black border-2 border-white scale-110 z-30 ring-4 ring-amber-500/40'
                      : 'bg-neutral-900/90 text-white border border-amber-500/50 hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                  <span>{(prop.priceSAR / 1000000).toFixed(1)} مليون ر.س</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Property Popup Card on Map */}
        {activeProperty && (
          <div className="absolute bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md z-30 bg-neutral-900/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>{activeProperty.location.city} - {activeProperty.location.district}</span>
              </span>
              <button onClick={() => setActiveProperty(null)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4">
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.titleAr}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border border-neutral-800 flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <h4 className="font-extrabold text-sm text-white line-clamp-1">
                  {activeProperty.titleAr}
                </h4>
                <p className="text-neutral-400 text-xs line-clamp-2">
                  {activeProperty.descriptionAr}
                </p>
                <div className="text-amber-400 font-black text-base pt-1">
                  {activeProperty.priceSAR.toLocaleString()} ر.س
                </div>
              </div>
            </div>

            <button
              onClick={() => openPropertyDetail(activeProperty)}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>استكشف تفاصيل العقار الكاملة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
