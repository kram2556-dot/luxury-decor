export const initialSiteData = {
  brand: {
    name: "VANGUARD ATELIER",
    subtitle: "ARCHITECTURE & BESPOKE INTERIORS",
    tagline: "صياغة الفضاءات المعمارية الراقية والتنفيذ فائق الدقة",
    aboutTitle: "رؤيتنا المعمارية وفلسفة التميز",
    aboutText: "في ڤانجارد أتيليه (VANGUARD ATELIER)، لا نعتبر التصميم مجرد تنسيق بصري، بل هو فلسفة هندسية تجمع بين الرقي الكلاسيكي والوظيفة العصرية المتطورة. نلتزم بتحويل المخططات الهندسية الأكثر تعقيداً إلى واقع ملموس بدقة تنفيذ فائقة وأعلى معايير الجودة العالمية.",
    phone: "+201000000000",
    whatsapp: "201000000000",
    email: "contact@vanguard-atelier.com",
    address: "التجمع الخامس، القاهرة، جمهورية مصر العربية",
    yearsExperience: 14,
    completedProjects: 380,
    satisfiedClients: 320,
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      telegram: "https://t.me",
      linkedin: "https://linkedin.com"
    }
  },

  // باقات التشطيب المعتمدة لحاسبة التكلفة التفاعلية
  calculatorPackages: [
    {
      id: "classic",
      name: "Classic Luxury",
      pricePerMeter: 4500,
      description: "تشطيب راقٍ بخامات معتمدة وتنسيق معماري متكامل يناسب المساحات الكبيرة."
    },
    {
      id: "ultra",
      name: "Ultra Luxury",
      pricePerMeter: 7500,
      description: "رخام مستورد، إضاءة ذكية مخفية، وتكسيات جدارية من الأخشاب المعالجة."
    },
    {
      id: "royal",
      name: "Royal Bespoke",
      pricePerMeter: 12000,
      description: "تنفيذ قصور وفلل رئاسية، تشطيب يدوي خاص وتفاصيل من النحاس المعتق وأنظمة سمارت كاملة."
    }
  ],

  // كتالوج الخامات الفاخر (Materials Lookbook)
  materialsLookbook: [
    {
      id: 1,
      title: "الرخام الإيطالي (Italian Marble)",
      type: "رخام كلكتا وستاتوريو نخب أول",
      description: "ألواح بوكماتش مستوردة خصيصاً مع صقل مرآتي عاكس ومقاوم للبقع.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      title: "الأخشاب الهندسية (Engineered Wood)",
      type: "قشرة جوز طبيعي وتكسيات بلوط",
      description: "معالجة ضد الرطوبة والحرارة بتدرجات لونية هادئة تعكس الدفء العصري.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      title: "النحاس والستانلس المعتق (Brushed Metals)",
      type: "نحاس عتيق معالج وتطعيمات ذهبية",
      description: "فواصل وقطاعات معدنية مشطوفة يدوياً تعطي هوية فخمة للمساحة.",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      title: "الإضاءة المعمارية الذكية (Architectural Lighting)",
      type: "مسارات مغناطيسية وأنظمة دالي",
      description: "توزيع مدروس لتجربة بصرية مريحة تتغير سيناريوهاتها بلمسة واحدة.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
    }
  ],

  heroSlides: [
    {
      id: 1,
      title: "العمارة الأيقونية والتصميم الداخلي الفاخر",
      subtitle: "صياغة أدق التفاصيل وتناغم استثنائي بين الخامات الطبيعية والنظم الذكية.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      title: "قصور وفلل عصرية تسبق التوقعات",
      subtitle: "إشراف هندسي وتنفيذ متطابق بنسبة 100% مع المخططات ثلاثية الأبعاد.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      title: "مقرات ومساحات عمل فاخرة للمؤسسات الكبرى",
      subtitle: "حلول معمارية مستدامة تجمع بين الهيبة والإنتاجية العالية.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  categories: ["الكل", "تشطيبات فاخرة", "تصاميم 3D", "واجهات وقصور", "تطوير تجاري"],

  projects: [
    {
      id: 1,
      title: "فيلا النرجس - التجمع الخامس",
      category: "تشطيبات فاخرة",
      description: "تشطيب ملكي مع تكسيات رخام مستورد وأرضيات باركيه فرنسي طبيعي.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "بنتهاوس زايد ديونز",
      category: "تصاميم 3D",
      description: "رؤية عصرية تدمج التراس البانورامي مع الصالون الرئيسي بنظام إضاءة مخفي.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "قصر ويست تاون المعماري",
      category: "واجهات وقصور",
      description: "تصميم وتنفيذ واجهة كلاسيكية نيو-كلاسيك مع تنسيق حدائق ومسبح بتشطيب فندقي.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "مقر استثماري بالعاصمة الإدارية",
      category: "تطوير تجاري",
      description: "تنسيق مكاتب إدارية فاخرة بنظام عزل صوتي متطور وألواح زجاج ذكي.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
    }
  ],

  comparison: {
    title: "من المخطط ثلاثي الأبعاد إلى الواقع (3D vs Reality)",
    description: "شاهد دقة التطابق المذهلة بين رؤية مهندسينا في مرحلة الريندر وما تم تسليمه فعلياً للعميل على أرض الواقع.",
    renderImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    realImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
  },

  processSteps: [
    {
      step: "01",
      title: "الاستشارة والتخطيط الهندسي",
      desc: "جلسة عمل تفصيلية لدراسة المساحة، فهم تطلعات العميل، ووضع الميزانية والمخطط الزمني."
    },
    {
      step: "02",
      title: "التصميم ثلاثي الأبعاد (3D Rendering)",
      desc: "تحويل المخططات إلى لقطات واقعية فائقة الدقة تشمل الإضاءات، توزيع الأثاث، واختيار الخامات."
    },
    {
      step: "03",
      title: "توريد واختيار الخامات المعتمدة",
      desc: "مطابقة العينات الواقعية في معارضنا وشراء أجود أنواع الرخام والأخشاب والمعدات."
    },
    {
      step: "04",
      title: "التنفيذ والإشراف الهندسي الصارم",
      desc: "إدارة الموقع بفريق من المهندسين المتخصصين حتى لحظة التسليم المفتاحي بالشهادات والضمانات."
    }
  ],

  partners: [
    "مجموعة محجوب للسراميك والبورسلين",
    "Schneider Electric Systems",
    "Duravit Egypt",
    "Ideal Standard",
    "دهانات جوتن Jotun",
    "Philips Dynalite Smart Lighting"
  ],

  adminConfig: {
    adminEmail: "admin@vanguard-atelier.com",
    passcode: "1234"
  }
};
