import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { initialSiteData } from './data';
import Intro from './Intro';
import Home from './Home';
import Admin from './Admin';

const STORAGE_KEY = 'vanguard_atelier_custom_data_v2';

function App() {
  // تحميل البيانات المحفوظة أو البدء بالبيانات الافتراضية
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialSiteData;
    } catch {
      return initialSiteData;
    }
  });

  // التحكم في مسار لوحة الأدمن المعزولة
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('admin') || hash.includes('admin')) {
      return 'admin';
    }
    return 'home';
  });

  // إظهار الشاشة الافتتاحية عند الدخول الأول للموقع الرئيسي
  const [showIntro, setShowIntro] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return !path.includes('admin') && !hash.includes('admin');
  });

  // الاستماع لتغيير الرابط
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash.includes('admin')) {
        setCurrentRoute('admin');
        setShowIntro(false);
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // دالة حفظ التعديلات من لوحة الأدمن
  const handleSaveData = (newData) => {
    setSiteData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.error('فشل الحفظ في التخزين المحلي:', err);
    }
  };

  const navigateToHome = () => {
    window.location.hash = '';
    window.history.pushState(null, '', window.location.pathname.replace(/\/admin/i, '') || '/');
    setCurrentRoute('home');
  };

  // 1. عرض لوحة الأدمن المعزولة
  if (currentRoute === 'admin') {
    return (
      <Admin 
        siteData={siteData} 
        onSaveSiteData={handleSaveData} 
        onExitAdmin={navigateToHome} 
      />
    );
  }

  // 2. عرض واجهة الموقع والشاشة الافتتاحية
  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <Home data={siteData} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
