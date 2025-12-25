import React, { useState } from "react";

const SuTakip = ({ dil, suMiktari, onSuEkle }) => {
  // --- STATE (SAYAÇLAR) ---
  const [counts, setCounts] = useState({
    bardak: 0,
    kucukSise: 0,
    buyukSise: 0,
  });

  const dailyGoal = 2000; // Hedef (ml)

  // --- DAİRE ÇİZİM HESAPLAMALARI ---
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(suMiktari / dailyGoal, 1);
  const offset = circumference - percentage * circumference;

  // --- FONKSİYONLAR ---
  const addWater = (type, amount) => {
    // 1. Ana veritabanına ekle (App.jsx üzerinden)
    onSuEkle(amount); 

    // 2. Buton üzerindeki sayacı artır
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetAll = () => {
    // Suyu sıfırlamak için mevcut miktarı çıkarıyoruz
    onSuEkle(-suMiktari); 
    setCounts({ bardak: 0, kucukSise: 0, buyukSise: 0 });
  };

  // ⚠️ DİKKAT: STİLLERİ BURAYA (containerStyle, buttonStyle vb.) EKLEMEYİ UNUTMA!
  // (Az önceki koddan const containerStyle = ... kısımlarını buraya alabilirsin)

  return (
    <div style={containerStyle}>
      
      {/* --- BAŞLIK --- */}
      <h3 style={{ margin: "0 0 20px 0", color: "#333", fontSize: "18px" }}>
        {dil?.suKutusu || "Günlük Su Hedefi"}
      </h3>

      {/* --- YUVARLAK GRAFİK --- */}
      <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "20px" }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Arka Halka (Gri) */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#eee"
            strokeWidth="10"
            fill="none"
          />
          {/* Ön Halka (Mavi - Hareketli) */}
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
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>

        {/* Ortadaki Yazı */}
        <div style={innerTextStyle}>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#2196F3", lineHeight: "1" }}>
            {suMiktari}
          </span>
          <span style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>
            / {dailyGoal} ml
          </span>
        </div>
      </div>

      {/* --- BUTONLAR --- */}
      <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between" }}>
        
        {/* Bardak */}
        <div onClick={() => addWater("bardak", 200)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>🥤</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.bardak || "Bardak"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>200ml</span>
          {counts.bardak > 0 && <span style={badgeStyle}>{counts.bardak}</span>}
        </div>

        {/* Küçük Şişe */}
        <div onClick={() => addWater("kucukSise", 500)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>💧</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.kucuk || "Küçük"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>500ml</span>
          {counts.kucukSise > 0 && <span style={badgeStyle}>{counts.kucukSise}</span>}
        </div>

        {/* Büyük Şişe */}
        <div onClick={() => addWater("buyukSise", 1500)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>🌊</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.buyuk || "Büyük"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>1.5L</span>
          {counts.buyukSise > 0 && <span style={badgeStyle}>{counts.buyukSise}</span>}
        </div>

        {/* Sıfırla */}
        <div onClick={resetAll} style={resetButtonStyle}>
          <span style={{ fontSize: "20px" }}>🗑️</span>
          <span style={{ fontSize: "12px", marginTop: "5px" }}>
            {dil?.sifirla || "Sıfırla"}
          </span>
        </div>

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