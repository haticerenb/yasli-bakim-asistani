import React, { useState } from "react";
import DemansOneri from "./DemansOneri";
const DemansTesti = ({ dil }) => {
  const [aktifSoru, setAktifSoru] = useState(0);
  const [puan, setPuan] = useState(0);
  const [testBitti, setTestBitti] = useState(false);

  // --- DİL ALGILAMA SİHİRBAZI 🧙‍♂️ ---
  // Gelen 'dil' paketine bakarak hangi dilde olduğumuzu anlıyoruz.
  const secilenDil =
    dil.cikis === "Log Out" ? "en" : dil.cikis === "Ausloggen" ? "de" : "tr";

  // --- SORU BANKASI 📚 ---
  const sorular = {
    tr: [
      "Karar vermede zorluk yaşıyor mu?",
      "Hobi ve aktivitelere ilgisi azaldı mı?",
      "Aynı şeyleri, soruları veya hikayeleri tekrar ediyor mu?",
      "Alet kullanmada (kumanda, telefon) zorlanıyor mu?",
      "Hangi ayda veya yılda olduğunu karıştırıyor mu?",
      "Mali işleri (fatura, hesap) yönetmede zorlanıyor mu?",
      "Randevularını hatırlamakta zorlanıyor mu?",
      "Düşünce ve hafıza problemleri günlük hayatını etkiliyor mu?",
    ],
    en: [
      "Does he/she have difficulty making decisions?",
      "Has interest in hobbies and activities decreased?",
      "Does he/she repeat the same things, questions, or stories?",
      "Does he/she have trouble using tools (remote, phone)?",
      "Does he/she confuse the month or year?",
      "Does he/she have trouble managing finances (bills)?",
      "Does he/she have trouble remembering appointments?",
      "Do thinking and memory problems affect daily life?",
    ],
    de: [
      "Hat er/sie Schwierigkeiten, Entscheidungen zu treffen?",
      "Hat das Interesse an Hobbys und Aktivitäten nachgelassen?",
      "Wiederholt er/sie die gleichen Dinge, Fragen oder Geschichten?",
      "Hat er/sie Schwierigkeiten, Geräte (Fernbedienung, Telefon) zu benutzen?",
      "Verwechselt er/sie den Monat oder das Jahr?",
      "Hat er/sie Schwierigkeiten, Finanzen (Rechnungen) zu verwalten?",
      "Hat er/sie Schwierigkeiten, sich an Termine zu erinnern?",
      "Beeinträchtigen Denk- und Gedächtnisprobleme das tägliche Leben?",
    ],
  };

  // --- ARAYÜZ METİNLERİ (Yerel Sözlük) ---
  const metinler = {
    tr: {
      baslik: "Demans Tarama Testi (AD8)",
      soruBaslik: "Aşağıdaki durum değişikliğini fark ettiniz mi?",
      evet: "Evet, Var ⚠️",
      hayir: "Hayır, Yok ✅",
      sonucBaslik: "Analiz Sonucu",
      yuksekRisk: "Yüksek Risk Saptandı",
      dusukRisk: "Düşük Risk (Normal)",
      tekrar: "Testi Tekrarla",
      analiz: "Analiz ediliyor...",
    },
    en: {
      baslik: "Dementia Screening Test (AD8)",
      soruBaslik: "Have you noticed the following change?",
      evet: "Yes, There is ⚠️",
      hayir: "No, None ✅",
      sonucBaslik: "Analysis Result",
      yuksekRisk: "High Risk Detected",
      dusukRisk: "Low Risk (Normal)",
      tekrar: "Repeat Test",
      analiz: "Analyzing...",
    },
    de: {
      baslik: "Demenz-Screening-Test (AD8)",
      soruBaslik: "Haben Sie folgende Veränderung bemerkt?",
      evet: "Ja, Vorhanden ⚠️",
      hayir: "Nein, Keine ✅",
      sonucBaslik: "Analyseergebnis",
      yuksekRisk: "Hohes Risiko erkannt",
      dusukRisk: "Geringes Risiko (Normal)",
      tekrar: "Test wiederholen",
      analiz: "Analysieren...",
    },
  };

  // O anki dilin sorularını ve metinlerini seçiyoruz
  const aktifSorular = sorular[secilenDil];
  const ui = metinler[secilenDil];

  // FONKSİYONLAR
  const cevapla = (riskVar) => {
    if (riskVar) setPuan(puan + 1);

    if (aktifSoru < aktifSorular.length - 1) {
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
          <span style={{ fontSize: "22px" }}>🧠</span>
          <h3 style={{ margin: 0, color: "#333" }}>{ui.sonucBaslik}</h3>
        </div>

        {/* Sonuç Özeti */}
        <div
          style={{
            ...styles.sonucKutu,
            backgroundColor: riskli ? "#ffebee" : "#e8f5e9",
            borderColor: riskli ? "#ef5350" : "#66bb6a",
          }}
        >
          <h2
            style={{
              color: riskli ? "#c62828" : "#2e7d32",
              margin: "0 0 10px 0",
            }}
          >
            {riskli ? ui.yuksekRisk : ui.dusukRisk}
          </h2>
        </div>

        {/* ÖNERİ KARTI (Dil paketini buraya gönderiyoruz!) */}
        <div style={{ marginBottom: "20px" }}>
          <DemansOneri dil={dil} isHighRisk={riskli} />
        </div>

        <button onClick={sifirla} style={styles.restartBtn}>
          🔄 {ui.tekrar}
        </button>
      </div>
    );
  }

  // ilerleme çubuğu hesabı
  const ilerlemeYuzdesi = ((aktifSoru + 1) / aktifSorular.length) * 100;

  // --- SORU EKRANI ---
  return (
    <div style={styles.card}>
      {/* Başlık ve İlerleme */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Başlığı artık 'dil' paketinden alıyoruz */}
          <h3 style={{ margin: 0, color: "#333" }}>🧠 {dil.demans}</h3>
        </div>
        <span
          style={{ fontSize: "12px", color: "#888", fontWeight: "bold" }}
        >
          {aktifSoru + 1} / {aktifSorular.length}
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
        <h4 style={styles.soruMetni}>{aktifSorular[aktifSoru]}</h4>
        <p
          style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}
        >
          {ui.soruBaslik}
        </p>

        {/* Butonlar */}
        <div style={styles.btnGroup}>
          <button
            onClick={() => cevapla(true)}
            style={styles.evetBtn}
          >
            {ui.evet}
          </button>
          <button
            onClick={() => cevapla(false)}
            style={styles.hayirBtn}
          >
            {ui.hayir}
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