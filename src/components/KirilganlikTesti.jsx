import React, { useState } from "react";
import KirilganlikOneri from "./KirilganlikOneri";

const KirilganlikTesti = ({ dil }) => {
  // Cevapları tuttuğumuz yer (null = henüz cevaplanmadı)
  const [cevaplar, setCevaplar] = useState({
    s1: null, // Kilo kaybı
    s2: null, // Yorgunluk
    s3: null, // Yürüme hızı
    s4: null, // El sıkma gücü
    s5: null, // Fiziksel aktivite
  });
  
  const [sonuc, setSonuc] = useState(null);

  // --- DİL ALGILAMA SİHİRBAZI 🧙‍♂️ ---
  // Hangi dilde olduğumuzu 'cikis' butonundaki yazıdan anlıyoruz
  const secilenDil =
    dil.cikis === "Log Out" ? "en" : dil.cikis === "Ausloggen" ? "de" : "tr";

  // --- ÇEVİRİ DEPOSU (Sorular ve Sonuçlar) ---
  const metinler = {
    tr: {
      baslik: "Kırılganlık Testi",
      sorular: [
        { id: "s1", metin: "Son 1 yılda istemsiz kilo kaybı var mı?" },
        { id: "s2", metin: "Kendinizi sık sık yorgun hisseder misiniz?" },
        { id: "s3", metin: "Yürüyüş hızınız yavaşladı mı?" },
        { id: "s4", metin: "El sıkma gücünüz azaldı mı?" },
        { id: "s5", metin: "Fiziksel aktiviteniz çok azaldı mı?" }
      ],
      evet: "Evet",
      hayir: "Hayır",
      analizBtn: "Analiz Et",
      uyari: "Lütfen tüm soruları cevaplayın.",
      sonucBaslik: "Analiz Sonucu",
      durumlar: {
        saglam: "Sağlam (Düşük Risk) ✅",
        oncesi: "Kırılgan Öncesi (Orta Risk) ⚠️",
        kirilgan: "Kırılgan (Yüksek Risk) 🚨"
      }
    },
    en: {
      baslik: "Frailty Test",
      sorular: [
        { id: "s1", metin: "Unintentional weight loss in the last year?" },
        { id: "s2", metin: "Do you often feel tired?" },
        { id: "s3", metin: "Has your walking speed slowed down?" },
        { id: "s4", metin: "Has your grip strength decreased?" },
        { id: "s5", metin: "Has your physical activity decreased significantly?" }
      ],
      evet: "Yes",
      hayir: "No",
      analizBtn: "Analyze",
      uyari: "Please answer all questions.",
      sonucBaslik: "Analysis Result",
      durumlar: {
        saglam: "Robust (Low Risk) ✅",
        oncesi: "Pre-Frail (Medium Risk) ⚠️",
        kirilgan: "Frail (High Risk) 🚨"
      }
    },
    de: {
      baslik: "Gebrechlichkeitstest",
      sorular: [
        { id: "s1", metin: "Unbeabsichtigter Gewichtsverlust im letzten Jahr?" },
        { id: "s2", metin: "Fühlen Sie sich oft müde?" },
        { id: "s3", metin: "Hat sich Ihre Gehgeschwindigkeit verlangsamt?" },
        { id: "s4", metin: "Hat Ihre Griffkraft abgenommen?" },
        { id: "s5", metin: "Hat Ihre körperliche Aktivität stark abgenommen?" }
      ],
      evet: "Ja",
      hayir: "Nein",
      analizBtn: "Analysieren",
      uyari: "Bitte beantworten Sie alle Fragen.",
      sonucBaslik: "Analyseergebnis",
      durumlar: {
        saglam: "Robust (Geringes Risiko) ✅",
        oncesi: "Vorgebrechlich (Mittleres Risiko) ⚠️",
        kirilgan: "Gebrechlich (Hohes Risiko) 🚨"
      }
    }
  };

  // O anki dilin metinlerini seçiyoruz
  const ui = metinler[secilenDil];

  // --- FONKSİYONLAR ---
  const cevapla = (soruId, deger) => {
    setCevaplar({ ...cevaplar, [soruId]: deger });
  };

  const hesapla = () => {
    // 1. Boş soru var mı kontrol et
    if (Object.values(cevaplar).includes(null)) {
      alert(ui.uyari);
      return;
    }

    // 2. Puanı Hesapla (Her 'Evet' 1 puan)
    const puan = Object.values(cevaplar).filter((c) => c === true).length;

    // 3. Durumu Belirle
    let sonucMetni = "";
    let arkaRenk = "";
    let yaziRenk = "";

    if (puan >= 3) {
      sonucMetni = ui.durumlar.kirilgan;
      arkaRenk = "#ffebee";
      yaziRenk = "#c62828";
    } else if (puan >= 1) {
      sonucMetni = ui.durumlar.oncesi;
      arkaRenk = "#fff3e0";
      yaziRenk = "#ef6c00";
    } else {
      sonucMetni = ui.durumlar.saglam;
      arkaRenk = "#e8f5e9";
      yaziRenk = "#2e7d32";
    }

    setSonuc({
      metin: sonucMetni,
      bg: arkaRenk,
      color: yaziRenk,
      puan: puan
    });
  };

  // --- RENDER ---
  return (
    <div style={styles.card}>
      {/* BAŞLIK */}
      <div style={styles.header}>
        <span style={{ fontSize: "22px" }}>🏃‍♂️</span>
        <h3 style={{ margin: 0, color: "#333" }}>{ui.baslik}</h3>
      </div>

      {/* SORULAR */}
      <div style={styles.soruListesi}>
        {ui.sorular.map((soru) => (
          <div key={soru.id} style={styles.soruSatiri}>
            <p style={styles.soruMetni}>{soru.metin}</p>
            <div style={styles.btnGroup}>
              <button
                onClick={() => cevapla(soru.id, true)}
                style={{
                  ...styles.btn,
                  backgroundColor: cevaplar[soru.id] === true ? "#ef5350" : "#eee",
                  color: cevaplar[soru.id] === true ? "white" : "#333",
                }}
              >
                {ui.evet}
              </button>
              <button
                onClick={() => cevapla(soru.id, false)}
                style={{
                  ...styles.btn,
                  backgroundColor: cevaplar[soru.id] === false ? "#66bb6a" : "#eee",
                  color: cevaplar[soru.id] === false ? "white" : "#333",
                }}
              >
                {ui.hayir}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SONUÇ KUTUSU (Varsa Göster) */}
      {sonuc && (
        <div style={{ marginTop: "20px", animation: "fadeIn 0.5s" }}>
          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: sonuc.bg,
              color: sonuc.color,
              border: `1px solid ${sonuc.color}`,
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0 }}>{sonuc.metin}</h3>
          </div>

          {/* ÖNERİ KARTINI ÇAĞIRIYORUZ */}
          {/* Buraya 'dil' paketini gönderiyoruz ki içindeki yazılar da değişsin */}
          <KirilganlikOneri dil={dil} isHighRisk={sonuc.puan >= 3} />
        </div>
      )}

      {/* ANALİZ BUTONU (Sonuç yoksa göster) */}
      {!sonuc && (
        <button onClick={hesapla} style={styles.analizBtn}>
          📊 {ui.analizBtn}
        </button>
      )}
    </div>
  );
};
const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  head: {
    margin: "0 0 15px 0",
    color: "#1a3b5d",
    borderBottom: "2px solid #f0f2f5",
    paddingBottom: "10px",
  },
  body: { display: "flex", flexDirection: "column", gap: "10px" },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "8px",
  },
  sb: {
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginLeft: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
  btn: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#1a3b5d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  res: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid currentColor",
  },
};

export default KirilganlikTesti;