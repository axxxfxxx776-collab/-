import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, ShieldCheck } from 'lucide-react';

export const Calculators: React.FC = () => {
  const { language, t } = useApp();
  const [activeCalc, setActiveCalc] = useState<'mortgage' | 'installments' | 'investment' | 'roi'>('mortgage');

  // 1. Mortgage Calculator State
  const [propertyVal, setPropertyVal] = useState<number>(3000000);
  const [downPercent, setDownPercent] = useState<number>(15);
  const [years, setYears] = useState<number>(20);
  const [profitRate, setProfitRate] = useState<number>(4.2);

  const downVal = (propertyVal * downPercent) / 100;
  const loanVal = propertyVal - downVal;
  const mRate = profitRate / 100 / 12;
  const totalMonths = years * 12;
  const mortgageMonthly = loanVal > 0 
    ? Math.round((loanVal * mRate * Math.pow(1 + mRate, totalMonths)) / (Math.pow(1 + mRate, totalMonths) - 1))
    : 0;

  // 2. Installments Calculator State
  const [salarySAR, setSalarySAR] = useState<number>(25000);
  const [deductionPercent, setDeductionPercent] = useState<number>(50); // Max 65% in KSA
  const maxMonthlyAllowed = Math.round((salarySAR * deductionPercent) / 100);
  const maxLoanEstimate = Math.round(maxMonthlyAllowed * 12 * 20 * 0.75);

  // 3. Investment & ROI Calculator State
  const [purchasePrice, setPurchasePrice] = useState<number>(5000000);
  const [expectedRentYearly, setExpectedRentYearly] = useState<number>(420000);
  const [maintenanceCostYearly, setMaintenanceCostYearly] = useState<number>(30000);
  const netRentYearly = expectedRentYearly - maintenanceCostYearly;
  const grossRoi = ((expectedRentYearly / purchasePrice) * 100).toFixed(2);
  const netRoi = ((netRentYearly / purchasePrice) * 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-2">
          <Calculator className="w-4 h-4" />
          <span>حاسبات ماجا المالية والعقارية الذكية</span>
        </div>
        <h2 className="text-3xl font-black text-white">{t.calculators}</h2>
        <p className="text-xs text-neutral-400 mt-1">حاسبات استرشادية دقيقة لتقدير القروض، الأقساط، والعوائد الاستثمارية</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        {[
          { id: 'mortgage', label: '1. حاسبة التمويل العقاري' },
          { id: 'installments', label: '2. حاسبة الأقساط والاستحقاق' },
          { id: 'investment', label: '3. حاسبة النمو والاستثمار' },
          { id: 'roi', label: '4. حاسبة العائد السنوي (ROI %)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCalc(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeCalc === tab.id
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Mortgage Calculator View */}
      {activeCalc === 'mortgage' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-amber-400">بيانات التمويل العقاري</h3>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                قيمة العقار المطلوبة: <span className="text-amber-400">{propertyVal.toLocaleString()} ر.س</span>
              </label>
              <input
                type="range"
                min="500000"
                max="25000000"
                step="250000"
                value={propertyVal}
                onChange={(e) => setPropertyVal(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                الدفعة الأولى ({downPercent}%): <span className="text-amber-400">{downVal.toLocaleString()} ر.س</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                مدة التمويل بالسنوات: <span className="text-amber-400">{years} سنة</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                هامش الربح السنوي التقديري: <span className="text-amber-400">{profitRate}%</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={profitRate}
                onChange={(e) => setProfitRate(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
          </div>

          <div className="p-6 bg-black rounded-3xl border border-amber-500/40 flex flex-col justify-between space-y-6 text-center">
            <div>
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider block mb-2">
                القسط الشهري المتوقع
              </span>
              <span className="text-4xl sm:text-5xl font-black text-amber-400">
                {mortgageMonthly.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-neutral-400 ms-2">ر.س / شهرياً</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold border-t border-neutral-800 pt-4">
              <div className="p-3 bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block mb-1">مبلغ التمويل الإجمالي</span>
                <span className="text-amber-400 font-black">{loanVal.toLocaleString()} ر.س</span>
              </div>
              <div className="p-3 bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block mb-1">إجمالي الدفعات المقدرة</span>
                <span className="text-amber-400 font-black">{(mortgageMonthly * totalMonths + downVal).toLocaleString()} ر.س</span>
              </div>
            </div>

            <a
              href={`https://wa.me/966554999928?text=${encodeURIComponent(`السلام عليكم، أود التقديم على تمويل عقاري بقيمة ${propertyVal} ريال وقسط شهري حدود ${mortgageMonthly} ريال`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-2xl text-sm"
            >
              طلب استشارة التمويل من مستشار ماجا
            </a>
          </div>
        </div>
      )}

      {/* 2. Installments Calculator */}
      {activeCalc === 'installments' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-black text-amber-400">حاسبة الاستحقاق الشهري حسب الراتب</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                صافي الراتب الشهري (ريال):
              </label>
              <input
                type="number"
                value={salarySAR}
                onChange={(e) => setSalarySAR(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                نسبة الاستقطاع المسموحة ({deductionPercent}%):
              </label>
              <input
                type="range"
                min="20"
                max="65"
                step="5"
                value={deductionPercent}
                onChange={(e) => setDeductionPercent(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-black rounded-2xl border border-neutral-800 text-center">
            <div>
              <span className="text-xs text-neutral-400 block mb-1">أقصى قسط شهري مسموح</span>
              <span className="text-3xl font-black text-amber-400">{maxMonthlyAllowed.toLocaleString()} ر.س</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block mb-1">قدرة القروض العقارية التقديرية</span>
              <span className="text-3xl font-black text-emerald-400">{maxLoanEstimate.toLocaleString()} ر.س</span>
            </div>
          </div>
        </div>
      )}

      {/* 3 & 4 ROI & Investment Calculators */}
      {(activeCalc === 'investment' || activeCalc === 'roi') && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-black text-amber-400">حاسبة العائد الاستثماري السنوي (ROI %)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">سعر شراء العقار (ر.س):</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">الإيجار السنوي المتوقع (ر.س):</label>
              <input
                type="number"
                value={expectedRentYearly}
                onChange={(e) => setExpectedRentYearly(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">المصاريف والصيانة السنوية (ر.س):</label>
              <input
                type="number"
                value={maintenanceCostYearly}
                onChange={(e) => setMaintenanceCostYearly(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-black rounded-2xl border border-amber-500/30 text-center">
            <div>
              <span className="text-xs text-neutral-400 block mb-1">العائد الإجمالي السنوي (Gross ROI)</span>
              <span className="text-4xl font-black text-amber-400">{grossRoi}%</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block mb-1">العائد الصافي السنوي (Net ROI)</span>
              <span className="text-4xl font-black text-emerald-400">{netRoi}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
