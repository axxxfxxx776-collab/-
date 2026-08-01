export type Language = 'ar' | 'en';

export type PropertyType = 
  | 'villa' 
  | 'apartment' 
  | 'floor' 
  | 'land' 
  | 'building' 
  | 'penthouse' 
  | 'duplex' 
  | 'commercial';

export type PropertyCategory = 'buy' | 'rent' | 'invest' | 'auction';

export type FinishingType = 'luxury' | 'super_deluxe' | 'deluxe' | 'core_and_shell';

export interface Location {
  city: string;
  district: string;
  addressAr: string;
  addressEn: string;
  lat: number;
  lng: number;
}

export interface PaymentPlan {
  downPaymentPercent: number;
  monthlyInstallmentSAR: number;
  durationYears: number;
  balloonPaymentPercent?: number;
  handoverDate?: string;
}

export interface NearbyService {
  nameAr: string;
  nameEn: string;
  distanceKm: number;
  type: 'mosque' | 'school' | 'hospital' | 'mall' | 'airport' | 'park';
}

export interface Property {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: PropertyCategory;
  type: PropertyType;
  priceSAR: number;
  originalPriceSAR?: number;
  rentPeriod?: 'monthly' | 'yearly';
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  parkingSpaces: number;
  floorsCount?: number;
  ageYears: number;
  finishing: FinishingType;
  statusAr: 'متاح' | 'حجز مبدئي' | 'تم البيع' | 'قيد الإنشاء' | 'فرصة استثمارية';
  statusEn: 'Available' | 'Reserved' | 'Sold' | 'Under Construction' | 'Investment Deal';
  featured: boolean;
  isSpecialOffer: boolean;
  expectedRoiPercent?: number;
  location: Location;
  images: string[];
  videoUrl?: string;
  virtualTour360Url?: string;
  featuresAr: string[];
  featuresEn: string[];
  nearbyServices: NearbyService[];
  paymentPlan?: PaymentPlan;
  projectId?: string;
  projectNameAr?: string;
  developerAr?: string;
  createdAt: string;
  viewsCount: number;
}

export interface Project {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  status: 'current' | 'upcoming' | 'completed';
  statusLabelAr: 'قيد التنفيذ' | 'قادمة قريباً' | 'مكتمل ومسلم';
  progressPercent: number;
  location: Location;
  masterPlanImage: string;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  deliveryYear: number;
  totalUnitsCount: number;
  availableUnitsCount: number;
  startingPriceSAR: number;
  developerNameAr: string;
  developerNameEn: string;
  featuresAr: string[];
  featuresEn: string[];
  units: {
    type: PropertyType;
    areaRangeSqm: string;
    priceRangeSAR: string;
    availableCount: number;
  }[];
}

export interface Review {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  avatarUrl: string;
  roleAr: string;
  roleEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  propertyNameAr?: string;
  date: string;
}

export interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  categoryAr: string;
  categoryEn: string;
  image: string;
  author: string;
  date: string;
  readTimeMinutes: number;
}

export interface FilterState {
  city: string;
  district: string;
  category: PropertyCategory | 'all';
  type: PropertyType | 'all';
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  finishing: FinishingType | 'all';
  maxAge: number | 'all';
  status: string | 'all';
  developer: string | 'all';
  searchQuery: string;
}

export interface AppNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  time: string;
  read: boolean;
  type: 'property' | 'offer' | 'project' | 'appointment' | 'system';
  linkPropertyId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin';
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitleAr: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'agent';
  text: string;
  timestamp: string;
  suggestedProperties?: Property[];
}

export interface CompanyStats {
  completedProjects: number;
  totalInvestmentSARBillions: number;
  deliveredUnits: number;
  satisfactionPercent: number;
  yearsOfExcellence: number;
}
