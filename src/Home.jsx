import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Send, 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  Share2, 
  Maximize2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Home({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImageZoom, setActiveImageZoom] = useState(null);

  // السلايدر التلقائي
  useEffect(() => {
    if (!data.heroSlides || data.heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [data.heroSlides]);

  const filteredProjects = selectedCategory === "الكل"
    ? data.projects
    : data.projects.filter(p => p.category === selectedCategory);

  const handleShare = (project) => {
    const text = `شاهد هذا التصميم المعماري الفاخر من ${data.brand.name}: ${project.title}`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: project.title, text, url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
  };

  return (
    <div className="home-wrapper">
      {/* 1. الهيدر الزجاجي الفاخر */}
      <header className="site-header">
        <div className="header-brand">
          <svg className="header-logo-svg" viewBox="0 0 100 100" fill="none">
            <path d="M20 15L50 85L80 15H62L50 58L38 15H20Z" fill="url(#goldHdr)" />
            <defs>
              <linearGradient id="goldHdr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA73" />
                <stop offset="50%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#9E7831" />
              </linearGradient>
            </defs>
          </svg>
          <div className="header-titles">
            <span className="brand-name">{data.brand.name}</span>
            <span className="brand-sub">{data.brand.subtitle}</span>
          </div>
        </div>

        <button className="menu-toggle-btn" onClick={() => setMenuOpen(true)} aria-label="القائمة">
          <Menu size={24} />
        </button>
      </header>

      {/* 2. القائمة المنبثقة الجانبية (Slide-over Drawer) */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title">{data.brand.name}</span>
              <button className="drawer-close-btn" onClick={() => setMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <nav className="drawer-nav">
              <a href="#hero" onClick={() => setMenuOpen(false)}>الرئيسية</a>
              <a href="#projects" onClick={() => setMenuOpen(false)}>معرض الأعمال</a>
              <a href="#process" onClick={() => setMenuOpen(false)}>مراحل التنفيذ</a>
              <a href="#comparison" onClick={() => setMenuOpen(false)}>3D مقابل الواقع</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>من نحن</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
            </nav>

            <div className="drawer-socials">
              <a href={data.brand.socials.facebook} target="_blank" rel="noreferrer"><Facebook size={20} /></a>
              <a href={data.brand.socials.instagram} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
              <a href={data.brand.socials.telegram} target="_blank" rel="noreferrer"><Send size={20} /></a>
              <a href={`https://wa.me/${data.brand.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /></a>
            </div>
          </div>
        </div>
      )}

      {/* 3. البانر الرئيسي السينمائي (Hero Slider) */}
      <section id="hero" className="hero-section">
        {data.heroSlides.map((slide, idx) => (
          <div key={slide.id} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
            <img src={slide.image} alt={slide.title} className="hero-bg-img" />
            <div className="hero-vignette"></div>
            <div className="hero-content">
              <span className="hero-kicker"><Sparkles size={14} style={{ display: 'inline', marginLeft: '6px' }} />{data.brand.name}</span>
              <h2 className="hero-heading">{slide.title}</h2>
              <p className="hero-description">{slide.subtitle}</p>
              <div className="hero-actions">
                <a href={`https://wa.me/${data.brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn-gold">
                  <MessageCircle size={18} />
                  استشارة عبر واتساب
                </a>
                <a href="#projects" className="btn-outline">
                  استكشف الأعمال
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="hero-pagination">
          {data.heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)} 
              className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* 4. شريط الأرقام والخبرة */}
      <section className="stats-strip">
        <div className="stat-box">
          <span className="stat-number">{data.brand.yearsExperience}</span>
          <span className="stat-label">سنوات خبرة</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{data.brand.completedProjects}</span>
          <span className="stat-label">مشروعاً مكتملاً</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{data.brand.satisfiedClients}</span>
          <span className="stat-label">عميل يثق بنا</span>
        </div>
      </section>

      {/* 5. الكتالوج الدوار التفاعلي (Horizontal Carousel) */}
      <section id="projects" className="section-block">
        <div className="section-title-wrap">
          <span className="section-subtitle">سابقة الأعمال الملكية</span>
          <h2 className="section-main-title">كتالوج المشاريع الاستثنائية</h2>
        </div>

        {/* كبسولات الفلترة الأفقية */}
        <div className="filter-pills-bar">
          {data.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* مسار الكتالوج الأفقي القابل للتمرير والسحب */}
        <div className="horizontal-catalog">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="catalog-card">
              <div className="card-thumb" onClick={() => setActiveImageZoom(proj.image)}>
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <span className="card-tag">{proj.category}</span>
                <button className="card-zoom-btn" title="تكبير بملء الشاشة">
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="card-body">
                <h3 className="card-title">{proj.title}</h3>
                <p className="card-desc">{proj.description}</p>
                <div className="card-foot">
                  <button className="card-share-btn" onClick={() => handleShare(proj)}>
                    <Share2 size={16} />
                    مشاركة
                  </button>
                  <a 
                    href={`https://wa.me/${data.brand.whatsapp}?text=${encodeURIComponent(`أرغب بالاستفسار عن مشروع: ${proj.title}`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="card-inquire-link"
                  >
                    طلب معاينة
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. مراحل وخطوات التنفيذ الهندسي */}
      <section id="process" className="section-block bg-subtle">
        <div className="section-title-wrap">
          <span className="section-subtitle">منهجية العمل المتقنة</span>
          <h2 className="section-main-title">مراحل تنفيذ مشروعك المعماري</h2>
        </div>

        <div className="steps-grid">
          {data.processSteps.map((step) => (
            <div key={step.step} className="step-card">
              <div className="step-badge">{step.step}</div>
              <h3 className="step-name">{step.title}</h3>
              <p className="step-text">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. قسم المقارنة الواقعية (3D vs Reality) */}
      <section id="comparison" className="section-block">
        <div className="section-title-wrap">
          <span className="section-subtitle">المصداقية وجودة التسليم</span>
          <h2 className="section-main-title">{data.comparison.title}</h2>
          <p className="section-lead-text">{data.comparison.description}</p>
        </div>

        <div className="compare-duo">
          <div className="compare-item">
            <div className="compare-img-wrap" onClick={() => setActiveImageZoom(data.comparison.renderImage)}>
              <img src={data.comparison.renderImage} alt="3D Render" />
              <span className="compare-label render">تصميم 3D مقترح</span>
            </div>
          </div>
          <div className="compare-item">
            <div className="compare-img-wrap" onClick={() => setActiveImageZoom(data.comparison.realImage)}>
              <img src={data.comparison.realImage} alt="Real Execution" />
              <span className="compare-label real">الواقع بعد التنفيذ الفعلي</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. نبذة "من نحن" الكاملة */}
      <section id="about" className="section-block bg-subtle">
        <div className="about-container">
          <span className="section-subtitle">هويتنا ومسيرتنا</span>
          <h2 className="section-main-title">{data.brand.aboutTitle}</h2>
          <p className="about-narrative">{data.brand.aboutText}</p>
          <div className="about-values">
            <div className="value-pill"><CheckCircle2 size={16} color="#c5a059" /> إشراف هندسي يومي دقيق</div>
            <div className="value-pill"><CheckCircle2 size={16} color="#c5a059" /> خامات عالمية معتمدة وموثقة</div>
            <div className="value-pill"><CheckCircle2 size={16} color="#c5a059" /> الالتزام الصارم بجدول التسليم</div>
          </div>
        </div>
      </section>

      {/* 9. شريط الشركاء والخامات المعتمدة */}
      <div className="partners-strip">
        <div className="partners-track">
          {data.partners.concat(data.partners).map((partner, i) => (
            <span key={i} className="partner-chip">✦ {partner}</span>
          ))}
        </div>
      </div>

      {/* 10. التذييل الرسمي الفاخر وروابط السوشيال كاملة */}
      <footer id="contact" className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-box">
            <h3 className="footer-brand-title">{data.brand.name}</h3>
            <p className="footer-tagline">{data.brand.tagline}</p>
          </div>

          <div className="footer-contacts">
            <div className="contact-row"><MapPin size={18} color="#c5a059" /> <span>{data.brand.address}</span></div>
            <div className="contact-row"><Phone size={18} color="#c5a059" /> <a href={`tel:${data.brand.phone}`}>{data.brand.phone}</a></div>
            <div className="contact-row"><Mail size={18} color="#c5a059" /> <a href={`mailto:${data.brand.email}`}>{data.brand.email}</a></div>
          </div>

          <div className="footer-social-icons">
            <a href={data.brand.socials.facebook} target="_blank" rel="noreferrer" title="Facebook"><Facebook size={22} /></a>
            <a href={data.brand.socials.instagram} target="_blank" rel="noreferrer" title="Instagram"><Instagram size={22} /></a>
            <a href={data.brand.socials.telegram} target="_blank" rel="noreferrer" title="Telegram"><Send size={22} /></a>
            <a href={`https://wa.me/${data.brand.whatsapp}`} target="_blank" rel="noreferrer" title="WhatsApp"><MessageCircle size={22} /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {data.brand.name}. جميع الحقوق محفوظة لشركة ڤانجارد أتيليه.</span>
        </div>
      </footer>

      {/* 11. الأزرار العائمة الثابتة على الهاتف */}
      <div className="floating-action-buttons">
        <a 
          href={`https://wa.me/${data.brand.whatsapp}`} 
          target="_blank" 
          rel="noreferrer" 
          className="fab fab-whatsapp"
          title="واتساب مباشر"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href={`tel:${data.brand.phone}`} 
          className="fab fab-phone"
          title="اتصال مباشر"
        >
          <Phone size={26} />
        </a>
      </div>

      {/* 12. نافذة تكبير الصور (Lightbox Modal) */}
      {activeImageZoom && (
        <div className="lightbox-overlay" onClick={() => setActiveImageZoom(null)}>
          <button className="lightbox-close" onClick={() => setActiveImageZoom(null)}>✕</button>
          <img src={activeImageZoom} alt="Enlarged" className="lightbox-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

