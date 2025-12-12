import React, { useState, useEffect } from "react";

// Alarm sesi linki
const ALARM_SESI =
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

const IlacTakip = ({ ilaclar, onIlacEkle, onIlacSil }) => {
  // --- STATE TANIMLARI ---
  const [girilenYazi, setGirilenYazi] = useState("");
  const [ekstraSuGerekir, setEkstraSuGerekir] = useState(false);
  const [secilenSaat, setSecilenSaat] = useState("09:00");
  const [toklukDurumu, setToklukDurumu] = useState("Tok");
  const [aktifAlarmlar, setAktifAlarmlar] = useState([]); // Alarm listesi

  // İDRAR SÖKTÜRÜCÜ LİSTESİ
  const bilinenDiuretikler = [
    "lasix",
    "desal",
    "aldactazide",
    "fludex",
    "didi",
    "diazomid",
    "moduretic",
    "hygroton",
    "sipraktin",
    "tensinor",
  ];

  // 1. OTOMATİK TANIMA
  useEffect(() => {
    const kucukHarf = girilenYazi.toLowerCase();
    const listedeVarMi = bilinenDiuretikler.some((ilac) =>
      kucukHarf.includes(ilac)
    );
    setEkstraSuGerekir(listedeVarMi);
  }, [girilenYazi]);

  // 2. ALARM KONTROL MERKEZİ
  useEffect(() => {
    const zamanlayici = setInterval(() => {
      const simdi = new Date();
      if (simdi.getSeconds() === 0) {
        const suAnkiSaat =
          simdi.getHours().toString().padStart(2, "0") +
          ":" +
          simdi.getMinutes().toString().padStart(2, "0");

        ilaclar.forEach((ilac) => {
          if (aktifAlarmlar.includes(ilac.id) && ilac.saat === suAnkiSaat) {
            const ses = new Audio(ALARM_SESI);
            ses.play().catch((e) => console.log("Ses hatası:", e));
            alert(`⏰ İLAÇ VAKTİ!\n\n${ilac.ad} ilacını içmen gerekiyor.`);
          }
        });
      }
    }, 1000);
    return () => clearInterval(zamanlayici);
  }, [aktifAlarmlar, ilaclar]);

  // FONKSİYONLAR
  const ekleButonunaBasinca = () => {
    if (girilenYazi.trim() === "") return;
    onIlacEkle(girilenYazi, ekstraSuGerekir, secilenSaat, toklukDurumu);
    setGirilenYazi("");
    setEkstraSuGerekir(false);
    setSecilenSaat("09:00");
  };

  const alarmAcKapat = (id) => {
    if (aktifAlarmlar.includes(id)) {
      setAktifAlarmlar(aktifAlarmlar.filter((alarmId) => alarmId !== id));
    } else {
      setAktifAlarmlar([...aktifAlarmlar, id]);
    }
  };

  return (
    <div style={styles.container}>
      {/* BAŞLIK */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#333" }}>💊 İlaç Takip</h3>
          <span
            style={{
              fontSize: "12px",
              color: "#888",
              background: "#f0f0f0",
              padding: "2px 6px",
              borderRadius: "10px",
            }}
          >
            {ilaclar.length} Adet
          </span>
        </div>
      </div>

      {/* LİSTE */}
      <ul style={styles.list}>
        {ilaclar.map((ilac) => {
          const alarmAcik = aktifAlarmlar.includes(ilac.id);
          return (
            <li key={ilac.id} style={styles.listItem}>
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <strong style={{ fontSize: "15px", color: "#333" }}>
                    {ilac.ad}
                  </strong>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      background: ilac.suEtkisi >= 500 ? "#e3f2fd" : "#f5f5f5",
                      color: ilac.suEtkisi >= 500 ? "#1976d2" : "#757575",
                    }}
                  >
                    {ilac.suEtkisi >= 500 ? "💧 +500ml" : "💊 Normal"}
                  </div>
                </div>
                <div
                  style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}
                >
                  🕒 {ilac.saat} •{" "}
                  <span style={{ fontWeight: "500" }}>{ilac.tokluk}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  onClick={() => alarmAcKapat(ilac.id)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: alarmAcik ? "#2ecc71" : "#eee",
                    color: alarmAcik ? "white" : "#999",
                  }}
                >
                  {alarmAcik ? "🔔" : "🔕"}
                </button>
                <button
                  onClick={() => onIlacSil(ilac.id)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: "#ffEBEE",
                    color: "#d32f2f",
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          );
        })}
        {ilaclar.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: "13px",
              marginTop: "20px",
            }}
          >
            Listen boş.
          </p>
        )}
      </ul>

      {/* EKLEME ALANI */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="İlaç adı giriniz..."
          value={girilenYazi}
          onChange={(e) => setGirilenYazi(e.target.value)}
          style={styles.input}
        />

        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <input
            type="time"
            value={secilenSaat}
            onChange={(e) => setSecilenSaat(e.target.value)}
            style={styles.selectInput}
          />
          <select
            value={toklukDurumu}
            onChange={(e) => setToklukDurumu(e.target.value)}
            style={styles.selectInput}
          >
            <option value="Tok">Tok</option>
            <option value="Aç">Aç</option>
            <option value="Yemekle">Yemekle</option>
          </select>
          <button onClick={ekleButonunaBasinca} style={styles.addButton}>
            Ekle
          </button>
        </div>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={ekstraSuGerekir}
            onChange={(e) => setEkstraSuGerekir(e.target.checked)}
            style={{ accentColor: "#3b82f6", width: "16px", height: "16px" }}
          />
          <span>Bu ilaç idrar söktürücü (+500ml su)</span>
        </label>
      </div>
    </div>
  );
};

// --- STİLLER ---
const styles = {
  container: {
    width: "100%",
    height: "100%",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxSizing: "border-box",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
    overflowY: "auto",
    maxHeight: "200px",
    marginBottom: "15px",
  },
  listItem: {
    borderBottom: "1px solid #f0f0f0",
    padding: "12px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "35px",
    height: "35px",
    transition: "0.2s",
  },
  inputArea: {
    marginTop: "auto",
    paddingTop: "15px",
    borderTop: "2px solid #f0f0f0",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #e0e0e0",
    background: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
    color: "#000", // SİYAH YAZI BURADA AYARLI
    fontSize: "14px",
  },
  selectInput: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    background: "#fff",
    flex: 1,
    cursor: "pointer",
    outline: "none",
    color: "#000"
  },
  addButton: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "0 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#555",
    userSelect: "none",
  },
};

export default IlacTakip;
