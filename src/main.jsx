import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Phone, 
  MessageCircle, 
  Settings, 
  X, 
  Check, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import { initialSiteData } from './data';
import './styles.css';

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

const BrandLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <path d="M20 15L50 85L80 15H62L50 58L38 15H20Z" fill="url(#goldLogoGrad)" />
      <defs>
        <linearGradient id="goldLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBA73" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9E7831" />
        </linearGradient>
      </defs>
    </svg>
    <div>
      <div className="brand-title">VANGUARD</div>
      <span className="brand-sub">ATELIER ARCHITECTURE</span>
    </div>
  </div>
);

function App() {
  const [data, updateData] = useSiteData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [tempData, setTempData] = useState(data);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5000);
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
    <div>
      {/* 1. الشريط العلوي */}
      <header className="site-header">
        <BrandLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setShowAdmin(true)} 
            style={{
              background: '#1a1c23',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#c5a059',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="لوحة التحكم"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* 2. السلايدر السينمائي الفاخر */}
      <section className="hero-container">
        {data.heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} className="hero-img" />
            <div className="hero-overlay">
              <span className="hero-badge">{data.brand.name}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.subtitle}</p>
              <a 
                href={`https://wa.me/${data.brand.whatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="hero-cta"
              >
                <MessageCircle size={18} />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        ))}

        <div className="hero-dots">
          {data.heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* 3. شريط الأرقام والإحصائيات */}
      <section className="stats-bar">
        <div>
          <div className="stat-num">{data.brand.yearsExperience}</div>
          <div className="stat-label">سنوات خبرة</div>
        </div>
        <div>
          <div className="stat-num">{data.brand.completedProjects}</div>
          <div className="stat-label">مشروع منجز</div>
        </div>
        <div>
          <div className="stat-num">{data.brand.satisfiedClients}</div>
          <div className="stat-label">عميل يثق بنا</div>
        </div>
      </section>

      {/* 4. نبذة عن الشركة */}
      <section className="section-pad" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <span className="section-kicker">رؤيتنا المعمارية</span>
        <h2 className="section-title">فخامة التصميم ودقة التنفيذ</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.8', marginTop: '12px' }}>
          {data.brand.aboutText}
        </p>
      </section>

      {/* 5. قسم 3D vs Reality (المقارنة الواقعية) */}
      <section className="section-pad" style={{ background: '#0e1014' }}>
        <div className="section-head">
          <span className="section-kicker">المصداقية وجودة التسليم</span>
          <h2 className="section-title">{data.comparison.title}</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '6px' }}>{data.comparison.description}</p>
        </div>

        <div className="compare-grid">
          <div className="compare-card">
            <img src={data.comparison.renderImage} alt="3D Design" />
            <span className="compare-tag">تصميم 3D مقترح</span>
          </div>
          <div className="compare-card">
            <img src={data.comparison.realImage} alt="Real Execution" />
            <span className="compare-tag real">الواقع بعد التنفيذ</span>
          </div>
        </div>
      </section>

      {/* 6. المشاريع والفلترة الدائرية المتجاوبة */}
      <section className="section-pad">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div>
            <span className="section-kicker">معرض الأعمال</span>
            <h2 className="section-title">مشاريع استثنائية</h2>
          </div>

          <div className="filter-scroll">
            {data.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-thumb">
                <img src={project.image} alt={project.title} />
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. شريط الشركاء والخامات المعتمدة */}
      <div className="partners-wrap">
        {data.partners.map((partner, index) => (
          <span key={index} className="partner-item">◆ {partner}</span>
        ))}
      </div>

      {/* 8. الفوتر الفاخر */}
      <footer style={{ padding: '40px 20px 90px', textAlign: 'center', background: '#08080a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <BrandLogo />
        </div>
        <p style={{ color: '#737373', fontSize: '0.8rem', marginBottom: '12px' }}>{data.brand.tagline}</p>
        <p style={{ color: '#525252', fontSize: '0.75rem', lineHeight: '1.8' }}>
          {data.brand.address}<br />
          هاتف: {data.brand.phone} | بريد: {data.brand.email}
        </p>
        <div style={{ color: '#404040', fontSize: '0.7rem', marginTop: '24px' }}>
          © 2026 {data.brand.name}. جميع الحقوق محفوظة.
        </div>
      </footer>

      {/* 9. الأزرار العائمة الثابتة للهاتف */}
      <div className="floating-actions">
        <a 
          href={`https://wa.me/${data.brand.whatsapp}`} 
          target="_blank" 
          rel="noreferrer" 
          className="float-btn float-wa"
          title="واتساب مباشر"
        >
          <MessageCircle size={26} />
        </a>
        <a 
          href={`tel:${data.brand.phone}`} 
          className="float-btn float-call"
          title="اتصال هاتفي"
        >
          <Phone size={24} />
        </a>
      </div>

      {/* 10. لوحة التحكم المنفصلة التفاعلية */}
      {showAdmin && (
        <div className="admin-modal-bg">
          <div className="admin-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #262626', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dfba73' }}>لوحة تحكم VANGUARD</h3>
              <button 
                onClick={() => setShowAdmin(false)} 
                style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {!adminAuth ? (
              <form onSubmit={handleAdminLogin} style={{ textAlign: 'center', padding: '20px 0' }}>
                <Lock size={36} color="#dfba73" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ marginBottom: '8px' }}>تسجيل دخول المسؤول</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '16px' }}>كلمة المرور الافتراضية: 1234</p>
                <input 
                  type="password" 
                  value={adminPass} 
                  onChange={(e) => setAdminPass(e.target.value)} 
                  placeholder="كلمة المرور"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#1d2027',
                    border: '1px solid #374151',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1rem'
                  }}
                />
                <button 
                  type="submit" 
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#dfba73',
                    color: '#0b0c0e',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  دخول
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#dfba73', marginBottom: '4px' }}>اسم الشركة</label>
                  <input 
                    type="text" 
                    value={tempData.brand.name} 
                    onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, name: e.target.value}})}
                    style={{ width: '100%', padding: '8px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#dfba73', marginBottom: '4px' }}>رقم واتساب (بدون +)</label>
                  <input 
                    type="text" 
                    value={tempData.brand.whatsapp} 
                    onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, whatsapp: e.target.value}})}
                    style={{ width: '100%', padding: '8px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px', direction: 'ltr', textAlign: 'right' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#dfba73', marginBottom: '4px' }}>رقم الهاتف للاتصال</label>
                  <input 
                    type="text" 
                    value={tempData.brand.phone} 
                    onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, phone: e.target.value}})}
                    style={{ width: '100%', padding: '8px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px', direction: 'ltr', textAlign: 'right' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#dfba73', marginBottom: '4px' }}>نص "من نحن"</label>
                  <textarea 
                    rows={3}
                    value={tempData.brand.aboutText} 
                    onChange={(e) => setTempData({...tempData, brand: {...tempData.brand, aboutText: e.target.value}})}
                    style={{ width: '100%', padding: '8px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#dfba73', marginBottom: '4px' }}>رابط صورة 3D</label>
                    <input 
                      type="text" 
                      value={tempData.comparison.renderImage} 
                      onChange={(e) => setTempData({...tempData, comparison: {...tempData.comparison, renderImage: e.target.value}})}
                      style={{ width: '100%', padding: '6px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px', fontSize: '0.7rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#dfba73', marginBottom: '4px' }}>رابط صورة الواقع</label>
                    <input 
                      type="text" 
                      value={tempData.comparison.realImage} 
                      onChange={(e) => setTempData({...tempData, comparison: {...tempData.comparison, realImage: e.target.value}})}
                      style={{ width: '100%', padding: '6px', background: '#1d2027', border: '1px solid #374151', color: '#fff', borderRadius: '6px', fontSize: '0.7rem' }}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveData}
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#dfba73',
                    color: '#0b0c0e',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Check size={18} />
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
