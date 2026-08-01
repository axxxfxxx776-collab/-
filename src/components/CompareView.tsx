import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, Trash2, ArrowRight, Check, X, Eye, Plus, Building2, MapPin } from 'lucide-react';

export const CompareView: React.FC = () => {
  const { comparisonList, properties, toggleCompare, clearCompare, setActiveTab, openPropertyDetail } = useApp();

  const comparedProps = properties.filter(p => comparisonList.includes(p.id));

  if (comparedProps.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
          <Scale className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black">لا توجد عقارات مضافة للمقارنة بعد</h2>
        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          يمكنك تحديد حتى 4 عقارات من القائمة للمقارنة التفصيلية بين الأسعار، المساحات، العوائد الاستثمارية، والخدمات.
        </p>
        <button
          onClick={() => setActiveTab('properties')}
          className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-6 py-3 rounded-2xl text-sm"
        >
          تصفح واختيار العقارات للمقارنة
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
            <Scale className="w-4 h-4" />
            <span>جدول المقارنة العقارية المباشرة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">مقارنة العقارات المختارة ({comparedProps.length}/4)</h2>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs text-red-400 hover:text-red-300 font-bold bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>مسح جدول المقارنة</span>
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
        <table className="w-full text-start text-xs sm:text-sm border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-neutral-950 text-amber-400 font-extrabold text-start min-w-[160px] rounded-tl-2xl border-b border-neutral-800">
                العنصر / المقارنة
              </th>
              {comparedProps.map((prop) => (
                <th key={prop.id} className="p-4 bg-neutral-950 text-white font-extrabold text-start min-w-[220px] border-b border-neutral-800">
                  <div className="space-y-2">
                    <img
                      src={prop.images[0]}
                      alt={prop.titleAr}
                      referrerPolicy="no-referrer"
                      className="w-full h-28 rounded-xl object-cover border border-neutral-800"
                    />
                    <span className="block font-bold text-sm line-clamp-1">{prop.titleAr}</span>
                    <button
                      onClick={() => toggleCompare(prop.id)}
                      className="text-[10px] text-red-400 hover:underline block"
                    >
                      إزالة من المقارنة
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {/* Price */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">السعر المطلوبة</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 font-black text-amber-400 text-base">
                  {p.priceSAR.toLocaleString()} ر.س
                </td>
              ))}
            </tr>

            {/* City & District */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">المدينة والحي</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 text-white font-semibold">
                  {p.location.city} - {p.location.district}
                </td>
              ))}
            </tr>

            {/* Area */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">المساحة الإجمالية</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 text-white font-semibold">
                  {p.areaSqm} م²
                </td>
              ))}
            </tr>

            {/* Property Type */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">نوع العقار</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 text-amber-400 font-bold uppercase">
                  {p.type}
                </td>
              ))}
            </tr>

            {/* Bedrooms & Bathrooms */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">المواصفات (غرف/حمام)</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 text-neutral-200 font-semibold">
                  {p.bedrooms} غرف | {p.bathrooms} حمامات
                </td>
              ))}
            </tr>

            {/* Expected ROI */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">العائد الاستثماري التقديري</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 font-extrabold text-emerald-400">
                  {p.expectedRoiPercent ? `${p.expectedRoiPercent}% سنوياً` : 'عقار سكني'}
                </td>
              ))}
            </tr>

            {/* Finishing */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">جودة التشطيب</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4 text-neutral-300 font-semibold">
                  {p.finishing}
                </td>
              ))}
            </tr>

            {/* Action Buttons Row */}
            <tr>
              <td className="p-4 font-bold text-neutral-400 bg-neutral-950/50">استكشاف كامل</td>
              {comparedProps.map((p) => (
                <td key={p.id} className="p-4">
                  <button
                    onClick={() => openPropertyDetail(p)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض التفاصيل</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
