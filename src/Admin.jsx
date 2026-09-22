import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  Plus, 
  Trash2, 
  UploadCloud, 
  Save, 
  Check, 
  Image as ImageIcon,
  ArrowRight,
  Sliders,
  Layers,
  PhoneCall,
  Eye
} from 'lucide-react';

// دالة لضغط الصور تلقائياً داخل المتصفح (حتى 10 ميجا إلى أقل من 300KB)
const compressImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1600;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // تصدير بجودة 82% عالية النقاء وحجم صغير جداً
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function Admin({ siteData, onSaveSiteData, onExitAdmin }) {
  const [data, setData] = useState(siteData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // tabs: projects, categories, hero, comparison, brand, security
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // حالات إضافة مشروع جديد
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState(data.categories[1] || 'فلل وقصور');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjImage, setNewProjImage] = useState('');

  // حالات إضافة قسم جديد
  const [newCategoryName, setNewCategoryName] = useState('');

  // حالات إضافة شريحة سلايدر جديدة
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideImage, setNewSlideImage] = useState('');

  // التحقق من تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    if (enteredPasscode === (data.adminConfig?.passcode || '1234')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.');
    }
  };

  // معالجة رفع وضغط الصور (Drop أو File Input من الاستوديو)
  const processUploadedImage = async (file, targetSetter) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح.');
      return;
    }
    try {
      const compressedData = await compressImageFile(file);
      targetSetter(compressedData);
    } catch (error) {
      alert('حدث خطأ أثناء معالجة وضغط الصورة.');
    }
  };

  // حفظ التعديلات في النظام
  const triggerSave = (updatedData) => {
    const finalData = updatedData || data;
    setData(finalData);
    onSaveSiteData(finalData);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2800);
  };

  // 1. إضافة وحذف المشاريع
  const handleAddProject = () => {
    if (!newProjTitle.trim() || !newProjImage) {
      alert('يرجى كتابة اسم المشروع ورفع الصورة.');
      return;
    }
    const newProject = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      category: newProjCategory,
      image: newProjImage,
      description: newProjDesc.trim() || 'تشطيبات وتصميم فائق الفخامة والجودة.'
    };
    const updated = { ...data, projects: [newProject, ...data.projects] };
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjImage('');
    triggerSave(updated);
  };

  const handleDeleteProject = (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) return;
    const updated = { ...data, projects: data.projects.filter(p => p.id !== id) };
    triggerSave(updated);
  };

  // 2. إضافة وحذف الأقسام
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    if (data.categories.includes(newCategoryName.trim())) {
      alert('هذا القسم موجود بالفعل.');
      return;
    }
    const updated = { ...data, categories: [...data.categories, newCategoryName.trim()] };
    setNewCategoryName('');
    triggerSave(updated);
  };

  const handleDeleteCategory = (cat) => {
    if (cat === 'الكل') {
      alert('لا يمكن حذف القسم الافتراضي (الكل).');
      return;
    }
    if (!window.confirm(`هل أنت متأكد من حذف قسم "${cat}"؟`)) return;
    const updated = { ...data, categories: data.categories.filter(c => c !== cat) };
    triggerSave(updated);
  };

  // 3. إضافة وحذف السلايدر
  const handleAddSlide = () => {
    if (!newSlideTitle.trim() || !newSlideImage) {
      alert('يرجى تحديد عنوان وشريحة صورة للسلايدر.');
      return;
    }
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: newSlideTitle.trim(),
      subtitle: newSlideSubtitle.trim(),
      image: newSlideImage
    };
    const updated = { ...data, heroSlides: [...data.heroSlides, newSlide] };
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setNewSlideImage('');
    triggerSave(updated);
  };

  const handleDeleteSlide = (id) => {
    if (data.heroSlides.length <= 1) {
      alert('يجب الإبقاء على شريحة واحدة على الأقل في السلايدر.');
      return;
    }
    const updated = { ...data, heroSlides: data.heroSlides.filter(s => s.id !== id) };
    triggerSave(updated);
  };

  // شاشة تسجيل الدخول المعزولة
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-box">
          <div className="admin-lock-icon">
            <Lock size={32} color="#c5a059" />
          </div>
          <h2 className="admin-login-title">بوابة الإدارة المركزية</h2>
          <p className="admin-login-sub">منصة VANGUARD ATELIER الخاصة بالإدارة والتحكم</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>رمز الدخول السري</label>
              <input
                type="password"
                placeholder="أدخل رمز الدخول..."
                value={enteredPasscode}
                onChange={(e) => setEnteredPasscode(e.target.value)}
                autoFocus
              />
            </div>

            {authError && <div className="admin-error-text">{authError}</div>}

            <button type="submit" className="btn-gold-wide">
              <KeyRound size={18} />
              دخول للوحة التحكم
            </button>
          </form>

          <button onClick={onExitAdmin} className="admin-back-site-btn">
            <ArrowRight size={16} /> العودة للواجهة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      {/* الشريط العلوي للوحة الإدارة */}
      <header className="admin-top-bar">
        <div className="admin-bar-info">
          <h2>لوحة الإدارة المركزية</h2>
          <span>{data.brand.name}</span>
        </div>
        <div className="admin-top-actions">
          {saveSuccessNotice && (
            <span className="save-badge-notice">
              <Check size={16} /> تم الحفظ بنجاح
            </span>
          )}
          <button onClick={onExitAdmin} className="btn-outline-gold">
            <Eye size={16} /> استعراض الموقع
          </button>
        </div>
      </header>

      {/* شريط تبويبات الأقسام */}
      <nav className="admin-tabs-nav">
        <button className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          المشاريع والكتالوج
        </button>
        <button className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          الأقسام والتصنيفات
        </button>
        <button className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`} onClick={() => setActiveTab('hero')}>
          سلايدر الواجهة
        </button>
        <button className={`admin-tab-btn ${activeTab === 'comparison' ? 'active' : ''}`} onClick={() => setActiveTab('comparison')}>
          مقارنة 3D والواقع
        </button>
        <button className={`admin-tab-btn ${activeTab === 'brand' ? 'active' : ''}`} onClick={() => setActiveTab('brand')}>
          بيانات الشركة والتواصل
        </button>
        <button className={`admin-tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          الأمان وكلمة المرور
        </button>
      </nav>

      {/* محتوى التبويبات */}
      <main className="admin-main-container">

        {/* 1. تبويب المشاريع */}
        {activeTab === 'projects' && (
          <div className="admin-panel-card">
            <h3>إضافة مشروع جديد للكتالوج التفاعلي</h3>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>اسم المشروع</label>
                <input 
                  type="text" 
                  placeholder="مثال: فيلا سكنية - التجمع الخامس" 
                  value={newProjTitle} 
                  onChange={(e) => setNewProjTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>القسم / التصنيف</label>
                <select value={newProjCategory} onChange={(e) => setNewProjCategory(e.target.value)}>
                  {data.categories.filter(c => c !== 'الكل').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>وصف مختصر للمشروع</label>
                <input 
                  type="text" 
                  placeholder="تفاصيل التشطيب والمساحة ونمط التصميم..." 
                  value={newProjDesc} 
                  onChange={(e) => setNewProjDesc(e.target.value)} 
                />
              </div>

              {/* منطقة سحب وإفلات للكمبيوتر واختيار المعرض حصراً للموبايل */}
              <div className="form-group full-width">
                <label>صورة المشروع (سحب وإفلات أو اختيار من الاستوديو)</label>
                <div 
                  className="upload-dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      processUploadedImage(e.dataTransfer.files[0], setNewProjImage);
                    }
                  }}
                >
                  {newProjImage ? (
                    <div className="preview-wrap">
                      <img src={newProjImage} alt="Preview" className="preview-thumb" />
                      <button className="btn-small-danger" onClick={() => setNewProjImage('')}>حذف الصورة</button>
                    </div>
                  ) : (
                    <div className="dropzone-prompt">
                      <UploadCloud size={32} color="#c5a059" />
                      <p>اسحب الصورة وأفلتها هنا (للكمبيوتر)</p>
                      <label className="btn-upload-label">
                        اختيار من استوديو الموبايل
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              processUploadedImage(e.target.files[0], setNewProjImage);
                            }
                          }}
                        />
                      </label>
                      <span className="compression-note">يتم ضغط الصورة تلقائياً لتوفير باقة الهاتف وسرعة التصفح</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <button className="btn-gold-wide" onClick={handleAddProject}>
                  <Plus size={18} /> إضافة المشروع للكتالوج فوراً
                </button>
              </div>
            </div>

            <hr className="admin-divider" />

            <h3>المشاريع المعروضة حالياً ({data.projects.length})</h3>
            <div className="admin-items-list">
              {data.projects.map((proj) => (
                <div key={proj.id} className="admin-item-row">
                  <img src={proj.image} alt={proj.title} className="item-mini-img" />
                  <div className="item-meta">
                    <h4>{proj.title}</h4>
                    <span className="item-category-tag">{proj.category}</span>
                    <p>{proj.description}</p>
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteProject(proj.id)} title="حذف المشروع">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. تبويب الأقسام والتصنيفات */}
        {activeTab === 'categories' && (
          <div className="admin-panel-card">
            <h3>إدارة وتخصيص أقسام وفلاتر الكتالوج</h3>
            <div className="add-category-row">
              <input 
                type="text" 
                placeholder="اسم القسم الجديد (مثال: قصور ملكية، لاندسكيب، مكاتب)..." 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button className="btn-gold" onClick={handleAddCategory}>
                <Plus size={18} /> إضافة القسم
              </button>
            </div>

            <div className="categories-chips-grid">
              {data.categories.map((cat) => (
                <div key={cat} className="category-admin-chip">
                  <span>{cat}</span>
                  {cat !== 'الكل' && (
                    <button onClick={() => handleDeleteCategory(cat)} className="chip-del-btn" title="حذف هذا القسم">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. تبويب سلايدر الواجهة */}
        {activeTab === 'hero' && (
          <div className="admin-panel-card">
            <h3>إدارة شرائح البانر الرئيسي العريض (Hero Slider)</h3>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>عنوان الشريحة</label>
                <input 
                  type="text" 
                  placeholder="مثال: تصاميم عصرية استثنائية" 
                  value={newSlideTitle} 
                  onChange={(e) => setNewSlideTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>الوصف الفرعي</label>
                <input 
                  type="text" 
                  placeholder="مثال: تناغم هندسي يجسد الفخامة..." 
                  value={newSlideSubtitle} 
                  onChange={(e) => setNewSlideSubtitle(e.target.value)} 
                />
              </div>

              <div className="form-group full-width">
                <label>صورة السلايدر العريضة</label>
                <div className="upload-dropzone">
                  {newSlideImage ? (
                    <div className="preview-wrap">
                      <img src={newSlideImage} alt="Preview" className="preview-thumb" />
                      <button className="btn-small-danger" onClick={() => setNewSlideImage('')}>حذف الصورة</button>
                    </div>
                  ) : (
                    <div className="dropzone-prompt">
                      <UploadCloud size={30} color="#c5a059" />
                      <label className="btn-upload-label">
                        رفع صورة السلايدر (من الاستوديو أو الكمبيوتر)
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              processUploadedImage(e.target.files[0], setNewSlideImage);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <button className="btn-gold-wide" onClick={handleAddSlide}>
                  <Plus size={18} /> إضافة الشريحة للسلايدر
                </button>
              </div>
            </div>

            <hr className="admin-divider" />

            <div className="admin-items-list">
              {data.heroSlides.map((slide) => (
                <div key={slide.id} className="admin-item-row">
                  <img src={slide.image} alt={slide.title} className="item-mini-img wide" />
                  <div className="item-meta">
                    <h4>{slide.title}</h4>
                    <p>{slide.subtitle}</p>
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteSlide(slide.id)} title="حذف الشريحة">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. تبويب مقارنة 3D والواقع */}
        {activeTab === 'comparison' && (
          <div className="admin-panel-card">
            <h3>تعديل صور وبيانات المقارنة الواقعية (3D vs Reality)</h3>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>عنوان القسم</label>
                <input 
                  type="text" 
                  value={data.comparison.title} 
                  onChange={(e) => setData({ ...data, comparison: { ...data.comparison, title: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>الوصف التوضيحي</label>
                <input 
                  type="text" 
                  value={data.comparison.description} 
                  onChange={(e) => setData({ ...data, comparison: { ...data.comparison, description: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>صورة التصميم 3D (الريندر)</label>
                <div className="upload-dropzone compact">
                  <img src={data.comparison.renderImage} alt="Render" className="preview-thumb" />
                  <label className="btn-upload-label mt-2">
                    تغيير صورة 3D
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processUploadedImage(e.target.files[0], (img) => {
                            const updated = { ...data, comparison: { ...data.comparison, renderImage: img } };
                            triggerSave(updated);
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>صورة الواقع الفعلي (بعد التنفيذ)</label>
                <div className="upload-dropzone compact">
                  <img src={data.comparison.realImage} alt="Real" className="preview-thumb" />
                  <label className="btn-upload-label mt-2">
                    تغيير صورة الواقع
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processUploadedImage(e.target.files[0], (img) => {
                            const updated = { ...data, comparison: { ...data.comparison, realImage: img } };
                            triggerSave(updated);
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group full-width">
                <button className="btn-gold" onClick={() => triggerSave(data)}>
                  <Save size={18} /> حفظ نصوص المقارنة
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. تبويب بيانات الشركة والتواصل */}
        {activeTab === 'brand' && (
          <div className="admin-panel-card">
            <h3>تعديل هوية ونصوص وروابط التواصل</h3>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>اسم الشركة المعماري</label>
                <input 
                  type="text" 
                  value={data.brand.name} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, name: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>الوصف الفرعي باللاتينية</label>
                <input 
                  type="text" 
                  value={data.brand.subtitle} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, subtitle: e.target.value } })} 
                />
              </div>

              <div className="form-group full-width">
                <label>الشعار اللفظي (Tagline)</label>
                <input 
                  type="text" 
                  value={data.brand.tagline} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, tagline: e.target.value } })} 
                />
              </div>

              <div className="form-group full-width">
                <label>نص نبذة "من نحن" وفلسفة العمل</label>
                <textarea 
                  rows={4}
                  value={data.brand.aboutText} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, aboutText: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>سنوات الخبرة (مثال: 15+)</label>
                <input 
                  type="text" 
                  value={data.brand.yearsExperience} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, yearsExperience: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>المشاريع المكتملة (مثال: 240+)</label>
                <input 
                  type="text" 
                  value={data.brand.completedProjects} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, completedProjects: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>العملاء الراضون (مثال: 180+)</label>
                <input 
                  type="text" 
                  value={data.brand.satisfiedClients} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, satisfiedClients: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>رقم الهاتف للاتصال المباشر</label>
                <input 
                  type="text" 
                  value={data.brand.phone} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, phone: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>رقم الواتساب (بالكود الدولي مثل 2010...)</label>
                <input 
                  type="text" 
                  value={data.brand.whatsapp} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, whatsapp: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني للشركة</label>
                <input 
                  type="email" 
                  value={data.brand.email} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, email: e.target.value } })} 
                />
              </div>

              <div className="form-group full-width">
                <label>العنوان والمقر</label>
                <input 
                  type="text" 
                  value={data.brand.address} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, address: e.target.value } })} 
                />
              </div>

              <div className="form-group">
                <label>رابط صفحة فيسبوك</label>
                <input 
                  type="text" 
                  value={data.brand.socials.facebook} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, socials: { ...data.brand.socials, facebook: e.target.value } } })} 
                />
              </div>

              <div className="form-group">
                <label>رابط حساب إنستغرام</label>
                <input 
                  type="text" 
                  value={data.brand.socials.instagram} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, socials: { ...data.brand.socials, instagram: e.target.value } } })} 
                />
              </div>

              <div className="form-group">
                <label>رابط قناة / حساب تليجرام</label>
                <input 
                  type="text" 
                  value={data.brand.socials.telegram} 
                  onChange={(e) => setData({ ...data, brand: { ...data.brand, socials: { ...data.brand.socials, telegram: e.target.value } } })} 
                />
              </div>

              <div className="form-group full-width">
                <button className="btn-gold-wide" onClick={() => triggerSave(data)}>
                  <Save size={18} /> حفظ بيانات وهوية الشركة بالكامل
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. تبويب الأمان وكلمة المرور */}
        {activeTab === 'security' && (
          <div className="admin-panel-card">
            <h3>إعدادات الأمان وتغيير كلمة المرور</h3>
            <div className="admin-form-grid" style={{ maxWidth: '480px' }}>
              <div className="form-group full-width">
                <label>كلمة المرور الجديدة للوحة التحكم</label>
                <input 
                  type="text" 
                  placeholder="اكتب الرمز الجديد هنا..." 
                  value={data.adminConfig?.passcode || ''} 
                  onChange={(e) => setData({ ...data, adminConfig: { ...data.adminConfig, passcode: e.target.value } })} 
                />
              </div>

              <div className="form-group full-width">
                <button className="btn-gold-wide" onClick={() => triggerSave(data)}>
                  <Save size={18} /> تحديث كلمة المرور وحفظها
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

