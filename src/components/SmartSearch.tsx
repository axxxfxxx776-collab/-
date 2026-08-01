import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, RotateCcw, MapPin, Building2, SlidersHorizontal, Layers, Check } from 'lucide-react';

export const SmartSearch: React.FC = () => {
  const { language, t, filterState, setFilterState, resetFilters, setActiveTab } = useApp();

  const cities = ['all', 'الرياض', 'جدة', 'الخبر', 'المجمعة', 'الدمام'];
  const districts = ['all', 'حطين', 'الملقا', 'الواحة', 'النرجس', 'الياسمين', 'الشاطئ', 'أبحر الشمالية'];
  const propertyTypes = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All Types' },
    { id: 'villa', labelAr: 'فيلا', labelEn: 'Villa' },
    { id: 'apartment', labelAr: 'شقة', labelEn: 'Apartment' },
    { id: 'penthouse', labelAr: 'بنتهاوس', labelEn: 'Penthouse' },
    { id: 'building', labelAr: 'عمائر', labelEn: 'Building' },
    { id: 'duplex', labelAr: 'دوبلكس', labelEn: 'Duplex' },
    { id: 'land', labelAr: 'أرض', labelEn: 'Land' },
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-white shadow-xl mb-8">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.search}</h2>
            <p className="text-xs text-neutral-400">فلاتر تخصيص دقيقة للتطوير والاستثمار العقاري</p>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetFilters}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Keyword Query */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-2">{t.search}</label>
          <input
            type="text"
            placeholder="اسم العقار، الحي، أو المطور..."
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-2">{t.city}</label>
          <select
            value={filterState.city}
            onChange={(e) => setFilterState(prev => ({ ...prev, city: e.target.value }))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="all">جميع المدن</option>
            {cities.slice(1).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-2">{t.district}</label>
          <select
            value={filterState.district}
            onChange={(e) => setFilterState(prev => ({ ...prev, district: e.target.value }))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="all">جميع الأحياء</option>
            {districts.slice(1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Category (شراء، إيجار، استثمار) */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-2">غرض العقار</label>
          <select
            value={filterState.category}
            onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value as any }))}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="all">جميع الأغراض</option>
            <option value="buy">شراء</option>
            <option value="rent">إيجار</option>
            <option value="invest">فرص استثمارية</option>
            <option value="auction">مزادات</option>
          </select>
        </div>

        {/* Price Slider */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-neutral-300">{t.priceRange}</label>
            <span className="text-xs text-amber-400 font-bold">
              أقصى سعر: {filterState.maxPrice.toLocaleString()} ر.س
            </span>
          </div>
          <input
            type="range"
            min="500000"
            max="30000000"
            step="500000"
            value={filterState.maxPrice}
            onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-amber-500 bg-neutral-950"
          />
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-xs font-bold text-neutral-300 mb-2">{t.bedrooms}</label>
          <div className="flex items-center gap-1.5">
            {['all', 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, bedrooms: num as any }))}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  filterState.bedrooms === num
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {num === 'all' ? 'الكل' : `${num}+`}
              </button>
            ))}
          </div>
        </div>

        {/* View Map Toggle button */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold border border-amber-500/30 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2 transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{t.map}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
