import React, { useState } from "react";

// Props'a onGoogleGiris eklendi
const GirisEkrani = ({ onGiris, onKayit, onGoogleGiris }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isim, setIsim] = useState("");
  const [mod, setMod] = useState("giris");
  const [sifreGoster, setSifreGoster] = useState(false);

  const islemYap = () => {
    if (!email || !password) return alert("Mail ve şifre giriniz.");
    if (mod === "giris") onGiris(email, password);
    else {
      if (!isim) return alert("İsim gerekli.");
      onKayit(email, password, isim);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {mod === "giris" ? "👋 Hoş Geldiniz" : "🚀 Kayıt Ol"}
        </h1>
        <p style={styles.subtitle}>
          {mod === "giris"
            ? "Hesabınıza giriş yapın."
            : "Yeni hesap oluşturun."}
        </p>

        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="E-mail Adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={sifreGoster ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <span
              onClick={() => setSifreGoster(!sifreGoster)}
              style={styles.eyeIcon}
            >
              {sifreGoster ? "🙈" : "👁️"}
            </span>
          </div>

          {mod === "kayit" && (
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
              style={styles.input}
            />
          )}

          <button onClick={islemYap} style={styles.mainButton}>
            {mod === "giris" ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </div>

        {/* --- GOOGLE BUTONU KISMI --- */}
        <div style={styles.divider}>
          <span style={styles.dividerText}>veya</span>
        </div>

        <button onClick={onGoogleGiris} style={styles.googleButton}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
          Google ile Devam Et
        </button>
        {/* --------------------------- */}

        <div style={styles.footer}>
          <span style={{ color: "#666" }}>
            {mod === "giris" ? "Hesabın yok mu?" : "Zaten üye misin?"}
          </span>
          <button
            onClick={() => setMod(mod === "giris" ? "kayit" : "giris")}
            style={styles.linkButton}
          >
            {mod === "giris" ? "Hemen Kayıt Ol" : "Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    zIndex: 9999,
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    color: "#1a3b5d",
    margin: "0 0 5px 0",
    fontSize: "26px",
    fontWeight: "bold",
  },
  subtitle: { color: "#64748b", margin: "0 0 15px 0", fontSize: "14px" },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  passwordWrapper: { position: "relative", width: "100%" },
  eyeIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
    userSelect: "none",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "2px solid #eef2f7",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
    backgroundColor: "#f9fafb",
    width: "100%",
    boxSizing: "border-box",
    color:'black'
  },
  mainButton: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },

  // Google Butonu Stilleri
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    color: "#ccc",
  },
  dividerText: {
    flex: 1,
    borderBottom: "1px solid #eee",
    lineHeight: "0.1em",
    margin: "0 10px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #eef2f7",
    background: "white",
    color: "#444",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },

  footer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default GirisEkrani;
