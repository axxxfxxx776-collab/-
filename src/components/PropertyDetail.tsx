import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Heart, Scale, Share2, MapPin, BedDouble, Bath, Maximize2, 
  Car, Calendar, ShieldCheck, Play, Video, Eye, Compass, 
  PhoneCall, MessageSquare, CheckCircle2, Calculator, ArrowRight, Building
} from 'lucide-react';

export const PropertyDetail: React.FC = () => {
  const { 
    selectedProperty, setSelectedProperty, language, t, 
    favorites, toggleFavorite, comparisonList, toggleCompare, 
    setActiveTab, addAppointment 
  } = useApp();

  const [activeImage, setActiveImage] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'video' | '360' | 'map' | 'payment' | 'calculator'>('overview');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Appointment form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('17:00');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  // Built-in mortgage calculator state for this property
  const propertyPrice = selectedProperty?.priceSAR || 2000000;
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanYears, setLoanYears] = useState(20);
  const [profitRate, setProfitRate] = useState(4.5);

  if (!selectedProperty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <p className="text-xl font-bold mb-4">لم يتم اختيار عقار لمشاهدة التفاصيل</p>
        <button 
          onClick={() => setActiveTab('properties')}
          className="bg-amber-500 text-black px-6 py-2.5 rounded-xl font-bold"
        >
          تصفح العقارات
        </button>
      </div>
    );
  }

  const prop = selectedProperty;
  const isFav = favorites.includes(prop.id);
  const isCompared = comparisonList.includes(prop.id);

  // Mortgage calculations
  const downPaymentVal = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentVal;
  const totalMonths = loanYears * 12;
  const monthlyRate = profitRate / 100 / 12;
  const monthlyInstallment = loanAmount > 0 
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : 0;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('الرجاء إدخال اسم العميل ورقم الجوال للتواصل.');
      return;
    }

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: prop.id,
          propertyTitleAr: prop.titleAr,
          clientName,
          clientPhone,
          clientEmail,
          preferredDate,
          preferredTime,
        })
      });

      addAppointment({
        propertyId: prop.id,
        propertyTitleAr: prop.titleAr,
        clientName,
        clientPhone,
        clientEmail,
        preferredDate,
        preferredTime,
      });

      setBookingSuccessMsg('تم تأكيد طلب معاينة العقار بنجاح! سيتواصل معك مستشار المبيعات قريباً.');
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccessMsg('');
      }, 3000);
    } catch (err) {
      setBookingSuccessMsg('تم حفظ الطلب بنجاح. سنقوم بالتواصل معك.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Back Button & Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <button
          onClick={() => setActiveTab('properties')}
          className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-bold bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة العقارات</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCompare(prop.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isCompared ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'تمت الإضافة للمقارنة' : 'مقارنة'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(prop.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isFav ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            <span>{isFav ? 'في المفضلة' : 'حفظ'}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Price Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-neutral-900/90 border border-neutral-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
            <MapPin className="w-4 h-4" />
            <span>{prop.location.city} - {prop.location.district} ({prop.location.addressAr})</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
            {language === 'ar' ? prop.titleAr : prop.titleEn}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-400">
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
              {prop.type.toUpperCase()}
            </span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full text-white">
              {prop.statusAr}
            </span>
            {prop.developerAr && (
              <span className="bg-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                المطور: {prop.developerAr}
              </span>
            )}
          </div>
        </div>

        <div className="text-start md:text-end border-t md:border-t-0 md:border-s border-neutral-800 pt-4 md:pt-0 md:ps-6">
          <span className="text-xs text-neutral-400 font-bold block mb-1">السعر المطلوب:</span>
          <span className="text-3xl sm:text-4xl font-black text-amber-400">
            {prop.priceSAR.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-neutral-300 ms-2">{t.sar}</span>
        </div>
      </div>

      {/* Photo Gallery & Thumbnails */}
      <div className="space-y-4">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800">
          <img
            src={prop.images[activeImage]}
            alt={prop.titleAr}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Thumbnails Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {prop.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all ${
                activeImage === idx ? 'border-amber-500 scale-105 shadow-lg shadow-amber-500/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>

      {/* View Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto pb-3 no-scrollbar">
        {[
          { id: 'overview', label: 'تفاصيل العقار والمميزات' },
          { id: 'video', label: 'فيديو الجولة' },
          { id: '360', label: 'جولة 360° الافتراضية' },
          { id: 'payment', label: 'خطة ودفعات السداد' },
          { id: 'calculator', label: 'حاسبة التمويل' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveDetailTab(tab.id as any)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeDetailTab === tab.id 
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      {activeDetailTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs Summary Grid */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col items-center text-center">
                <Maximize2 className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-xs text-neutral-400 font-bold mb-1">المساحة</span>
                <span className="text-lg font-black text-white">{prop.areaSqm} م²</span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col items-center text-center">
                <BedDouble className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-xs text-neutral-400 font-bold mb-1">غرف النوم</span>
                <span className="text-lg font-black text-white">{prop.bedrooms} غرف</span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col items-center text-center">
                <Bath className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-xs text-neutral-400 font-bold mb-1">دورات المياه</span>
                <span className="text-lg font-black text-white">{prop.bathrooms} حمامات</span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col items-center text-center">
                <Car className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-xs text-neutral-400 font-bold mb-1">المواقف</span>
                <span className="text-lg font-black text-white">{prop.parkingSpaces} سيارات</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-black text-white">وصف العقار</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {language === 'ar' ? prop.descriptionAr : prop.descriptionEn}
              </p>
            </div>

            {/* Features List */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-black text-white">مميزات العقار والتجهيزات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {prop.featuresAr.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Amenities */}
            {prop.nearbyServices && prop.nearbyServices.length > 0 && (
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-black text-white">المرافق والخدمات القريبة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prop.nearbyServices.map((serv, i) => (
                    <div key={i} className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{serv.nameAr}</span>
                      <span className="text-amber-400 font-bold">{serv.distanceKm} كم</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA Box */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-neutral-900 to-black border border-amber-500/30 p-6 rounded-3xl space-y-6 shadow-xl sticky top-28">
              <h3 className="text-xl font-black text-white text-center">مهتم بهذا العقار؟</h3>

              <div className="space-y-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Calendar className="w-5 h-5" />
                  <span>طلب معاينة / حجز موعد</span>
                </button>

                <a
                  href={`https://wa.me/966554999928?text=${encodeURIComponent(`السلام عليكم، يرجي التواصل بخصوص عقار: ${prop.titleAr}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>محادثة الواتساب المباشر</span>
                </a>

                <a
                  href="tel:+966554999928"
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all border border-neutral-700"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>الاتصال بمستشار المبيعات</span>
                </a>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>عقار مرخص ومعتمد من الهيئة العامة للعقار</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-400" />
                  <span>معاينة مجانية وشاملة مع المستشار العقاري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Tab */}
      {activeDetailTab === 'video' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
          <h3 className="text-xl font-black mb-4">الجولة المرئية بالفيديو</h3>
          <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800">
            <iframe
              src={prop.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              title="Property Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 360 Virtual Tour Tab */}
      {activeDetailTab === '360' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl text-center space-y-4">
          <h3 className="text-xl font-black">الجولة التفاعلية 360 درجة</h3>
          <p className="text-xs text-neutral-400">تنقل في أرجاء العقار واكتشف كافة زوايا التشطيب والأبعاد</p>
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-amber-500/30 flex flex-col items-center justify-center p-8">
            <Compass className="w-16 h-16 text-amber-400 animate-spin mb-4" />
            <span className="text-sm font-bold text-neutral-200">وضع الجولة الافتراضية نشط</span>
            <p className="text-xs text-neutral-400 max-w-md mt-2">
              يمكنك التوجيه بالماوس أو اللمس لاستكشاف المجالس، الصالات، والحدائق بنمط 360° الكروي.
            </p>
          </div>
        </div>
      )}

      {/* Payment Plan Tab */}
      {activeDetailTab === 'payment' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-xl font-black">خطة ودفعات السداد المتاحة</h3>
          {prop.paymentPlan ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">الدفعة الأولى المطلوبة</span>
                <span className="text-2xl font-black text-amber-400">
                  {prop.paymentPlan.downPaymentPercent}% ({((prop.priceSAR * prop.paymentPlan.downPaymentPercent) / 100).toLocaleString()} ر.س)
                </span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">القسط الشهري التقريبي</span>
                <span className="text-2xl font-black text-amber-400">
                  {prop.paymentPlan.monthlyInstallmentSAR.toLocaleString()} ر.س
                </span>
              </div>

              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">مدة السداد</span>
                <span className="text-2xl font-black text-amber-400">
                  {prop.paymentPlan.durationYears} سنة
                </span>
              </div>
            </div>
          ) : (
            <p className="text-neutral-400 text-sm">تواصل مع فريق ماجا لحساب خطة سداد مخصصة تناسب دخلك التمويلي.</p>
          )}
        </div>
      )}

      {/* Built-in Mortgage Calculator Tab */}
      {activeDetailTab === 'calculator' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-black">حاسبة التمويل العقاري المباشرة للعقار</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  سعر العقار: {propertyPrice.toLocaleString()} ر.س
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  الدفعة الأولى ({downPaymentPercent}%): {downPaymentVal.toLocaleString()} ر.س
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-950"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  مدة التمويل بالسنوات: {loanYears} سنة
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-950"
                />
              </div>
            </div>

            <div className="p-6 bg-black rounded-2xl border border-amber-500/30 flex flex-col justify-center text-center space-y-4">
              <span className="text-xs text-neutral-400 font-bold uppercase">القسط الشهري التقديري</span>
              <span className="text-4xl font-black text-amber-400">
                {monthlyInstallment.toLocaleString()} ر.س
              </span>
              <span className="text-xs text-neutral-500">
                حساب تقديري يستند إلى نسبة أرباح {profitRate}% ومدة {loanYears} سنة
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-black text-white">حجز موعد معاينة العقار</h3>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            {bookingSuccessMsg ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-center text-sm font-bold">
                {bookingSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">اسمك الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبدالله السلمان"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-bold mb-1">التاريخ المفضل</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-bold mb-1">الوقت المفضل</label>
                    <input
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-black font-extrabold py-3.5 rounded-xl text-sm"
                >
                  تأكيد حجز الموعد
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
