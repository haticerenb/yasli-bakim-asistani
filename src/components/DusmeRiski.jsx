import React, { useState } from "react";
import DusmeOneri from "./DusmeOneri";

const DusmeRiski = ({ dil }) => {
  // --- STATE ---
  const [cevaplar, setCevaplar] = useState({
    dusmeGecmisi: null,
    dengeSorunu: null,
    cokluIlac: null,
    gormeSorunu: null,
  });

  const [sonuc, setSonuc] = useState(null);

  // --- DİL ALGILAMA ---
  // Dil paketi gelmezse hata vermesin diye varsayılan 'tr' yapıyoruz
  const secilenDil =
    dil?.cikis === "Log Out" ? "en" : dil?.cikis === "Ausloggen" ? "de" : "tr";

  // --- ÇEVİRİ DEPOSU (SORULAR İÇİN) ---
  const metinler = {
    tr: {
      baslik: "Düşme Riski Taraması",
      sorular: [
        { key: "dusmeGecmisi", soru: "Son 1 yıl içinde düştünüz mü?" },
        { key: "dengeSorunu", soru: "Ayağa kalkarken veya yürürken denge sorunu yaşıyor musunuz?" },
        { key: "cokluIlac", soru: "Günde 4 veya daha fazla farklı ilaç kullanıyor musunuz?" },
        { key: "gormeSorunu", soru: "Görme ile ilgili ciddi bir probleminiz var mı?" }
      ],
      evet: "Evet",
      hayir: "Hayır",
      analizBtn: "Risk Hesapla",
      uyari: "Lütfen tüm soruları cevaplayınız.",
      sonucBaslik: "Analiz Sonucu",
      yuksekRisk: "YÜKSEK Düşme Riski ⚠️",
      dusukRisk: "Düşük Risk ✅",
      yuksekDetay: "Ev düzenlemesi ve fiziksel destek gerekebilir.",
      dusukDetay: "Önleyici egzersizlere devam ediniz."
    },
    en: {
      baslik: "Fall Risk Screening",
      sorular: [
        { key: "dusmeGecmisi", soru: "Have you fallen in the last year?" },
        { key: "dengeSorunu", soru: "Do you have balance problems while standing or walking?" },
        { key: "cokluIlac", soru: "Do you take 4 or more different medications daily?" },
        { key: "gormeSorunu", soru: "Do you have serious vision problems?" }
      ],
      evet: "Yes",
      hayir: "No",
      analizBtn: "Calculate Risk",
      uyari: "Please answer all questions.",
      sonucBaslik: "Analysis Result",
      yuksekRisk: "HIGH Fall Risk ⚠️",
      dusukRisk: "Low Risk ✅",
      yuksekDetay: "Home modification and physical support may be needed.",
      dusukDetay: "Continue preventive exercises."
    },
    de: {
      baslik: "Sturzrisiko-Screening",
      sorular: [
        { key: "dusmeGecmisi", soru: "Sind Sie im letzten Jahr gestürzt?" },
        { key: "dengeSorunu", soru: "Haben Sie Gleichgewichtsprobleme beim Aufstehen oder Gehen?" },
        { key: "cokluIlac", soru: "Nehmen Sie täglich 4 oder mehr verschiedene Medikamente ein?" },
        { key: "gormeSorunu", soru: "Haben Sie ernsthafte Sehprobleme?" }
      ],
      evet: "Ja",
      hayir: "Nein",
      analizBtn: "Risiko berechnen",
      uyari: "Bitte beantworten Sie alle Fragen.",
      sonucBaslik: "Analyseergebnis",
      yuksekRisk: "HOHES Sturzrisiko ⚠️",
      dusukRisk: "Geringes Risiko ✅",
      yuksekDetay: "Wohnungsanpassung und physische Unterstützung können erforderlich sein.",
      dusukDetay: "Setzen Sie präventive Übungen fort."
    }
  };

  const ui = metinler[secilenDil];

  // --- FONKSİYONLAR ---
  const cevapVer = (soruKey, deger) => {
    setCevaplar((prev) => ({ ...prev, [soruKey]: deger }));
    setSonuc(null); // Cevap değişirse eski sonucu gizle
  };

  const hesapla = () => {
    // 1. Boş cevap var mı kontrol et
    if (Object.values(cevaplar).includes(null)) {
      alert(ui.uyari);
      return;
    }

    // 2. Puan Hesapla
    let puan = 0;
    if (cevaplar.dusmeGecmisi) puan += 2; // Geçmiş düşme önemli
    if (cevaplar.dengeSorunu) puan += 1;
    if (cevaplar.cokluIlac) puan += 1;
    if (cevaplar.gormeSorunu) puan += 1;

    // 3. Sonucu Belirle
    // 2 veya daha fazla puan riskli kabul edilsin
    const riskli = puan >= 2;

    setSonuc({
      riskli: riskli,
      puan: puan,
      renk: riskli ? "#ef5350" : "#66bb6a",
      bg: riskli ? "#ffebee" : "#e8f5e9"
    });
  };

  // --- RENDER ---
  return (
    <div style={styles.card}>
      {/* Başlık */}
      <div style={styles.header}>
        <span style={{ fontSize: "22px" }}>🦴</span>
        <h3 style={{ margin: 0, color: "#333" }}>{ui.baslik}</h3>
      </div>

      {/* Sorular */}
      <div style={styles.container}>
        {ui.sorular.map((item) => (
          <div key={item.key} style={styles.row}>
            <p style={{ margin: 0, flex: 1, fontSize: "14px", color: "#555" }}>
              {item.soru}
            </p>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => cevapVer(item.key, true)}
                style={{
                  ...styles.btn,
                  background: cevaplar[item.key] === true ? "#ef5350" : "#f0f0f0",
                  color: cevaplar[item.key] === true ? "white" : "#333",
                }}
              >
                {ui.evet}
              </button>
              
              <button
                onClick={() => cevapVer(item.key, false)}
                style={{
                  ...styles.btn,
                  background: cevaplar[item.key] === false ? "#66bb6a" : "#f0f0f0",
                  color: cevaplar[item.key] === false ? "white" : "#333",
                }}
              >
                {ui.hayir}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hesapla Butonu */}
      <button style={styles.calcBtn} onClick={hesapla}>
        {ui.analizBtn}
      </button>

      {/* SONUÇ ALANI */}
      {sonuc && (
        <div style={{ marginTop: "20px", animation: "fadeIn 0.5s" }}>
          
          {/* Basit Sonuç Kutusu */}
          <div
            style={{
              ...styles.resultBox,
              borderLeft: `5px solid ${sonuc.renk}`,
              backgroundColor: sonuc.bg,
            }}
          >
            <h4 style={{ margin: 0, color: sonuc.renk, fontSize: "16px" }}>
              {sonuc.riskli ? ui.yuksekRisk : ui.dusukRisk}
            </h4>
            <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#333" }}>
              {sonuc.riskli ? ui.yuksekDetay : ui.dusukDetay}
            </p>
          </div>

          {/* ÖNERİ KARTI (Dili buraya gönderiyoruz!) */}
          <div style={{ marginTop: "15px" }}>
            <DusmeOneri dil={dil} isHighRisk={sonuc.riskli} />
          </div>
          
        </div>
      )}
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
