import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, Property, Project, FilterState, 
  AppNotification, UserProfile, Appointment, ChatMessage, Article 
} from '../types';
import { MOCK_PROPERTIES, MOCK_PROJECTS, MOCK_ARTICLES } from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

export type TabView = 
  | 'home' 
  | 'search' 
  | 'properties' 
  | 'property-detail' 
  | 'projects' 
  | 'project-detail' 
  | 'map' 
  | 'favorites' 
  | 'compare' 
  | 'calculators' 
  | 'profile' 
  | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  t: typeof TRANSLATIONS['ar'];
  
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
  
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  
  favorites: string[]; // Property IDs
  toggleFavorite: (id: string) => void;
  
  comparisonList: string[]; // Property IDs (max 4)
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
  
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  
  openPropertyDetail: (p: Property) => void;
  openProjectDetail: (p: Project) => void;
  
  quickCategoryFilter: (category: 'buy' | 'sell' | 'rent' | 'invest' | 'auction' | 'projects') => void;
}

const initialFilterState: FilterState = {
  city: 'all',
  district: 'all',
  category: 'all',
  type: 'all',
  minPrice: 0,
  maxPrice: 30000000,
  minArea: 0,
  maxArea: 5000,
  bedrooms: 'all',
  bathrooms: 'all',
  finishing: 'all',
  maxAge: 'all',
  status: 'all',
  developer: 'all',
  searchQuery: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Luxury default dark
  const [activeTab, setActiveTab] = useState<TabView>('home');
  
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(MOCK_PROPERTIES[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(MOCK_PROJECTS[0]);
  
  const [favorites, setFavorites] = useState<string[]>(['prop-01', 'prop-03']);
  const [comparisonList, setComparisonList] = useState<string[]>(['prop-01', 'prop-02']);
  
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      titleAr: 'إطلاق مشروع ضاحية ماجا الزمرّد',
      titleEn: 'Launch of MAGA Emerald Suburb',
      messageAr: 'تم إطلاق الحجز المبدئي لوحدات أبحر الشمالية بأسعار استثنائية.',
      messageEn: 'Priority bookings now open for Obhur North waterfront villas.',
      time: 'قبل 10 دقائق',
      read: false,
      type: 'project'
    },
    {
      id: 'notif-2',
      titleAr: 'عروض خاصة على فلل حطين',
      titleEn: 'Special Offer on Hittin Villas',
      messageAr: 'احصل على خصم 5% عند السداد النقدي لفيلا ماجا رويال.',
      messageEn: 'Get 5% discount on full cash settlement for MAGA Royal Villa.',
      time: 'قبل ساعة',
      read: false,
      type: 'offer'
    }
  ]);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'usr-101',
    name: 'عبدالله السلمان',
    email: 'a.alsalman@maga.sa',
    phone: '+966 50 123 4567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isLoggedIn: true,
    role: 'user'
  });
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-001',
      propertyId: 'prop-01',
      propertyTitleAr: 'فيلا ماجا رويال الفاخرة - حطين',
      clientName: 'عبدالله السلمان',
      clientPhone: '+966 50 123 4567',
      clientEmail: 'a.alsalman@maga.sa',
      preferredDate: '2026-07-28',
      preferredTime: '17:00',
      status: 'confirmed',
      createdAt: '2026-07-25'
    }
  ]);

  const t = TRANSLATIONS[language];

  // Sync RTL / LTR document direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync Dark/Light theme class on document HTML
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setComparisonList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert(language === 'ar' ? 'يمكنك مقارنة حتى 4 عقارات فقط في نفس الوقت' : 'You can compare up to 4 properties at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearCompare = () => setComparisonList([]);

  const resetFilters = () => setFilterState(initialFilterState);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const addNotification = (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newN: AppNotification = {
      ...n,
      id: `notif-${Date.now()}`,
      time: language === 'ar' ? 'الآن' : 'Just now',
      read: false
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const addAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };
    setAppointments(prev => [newApt, ...prev]);
    addNotification({
      titleAr: 'تأكيد موعد معاينة',
      titleEn: 'Viewing Appointment Confirmed',
      messageAr: `تم حجز موعد لمعاينة ${apt.propertyTitleAr} بتاريخ ${apt.preferredDate}`,
      messageEn: `Appointment scheduled for ${apt.preferredDate}`,
      type: 'appointment'
    });
  };

  const openPropertyDetail = (p: Property) => {
    setSelectedProperty(p);
    setActiveTab('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProjectDetail = (p: Project) => {
    setSelectedProject(p);
    setActiveTab('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickCategoryFilter = (category: 'buy' | 'sell' | 'rent' | 'invest' | 'auction' | 'projects') => {
    if (category === 'projects') {
      setActiveTab('projects');
    } else if (category === 'sell') {
      setIsChatOpen(true); // Open sales contact directly for sellers
    } else {
      setFilterState(prev => ({
        ...prev,
        category: category as any
      }));
      setActiveTab('properties');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        activeTab,
        setActiveTab,
        properties,
        setProperties,
        projects,
        setProjects,
        articles,
        setArticles,
        selectedProperty,
        setSelectedProperty,
        selectedProject,
        setSelectedProject,
        favorites,
        toggleFavorite,
        comparisonList,
        toggleCompare,
        clearCompare,
        filterState,
        setFilterState,
        resetFilters,
        notifications,
        markNotificationRead,
        addNotification,
        isAiModalOpen,
        setIsAiModalOpen,
        isChatOpen,
        setIsChatOpen,
        userProfile,
        setUserProfile,
        appointments,
        addAppointment,
        openPropertyDetail,
        openProjectDetail,
        quickCategoryFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
