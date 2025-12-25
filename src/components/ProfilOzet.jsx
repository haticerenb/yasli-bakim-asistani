import React from 'react';

const ProfilOzet = ({ dil,adSoyad, suMiktari, suHedefi, ilacDurumu, onCikis }) => {
  // SU DURUMU MESAJI
  const suBasarili = suMiktari >= suHedefi;
 const suMesaji = suBasarili
    ? dil.suBasarili
    : `${dil.suBasarisiz} (${suMiktari}ml / ${suHedefi}ml)`;

  // İLAÇ DURUMU MESAJI (Basit mantık: true ise başarılı, false ise başarısız)
  const ilacMesaji = ilacDurumu ? dil.ictim : dil.icmedim;
   

  return (
    <div style={styles.card}>
      {/* Üst Kısım: Profil Resmi ve İsim */}
      <div style={styles.profileHeader}>
        <div style={styles.avatar}>
          👤 {/* Buraya istersen resim koyabilirsin */}
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#333' }}>{adSoyad}</h3>
          <span style={{ fontSize: '12px', color: '#777' }}>{dil.profil}</span>
        </div>
        <button onClick={onCikis} style={styles.logoutBtn}>
          🚪 {dil.cikis || "Çıkış"}
        </button>
      </div>

      <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />

      {/* Mesajlar Kısmı */}
      <div style={styles.messageBox}>
        {/* İlaç Mesajı */}
        <div style={{ 
          ...styles.alertItem, 
          backgroundColor: ilacDurumu ? '#e8f5e9' : '#ffebee', 
          color: ilacDurumu ? '#2e7d32' : '#c62828' 
        }}>
          {ilacMesaji}
        </div>

        {/* Su Mesajı */}
        <div style={{ 
          ...styles.alertItem, 
          backgroundColor: suBasarili ? '#e3f2fd' : '#fff3e0',
          color: suBasarili ? '#1565c0' : '#ef6c00'
        }}>
          {suMesaji}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '20px' // Altındaki kartları aşağı itsin diye boşluk
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '10px'
  },
  avatar: {
    width: '50px',
    height: '50px',
    backgroundColor: '#eee',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },
  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    border: "1px solid #ef9a9a",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.2s",
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  alertItem: {
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

export default ProfilOzet;