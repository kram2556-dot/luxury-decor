export const initialSiteData = {
  // 1. هوية الشركة وبيانات التواصل
  brand: {
    name: "VANGUARD ATELIER",
    subtitle: "ARCHITECTURE & LUXURY INTERIORS",
    tagline: "نصيغ الفضاءات المعمارية الفاخرة بدقة متناهية وإبداع هندسي لا يُضاهى",
    aboutTitle: "رؤيتنا وفلسفتنا المعمارية",
    aboutText: "في ڤانجارد أتيليه، نحول الرؤى المعمارية الطموحة إلى واقع ملموس ينبض بالرفاهية. نجمع بين أحدث المدارس التصميمية العالمية وأرقى خامات التشطيب لنقدم مساحات سكنية وتجارية استثنائية، تبدأ من التخطيط الهندسي المبتكر وتكتمل بالإشراف الدقيق والتسليم المفتاحي المتقن.",
    yearsExperience: "15+",
    completedProjects: "240+",
    satisfiedClients: "180+",
    phone: "01000000000",
    whatsapp: "201000000000",
    email: "info@vanguard-atelier.com",
    address: "القاهرة الجديدة، التجمع الخامس، مصر",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      telegram: "https://t.me",
      whatsapp: "https://wa.me/201000000000"
    }
  },

  // 2. صور السلايدر الرئيسي (Hero Slider)
  heroSlides: [
    {
      id: "slide-1",
      title: "عمارة تفوق التوقعات",
      subtitle: "تصاميم سكنية ملكية تجمع بين التناغم الهندسي وأرقى خامات الرخام الطبيعي",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-2",
      title: "ديكورات داخلية تنبض بالحياة",
      subtitle: "إضاءة مدروسة ومساحات رحبة تمنحك إحساساً دائماً بالراحة والتميز",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: "slide-3",
      title: "تنفيذ دقيق وإشراف هندسي صارم",
      subtitle: "نحول مجسمات الـ 3D المعقدة إلى واقع حقيقي ملموس على المفتاح",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  // 3. تصنيفات وأقسام الكتالوج (ديناميكية)
  categories: ["الكل", "فلل وقصور", "تشطيبات فاخرة", "تصميم 3D", "مشاريع تجارية"],

  // 4. مشاريع الكتالوج التفاعلي الأفقي
  projects: [
    {
      id: "proj-1",
      title: "فيلا المروج - التجمع الخامس",
      category: "فلل وقصور",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "تصميم وتنفيذ كامل لفيلا سكنية فاخرة بمساحة 850 متر مربع بأسلوب نيوكلاسيك راقي."
    },
    {
      id: "proj-2",
      title: "بنتهاوس بالم هيلز - أكتوبر",
      category: "تشطيبات فاخرة",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80",
      description: "تشطيبات ألترا مودرن مع توظيف متكامل للأخشاب الطبيعية والإضاءات المخفية."
    },
    {
      id: "proj-3",
      title: "تصميم ريندر لقصر الشيخ زايد",
      category: "تصميم 3D",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
      description: "محاكاة ثلاثية الأبعاد فائقة الواقعية تُظهر توزيع المساحات وتباين الخامات قبل التنفيذ."
    },
    {
      id: "proj-4",
      title: "مقر إداري لشركة استثمارية",
      category: "مشاريع تجارية",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
      description: "بيئة عمل ذكية بتصاميم عصرية تعزز الإنتاجية وتعكس هوية المؤسسة الراقية."
    },
    {
      id: "proj-5",
      title: "جناح نوم رئيسي ملكي",
      category: "تشطيبات فاخرة",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80",
      description: "تفاصيل أنيقة وتناغم لوني مع أحدث أنظمة العزل الصوتي والستائر الذكية."
    }
  ],

  // 5. قسم المقارنة الواقعية (3D vs Reality)
  comparison: {
    title: "المصداقية المعمارية: 3D مقابل الواقع",
    description: "شاهد دقة مطابقة التنفيذ على أرض الواقع مع المخططات والتصميمات ثلاثية الأبعاد الأصلية",
    renderImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    realImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
  },

  // 6. مراحل وخطوات التنفيذ الهندسي
  processSteps: [
    {
      step: "01",
      title: "الاستشارة ودراسة الموقع",
      desc: "جلسة عصف ذهني لفهم احتياجاتك وميزانيتك بدقة مع رفع المقاسات الهندسية للموقع."
    },
    {
      step: "02",
      title: "التصميم ثلاثي الأبعاد (3D)",
      desc: "تحويل الأفكار إلى مجسمات واقعية بدقة 4K تتيح لك معاينة منزلك بالكامل قبل وضع أول لبنة."
    },
    {
      step: "03",
      title: "اختيار وتوريد الخامات",
      desc: "انتقاء أجود أنواع الرخام، الأخشاب، والإضاءة مع جداول زمنية ومواصفات معتمدة."
    },
    {
      step: "04",
      title: "التنفيذ والتسليم على المفتاح",
      desc: "إشراف هندسي يومي دقيق لضمان مطابقة الواقع للتصميم بأعلى معايير الأمان والجودة."
    }
  ],

  // 7. الشركاء والخامات المعتمدة
  partners: [
    "رخام كرارا الإيطالي",
    "أنظمة شنايدر الذكية",
    "دهانات جوتن الفاخرة",
    "إضاءات فيليبس المعمارية",
    "أخشاب التيك الطبيعية",
    "خزائن بوليكاربو السويسرية"
  ],

  // 8. إعدادات الأمان للوحة الأدمن
  adminConfig: {
    passcode: "1234",
    email: "admin@vanguard.com"
  }
};
