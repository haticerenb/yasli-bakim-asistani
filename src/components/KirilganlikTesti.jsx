import React, { useState } from "react";
import OneriKarti from './KirilganlikOneri';

const KirilganlikTesti = () => {
  const [sorular, setSorular] = useState({
    s1: null,
    s2: null,
    s3: null,
    s4: null,
    s5: null,
  });
  const [sonuc, setSonuc] = useState(null);

  const cevapla = (k, v) => setSorular({ ...sorular, [k]: v });

  const hesapla = () => {
    if (Object.values(sorular).includes(null))
      return alert("Tüm soruları cevaplayın.");
    
    const puan = Object.values(sorular).filter((v) => v).length;

    // BURAYI GÜNCELLEDİM: Puan bilgisini de state'e ekliyoruz ki aşağıda kullanalım
    if (puan >= 3)
      setSonuc({ t: "Kırılgan (Yüksek Risk)", c: "#ffebee", fc: "#c62828", puan: puan });
    else if (puan >= 1)
      setSonuc({
        t: "Kırılgan Öncesi (Orta Risk)",
        c: "#fff3e0",
        fc: "#ef6c00",
        puan: puan
      });
    else 
      setSonuc({ t: "Sağlam (Düşük Risk)", c: "#e8f5e9", fc: "#2e7d32", puan: puan });
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.head}>🦴 Kırılganlık Testi</h3>
      <div style={styles.body}>
        <Soru
          t="1. Son 1 yılda istemsiz kilo kaybı?"
          k="s1"
          c={sorular}
          f={cevapla}
        />
        <Soru
          t="2. Kendinizi sık sık yorgun hisseder misiniz?"
          k="s2"
          c={sorular}
          f={cevapla}
        />
        <Soru
          t="3. Yürüyüş hızınız yavaşladı mı?"
          k="s3"
          c={sorular}
          f={cevapla}
        />
        <Soru
          t="4. El sıkma gücünüz azaldı mı?"
          k="s4"
          c={sorular}
          f={cevapla}
        />
        <Soru
          t="5. Fiziksel aktiviteniz çok azaldı mı?"
          k="s5"
          c={sorular}
          f={cevapla}
        />
      </div>

      {sonuc ? (
        <>
          {/* Sonuç Kutusu */}
          <div style={{ ...styles.res, background: sonuc.c, color: sonuc.fc }}>
            SONUÇ: {sonuc.t}
          </div>

          {/* 👇 İŞTE BURAYA KOYUYORUZ 👇 */}
          {/* Sonuç hesaplandıysa Öneri Kartı'nı göster */}
          {/* Senin koduna göre puan 3 ve üzeri "Yüksek Risk" sayılıyor */}
          <div style={{ marginTop: '10px' }}>
            <OneriKarti isHighRisk={sonuc.puan >= 3} />
          </div>
        </>
      ) : (
        <button onClick={hesapla} style={styles.btn}>
          Analiz Et
        </button>
      )}
    </div>
  );
};

const Soru = ({ t, k, c, f }) => (
  <div style={styles.row}>
    <span>{t}</span>
    <div>
      <button
        onClick={() => f(k, true)}
        style={{
          ...styles.sb,
          background: c[k] === true ? "#ef5350" : "#eee",
          color: c[k] === true ? "#fff" : "#333",
        }}
      >
        Evet
      </button>
      <button
        onClick={() => f(k, false)}
        style={{
          ...styles.sb,
          background: c[k] === false ? "#66bb6a" : "#eee",
          color: c[k] === false ? "#fff" : "#333",
        }}
      >
        Hayır
      </button>
    </div>
  </div>
);

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