import { Property, Project, Review, Article, CompanyStats } from '../types';

export const COMPANY_STATS: CompanyStats = {
  completedProjects: 48,
  totalInvestmentSARBillions: 3.8,
  deliveredUnits: 2450,
  satisfactionPercent: 98,
  yearsOfExcellence: 14,
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    titleAr: 'فيلا ماجا رويال الفاخرة - حطين',
    titleEn: 'MAGA Royal Villa - Hittin',
    descriptionAr: 'فيلا مودرن فاخرة صُممت وفق أعلى المعايير العالمية بالتجمع السكني الراقي في حطين. تتميز بمسابح خاصة، ومصعد بانورامي، ونظام منزل ذكي سمارت هوم كامل، وتكسية بالرخام الإيطالي الفاخر مع حديقة ومجالس واسعة.',
    descriptionEn: 'Ultra-luxurious modern villa designed to global architectural standards in prestigious Hittin, Riyadh. Features private infinity pool, panoramic elevator, full Smart Home automation, Italian marble finishes, and landscaped gardens.',
    category: 'buy',
    type: 'villa',
    priceSAR: 12500000,
    areaSqm: 850,
    bedrooms: 6,
    bathrooms: 8,
    livingRooms: 4,
    parkingSpaces: 4,
    ageYears: 0,
    finishing: 'super_deluxe',
    statusAr: 'متاح',
    statusEn: 'Available',
    featured: true,
    isSpecialOffer: true,
    expectedRoiPercent: 8.5,
    location: {
      city: 'الرياض',
      district: 'حطين',
      addressAr: 'حي حطين النموذجي - بالقرب من الملقا',
      addressEn: 'Hittin Model District, Riyadh',
      lat: 24.7820,
      lng: 46.6110,
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    virtualTour360Url: 'https://my.matterport.com/show/?m=sample',
    featuresAr: ['مسبح infinity', 'مصعد بانورامي', 'نظام سمارت هوم', 'تكييف مخفي VRV', 'غرفة سائق وخادمة', 'مجلس زجاجي مطل', 'سينما منزلية'],
    featuresEn: ['Infinity Pool', 'Panoramic Lift', 'Smart Home System', 'Hidden VRV AC', 'Maid & Driver Rooms', 'Glass Majlis', 'Home Theater'],
    nearbyServices: [
      { nameAr: 'مسجد الملك سلمان', nameEn: 'King Salman Mosque', distanceKm: 0.3, type: 'mosque' },
      { nameAr: 'مستشفى دله', nameEn: 'Dallah Hospital', distanceKm: 2.1, type: 'hospital' },
      { nameAr: 'الرياض بارك مول', nameEn: 'Riyadh Park Mall', distanceKm: 3.5, type: 'mall' },
      { nameAr: 'مدارس المناهج العالمية', nameEn: 'Al Manahij Int School', distanceKm: 1.2, type: 'school' }
    ],
    paymentPlan: {
      downPaymentPercent: 20,
      monthlyInstallmentSAR: 48500,
      durationYears: 20,
      handoverDate: 'جاهز للتسليم'
    },
    projectId: 'proj-01',
    projectNameAr: 'مجمع ماجا ريزيدنس الحطين',
    developerAr: 'ماجا العقارية MAGA',
    createdAt: '2026-07-01',
    viewsCount: 3420
  },
  {
    id: 'prop-02',
    titleAr: 'بنتهاوس ماجا سكايلاين - الكورنيش جدة',
    titleEn: 'MAGA Skyline Penthouse - Corniche Jeddah',
    descriptionAr: 'بنتهاوس فاخر بتصميم زجاجي بانورامي يطل مباشرة على البحر الأحمر ونوافير جدة. يتميز بتراس خاص، وجاكوزي، ومصعد خاص، ومدخل محمي بأعلى تقنيات الأمان للعملاء المتميزين.',
    descriptionEn: 'Exquisite penthouse featuring panoramic Red Sea view, private sky terrace with jacuzzi, direct elevator entry, and master suite in Corniche Jeddah.',
    category: 'buy',
    type: 'penthouse',
    priceSAR: 9800000,
    areaSqm: 620,
    bedrooms: 5,
    bathrooms: 6,
    livingRooms: 3,
    parkingSpaces: 3,
    ageYears: 1,
    finishing: 'super_deluxe',
    statusAr: 'متاح',
    statusEn: 'Available',
    featured: true,
    isSpecialOffer: false,
    expectedRoiPercent: 9.2,
    location: {
      city: 'جدة',
      district: 'الشاطئ',
      addressAr: 'طريق الكورنيش - حي الشاطئ الفاخر',
      addressEn: 'Corniche Road, Al Shati, Jeddah',
      lat: 21.5433,
      lng: 39.1728
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['إطلالة مباشرة على البحر', 'تراس وخيمة زجاجية', 'جاكوزي خارجي', 'مصعد خاص برقم سري', 'خدمات كونسيرج 24/7'],
    featuresEn: ['Direct Sea View', 'Private Glass Terrace', 'Outdoor Jacuzzi', 'Private Private Key Elevator', '24/7 Concierge'],
    nearbyServices: [
      { nameAr: 'كورنيش جدة الواجهة البحرية', nameEn: 'Jeddah Waterfront', distanceKm: 0.1, type: 'park' },
      { nameAr: 'مجمع العرب', nameEn: 'Mall of Arabia', distanceKm: 5.0, type: 'mall' },
      { nameAr: 'مطار الملك عبدالعزيز الدولي', nameEn: 'King Abdulaziz Int Airport', distanceKm: 12.0, type: 'airport' }
    ],
    paymentPlan: {
      downPaymentPercent: 25,
      monthlyInstallmentSAR: 39000,
      durationYears: 15,
      handoverDate: 'تسليم فورياً'
    },
    createdAt: '2026-07-10',
    viewsCount: 2890
  },
  {
    id: 'prop-03',
    titleAr: 'شقة ماجا الذكية المودرن - الملقا الرياض',
    titleEn: 'MAGA Smart Luxury Apartment - Al Malqa',
    descriptionAr: 'شقة فاخرة بمساحة ممتازة وتصميم عصري يفي بمتطلبات العائلة الحديثة. تقع في مجمع ماجا المغلق والمخدوم بحدائق، وممشى، ونادي رياضي خاص بالقرب من بوليفارد الرياض.',
    descriptionEn: 'Luxury smart apartment in Al Malqa, close to Boulevard World. Located in a gated compound with lush gardens, gym, and security.',
    category: 'buy',
    type: 'apartment',
    priceSAR: 1850000,
    areaSqm: 210,
    bedrooms: 3,
    bathrooms: 4,
    livingRooms: 2,
    parkingSpaces: 2,
    ageYears: 0,
    finishing: 'luxury',
    statusAr: 'متاح',
    statusEn: 'Available',
    featured: true,
    isSpecialOffer: true,
    expectedRoiPercent: 8.8,
    location: {
      city: 'الرياض',
      district: 'الملقا',
      addressAr: 'طريق أنس بن مالك - حي الملقا',
      addressEn: 'Anas Bin Malik Rd, Al Malqa, Riyadh',
      lat: 24.8100,
      lng: 46.6200
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['مطبخ راكب ألماني', 'تكيف كونسيلد', 'شاحن سيارات كهربائية EV', 'نادي رياضي مشتركة', 'نظام دخول بالبصمة'],
    featuresEn: ['Fitted German Kitchen', 'Concealed AC', 'EV Car Charger', 'Shared Gym', 'Biometric Entry'],
    nearbyServices: [
      { nameAr: 'بوليفارد رياض سيتي', nameEn: 'Boulevard Riyadh City', distanceKm: 2.0, type: 'mall' },
      { nameAr: 'جامعة الملك سعود', nameEn: 'King Saud University', distanceKm: 6.5, type: 'school' }
    ],
    paymentPlan: {
      downPaymentPercent: 10,
      monthlyInstallmentSAR: 8200,
      durationYears: 20,
      handoverDate: 'جاهز'
    },
    projectId: 'proj-02',
    projectNameAr: 'أبراج ماجا جاردنز',
    developerAr: 'ماجا العقارية MAGA',
    createdAt: '2026-07-15',
    viewsCount: 1950
  },
  {
    id: 'prop-04',
    titleAr: 'عمائر ماجا الاستثمارية - النرجس',
    titleEn: 'MAGA Commercial & Residential Building - Al Narjis',
    descriptionAr: 'فرصة استثمارية ذهبية بعائد سنوي ممتاز! عمائر مكتبية وسكنية جديدة بالكامل مؤجرة بعقود طويلة الأجل لشركات كبرى على طريق عثمان بن عفان.',
    descriptionEn: 'Prime commercial and residential asset in Al Narjis with long-term corporate leases offering guaranteed annual yield ROI.',
    category: 'invest',
    type: 'building',
    priceSAR: 22000000,
    areaSqm: 1800,
    bedrooms: 16,
    bathrooms: 20,
    livingRooms: 8,
    parkingSpaces: 18,
    ageYears: 1,
    finishing: 'super_deluxe',
    statusAr: 'فرصة استثمارية',
    statusEn: 'Investment Deal',
    featured: true,
    isSpecialOffer: true,
    expectedRoiPercent: 10.4,
    location: {
      city: 'الرياض',
      district: 'النرجس',
      addressAr: 'طريق عثمان بن عفان - حي النرجس',
      addressEn: 'Othman Bin Affan Rd, Al Narjis, Riyadh',
      lat: 24.8400,
      lng: 46.6800
    },
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['عائد سنوي 10.4%', 'عقود موثقة في شبكة إيجار', 'واجهات زجاجية مودرن', 'مواقف بيومترية سفلية'],
    featuresEn: ['10.4% Annual ROI', 'Ejar Certified Leases', 'Modern Glass Facades', 'Underground Parking'],
    nearbyServices: [
      { nameAr: 'مطار الملك خالد الدولي', nameEn: 'King Khalid Int Airport', distanceKm: 14.0, type: 'airport' }
    ],
    createdAt: '2026-07-18',
    viewsCount: 4100
  },
  {
    id: 'prop-05',
    titleAr: 'دوبلكس ماجا المودرن - الشاطئ الخبر',
    titleEn: 'MAGA Modern Duplex - Al Shati Khobar',
    descriptionAr: 'دوبلكس مودرن فاخر بإطلالات ساحلية جميلة وقريبة من الواجهة البحرية بالخبر، حوش واسع وغرفة خادمة وملحق علوي راقي.',
    descriptionEn: 'Luxury coastal duplex near Al Khobar seafront, featuring a spacious courtyard, maid suite, and roof garden lounge.',
    category: 'buy',
    type: 'duplex',
    priceSAR: 2750000,
    areaSqm: 380,
    bedrooms: 4,
    bathrooms: 5,
    livingRooms: 3,
    parkingSpaces: 2,
    ageYears: 0,
    finishing: 'luxury',
    statusAr: 'متاح',
    statusEn: 'Available',
    featured: false,
    isSpecialOffer: false,
    expectedRoiPercent: 7.9,
    location: {
      city: 'الخبر',
      district: 'الشاطئ',
      addressAr: 'حي الشاطئ - بالقرب من الراشد مول',
      addressEn: 'Al Shati District, Al Khobar',
      lat: 26.3000,
      lng: 50.2100
    },
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['حديقة منزلية', 'تراسات مطلة', 'ضمانات 10 سنوات على الهيكل الإنشائي'],
    featuresEn: ['Private Courtyard', 'View Terraces', '10 Year Structural Warranty'],
    nearbyServices: [
      { nameAr: 'الراشد مول', nameEn: 'Rashid Mall', distanceKm: 1.8, type: 'mall' },
      { nameAr: 'كورنيش الخبر', nameEn: 'Khobar Corniche', distanceKm: 2.2, type: 'park' }
    ],
    createdAt: '2026-07-20',
    viewsCount: 1280
  },
  {
    id: 'prop-06',
    titleAr: 'شقة فاخرة للإيجار السنوي - الياسمين الرياض',
    titleEn: 'Luxury Rental Apartment - Al Yasmin Riyadh',
    descriptionAr: 'شقة عائلية فاخرة مؤثثة بالكامل بأحدث الديكورات، مدخل خاص، موقف خاص، تكييف كونسيلد شامل الخدمات في حي الياسمين الهادئ.',
    descriptionEn: 'Fully furnished luxury apartment for yearly lease in Al Yasmin Riyadh with private garage, concealed AC and smart security.',
    category: 'rent',
    type: 'apartment',
    priceSAR: 95000,
    rentPeriod: 'yearly',
    areaSqm: 185,
    bedrooms: 3,
    bathrooms: 3,
    livingRooms: 1,
    parkingSpaces: 1,
    ageYears: 1,
    finishing: 'deluxe',
    statusAr: 'متاح',
    statusEn: 'Available',
    featured: false,
    isSpecialOffer: true,
    location: {
      city: 'الرياض',
      district: 'الياسمين',
      addressAr: 'طريق الملك عبدالعزيز - حي الياسمين',
      addressEn: 'King Abdulaziz Rd, Al Yasmin, Riyadh',
      lat: 24.8250,
      lng: 46.6500
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['مؤثثة بالكامل', 'عقد إيجار إلكتروني موثق', 'حراسة ومراقبة بالكاميرات'],
    featuresEn: ['Fully Furnished', 'Certified Ejar Lease', 'CCTV Security'],
    nearbyServices: [
      { nameAr: 'مستشفى المملكة', nameEn: 'Kingdom Hospital', distanceKm: 1.0, type: 'hospital' }
    ],
    createdAt: '2026-07-21',
    viewsCount: 1640
  },
  {
    id: 'prop-07',
    titleAr: 'أرض تجارية وسكنية - المجمعة',
    titleEn: 'Prime Commercial Land - Al Majmaah',
    descriptionAr: 'أرض تجارية وسكنية ممتازة بموقع استراتيجي في مدينة المجمعة على شارع رئيسي تجاري بعرض 40 متراً، خيار مثالي لبناء مجمع تجاري أو شقق سكنية.',
    descriptionEn: 'Prime commercial land on a 40m main avenue in Al Majmaah, ideal for retail plaza or residential complex development.',
    category: 'invest',
    type: 'land',
    priceSAR: 1450000,
    areaSqm: 1200,
    bedrooms: 0,
    bathrooms: 0,
    livingRooms: 0,
    parkingSpaces: 0,
    ageYears: 0,
    finishing: 'core_and_shell',
    statusAr: 'فرصة استثمارية',
    statusEn: 'Investment Deal',
    featured: false,
    isSpecialOffer: false,
    expectedRoiPercent: 11.5,
    location: {
      city: 'المجمعة',
      district: 'حي المستقبل',
      addressAr: 'طريق الملك فهد - المجمعة',
      addressEn: 'King Fahd Rd, Al Majmaah',
      lat: 25.9000,
      lng: 45.3400
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    featuresAr: ['واجهة تجارية 30م', 'جاهزة للبناء فوراً', 'شوارع فسيحة مخدومة'],
    featuresEn: ['30m Commercial Street Frontage', 'Ready for immediate permits'],
    nearbyServices: [
      { nameAr: 'جامعة المجمعة', nameEn: 'Majmaah University', distanceKm: 3.0, type: 'school' }
    ],
    createdAt: '2026-07-22',
    viewsCount: 980
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    nameAr: 'مجمع ماجا ريزيدنس الحطين',
    nameEn: 'MAGA Residence Hittin Compound',
    taglineAr: 'عنوان الفخامة والرقي في قلب الرياض الشمالي',
    taglineEn: 'The Pinnacle of Luxury in Northern Riyadh',
    descriptionAr: 'مشروع سكني مغلق متكامل يضم 34 فيلا فاخرة بتصاميم معمارية نادرة ومساحات خضراء ممتدة على 45,000 متر مربع مع مركز رياضي، ومسبح أولمبي، وخدمات أمنية واستقبال طوال اليوم.',
    descriptionEn: 'A landmark gated community offering 34 signature villas across 45,000 sqm with private parks, clubhouse, Olympic pool, and 24/7 concierge.',
    status: 'current',
    statusLabelAr: 'قيد التنفيذ',
    progressPercent: 82,
    location: {
      city: 'الرياض',
      district: 'حطين',
      addressAr: 'شمال حطين - الرياض',
      addressEn: 'North Hittin, Riyadh',
      lat: 24.7820,
      lng: 46.6110
    },
    masterPlanImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    deliveryYear: 2026,
    totalUnitsCount: 34,
    availableUnitsCount: 6,
    startingPriceSAR: 11500000,
    developerNameAr: 'ماجا العقارية MAGA',
    developerNameEn: 'MAGA Real Estate',
    featuresAr: ['مجتمع مغلق آمن', 'نادي رياضي حترافي', 'ممشى وحدائق غناء', 'ضمانات شاملة 20 سنة'],
    featuresEn: ['Gated Safe Community', 'Pro Club House', 'Lush Parks & Trails', '20-Year Full Warranty'],
    units: [
      { type: 'villa', areaRangeSqm: '750 - 950', priceRangeSAR: '11,500,000 - 15,000,000', availableCount: 4 },
      { type: 'penthouse', areaRangeSqm: '550 - 650', priceRangeSAR: '9,000,000 - 10,500,000', availableCount: 2 }
    ]
  },
  {
    id: 'proj-02',
    nameAr: 'أبراج ماجا جاردنز - الملقا',
    nameEn: 'MAGA Gardens Towers - Al Malqa',
    taglineAr: 'حياة ذكية ومستدامة بمفهوم عصري',
    taglineEn: 'Smart & Sustainable High-Rise Living',
    descriptionAr: 'برجان سكنيان ناطحات سحاب ذكية تقدم شققاً سكنية راقية مزودة بأنظمة الاستدامة وتقنيات الذكاء الاصطناعي مع إطلالات ساحرة على بوليفارد الرياض.',
    descriptionEn: 'Twin residential smart towers featuring futuristic amenities, infinity rooftop pool, and direct access to Riyadh Boulevard.',
    status: 'current',
    statusLabelAr: 'قيد التنفيذ',
    progressPercent: 65,
    location: {
      city: 'الرياض',
      district: 'الملقا',
      addressAr: 'حي الملقا - الرياض',
      addressEn: 'Al Malqa, Riyadh',
      lat: 24.8100,
      lng: 46.6200
    },
    masterPlanImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    deliveryYear: 2027,
    totalUnitsCount: 120,
    availableUnitsCount: 28,
    startingPriceSAR: 1750000,
    developerNameAr: 'ماجا العقارية MAGA',
    developerNameEn: 'MAGA Real Estate',
    featuresAr: ['مسبح معلق في السطح', 'صالة العاب للأطفال', 'منطقة كافيهات خاصة بالبرج', 'شواحن السيارات الكهربائية'],
    featuresEn: ['Rooftop Infinity Pool', 'Kids Play Zone', 'Private Lounge Cafe', 'EV Charging Bays'],
    units: [
      { type: 'apartment', areaRangeSqm: '140 - 240', priceRangeSAR: '1,750,000 - 2,800,000', availableCount: 22 },
      { type: 'penthouse', areaRangeSqm: '450 - 580', priceRangeSAR: '5,500,000 - 7,200,000', availableCount: 6 }
    ]
  },
  {
    id: 'proj-03',
    nameAr: 'ضاحية ماجا الزمرّد - جدة',
    nameEn: 'MAGA Emerald Suburb - Obhur Jeddah',
    taglineAr: 'المجتمع الساحلي الأرقى في أبحر الشمالية',
    taglineEn: 'The Premier Coastal Oasis in North Obhur',
    descriptionAr: 'مشروع مستقبلي يجمع بين الطبيعة البحرية والعمارة السعودية الحديثة على ضفاف البحر الأحمر بإطلالات مباشرة على الشاطئ.',
    descriptionEn: 'Future coastal masterplanned community combining Red Sea natural beauty with modern Saudi architecture in North Obhur.',
    status: 'upcoming',
    statusLabelAr: 'قادمة قريباً',
    progressPercent: 15,
    location: {
      city: 'جدة',
      district: 'أبحر الشمالية',
      addressAr: 'أبحر الشمالية - جدة',
      addressEn: 'North Obhur, Jeddah',
      lat: 21.7500,
      lng: 39.1200
    },
    masterPlanImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    deliveryYear: 2028,
    totalUnitsCount: 210,
    availableUnitsCount: 150,
    startingPriceSAR: 2200000,
    developerNameAr: 'ماجا العقارية MAGA',
    developerNameEn: 'MAGA Real Estate',
    featuresAr: ['مرسى يخوت خاص', 'واجهة شاطئية ممتدة', 'حديقة مائية ونادي بحري'],
    featuresEn: ['Private Yacht Marina', 'Beach Promenade', 'Waterpark & Sea Club'],
    units: [
      { type: 'villa', areaRangeSqm: '500 - 800', priceRangeSAR: '4,500,000 - 8,500,000', availableCount: 100 },
      { type: 'apartment', areaRangeSqm: '180 - 320', priceRangeSAR: '2,200,000 - 3,900,000', availableCount: 50 }
    ]
  },
  {
    id: 'proj-04',
    nameAr: 'مجمع ماجا بلازا التجاري - النرجس',
    nameEn: 'MAGA Commercial Plaza - Al Narjis',
    taglineAr: 'وجهة الأعمال والتسوق الأولى شمال الرياض',
    taglineEn: 'The Premier Retail & Corporate Destination',
    descriptionAr: 'مشروع تجاري ومكتبي متكامل تم إنجازه بالكامل وتسليمه للعملاء، يعكس القوة الاستثمارية والالتزام بدقة المواعيد.',
    descriptionEn: 'Fully completed and delivered luxury commercial and corporate complex in North Riyadh.',
    status: 'completed',
    statusLabelAr: 'مكتمل ومسلم',
    progressPercent: 100,
    location: {
      city: 'الرياض',
      district: 'النرجس',
      addressAr: 'طريق عثمان بن عفان - النرجس',
      addressEn: 'Al Narjis, Riyadh',
      lat: 24.8400,
      lng: 46.6800
    },
    masterPlanImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    deliveryYear: 2025,
    totalUnitsCount: 45,
    availableUnitsCount: 2,
    startingPriceSAR: 3500000,
    developerNameAr: 'ماجا العقارية MAGA',
    developerNameEn: 'MAGA Real Estate',
    featuresAr: ['100% نسبة الإنجاز والتشغيل', 'علامات تجارية عالمية', 'مواقف تتسع لـ 500 سيارة'],
    featuresEn: ['100% Delivered', 'Global Retail Brands', '500+ Parking Spaces'],
    units: [
      { type: 'commercial', areaRangeSqm: '120 - 450', priceRangeSAR: '3,500,000 - 9,800,000', availableCount: 2 }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    clientNameAr: 'م. عبدالله السلمان',
    clientNameEn: 'Eng. Abdullah Al-Salman',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    roleAr: 'مستثمر عقاري - الرياض',
    roleEn: 'Real Estate Investor - Riyadh',
    rating: 5,
    commentAr: 'تجربتي مع "ماجا العقارية" في شراء فيلا حطين كانت استثنائية. الالتزام بالوقت، وجودة المواد والتصاميم تفوق التوقعات بمراحل.',
    commentEn: 'My experience with MAGA Real Estate buying the Hittin Villa was exceptional. Premium finishings, smooth transaction and incredible support.',
    date: '2026-06-15'
  },
  {
    id: 'rev-02',
    clientNameAr: 'د. سارة التميمي',
    clientNameEn: 'Dr. Sarah Al-Tamimi',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    roleAr: 'مالكة شقة في أبراج ماجا',
    roleEn: 'Apartment Owner - MAGA Towers',
    rating: 5,
    commentAr: 'التطوير العقاري لدى ماجا يعيد تعريف الفخامة الحديثة. التفاصيل الذكية للأنظمة المنزلية وخدمات المجمعات توفر راحة بال حقيقية.',
    commentEn: 'MAGA redefined modern luxury for my family. Smart home systems and compound management give true peace of mind.',
    date: '2026-07-02'
  },
  {
    id: 'rev-03',
    clientNameAr: 'أ. فهد العصيمي',
    clientNameEn: 'Fahad Al-Oseimi',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    roleAr: 'رجل أعمال - جدة',
    roleEn: 'Businessman - Jeddah',
    rating: 5,
    commentAr: 'استثمرت في البنتهاوس الواقع بكورنيش جدة، العائد الاستثماري رائع والتعامل مع فريق المبيعات ينم عن احترافية عالية جداً.',
    commentEn: 'Invested in the Jeddah Corniche Penthouse, high ROI and extremely professional sales and advisory team.',
    date: '2026-07-11'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-01',
    titleAr: 'مستقبل الاستثمار العقاري في الرياض في ضوء رؤية المملكة 2030',
    titleEn: 'The Future of Real Estate Investment in Riyadh under Saudi Vision 2030',
    excerptAr: 'تحليل شامل لأثر المشاريع الكبرى مثل المربع الجديد وحديقة الملك سلمان على القيمة السوقية للعقارات شمال وشرق الرياض.',
    excerptEn: 'Comprehensive insights into mega projects like New Murabba and King Salman Park on North Riyadh property values.',
    contentAr: 'شهد القطاع العقاري في المملكة العربية السعودية تحولاً جذرياً يرتكز على الرؤية الطموحة 2030. ووفقاً للبيانات الأخيرة، سجّلت العقارات السكنية والتجارية الفاخرة ارتفاعاً متزايداً في الطلب من قبل المستثمرين المحليين والدوليين...',
    contentEn: 'Saudi real estate sector is undergoing unprecedented expansion driven by Vision 2030 initiative...',
    categoryAr: 'تقارير السوق',
    categoryEn: 'Market Insights',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    author: 'فريق ماجا للأبحاث العقارية',
    date: '2026-07-20',
    readTimeMinutes: 4
  },
  {
    id: 'art-02',
    titleAr: 'كيف تختار الفيلا المناسبة لعائلتك؟ 7 معايير أساسية من ماجا العقارية',
    titleEn: 'How to Choose the Perfect Villa for Your Family: 7 Essential Guidelines',
    excerptAr: 'نصائح خافية حول التخطيط المعماري، جودة العزل، أنظمة التكييف الذكية، وحساب العائد قبل اتخاذ قرار الشراء.',
    excerptEn: 'Expert tips on architectural layout, insulation, smart AC, and long-term valuation before buying.',
    contentAr: 'اختيار منزل العمر هو قرار استثماري وعاطفي كبير. يقدم خبراء ماجا العقارية دليلاً استرشادياً يساعدك على فحص جودة التشطيب، الهيكل الإنشائي، والخدمات المحيطة...',
    contentEn: 'Choosing your home is a major financial milestone. Here are key guidelines from MAGA experts...',
    categoryAr: 'نصائح عقارية',
    categoryEn: 'Buying Tips',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: 'مهندس الاستشارات المعمارية',
    date: '2026-07-14',
    readTimeMinutes: 5
  }
];
