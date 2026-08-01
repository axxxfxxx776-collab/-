import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, MapPin, Calendar, CheckCircle2, ArrowRight, 
  MessageSquare, PhoneCall, Layers, Eye 
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { selectedProject, language, t, setActiveTab } = useApp();
  const [activeTab, setActiveTabMode] = useState<'overview' | 'masterplan' | 'units' | 'gallery'>('overview');

  if (!selectedProject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <p className="text-xl font-bold mb-4">لم يتم اختيار مشروع لمشاهدة التفاصيل</p>
        <button 
          onClick={() => setActiveTab('projects')}
          className="bg-amber-500 text-black px-6 py-2.5 rounded-xl font-bold"
        >
          تصفح المشاريع
        </button>
      </div>
    );
  }

  const proj = selectedProject;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('projects')}
        className="flex items-center gap-2 text-sm text-amber-400 font-bold bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة لكافة المشاريع</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-black border border-neutral-800">
        <img
          src={proj.heroImage}
          alt={proj.nameAr}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-6 inset-x-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="bg-amber-500 text-black font-extrabold text-xs px-3 py-1 rounded-full mb-3 inline-block">
              {proj.statusLabelAr}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-2">
              {language === 'ar' ? proj.nameAr : proj.nameEn}
            </h1>
            <p className="text-amber-300 text-sm font-semibold">
              {language === 'ar' ? proj.taglineAr : proj.taglineEn}
            </p>
          </div>

          <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-amber-500/30 text-end">
            <span className="text-xs text-neutral-400 font-bold block mb-1">الأسعار تبدأ من:</span>
            <span className="text-2xl font-black text-amber-400">
              {proj.startingPriceSAR.toLocaleString()} ر.س
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        {[
          { id: 'overview', label: 'نظرة عامة ومراحل الإنجاز' },
          { id: 'masterplan', label: 'المخطط العام' },
          { id: 'units', label: 'الوحدات المتاحة والأسعار' },
          { id: 'gallery', label: 'معرض الصور' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabMode(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-black shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Execution Progress */}
            {proj.status === 'current' && (
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-white">نسبة الإنجاز ومراحل التنفيذ</h3>
                  <span className="text-2xl font-black text-amber-400">{proj.progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-400">
                  سنة التسليم المستهدفة: <strong className="text-white">{proj.deliveryYear}</strong> | الإنجاز يسير وفق الجدول الزمني المعتمد.
                </p>
              </div>
            )}

            {/* Description */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-black text-white">تفاصيل المشروع</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {language === 'ar' ? proj.descriptionAr : proj.descriptionEn}
              </p>
            </div>

            {/* Project Features */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-black text-white">مميزات المشروع الكبرى</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proj.featuresAr.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-amber-500/30 p-6 rounded-3xl space-y-4">
              <h3 className="text-xl font-black text-white text-center">حجز وحدة بالمشروع</h3>
              <p className="text-xs text-neutral-400 text-center">تواصل مباشرة مع استشاري مبيعات مشروع {proj.nameAr}</p>

              <a
                href={`https://wa.me/966554999928?text=${encodeURIComponent(`السلام عليكم، يرجي حجز موعد استفسار لمشروع: ${proj.nameAr}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>واتساب المبيعات الحصري</span>
              </a>

              <a
                href="tel:+966554999928"
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all border border-neutral-700"
              >
                <PhoneCall className="w-5 h-5" />
                <span>اتصال المبيعات المباشر</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Master Plan Tab */}
      {activeTab === 'masterplan' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-xl font-black text-white">{t.masterPlan}</h3>
          <div className="rounded-2xl overflow-hidden bg-black border border-neutral-800 max-h-[600px] flex justify-center">
            <img src={proj.masterPlanImage} alt="Master Plan" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}

      {/* Units Table Tab */}
      {activeTab === 'units' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-xl font-black text-white">جدول الوحدات والأسعار التقديرية</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead className="bg-neutral-950 text-amber-400 border-b border-neutral-800">
                <tr>
                  <th className="p-3 text-start">نوع الوحدة</th>
                  <th className="p-3 text-start">نطاق المساحة</th>
                  <th className="p-3 text-start">نطاق الأسعار</th>
                  <th className="p-3 text-start">الوحدات المتاحة</th>
                  <th className="p-3 text-start">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {proj.units.map((unit, idx) => (
                  <tr key={idx} className="hover:bg-neutral-850">
                    <td className="p-3 font-bold text-white uppercase">{unit.type}</td>
                    <td className="p-3 text-neutral-300">{unit.areaRangeSqm} م²</td>
                    <td className="p-3 text-amber-400 font-bold">{unit.priceRangeSAR} ر.س</td>
                    <td className="p-3 text-emerald-400 font-bold">{unit.availableCount} وحدة</td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/966554999928?text=${encodeURIComponent(`أستفسر عن وحدة ${unit.type} بمشروع ${proj.nameAr}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-amber-500 text-black font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        طلب حجز
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-xl font-black text-white">معرض صور المشروع</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {proj.gallery.map((img, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-neutral-800">
                <img src={img} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
