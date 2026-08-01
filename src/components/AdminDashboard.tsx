import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property, Project } from '../types';
import { 
  ShieldAlert, Building2, Layers, Users, Bell, FileText, 
  Plus, Trash2, Edit3, CheckCircle2, TrendingUp, BarChart3, Send, ShieldCheck 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, setProperties, projects, setProjects, 
    appointments, addNotification, language, t 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'properties' | 'projects' | 'appointments' | 'notifications' | 'analytics'>('properties');

  // Add Property Modal state
  const [isAddPropModalOpen, setIsAddPropModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(2500000);
  const [newCity, setNewCity] = useState('الرياض');
  const [newDistrict, setNewDistrict] = useState('حطين');
  const [newType, setNewType] = useState('villa');

  // Push Notification state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifSentMsg, setNotifSentMsg] = useState('');

  const handleDeleteProperty = (id: string) => {
    if (confirm('هل أنت أخير بمحو هذا العقار من النظام؟')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      titleAr: newTitle,
      titleEn: newTitle,
      descriptionAr: 'عقار تطويري حديث بمواصفات فاخرة صمم بواسطة ماجا العقارية.',
      descriptionEn: 'Modern luxury property by MAGA Real Estate.',
      category: 'buy',
      type: newType as any,
      priceSAR: newPrice,
      areaSqm: 450,
      bedrooms: 4,
      bathrooms: 5,
      livingRooms: 2,
      parkingSpaces: 2,
      ageYears: 0,
      finishing: 'super_deluxe',
      statusAr: 'متاح',
      statusEn: 'Available',
      featured: true,
      isSpecialOffer: false,
      location: {
        city: newCity,
        district: newDistrict,
        addressAr: `${newCity} - ${newDistrict}`,
        addressEn: `${newCity} - ${newDistrict}`,
        lat: 24.78,
        lng: 46.61
      },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      ],
      featuresAr: ['نظام سمارت هوم', 'تكييف مخفي', 'مواقف خاصة'],
      featuresEn: ['Smart Home', 'Central AC', 'Private Parking'],
      nearbyServices: [],
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1
    };

    setProperties(prev => [newProp, ...prev]);
    setIsAddPropModalOpen(false);
    setNewTitle('');
    alert('تم إضافة العقار الجديد بنجاح في النظام!');
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMsg) return;

    addNotification({
      titleAr: notifTitle,
      titleEn: notifTitle,
      messageAr: notifMsg,
      messageEn: notifMsg,
      type: 'system'
    });

    setNotifSentMsg('تم إرسال الإشعار الفوري بكفاءة لكافة مستخدمي التطبيق!');
    setNotifTitle('');
    setNotifMsg('');
    setTimeout(() => setNotifSentMsg(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-black border border-amber-500/30 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-black rounded-2xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">لوحة تحكم الإدارة العليا (Admin)</h2>
            <p className="text-xs text-neutral-400">إدارة العقارات، المشاريع، طلبات المواعيد والإشعارات الفورية</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>نظام إداري مشفر ومحمي</span>
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        {[
          { id: 'properties', label: `إدارة العقارات (${properties.length})` },
          { id: 'projects', label: `إدارة المشاريع (${projects.length})` },
          { id: 'appointments', label: `طلبات المواعيد (${appointments.length})` },
          { id: 'notifications', label: 'مركز الإشعارات الفورية' },
          { id: 'analytics', label: 'الإحصائيات والتقارير' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              adminTab === tab.id
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Manage Properties Tab */}
      {adminTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black">جميع العقارات المسجلة بالمنظومة</h3>
            <button
              onClick={() => setIsAddPropModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عقار جديد</span>
            </button>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs sm:text-sm">
                <thead className="bg-neutral-950 text-amber-400 border-b border-neutral-800">
                  <tr>
                    <th className="p-4 text-start">العقار</th>
                    <th className="p-4 text-start">المدينة والحي</th>
                    <th className="p-4 text-start">السعر</th>
                    <th className="p-4 text-start">الحالة</th>
                    <th className="p-4 text-start">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-850">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <img src={p.images[0]} alt="img" className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <span>{p.titleAr}</span>
                          <span className="block text-[10px] text-neutral-500 uppercase">{p.type}</span>
                        </div>
                      </td>
                      <td className="p-4 text-neutral-300">{p.location.city} - {p.location.district}</td>
                      <td className="p-4 text-amber-400 font-bold">{p.priceSAR.toLocaleString()} ر.س</td>
                      <td className="p-4">
                        <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-bold">
                          {p.statusAr}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteProperty(p.id)}
                          className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                          title="حذف العقار"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Manage Projects Tab */}
      {adminTab === 'projects' && (
        <div className="space-y-6">
          <h3 className="text-xl font-black">إدارة نسب الإنجاز للمشاريع</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-base text-white">{proj.nameAr}</h4>
                  <span className="text-amber-400 font-black text-sm">{proj.progressPercent}%</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-bold block">تحديث نسبة الإنجاز:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proj.progressPercent}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setProjects(prev => prev.map(p => p.id === proj.id ? { ...p, progressPercent: val } : p));
                    }}
                    className="w-full accent-amber-500 bg-neutral-950"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Appointments Tab */}
      {adminTab === 'appointments' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-black">طلبات معاينة المواعيد من العملاء</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead className="bg-neutral-950 text-amber-400 border-b border-neutral-800">
                <tr>
                  <th className="p-3 text-start">اسم العميل</th>
                  <th className="p-3 text-start">رقم الجوال</th>
                  <th className="p-3 text-start">العقار المطلوب</th>
                  <th className="p-3 text-start">تاريخ الموعد</th>
                  <th className="p-3 text-start">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-neutral-850">
                    <td className="p-3 font-bold text-white">{apt.clientName}</td>
                    <td className="p-3 text-amber-400 font-bold">{apt.clientPhone}</td>
                    <td className="p-3 text-neutral-300">{apt.propertyTitleAr}</td>
                    <td className="p-3 text-neutral-300">{apt.preferredDate} ({apt.preferredTime})</td>
                    <td className="p-3">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        مؤكد
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Notifications Sender Tab */}
      {adminTab === 'notifications' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto space-y-6">
          <h3 className="text-xl font-black text-amber-400 text-center">إرسال إشعار فورى للعملاء (Push Notification)</h3>

          {notifSentMsg && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold text-center">
              {notifSentMsg}
            </div>
          )}

          <form onSubmit={handleSendNotification} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-bold mb-1">عنوان الإشعار *</label>
              <input
                type="text"
                required
                placeholder="مثال: إطلاق فلل ماجا رويال حطين"
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-bold mb-1">نص الرسالة *</label>
              <textarea
                required
                rows={3}
                placeholder="تفاصيل العرض الخاص أو الإشعار..."
                value={notifMsg}
                onChange={(e) => setNotifMsg(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الإشعار الآن</span>
            </button>
          </form>
        </div>
      )}

      {/* 5. Analytics Tab */}
      {adminTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl text-center space-y-2">
            <span className="text-xs font-bold text-neutral-400">إجمالي المشاهدات للعقارات</span>
            <span className="text-3xl font-black text-amber-400 block">24,850</span>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl text-center space-y-2">
            <span className="text-xs font-bold text-neutral-400">طلبات المعاينة هذا الشهر</span>
            <span className="text-3xl font-black text-amber-400 block">142</span>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl text-center space-y-2">
            <span className="text-xs font-bold text-neutral-400">نسبة تحويل الاستفسارات لصفقات</span>
            <span className="text-3xl font-black text-emerald-400 block">34.8%</span>
          </div>
        </div>
      )}

      {/* Modal Add Property */}
      {isAddPropModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">إضافة عقار جديد</h3>

            <form onSubmit={handleAddPropertySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">اسم العقار *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">السعر (ر.س) *</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-300 mb-1">المدينة</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">الحي</label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs"
                >
                  حفظ ونشر
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddPropModalOpen(false)}
                  className="px-4 bg-neutral-800 text-neutral-300 rounded-xl text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
