import React, { useState } from "react";
// 👇 1. IMPORT'U BURAYA EKLEDİM
import DusmeOneri from "./DusmeOneri";

const DusmeRiski = () => {
  const [cevaplar, setCevaplar] = useState({
    dusmeGecmisi: null,
    dengeSorunu: null,
    cokluIlac: null,
    gormeSorunu: null,
  });

  const [sonuc, setSonuc] = useState(null);

  const sorular = [
    { key: "dusmeGecmisi", soru: "Son 1 yıl içinde düştünüz mü?" },
    {
      key: "dengeSorunu",
      soru: "Ayağa kalkarken veya yürürken denge sorunu yaşıyor musunuz?",
    },
    {
      key: "cokluIlac",
      soru: "Günde 4 veya daha fazla farklı ilaç kullanıyor musunuz?",
    },
    {
      key: "gormeSorunu",
      soru: "Görme ile ilgili ciddi bir probleminiz var mı?",
    },
  ];

  const cevapVer = (soruKey, deger) => {
    setCevaplar((prev) => ({ ...prev, [soruKey]: deger }));
    setSonuc(null);
  };

  const hesapla = () => {
    if (Object.values(cevaplar).includes(null)) {
      alert("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    let puan = 0;
    if (cevaplar.dusmeGecmisi) puan += 2;
    if (cevaplar.dengeSorunu) puan += 1;
    if (cevaplar.cokluIlac) puan += 1;
    if (cevaplar.gormeSorunu) puan += 1;

    // 👇 2. BURAYI GÜNCELLEDİM: 'puan' bilgisini de state'e ekledim
    if (puan >= 2) {
      setSonuc({
        durum: "YÜKSEK Düşme Riski",
        renk: "#c62828",
        detay: "Ev düzenlemesi ve fiziksel destek gerekebilir.",
        bg: "#ffebee",
        puan: puan, // <-- Puanı buraya ekledik ki aşağıda kullanalım
      });
    } else {
      setSonuc({
        durum: "Düşük Risk",
        renk: "#2e7d32",
        detay: "Önleyici egzersizlere devam ediniz.",
        bg: "#e8f5e9",
        puan: puan,
      });
    }
  };

  return (
    <div style={styles.card}>
      {/* Başlık */}
      <div style={styles.header}>
        <span style={{ fontSize: "22px" }}>🧗</span>
        <h3 style={{ margin: 0, color: "#333" }}>Düşme Riski Taraması</h3>
      </div>

      <div style={styles.container}>
        {sorular.map((item) => (
          <div key={item.key} style={styles.row}>
            <p style={{ margin: 0, flex: 1, fontSize: "14px", color: "#555" }}>
              {item.soru}
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => cevapVer(item.key, true)}
                style={{
                  ...styles.btn,
                  background:
                    cevaplar[item.key] === true ? "#ef5350" : "#f0f0f0",
                  color: cevaplar[item.key] === true ? "white" : "#333",
                }}
              >
                Evet
              </button>

              <button
                onClick={() => cevapVer(item.key, false)}
                style={{
                  ...styles.btn,
                  background:
                    cevaplar[item.key] === false ? "#66bb6a" : "#f0f0f0",
                  color: cevaplar[item.key] === false ? "white" : "#333",
                }}
              >
                Hayır
              </button>
            </div>
          </div>
        ))}

        {/* HESAPLA BUTONU */}
        <button style={styles.calcBtn} onClick={hesapla}>
          Risk Hesapla
        </button>

        {/* SONUÇ ALANI */}
        {sonuc && (
          <>
            {/* Orijinal Basit Sonuç Kutusu */}
            <div
              style={{
                ...styles.resultBox,
                borderLeft: `5px solid ${sonuc.renk}`,
                backgroundColor: sonuc.bg,
              }}
            >
              <h4 style={{ margin: 0, color: sonuc.renk, fontSize: "16px" }}>
                {sonuc.durum}
              </h4>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#333" }}
              >
                {sonuc.detay}
              </p>
            </div>

            {/* 👇 3. YENİ ÖNERİ KARTI BURAYA EKLENDİ 👇 */}
            {/* Puan 2 ve üzeriyse Önerileri açar */}
            <div style={{ marginTop: "15px" }}>
              <DusmeOneri isHighRisk={sonuc.puan >= 2} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// STİLLER (Aynen korundu)
const styles = {
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    border: "1px solid #eee",
  },
  btn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "0.2s",
  },
  calcBtn: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#1a3b5d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  resultBox: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
  },
};

export default DusmeRiski;
