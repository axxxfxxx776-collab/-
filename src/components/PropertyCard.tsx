import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Heart, Scale, MapPin, BedDouble, Bath, Maximize2, 
  TrendingUp, PhoneCall, MessageSquare, ChevronRight, ChevronLeft, Eye 
} from 'lucide-react';

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const { 
    language, t, favorites, toggleFavorite, 
    comparisonList, toggleCompare, openPropertyDetail, setIsChatOpen 
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const isFav = favorites.includes(property.id);
  const isCompared = comparisonList.includes(property.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div 
      onClick={() => openPropertyDetail(property)}
      className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#C5A059]/60 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#C5A059]/10"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={property.images[activeImgIndex] || property.images[0]}
          alt={language === 'ar' ? property.titleAr : property.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {property.featured && (
              <span className="bg-[#C5A059] text-black font-bold text-[11px] px-3 py-1 rounded-full shadow-md">
                عقار مميز
              </span>
            )}
            {property.isSpecialOffer && (
              <span className="bg-red-600 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-md">
                عرض خاص
              </span>
            )}
            <span className="bg-black/70 backdrop-blur-md text-gray-200 text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
              {property.statusAr}
            </span>
          </div>

          {/* Quick Actions (Fav + Compare) */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isCompared 
                  ? 'bg-[#C5A059] text-black font-bold' 
                  : 'bg-black/60 text-white hover:text-[#C5A059]'
              }`}
              title="مقارنة"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFav 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/60 text-white hover:text-red-400'
              }`}
              title="المفضلة"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Controls if multiple */}
        {property.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#C5A059] hover:text-black transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#C5A059] hover:text-black transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Expected ROI Tag */}
        {property.expectedRoiPercent && (
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-[#C5A059]/40 px-3 py-1 rounded-full flex items-center gap-1.5 text-[#C5A059] text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>عائد متوقع: {property.expectedRoiPercent}%</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-[#C5A059] text-xs font-bold tracking-[0.1em] uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.location.city} - {property.location.district}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white group-hover:text-[#C5A059] transition-colors line-clamp-1 mb-2">
            {language === 'ar' ? property.titleAr : property.titleEn}
          </h3>

          {/* Description Excerpt */}
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {language === 'ar' ? property.descriptionAr : property.descriptionEn}
          </p>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-gray-300 text-xs font-medium mb-4">
            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{property.areaSqm} م²</span>
            </div>
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 justify-center border-x border-white/10">
                <BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.bedrooms} غرف</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5 justify-center">
                <Bath className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{property.bathrooms} حمام</span>
              </div>
            )}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-gray-400 font-medium">{t.price}:</span>
            <div className="text-end">
              <span className="text-xl font-bold text-[#C5A059]">
                {property.priceSAR.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-semibold ms-1">
                {t.sar} {property.rentPeriod ? `/ ${property.rentPeriod}` : ''}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openPropertyDetail(property);
              }}
              className="w-full bg-white/10 hover:bg-[#C5A059] hover:text-black border border-white/10 text-white font-bold py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.viewDetails}</span>
            </button>

            <a
              href={`https://wa.me/966554999928?text=${encodeURIComponent(`السلام عليكم، أستفسر عن العقار: ${property.titleAr} بسعر ${property.priceSAR} ريال`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#C5A059] hover:bg-[#d4b574] text-black font-bold py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.whatsappUs}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
