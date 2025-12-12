import React from 'react';

const DemansOneri = ({ isHighRisk }) => {

  // Eğer risk YOKSA (Yeşil)
  if (!isHighRisk) {
    return (
      <div style={safeStyle}>
        <h3 style={{ margin: 0 }}>🧠 Zihniniz Zinde Görünüyor!</h3>
        <p>Bilişsel fonksiyonlarınız gayet iyi. Bu formunuzu korumak için okumaya ve yeni şeyler öğrenmeye devam edin.</p>
      </div>
    );
  }

  // Eğer risk VARSA (Kırmızı)
  return (
    <div style={warningContainerStyle}>
      <div style={headerStyle}>
        <span style={{ fontSize: '30px' }}>⚠️</span>
        <div>
          <h3 style={{ margin: 0, color: '#D32F2F' }}>Bilişsel Değişiklikler Fark Edildi</h3>
          <p style={{ margin: '5px 0 0 0', color: '#555', fontSize: '14px' }}>
            Unutkanlık belirtileri için erken önlem hayat kurtarır. İşte yapmanız gerekenler:
          </p>
        </div>
      </div>

      <div style={recommendationGrid}>
        
        {/* 1. Doktora Git */}
        <div style={cardStyle}>
          <div style={iconBox}>🩺</div>
          <strong>Nöroloji Görüşü</strong>
          <p style={descStyle}>Bir Nöroloji uzmanına görünerek detaylı bir bellek testi yaptırmalısınız.</p>
        </div>

        {/* 2. Zihin Egzersizi */}
        <div style={cardStyle}>
          <div style={iconBox}>🧩</div>
          <strong>Zihni Çalıştırın</strong>
          <p style={descStyle}>Bulmaca çözün, satranç oynayın veya yeni bir dil/hobi öğrenmeye başlayın.</p>
        </div>

        {/* 3. Sosyalleşme */}
        <div style={cardStyle}>
          <div style={iconBox}>🗣️</div>
          <strong>Sosyalleşin</strong>
          <p style={descStyle}>Eve kapanmak unutkanlığı artırır. Arkadaşlarınızla sık sık sohbet edin.</p>
        </div>

        {/* 4. Beslenme ve Vitamin */}
        <div style={cardStyle}>
          <div style={iconBox}>🐟</div>
          <strong>Beslenme & B12</strong>
          <p style={descStyle}>B12 vitamininize baktırın. Akdeniz tipi (balık, zeytinyağı, ceviz) beslenin.</p>
        </div>

      </div>

      <div style={footerStyle}>
        * Bu test kesin tanı koymaz, sadece risk taraması yapar.
      </div>
    </div>
  );
};

// --- STİLLER (Diğeriyle uyumlu ama kendine has) ---

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
  backgroundColor: '#FFF8E1', // Hafif sarı/turuncu uyarı tonu (Düşme riskinden ayırt edilsin diye)
  border: '2px solid #FFE082', 
  borderRadius: '16px',
  padding: '20px',
  marginTop: '25px',
  boxShadow: '0 4px 12px rgba(255, 111, 0, 0.1)'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px',
  borderBottom: '1px solid #FFE082',
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
  backgroundColor: '#FFF3E0',
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

export default DemansOneri;