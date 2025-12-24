import React from 'react';

const DusmeOneri = ({ dil, isHighRisk }) => {

  // Risk DÜŞÜKSE (Yeşil - Güvenli)
  if (!isHighRisk) {
    return (
      <div style={safeStyle}>
        <h3 style={{ margin: 0 }}>{dil.duOneri.saglamBaslik}</h3>
        <p>{dil.duOneri.saglamMetin}</p>
      </div>
    );
  }

  // Risk YÜKSEKSE (Kırmızı - Uyarı)
  return (
    <div style={warningContainerStyle}>
      <div style={headerStyle}>
        <span style={{ fontSize: '30px' }}>⚠️</span>
        <div>
          <h3 style={{ margin: 0, color: '#D32F2F' }}>{dil.duOneri.riskBaslik}</h3>
          <p style={{ margin: '5px 0 0 0', color: '#555', fontSize: '14px' }}>
            {dil.duOneri.riskMetin}
          </p>
        </div>
      </div>

      <div style={recommendationGrid}>
        
        {/* 1. Ev Güvenliği */}
        <div style={cardStyle}>
          <div style={iconBox}>🏠</div>
          <strong>{dil.duOneri.rec1Baslik}</strong>
          <p style={descStyle}>{dil.duOneri.rec1Metin}</p>
        </div>

        {/* 2. Göz Muayenesi */}
        <div style={cardStyle}>
          <div style={iconBox}>👓</div>
          <strong>{dil.duOneri.rec2Baslik}</strong>
          <p style={descStyle}>{dil.duOneri.rec2Metin}</p>
        </div>

        {/* 3. Ayakkabı Seçimi */}
        <div style={cardStyle}>
          <div style={iconBox}>👟</div>
          <strong>{dil.duOneri.rec3Baslik}</strong>
          <p style={descStyle}>{dil.duOneri.rec3Metin}</p>
        </div>

        {/* 4. Denge ve Kas */}
        <div style={cardStyle}>
          <div style={iconBox}>💪</div>
          <strong>{dil.duOneri.rec4Baslik}</strong>
          <p style={descStyle}>{dil.duOneri.rec4Metin}</p>
        </div>

      </div>

      <div style={footerStyle}>
        {dil.duOneri.dipnot}
      </div>
    </div>
  );
};

// --- STİLLER ---

const safeStyle = {
  backgroundColor: '#E8F5E9',
  border: '1px solid #A5D6A7',
  borderRadius: '12px',
  padding: '20px',
  color: '#2E7D32',
  marginTop: '20px',
  textAlign: 'center'
};

const warningContainerStyle = {
  backgroundColor: '#FFF5F5', // Çok açık kırmızı
  border: '2px solid #FFCDCD', // Kırmızı çerçeve
  borderRadius: '16px',
  padding: '20px',
  marginTop: '25px',
  boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px',
  borderBottom: '1px solid #FFCDCD',
  paddingBottom: '15px'
};

const recommendationGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '15px'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '15px',
  border: '1px solid #eee',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const iconBox = {
  fontSize: '24px',
  marginBottom: '10px',
  backgroundColor: '#FFEBEE',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%'
};

const descStyle = {
  fontSize: '12px',
  color: '#666',
  marginTop: '5px',
  lineHeight: '1.4'
};

const footerStyle = {
  marginTop: '15px',
  fontSize: '11px',
  color: '#999',
  textAlign: 'center',
  fontStyle: 'italic'
};

export default DusmeOneri;