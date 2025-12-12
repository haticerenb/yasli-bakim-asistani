import React from 'react';

const KirilganlikOneri = ({ isHighRisk }) => {

  // Risk YOKSA (Yeşil - Sağlam/Robust)
  if (!isHighRisk) {
    return (
      <div style={safeStyle}>
        <h3 style={{ margin: 0 }}>💪 Maşallah, Turp Gibisiniz!</h3>
        <p>Enerjiniz ve fiziksel kapasiteniz gayet yerinde. Bu gücü korumak için aktif hayata ve dengeli beslenmeye aynen devam.</p>
      </div>
    );
  }

  // Risk VARSA (Sarı/Turuncu - Kırılgan/Frail)
  return (
    <div style={warningContainerStyle}>
      <div style={headerStyle}>
        <span style={{ fontSize: '30px' }}>🔋</span>
        <div>
          <h3 style={{ margin: 0, color: '#E65100' }}>Vücut Direnciniz Düşmüş Olabilir</h3>
          <p style={{ margin: '5px 0 0 0', color: '#555', fontSize: '14px' }}>
            Kas gücünüzü ve enerjinizi geri kazanmak için yaşam tarzınızda şu değişiklikleri yapmalısınız:
          </p>
        </div>
      </div>

      <div style={recommendationGrid}>
        
        {/* 1. BESLENME (Protein) - Kilo kaybı için */}
        <div style={cardStyle}>
          <div style={iconBox}>🥩</div>
          <strong>Protein Tüketin</strong>
          <p style={descStyle}>Kas kaybını önlemek için her öğünde yumurta, yoğurt, et veya baklagil tüketin.</p>
        </div>

        {/* 2. GÜÇ EGZERSİZİ - El sıkma gücü için */}
        <div style={cardStyle}>
          <div style={iconBox}>🏋️‍♀️</div>
          <strong>Kas Güçlendirme</strong>
          <p style={descStyle}>Sadece yürümek yetmez. Su şişesi kaldırma veya lastik çekme gibi kas egzersizleri yapın.</p>
        </div>

        {/* 3. ENERJİ/VİTAMİN - Yorgunluk için */}
        <div style={cardStyle}>
          <div style={iconBox}>🩸</div>
          <strong>Vitamin Kontrolü</strong>
          <p style={descStyle}>Sürekli yorgunluk D vitamini veya B12 eksikliğinden olabilir. Aile hekiminize danışın.</p>
        </div>

        {/* 4. AKTİVİTE - Yavaşlama için */}
        <div style={cardStyle}>
          <div style={iconBox}>🌳</div>
          <strong>Hareket Edin</strong>
          <p style={descStyle}>"Yorulurum" diye oturmayın. Hareket ettikçe enerjiniz açılır. Günde 20 dk tempolu yürüyün.</p>
        </div>

      </div>

      <div style={footerStyle}>
        * Kırılganlık önlenebilir ve geri döndürülebilir bir durumdur.
      </div>
    </div>
  );
};

// --- STİLLER (Turuncu/Canlı tonlar - Enerji vurgusu) ---

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
  backgroundColor: '#FFF3E0', // Turuncumsu zemin
  border: '2px solid #FFCC80', // Turuncu çerçeve
  borderRadius: '16px',
  padding: '20px',
  marginTop: '25px',
  boxShadow: '0 4px 12px rgba(239, 108, 0, 0.1)'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px',
  borderBottom: '1px solid #FFCC80',
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
  backgroundColor: '#FFF8E1',
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

export default KirilganlikOneri;