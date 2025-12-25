import React, { useState } from "react";
import KirilganlikOneri from "./KirilganlikOneri";

const KirilganlikTesti = ({ dil }) => {
  // --- STATE (Hafıza) ---
  const [cevaplar, setCevaplar] = useState({
    s1: null, // Kilo kaybı
    s2: null, // Yorgunluk
    s3: null, // Yürüme hızı
    s4: null, // El sıkma gücü
    s5: null, // Fiziksel aktivite
  });
  
  const [sonuc, setSonuc] = useState(null);

  // --- DİL ALGILAMA ---
  const secilenDil =
    dil?.cikis === "Log Out" ? "en" : dil?.cikis === "Ausloggen" ? "de" : "tr";

  // --- ÇEVİRİ DEPOSU ---
  const metinler = {
    tr: {
      baslik: "Kırılganlık Taraması",
      sorular: [
        { id: "s1", metin: "Son 1 yılda istemsiz kilo kaybı var mı?" },
        { id: "s2", metin: "Kendinizi sık sık yorgun hisseder misiniz?" },
        { id: "s3", metin: "Yürüyüş hızınız yavaşladı mı?" },
        { id: "s4", metin: "El sıkma gücünüz azaldı mı?" },
        { id: "s5", metin: "Fiziksel aktiviteniz çok azaldı mı?" }
      ],
      evet: "Evet",
      hayir: "Hayır",
      analizBtn: "Risk Hesapla",
      uyari: "Lütfen tüm soruları cevaplayın.",
      sonucBaslik: "Analiz Sonucu",
      durumlar: {
        saglam: "Sağlam (Düşük Risk) ✅",
        oncesi: "Kırılgan Öncesi (Orta Risk) ⚠️",
        kirilgan: "Kırılgan (Yüksek Risk) 🚨"
      },
      detaylar: {
        saglam: "Harika! Durumunuzu korumak için aktif kalmaya devam edin.",
        oncesi: "Dikkatli olunmalı. Önleyici tedbirler için bir uzmana danışın.",
        kirilgan: "Kapsamlı bir geriatrik değerlendirme önerilir."
      }
    },
    en: {
      baslik: "Frailty Screening",
      sorular: [
        { id: "s1", metin: "Unintentional weight loss in the last year?" },
        { id: "s2", metin: "Do you often feel tired?" },
        { id: "s3", metin: "Has your walking speed slowed down?" },
        { id: "s4", metin: "Has your grip strength decreased?" },
        { id: "s5", metin: "Has your physical activity decreased significantly?" }
      ],
      evet: "Yes",
      hayir: "No",
      analizBtn: "Calculate Risk",
      uyari: "Please answer all questions.",
      sonucBaslik: "Analysis Result",
      durumlar: {
        saglam: "Robust (Low Risk) ✅",
        oncesi: "Pre-Frail (Medium Risk) ⚠️",
        kirilgan: "Frail (High Risk) 🚨"
      },
      detaylar: {
        saglam: "Great! Stay active to maintain your condition.",
        oncesi: "Caution needed. Consult a specialist for preventive measures.",
        kirilgan: "A comprehensive geriatric assessment is recommended."
      }
    },
    de: {
      baslik: "Gebrechlichkeits-Screening",
      sorular: [
        { id: "s1", metin: "Unbeabsichtigter Gewichtsverlust im letzten Jahr?" },
        { id: "s2", metin: "Fühlen Sie sich oft müde?" },
        { id: "s3", metin: "Hat sich Ihre Gehgeschwindigkeit verlangsamt?" },
        { id: "s4", metin: "Hat Ihre Griffkraft abgenommen?" },
        { id: "s5", metin: "Hat Ihre körperliche Aktivität stark abgenommen?" }
      ],
      evet: "Ja",
      hayir: "Nein",
      analizBtn: "Risiko berechnen",
      uyari: "Bitte beantworten Sie alle Fragen.",
      sonucBaslik: "Analyseergebnis",
      durumlar: {
        saglam: "Robust (Geringes Risiko) ✅",
        oncesi: "Vorgebrechlich (Mittleres Risiko) ⚠️",
        kirilgan: "Gebrechlich (Hohes Risiko) 🚨"
      },
      detaylar: {
        saglam: "Großartig! Bleiben Sie aktiv, um Ihren Zustand zu erhalten.",
        oncesi: "Vorsicht geboten. Konsultieren Sie einen Spezialisten für vorbeugende Maßnahmen.",
        kirilgan: "Eine umfassende geriatrische Beurteilung wird empfohlen."
      }
    }
  };

  const ui = metinler[secilenDil];

  // --- FONKSİYONLAR ---
  const cevapla = (soruId, deger) => {
    setCevaplar({ ...cevaplar, [soruId]: deger });
    setSonuc(null); // Yeni cevap verilince eski sonucu gizle
  };

  const hesapla = () => {
    if (Object.values(cevaplar).includes(null)) {
      alert(ui.uyari);
      return;
    }

    const puan = Object.values(cevaplar).filter((c) => c === true).length;

    let sonucMetni = "";
    let detayMetni = "";
    let arkaRenk = "";
    let yaziRenk = "";

    if (puan >= 3) {
      sonucMetni = ui.durumlar.kirilgan;
      detayMetni = ui.detaylar.kirilgan;
      arkaRenk = "#ffebee";
      yaziRenk = "#c62828";
    } else if (puan >= 1) {
      sonucMetni = ui.durumlar.oncesi;
      detayMetni = ui.detaylar.oncesi;
      arkaRenk = "#fff3e0";
      yaziRenk = "#ef6c00";
    } else {
      sonucMetni = ui.durumlar.saglam;
      detayMetni = ui.detaylar.saglam;
      arkaRenk = "#e8f5e9";
      yaziRenk = "#2e7d32";
    }

    setSonuc({
      metin: sonucMetni,
      detay: detayMetni,
      bg: arkaRenk,
      color: yaziRenk,
      puan: puan
    });
  };

  // --- RENDER (GÖRÜNÜM - DÜŞME RİSKİ STİLİNDE) ---
  return (
    <div style={styles.card}>
      {/* Başlık */}
      <div style={styles.header}>
        <span style={{ fontSize: "22px" }}>🏃‍♂️</span>
        <h3 style={{ margin: 0, color: "#333" }}>{ui.baslik}</h3>
      </div>

      {/* Sorular Listesi (Gri Kutulu Stil) */}
      <div style={styles.container}>
        {ui.sorular.map((soru) => (
          <div key={soru.id} style={styles.row}>
            {/* Soru Metni */}
            <p style={{ margin: 0, flex: 1, fontSize: "14px", color: "#555" }}>
              {soru.metin}
            </p>

            {/* Evet/Hayır Butonları */}
            <div style={styles.btnGroup}>
              <button
                onClick={() => cevapla(soru.id, true)}
                style={{
                  ...styles.btn,
                  background: cevaplar[soru.id] === true ? "#ef5350" : "#f0f0f0",
                  color: cevaplar[soru.id] === true ? "white" : "#333",
                }}
              >
                {ui.evet}
              </button>
              <button
                onClick={() => cevapla(soru.id, false)}
                style={{
                  ...styles.btn,
                  background: cevaplar[soru.id] === false ? "#66bb6a" : "#f0f0f0",
                  color: cevaplar[soru.id] === false ? "white" : "#333",
                }}
              >
                {ui.hayir}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hesapla Butonu */}
      {!sonuc && (
        <button onClick={hesapla} style={styles.calcBtn}>
          📊 {ui.analizBtn}
        </button>
      )}

      {/* SONUÇ ALANI */}
      {sonuc && (
        <div style={{ marginTop: "20px", animation: "fadeIn 0.5s" }}>
          
          {/* Sonuç Kutusu */}
          <div
            style={{
              ...styles.resultBox,
              borderLeft: `5px solid ${sonuc.color}`,
              backgroundColor: sonuc.bg,
            }}
          >
            <h4 style={{ margin: 0, color: sonuc.color, fontSize: "16px" }}>
              {sonuc.metin}
            </h4>
            <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#333" }}>
              {sonuc.detay}
            </p>
          </div>

          {/* Öneri Kartı */}
          <div style={{ marginTop: "15px" }}>
             <KirilganlikOneri dil={dil} isHighRisk={sonuc.puan >= 3} />
          </div>
        </div>
      )}
    </div>
  );
};

// --- YENİ STİLLER (DÜŞME RİSKİ İLE AYNI) ---
const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    maxWidth: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
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
    background: "#fafafa", // O sevdiğin gri tonu
    padding: "10px",
    borderRadius: "8px",
    gap: "10px",
  },
  btnGroup: {
    display: "flex",
    gap: "8px",
  },
  btn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  calcBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultBox: {
    padding: "15px",
    borderRadius: "8px",
  },
};

export default KirilganlikTesti;