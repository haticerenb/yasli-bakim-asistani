import React, { useState } from "react";

// 1. İSMİ DÜZELTTİK: SuTakibi -> SuTakip
// 2. PARANTEZ İÇİNİ DOLDURDUK: { dil, suMiktari, onSuEkle }
const SuTakip = ({ dil, suMiktari, onSuEkle }) => {
  
  const [counts, setCounts] = useState({
    bardak: 0,
    kucukSise: 0,
    buyukSise: 0,
  });

  const dailyGoal = 2000;

  // --- Daire Çizim Hesaplamaları ---
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(suMiktari / dailyGoal, 1);
  const offset = circumference - percentage * circumference;

  const addWater = (type, amount) => {
    onSuEkle(amount); // Ana kumandaya haber ver
    setCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetAll = () => {
    onSuEkle(-suMiktari);
    setCounts({ bardak: 0, kucukSise: 0, buyukSise: 0 });
  };

  // --- STİLLER ---
  const containerStyle = {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between"
  };

  const innerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    border: "1px solid #e3f2fd",
    backgroundColor: "#f1f8e9",
    borderRadius: "12px",
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.1s",
    minHeight: "80px",
  };

  const badgeStyle = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffebee",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: "0 0 20px 0", color: "#333", fontSize: "18px" }}>
        {dil?.suKutusu || "Günlük Su Hedefi"}
      </h3>

      <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "20px" }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#eee" strokeWidth="10" fill="none" />
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

        <div style={innerTextStyle}>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#2196F3", lineHeight: "1" }}>
            {suMiktari}
          </span>
          <span style={{ fontSize: "10px", color: "#999", marginTop: "2px" }}>
            / {dailyGoal} ml
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between" }}>
        <div onClick={() => addWater("bardak", 200)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>🥤</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.bardak || "Bardak"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>200ml</span>
          {counts.bardak > 0 && <span style={badgeStyle}>{counts.bardak}</span>}
        </div>

        <div onClick={() => addWater("kucukSise", 500)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>💧</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.kucuk || "Küçük"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>500ml</span>
          {counts.kucukSise > 0 && <span style={badgeStyle}>{counts.kucukSise}</span>}
        </div>

        <div onClick={() => addWater("buyukSise", 1500)} style={buttonStyle}>
          <span style={{ fontSize: "24px" }}>🌊</span>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1565c0", marginTop: "5px" }}>
            {dil?.buyuk || "Büyük"}
          </span>
          <span style={{ fontSize: "11px", color: "#555" }}>1.5L</span>
          {counts.buyukSise > 0 && <span style={badgeStyle}>{counts.buyukSise}</span>}
        </div>

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