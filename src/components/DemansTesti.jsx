import React, { useState } from "react";
import DemansOneri from './DemansOneri'; // ✅ Import zaten var

const DemansTesti = () => {
  const [aktifSoru, setAktifSoru] = useState(0);
  const [puan, setPuan] = useState(0);
  const [testBitti, setTestBitti] = useState(false);

  // AD8 Demans Tarama Testi Soruları
  const sorular = [
    "Karar vermede zorluk yaşıyor mu?",
    "Hobi ve aktivitelere ilgisi azaldı mı?",
    "Aynı şeyleri, soruları veya hikayeleri tekrar ediyor mu?",
    "Alet kullanmada (kumanda, telefon) zorlanıyor mu?",
    "Hangi ayda veya yılda olduğunu karıştırıyor mu?",
    "Mali işleri (fatura, hesap) yönetmede zorlanıyor mu?",
    "Randevularını hatırlamakta zorlanıyor mu?",
    "Düşünce ve hafıza problemleri günlük hayatını etkiliyor mu?",
  ];

  const cevapla = (riskVar) => {
    if (riskVar) setPuan(puan + 1);

    if (aktifSoru < sorular.length - 1) {
      setAktifSoru(aktifSoru + 1);
    } else {
      setTestBitti(true);
    }
  };

  const sifirla = () => {
    setAktifSoru(0);
    setPuan(0);
    setTestBitti(false);
  };

  // --- SONUÇ EKRANI ---
  if (testBitti) {
    const riskli = puan >= 2;
    return (
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={{ fontSize: "22px" }}>🧠 </span>
          <h3 style={{ margin: 0, color: "#333" }}>Analiz Sonucu</h3>
        </div>

        {/* Sonuç Özeti */}
        <div
          style={{
            ...styles.sonucKutu,
            background: riskli ? "#ffebee" : "#e8f5e9",
            borderColor: riskli ? "#ef5350" : "#66bb6a",
          }}
        >
          <h2
            style={{
              color: riskli ? "#c62828" : "#2e7d32",
              margin: "0 0 10px 0",
            }}
          >
            {riskli ? "Yüksek Risk Saptandı" : "Düşük Risk (Normal)"}
          </h2>
          <p style={{ color: "#555", fontSize: "14px" }}>
            {riskli
              ? "AD8 kriterlerine göre bilişsel bozulma belirtileri var."
              : "Şu an için belirgin bir bilişsel bozulma izlenmedi."}
          </p>
        </div>

        {/* 👇👇👇 İŞTE BURAYA EKLEDİM 👇👇👇 */}
        {/* Risk durumuna göre öneri kartını göster */}
        <div style={{ marginBottom: '20px' }}>
             <DemansOneri isHighRisk={riskli} />
        </div>
        {/* 👆👆👆 EKLEME BİTTİ 👆👆👆 */}

        <button onClick={sifirla} style={styles.restartBtn}>
          Testi Tekrarla
        </button>
      </div>
    );
  }

  // --- SORU EKRANI (SLAYT) ---
  const ilerlemeYuzdesi = ((aktifSoru + 1) / sorular.length) * 100;

  return (
    <div style={styles.card}>
      {/* Başlık ve İlerleme */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🧠</span>
          <h3 style={{ margin: 0, color: "#333" }}>Demans Testi (AD8)</h3>
        </div>
        <span style={{ fontSize: "12px", color: "#888", fontWeight: "bold" }}>
          {aktifSoru + 1} / {sorular.length}
        </span>
      </div>

      {/* İlerleme Çubuğu */}
      <div style={styles.progressBarBg}>
        <div
          style={{ ...styles.progressBarFill, width: `${ilerlemeYuzdesi}%` }}
        ></div>
      </div>

      {/* Soru Alanı */}
      <div style={styles.soruAlani}>
        <h4 style={styles.soruMetni}>{sorular[aktifSoru]}</h4>
        <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
          Son zamanlarda bu konuda bir <strong>değişiklik/bozulma</strong> fark
          ettiniz mi?
        </p>

        {/* Butonlar */}
        <div style={styles.btnGroup}>
          <button onClick={() => cevapla(true)} style={styles.evetBtn}>
            <span style={{ fontSize: "18px" }}>⚠️</span> Evet, Var
          </button>
          <button onClick={() => cevapla(false)} style={styles.hayirBtn}>
            <span style={{ fontSize: "18px" }}>✅</span> Hayır, Yok
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CSS STİLLERİ ---
const styles = {
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    height: "100%", 
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  progressBarBg: {
    width: "100%",
    height: "6px",
    backgroundColor: "#f0f0f0",
    borderRadius: "3px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    transition: "width 0.3s ease",
  },
  soruAlani: {
    textAlign: "center",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  soruMetni: {
    fontSize: "18px",
    color: "#1a3b5d",
    margin: "0 0 10px 0",
    lineHeight: "1.4",
  },
  btnGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  evetBtn: {
    flex: 1,
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#eec1afff",
    color: "#e63600ff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "0.2s",
    border: "1px solid #fd9082ff",
  },
  hayirBtn: {
    flex: 1,
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "0.2s",
    border: "1px solid #c8e6c9",
  },
  sonucKutu: {
    padding: "20px",
    borderRadius: "12px",
    borderWidth: "1px",
    borderStyle: "solid",
    textAlign: "center",
    marginBottom: "20px",
  },
  restartBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default DemansTesti;