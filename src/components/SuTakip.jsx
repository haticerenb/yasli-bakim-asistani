import React, { useState } from 'react';

const SuTakibi = () => {
  const [totalWater, setTotalWater] = useState(0);
  const [counts, setCounts] = useState({
    bardak: 0,
    kucukSise: 0,
    buyukSise: 0
  });

  const dailyGoal = 3000;

  // --- Daire Çizim Hesaplamaları ---
  const radius = 50; // Yarıçap
  const circumference = 2 * Math.PI * radius; // Çevre uzunluğu
  // Yüzdeyi hesapla (1'i geçmemesi için min kullandık, taşmasın diye)
  const percentage = Math.min(totalWater / dailyGoal, 1);
  // Ne kadarının boyanacağını hesapla
  const offset = circumference - (percentage * circumference);
  // ---------------------------------

  const addWater = (type, amount) => {
    setTotalWater((prev) => prev + amount);
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const resetAll = () => {
    setTotalWater(0);
    setCounts({ bardak: 0, kucukSise: 0, buyukSise: 0 });
  };

  return (
    <div style={containerStyle}>
      
      {/* --- YUVARLAK BAŞLIK ALANI --- */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 15px 0', fontSize: '20px', color: '#333' }}>Günlük Su Hedefi</h2>
        
        {/* Daire ve İçindeki Yazıyı Kapsayan Alan */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
          
          {/* SVG Daire Çizimi */}
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Arkadaki Gri Halka */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#eee"
              strokeWidth="10"
              fill="none"
            />
            {/* Öndeki Mavi Dolan Halka */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#2196F3"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              // Dairenin tepesinden başlaması için döndürüyoruz
              transform="rotate(-90 60 60)" 
              style={{ transition: 'stroke-dashoffset 0.5s ease' }} // Animasyonlu dolsun
            />
          </svg>
          
          {/* Dairenin Ortasındaki Yazı */}
          <div style={innerTextStyle}>
            <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#2196F3', lineHeight: '1' }}>
              {totalWater}
            </span>
            <span style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              / {dailyGoal} ml
            </span>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />

      {/* --- Butonlar Alanı (Yan Yana Grid) --- */}
      <div style={gridStyle}>
        
        {/* Bardak */}
        <button onClick={() => addWater('bardak', 200)} style={buttonStyle}>
          <span style={{ fontSize: '24px' }}>🥤</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Bardak</span>
            <span style={{ fontSize: '12px' }}>200ml</span>
          </div>
          {counts.bardak > 0 && <span style={badgeStyle}>{counts.bardak}</span>}
        </button>

        {/* Küçük Şişe */}
        <button onClick={() => addWater('kucukSise', 500)} style={buttonStyle}>
          <span style={{ fontSize: '24px' }}>💧</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Küçük</span>
            <span style={{ fontSize: '12px' }}>500ml</span>
          </div>
          {counts.kucukSise > 0 && <span style={badgeStyle}>{counts.kucukSise}</span>}
        </button>

        {/* Büyük Şişe */}
        <button onClick={() => addWater('buyukSise', 1500)} style={buttonStyle}>
          <span style={{ fontSize: '24px' }}>🌊</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Büyük</span>
            <span style={{ fontSize: '12px' }}>1.5L</span>
          </div>
          {counts.buyukSise > 0 && <span style={badgeStyle}>{counts.buyukSise}</span>}
        </button>
        
        {/* Sıfırla Butonu */}
        <button onClick={resetAll} style={resetButtonStyle}>
           🗑️ Sıfırla
        </button>

      </div>
    </div>
  );
};

// --- STİLLER ---

const containerStyle = {
  width: '100%',               // Sayfaya yayılmaya devam
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
};

// Dairenin içindeki yazıyı ortalamak için
const innerTextStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: '10px',
};

const buttonStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#F3F8FF',
  border: '1px solid #D1E9FF',
  borderRadius: '10px',
  cursor: 'pointer',
  color: '#0056b3',
  gap: '5px',
  position: 'relative',
  transition: '0.2s',
  minHeight: '80px'
};

const badgeStyle = {
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  backgroundColor: '#2196F3',
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

const resetButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#FFF0F0',
  border: '1px solid #FFCDCD',
  color: '#D32F2F',
  fontWeight: 'bold',
  fontSize: '14px',
  flexDirection: 'row'
};

export default SuTakibi;