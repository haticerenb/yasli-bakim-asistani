import React, { useState } from "react";

const GirisEkrani = ({ onGiris, onKayit, onGoogleGiris, dil, secilenDil, setSecilenDil }) => {
  const [mod, setMod] = useState("giris"); // 'giris' veya 'kayit'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isim, setIsim] = useState("");
  const [sifreGoster, setSifreGoster] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mod === "giris") {
      onGiris(email, password);
    } else {
      onKayit(email, password, isim);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* --- DİL BUTONLARI (SAĞ ÜST KÖŞE) --- */}
      <div style={styles.langContainer}>
          <button onClick={() => setSecilenDil("tr")} style={{...styles.langBtn, opacity: secilenDil === "tr" ? 1 : 0.5}}>🇹🇷</button>
          <button onClick={() => setSecilenDil("en")} style={{...styles.langBtn, opacity: secilenDil === "en" ? 1 : 0.5}}>🇬🇧</button>
          <button onClick={() => setSecilenDil("de")} style={{...styles.langBtn, opacity: secilenDil === "de" ? 1 : 0.5}}>🇩🇪</button>
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "#1a3b5d" }}>
            {mod === "giris" ? (dil?.girisBaslik || "Giriş Yap") : (dil?.kayitBaslik || "Kayıt Ol")}
          </h2>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>
            {dil?.baslik || "Yaşlı Bakım Asistanı"} 💙
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Sadece Kayıt Modunda İsim Sor */}
          {mod === "kayit" && (
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            placeholder={dil?.email || "E-posta"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={sifreGoster ? "text" : "password"}
              placeholder={dil?.sifre || "Şifre"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span
              onClick={() => setSifreGoster(!sifreGoster)}
              style={styles.eyeIcon}
            >
              {sifreGoster ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {mod === "giris" ? (dil?.girisButon || "Giriş") : (dil?.kayitButon || "Kayıt Ol")}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={{ background: "white", padding: "0 10px", color: "#999", fontSize: "12px" }}>
            YA DA / OR
          </span>
        </div>

        <button onClick={onGoogleGiris} style={styles.googleBtn}>
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="G" 
            style={{ width: "18px", marginRight: "10px" }}
          />
          {dil?.googleButon || "Google ile Giriş"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          <span
            onClick={() => setMod(mod === "giris" ? "kayit" : "giris")}
            style={styles.link}
          >
            {mod === "giris" ? (dil?.hesapYok || "Kayıt Ol") : (dil?.hesapVar || "Giriş Yap")}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
    position: "relative"
  },
  langContainer: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "10px"
  },
  langBtn: {
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border 0.3s",
  },
  submitBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  eyeIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  divider: {
    textAlign: "center",
    margin: "20px 0",
    position: "relative",
    borderBottom: "1px solid #eee",
    lineHeight: "0px",
  },
  googleBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    color: "#333",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 0.3s",
  },
  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default GirisEkrani;
