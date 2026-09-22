import React, { useState, useEffect } from 'react';

export default function Intro({ onComplete }) {
  const [fadeState, setFadeState] = useState('active');

  useEffect(() => {
    // إخفاء الشاشة بعد 2.4 ثانية تلقائياً
    const timer = setTimeout(() => {
      setFadeState('exit');
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setFadeState('exit');
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div className={`intro-overlay ${fadeState === 'exit' ? 'intro-fade-out' : ''}`} onClick={handleSkip}>
      <div className="intro-container">
        {/* الشعار الهندسي الفاخر بالحجم الكبير */}
        <div className="intro-logo-wrap">
          <svg className="intro-logo-svg" viewBox="0 0 100 100" fill="none">
            <path d="M20 15L50 85L80 15H62L50 58L38 15H20Z" fill="url(#introGoldGrad)" />
            <circle cx="50" cy="50" r="46" stroke="url(#introGoldGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            <defs>
              <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA73" />
                <stop offset="50%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#8A6724" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* اسم وهوية البراند بخط كلاسيكي ملكي */}
        <h1 className="intro-brand-title">VANGUARD</h1>
        <div className="intro-brand-subtitle">ATELIER ARCHITECTURE</div>
        <div className="intro-divider"></div>
        <p className="intro-tagline">LUXURY RESIDENTIAL & COMMERCIAL SPACES</p>

        {/* زر التخطي السريع */}
        <button className="intro-skip-btn" onClick={(e) => { e.stopPropagation(); handleSkip(); }}>
          تخطي العرض ✕
        </button>
      </div>
    </div>
  );
}
