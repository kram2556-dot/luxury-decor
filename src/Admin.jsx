import React, { useState, useRef } from 'react';
import { 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  UploadCloud, 
  Image as ImageIcon, 
  Check, 
  FolderPlus, 
  ShieldCheck, 
  Home as HomeIcon,
  Sparkles,
  Layers,
  Sliders,
  DollarSign
} from 'lucide-react';

export default function Admin({ siteData, onSaveSiteData, onExitAdmin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [saveAlert, setSaveAlert] = useState(false);

  // حقول إضافة مشروع جديد
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState(siteData.categories?.[1] || '');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjImage, setNewProjImage] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  // حقول بيانات الأمان
  const [adminEmailInput, setAdminEmailInput] = useState(siteData.adminConfig?.adminEmail || 'admin@vanguard-atelier.com');
  const [newPasscode, setNewPasscode] = useState('');

  const fileInputRef = useRef(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // التحقق من كلمة المرور
  const handleLogin = (e) => {
    e.preventDefault();
    const correctCode = siteData.adminConfig?.passcode || '1234';
    if (passcodeInput === correctCode) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // معالجة وضغط الصور بصيغة WebP الحديثة (أقل من 300KB)
  const processAndCompressImage = (file, callback) => {
    if (!file) return;
    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1600;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // تصدير الصورة بصيغة WebP عالية النقاء وبأصغر حجم
        const webpDataUrl = canvas.toDataURL('image/webp', 0.82);
        setIsCompressing(false);
        callback(webpDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processAndCompressImage(file, (compressedUrl) => {
        setNewProjImage(compressedUrl);
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processAndCompressImage(file, (compressedUrl) => {
        setNewProjImage(compressedUrl);
      });
    }
  };

  const notifySave = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  // إضافة وحذف المشاريع
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjTitle || !newProjImage) return;

    const newProject = {
      id: Date.now(),
      title: newProjTitle,
      category: newProjCategory || siteData.categories[0],
      description: newProjDesc,
      image: newProjImage
    };

    const updated = {
      ...siteData,
      projects: [newProject, ...siteData.projects]
    };

    onSaveSiteData(updated);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjImage('');
    notifySave();
  };

  const handleDeleteProject = (id) => {
    const updated = {
      ...siteData,
      projects: siteData.projects.filter(p => p.id !== id)
    };
    onSaveSiteData(updated);
    notifySave();
  };

  // إضافة وحذف الأقسام
  const handleAddCategory = () => {
    if (!newCategoryName || siteData.categories.includes(newCategoryName)) return;
    const updated = {
      ...siteData,
      categories: [...siteData.categories, newCategoryName]
    };
    onSaveSiteData(updated);
    setNewCategoryName('');
    notifySave();
  };

  const handleDeleteCategory = (catToDelete) => {
    if (catToDelete === "الكل") return;
    const updated = {
      ...siteData,
      categories: siteData.categories.filter(c => c !== catToDelete)
    };
    onSaveSiteData(updated);
    notifySave();
  };

  // تحديث بيانات الأمان (البريد وكلمة المرور)
  const handleUpdateSecurity = (e) => {
    e.preventDefault();
    const updated = {
      ...siteData,
      adminConfig: {
        adminEmail: adminEmailInput,
        passcode: newPasscode.trim() ? newPasscode : siteData.adminConfig.passcode
      }
    };
    onSaveSiteData(updated);
    setNewPasscode('');
    notifySave();
  };

  // شاشة تسجيل الدخول المعزولة
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="login-icon-box">
            <Lock size={32} color="#c5a059" />
          </div>
          <h2>لوحة تحكم VANGUARD المعزولة</h2>
          <p>بوابة إدارة المحتوى المعماري والوسائط</p>
          <form onSubmit={handleLogin} className="login-form">
            <input 
              type="password" 
              placeholder="أدخل الرمز السري" 
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="admin-input text-center"
              autoFocus
            />
            {authError && <span className="auth-err-msg">الرمز السري غير صحيح، حاول ثانية.</span>}
            <button type="submit" className="btn-gold full-width">تسجيل الدخول</button>
            <button type="button" onClick={onExitAdmin} className="btn-outline full-width">العودة للموقع</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* هيدر اللوحة */}
      <header className="admin-nav-bar">
        <div className="admin-nav-titles">
          <h3>VANGUARD ATELIER</h3>
          <span>نظام الإدارة المعماري المركزي</span>
        </div>
        <div className="admin-nav-actions">
          <button onClick={onExitAdmin} className="btn-outline-sm"><HomeIcon size={16} /> معاينة الواجهة</button>
          <button onClick={() => setIsAuthenticated(false)} className="btn-danger-sm"><LogOut size={16} /> خروج</button>
        </div>
      </header>

      {/* تنبيه الحفظ التلقائي */}
      {saveAlert && (
        <div className="floating-save-alert">
          <Check size={18} /> تم حفظ وتحديث البيانات بنجاح!
        </div>
      )}

      {/* تبويبات لوحة التحكم */}
      <div className="admin-tabs-bar">
        <button className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          <Layers size={16} /> المشاريع والأقسام
        </button>
        <button className={`admin-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          <ShieldCheck size={16} /> الأمان والبريد
        </button>
      </div>

      <main className="admin-content-area">
        {/* تبويب المشاريع */}
        {activeTab === 'projects' && (
          <div className="admin-grid-layout">
            {/* نموذج إضافة مشروع */}
            <div className="admin-box">
              <h4><Plus size={18} /> إضافة عمل استثنائي جديد</h4>
              <form onSubmit={handleAddProject} className="admin-form-stack">
                <input 
                  type="text" 
                  placeholder="اسم المشروع (مثال: قصر ويست تاون)" 
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="admin-input"
                  required
                />
                
                <select 
                  value={newProjCategory} 
                  onChange={(e) => setNewProjCategory(e.target.value)}
                  className="admin-input"
                >
                  {siteData.categories.filter(c => c !== 'الكل').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <textarea 
                  placeholder="وصف تفصيلي للخامات والتشطيب..." 
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  className="admin-input"
                  rows={3}
                />

                {/* منطقة رفع وضغط الصور بنظام WebP */}
                <div 
                  className="upload-dropzone" 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                  {newProjImage ? (
                    <div className="uploaded-preview">
                      <img src={newProjImage} alt="Preview" />
                      <span className="replace-tag">انقر لتبديل الصورة (تم تحويلها لـ WebP)</span>
                    </div>
                  ) : (
                    <div className="dropzone-guide">
                      <UploadCloud size={32} color="#c5a059" />
                      <p>اسحب الصورة وأفلتها هنا (للكمبيوتر)</p>
                      <span className="btn-gold-sm">أو اختر من الاستوديو (للموبايل)</span>
                    </div>
                  )}
                  {isCompressing && <span className="compressing-tag">جاري الضغط الذكي بصيغة WebP...</span>}
                </div>

                <button type="submit" className="btn-gold" disabled={!newProjImage || isCompressing}>
                  نشر المشروع فوراً
                </button>
              </form>
            </div>

            {/* إدارة الأقسام والكتالوج */}
            <div className="admin-box">
              <h4><FolderPlus size={18} /> إدارة أقسام الكتالوج</h4>
              <div className="add-cat-inline">
                <input 
                  type="text" 
                  placeholder="اسم القسم الجديد..." 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="admin-input"
                />
                <button onClick={handleAddCategory} className="btn-gold-sm">إضافة</button>
              </div>

              <div className="cat-tags-list">
                {siteData.categories.map(cat => (
                  <span key={cat} className="cat-manage-pill">
                    {cat}
                    {cat !== "الكل" && (
                      <button onClick={() => handleDeleteCategory(cat)} title="حذف القسم">✕</button>
                    )}
                  </span>
                ))}
              </div>

              <hr className="admin-divider" />

              <h4>قائمة المشاريع الحالية ({siteData.projects.length})</h4>
              <div className="projects-admin-scroll">
                {siteData.projects.map(proj => (
                  <div key={proj.id} className="project-manage-item">
                    <img src={proj.image} alt={proj.title} />
                    <div className="proj-info">
                      <strong>{proj.title}</strong>
                      <small>{proj.category}</small>
                    </div>
                    <button onClick={() => handleDeleteProject(proj.id)} className="btn-del" title="حذف المشروع">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* تبويب الأمان والبريد */}
        {activeTab === 'security' && (
          <div className="admin-box max-w-md">
            <h4><ShieldCheck size={18} /> بيانات الحساب والأمان</h4>
            <form onSubmit={handleUpdateSecurity} className="admin-form-stack">
              <label>بريد الأدمن الرسمي:</label>
              <input 
                type="email" 
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                className="admin-input"
                required
              />

              <label>تغيير كلمة المرور (الرمز السري):</label>
              <input 
                type="password" 
                placeholder="أدخل كلمة مرور جديدة (اتركها فارغة إن لم ترغب بالتغيير)" 
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                className="admin-input"
              />

              <button type="submit" className="btn-gold">حفظ التغييرات</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
