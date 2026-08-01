import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Building2, ShieldCheck, ArrowUp, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, setActiveTab, quickCategoryFilter } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background Subtle Gold Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info Column */}
          <div className="space-y-6">
            <Logo size="lg" />

            <p className="text-xs text-gray-400 leading-relaxed font-light">
              شركة تطوير واستثمار عقاري سعودية رائدة، تبتكر المجتمعات والوحدات السكنية والتجارية الاستثمارية الفاخرة المعتمدة بجميع مناطق المملكة.
            </p>

            {/* Vision 2030 Badge */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <ShieldCheck className="w-6 h-6 text-[#C5A059] flex-shrink-0" />
              <div className="text-[11px]">
                <span className="font-bold text-white block">مرخص من الهيئة العامة للعقار</span>
                <span className="text-gray-400 font-light">شريك معتمد في تحقيق رؤية السعودية 2030</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] border-b border-white/10 pb-2">
              الأقسام والخدمات
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button onClick={() => quickCategoryFilter('buy')} className="hover:text-[#C5A059] transition-colors">
                  {t.buy} - عقارات سكنية وتجارية للبيع
                </button>
              </li>
              <li>
                <button onClick={() => quickCategoryFilter('rent')} className="hover:text-[#C5A059] transition-colors">
                  {t.rent} - شقق وفلل للإيجار
                </button>
              </li>
              <li>
                <button onClick={() => quickCategoryFilter('projects')} className="hover:text-[#C5A059] transition-colors">
                  {t.projects} - مشاريع التطوير الكبرى
                </button>
              </li>
              <li>
                <button onClick={() => quickCategoryFilter('invest')} className="hover:text-[#C5A059] transition-colors">
                  {t.investment} - فرص وعوائد المزاد والاستثمار
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-[#C5A059] transition-colors">
                  {t.calculators} - حاسبة التمويل والأقساط
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Cities */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] border-b border-white/10 pb-2">
              المدن والأقاليم
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>الرياض (حطين، الملقا، الياسمين)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>جدة (الشاطئ، أبحر الشمالية)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>الخبر والدمام (الراكة، الحزام الذهبي)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>المجمعة وكافة محافظات الرياض</span>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] border-b border-white/10 pb-2">
              التواصل المباشر
            </h4>
            <div className="space-y-3 text-xs font-medium">
              <a
                href="tel:+966554999928"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:border-[#C5A059] transition-all text-white"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>+966 55 499 9928</span>
              </a>

              <a
                href="mailto:magaksa2030@gmail.com"
                className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:border-[#C5A059] transition-all text-white"
              >
                <Mail className="w-4 h-4 text-[#C5A059]" />
                <span>magaksa2030@gmail.com</span>
              </a>

              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>المملكة العربية السعودية - الرياض</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} ماجا العقارية (MAGA Real Estate). جميع الحقوق محفوظة.
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-2"
          >
            <span>{t.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
