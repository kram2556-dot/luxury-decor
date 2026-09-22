import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Award, 
  Users, 
  Building, 
  Settings, 
  X, 
  Check, 
  ExternalLink,
  Sliders,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';
import { initialSiteData } from './data';
import './styles.css';

// Hook لإدارة البيانات وتخزينها محلياً
function useSiteData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('vanguard_site_data');
    return saved ? JSON.parse(saved) : initialSiteData;
  });

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('vanguard_site_data', JSON.stringify(newData));
  };

  return [data, updateData];
}

// شعار الشركة الهندسي الفاخر VANGUARD ATELIER (SVG عالي النقاء)
const BrandLogo = ({ className = "h-14 w-auto" }) => (
  <svg viewBox="0 0 320 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFBA73" />
        <stop offset="50%" stopColor="#C5A059" />
        <stop offset="100%" stopColor="#9E7831" />
      </linearGradient>
    </defs>
    {/* رمز الحرف المعماري V */}
    <g transform="translate(15, 10)">
      <polygon points="10,5 35,68 45,68 20,5" fill="url(#goldGrad)" />
      <polygon points="65,5 40,68 30,68 55,5" fill="url(#goldGrad)" />
      <rect x="36" y="12" width="3" height="42" fill="url(#goldGrad)" opacity="0.6" />
      <rect x="26" y="24" width="23" height="2" fill="url(#goldGrad)" opacity="0.8" />
    </g>
    {/* اسم العلامة التجارية */}
    <text x="95" y="44" fontFamily="'Cinzel', 'Playfair Display', serif" fontSize="26" fontWeight="700" letterSpacing="4" fill="url(#goldGrad)">
      VANGUARD
    </text>
    <text x="96" y="66" fontFamily="'Montserrat', sans-serif" fontSize="11" fontWeight="500" letterSpacing="6" fill="#D4AF37">
      ATELIER ARCHITECTURE
    </text>
  </svg>
);

function App() {
  const [data, updateData] = useSiteData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [tempData, setTempData] = useState(data);

  // تحديث السلايدر تلقائياً
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [data.heroSlides.length]);

  const filteredProjects = selectedCategory === "الكل" 
    ? data.projects 
    : data.projects.filter(p => p.category === selectedCategory);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === "1234" || adminPass === "admin2026") {
      setAdminAuth(true);
      setTempData(data);
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  const handleSaveData = () => {
    updateData(tempData);
    alert("تم حفظ وتحديث جميع البيانات بنجاح!");
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white selection:bg-[#c5a059] selection:text-black">
      
      {/* 1. الشريط العلوي الفاخر */}
      <header className="sticky top-0 z-40 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-[#262626] px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-10 md:h-12 w-auto" />
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href={`tel:${data.brand.phone}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-[#c5a059]/40 hover:border-[#c5a059] text-[#c5a059] transition-all rounded-full"
          >
            <Phone size={14} />
            <span>اتصل بنا</span>
          </a>
          <button 
            onClick={() => setShowAdmin(true)} 
            className="p-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-neutral-300 hover:text-[#c5a059] transition-colors"
            title="لوحة التحكم"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* 2. السلايدر السينمائي العريض (Fade & Zoom Reveal) */}
      <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-black">
        {data.heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center filter brightness-[0.7]"
            />
            {/* تدرج الظل الاحترافي */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/40" />

            <div className="absolute bottom-16 md:bottom-24 inset-x-0 px-6 md:px-16 text-center max-w-4xl mx-auto">
              <span className="inline-block py-1 px-3 mb-3 text-xs tracking-widest text-[#c5a059] uppercase bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-full">
                {data.brand.name}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg text-neutral-300 max-w-2xl mx-auto mb-6">
                {slide.subtitle}
              </p>
              <a
                href={`https://wa.me/${data.brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#DFBA73] to-[#9E7831] text-black font-bold text-sm tracking-wide rounded-full hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                <MessageCircle size={18} />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        ))}

        {/* نقاط التحكم في السلايدر */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center items-center gap-2 z-20">
          {data.heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === currentSlide ? "w-8 bg-[#c5a059]" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 3. شريط الإحصائيات والأرقام التفاعلية */}
      <section className="py-10 bg-[#141414] border-y border-[#262626]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#c5a059] font-mono">
              {data.brand.yearsExperience}
            </div>
            <div className="text-xs md:text-sm text-neutral-400 mt-1">سنوات من الخبرة</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#c5a059] font-mono">
              {data.brand.completedProjects}
            </div>
            <div className="text-xs md:text-sm text-neutral-400 mt-1">مشروع تم تسليمه</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#c5a059] font-mono">
              {data.brand.satisfiedClients}
            </div>
            <div className="text-xs md:text-sm text-neutral-400 mt-1">عميل يثق بنا</div>
          </div>
        </div>
      </section>

      {/* 4. نبذة عن الشركة (About) */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">من نحن</span>
        <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-6">رؤية تتجاوز المألوف في التصميم والتنفيذ</h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          {data.brand.aboutText}
        </p>
      </section>

      {/* 5. قسم 3D vs Reality (المقارنة الواقعية) */}
      <section className="py-16 bg-[#121212] border-y border-[#262626]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c5a059]">المصداقية الهندسية</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">{data.comparison.title}</h2>
            <p className="text-xs md:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">{data.comparison.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* 3D Render */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img 
                src={data.comparison.renderImage} 
                alt="3D Design" 
                className="w-full h-72 md:h-96 object-cover transform group-hover:scale-105 transition-all duration-700"
              />
              <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] px-3 py-1 rounded-full text-xs font-bold">
                تصميم 3D مقترح
              </span>
            </div>

            {/* Real Execution */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <img 
                src={data.comparison.realImage} 
                alt="Real Execution" 
                className="w-full h-72 md:h-96 object-cover transform group-hover:scale-105 transition-all duration-700"
              />
              <span className="absolute top-4 right-4 bg-[#c5a059] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                الواقع بعد التنفيذ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. المشاريع وأزرار الفلترة (Filter Pills) */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c5a059]">معرض الأعمال</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">مشاريع صُنعت بفخامة</h2>
          </div>

          {/* أزرار الفلترة المستديرة مثل Clear Vision */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {data.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? "bg-[#c5a059] text-black" 
                    : "bg-[#1c1c1c] text-neutral-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة المشاريع */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#171717] rounded-xl overflow-hidden border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-[10px] font-bold text-neutral-300 px-2.5 py-1 rounded-full border border-white/10">
                  {project.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-white group-hover:text-[#c5a059] transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. شريط الشركاء والخامات (Brands Marquee) */}
      <section className="py-12 bg-[#121212] border-t border-[#262626] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-500">شركاء النجاح والخامات المعتمدة</span>
        </div>
        <div className="flex justify-center flex-wrap gap-6 md:gap-12 px-6 opacity-70">
          {data.partners.map((partner, index) => (
            <div key={index} className="text-sm md:text-base font-semibold text-neutral-400 hover:text-[#c5a059] transition-colors">
              • {partner}
            </div>
          ))}
        </div>
      </section>

      {/* 8. تذييل الصفحة الفاخر (Footer) */}
      <footer className="bg-[#0a0a0a] border-t border-[#262626] pt-12 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <BrandLogo className="h-12 w-auto mb-4" />
          <p className="text-xs text-neutral-500 max-w-md mb-6">{data.brand.tagline}</p>
          <div className="text-xs text-neutral-500 space-y-1">
            <p>{data.brand.address}</p>
            <p>{data.brand.phone} | {data.brand.email}</p>
          </div>
          <p className="text-[11px] text-neutral-600 mt-8">© 2026 {data.brand.name}. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* 9. الأزرار العائمة الدائمة (Floating CTAs) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <a 
          href={`https://wa.me/${data.brand.whatsapp}`} 
          target="_blank" 
          rel="noreferrer"
          className="w-13 h-13 p-3.5 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all flex items-center justify-center"
          title="واتساب مباشر"
        >
          <MessageCircle size={24} />
        </a>
        <a 
          href={`tel:${data.brand.phone}`} 
          className="w-13 h-13 p-3.5 bg-gradient-to-r from-[#DFBA73] to-[#9E7831] text-black rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-all flex items-center justify-center"
          title="اتصال هاتفي"
        >
          <Phone size={22} />
        </a>
      </div>

      {/* 10. شاشة لوحة التحكم المنفصلة (Admin Panel Modal) */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-[#333] w-full max-w-2xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            
            {/* هيدر اللوحة */}
            <div className="p-4 border-b border-[#262626] flex items-center justify-between bg-[#1b1b1b]">
              <div className="flex items-center gap-2">
                <Settings className="text-[#c5a059]" size={20} />
                <h3 className="font-bold text-sm text-white">لوحة تحكم الموقع (Dashboard)</h3>
              </div>
              <button 
                onClick={() => setShowAdmin(false)} 
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* محتوى اللوحة */}
            <div className="p-6 overflow-y-auto space-y-6 text-right">
              {!adminAuth ? (
                // شاشة التحقق السرية
                <form onSubmit={handleAdminLogin} className="space-y-4 py-8 max-w-sm mx-auto text-center">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-[#c5a059]">
                    <Lock size={24} />
                  </div>
                  <h4 className="font-bold text-base">تسجيل دخول الإدارة</h4>
                  <p className="text-xs text-neutral-400">أدخل كلمة المرور لتعديل نصوص وصور الموقع (الافتراضي: 1234)</p>
                  <input 
                    type="password" 
                    value={adminPass} 
                    onChange={(e) => setAdminPass(e.target.value)} 
                    placeholder="كلمة المرور"
                    className="w-full bg-[#202020] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-center text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d8b368] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    دخول
                  </button>
                </form>
              ) : (
                // شاشة التعديل الكامل للعميل
                <div className="space-y-6">
                  {/* بيانات الاتصال والبراند */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">بيانات الشركة والتواصل</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">اسم العلامة</label>
                        <input 
                          type="text" 
                          value={tempData.brand.name} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, name: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">الهاتف</label>
                        <input 
                          type="text" 
                          value={tempData.brand.phone} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, phone: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-left" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">رقم واتساب (بدون +)</label>
                        <input 
                          type="text" 
                          value={tempData.brand.whatsapp} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, whatsapp: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-left" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">العنوان</label>
                        <input 
                          type="text" 
                          value={tempData.brand.address} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, address: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* نصوص الإحصائيات */}
                  <div className="space-y-3 border-t border-[#262626] pt-4">
                    <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">الأرقام والإحصائيات</h4>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">سنوات الخبرة</label>
                        <input 
                          type="text" 
                          value={tempData.brand.yearsExperience} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, yearsExperience: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-center" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">المشاريع</label>
                        <input 
                          type="text" 
                          value={tempData.brand.completedProjects} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, completedProjects: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-center" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">العملاء</label>
                        <input 
                          type="text" 
                          value={tempData.brand.satisfiedClients} 
                          onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, satisfiedClients: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-center" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* نبذة عن الشركة */}
                  <div className="space-y-2 border-t border-[#262626] pt-4">
                    <label className="block text-xs font-bold text-[#c5a059]">نص "من نحن"</label>
                    <textarea 
                      rows={3} 
                      value={tempData.brand.aboutText} 
                      onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, aboutText: e.target.value}})}
                      className="w-full bg-[#222] border border-white/10 rounded p-2 text-xs text-white"
                    />
                  </div>

                  {/* صور 3D vs Reality */}
                  <div className="space-y-3 border-t border-[#262626] pt-4">
                    <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">روابط صور 3D vs الواقع</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1">رابط صورة 3D</label>
                        <input 
                          type="text" 
                          value={tempData.comparison.renderImage} 
                          onChange={(e) => setTempData({...tempData, comparison: {...tempData.comparison, renderImage: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-left font-mono text-[10px]" 
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">رابط صورة الواقع</label>
                        <input 
                          type="text" 
                          value={tempData.comparison.realImage} 
                          onChange={(e) => setTempData({...tempData, comparison: {...tempData.comparison, realImage: e.target.value}})}
                          className="w-full bg-[#222] border border-white/10 rounded p-2 text-white text-left font-mono text-[10px]" 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* أزرار الحفظ بالأسفل */}
            {adminAuth && (
              <div className="p-4 border-t border-[#262626] bg-[#1a1a1a] flex items-center justify-between">
                <button 
                  onClick={() => setShowAdmin(false)} 
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleSaveData} 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#c5a059] hover:bg-[#d8b368] text-black font-bold text-xs rounded-lg transition-all shadow-md"
                >
                  <Check size={16} />
                  حفظ التعديلات فوراً
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
