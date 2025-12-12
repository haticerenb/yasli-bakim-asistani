import React, { useState, useEffect } from "react";

// FIREBASE
import { auth, db } from "./firebase";
// GoogleAuthProvider ve signInWithPopup EKLENDİ
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// BİLEŞENLER
import IlacTakip from "./components/IlacTakip";
import SuTakip from "./components/SuTakip";
import DemansTesti from "./components/DemansTesti";
import KirilganlikTesti from "./components/KirilganlikTesti";
import ProfilOzet from "./components/ProfilOzet";
import DusmeRiski from "./components/DusmeRiski";
import GirisEkrani from "./components/GirisEkrani";

function App() {
  const [aktifKullanici, setAktifKullanici] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [ilaclar, setIlaclar] = useState([]);
  const [suMiktari, setSuMiktari] = useState(0);

  const hatayiTurkceyeCevir = (hataKodu) => {
    switch (hataKodu) {
      case "auth/email-already-in-use":
        return "Bu e-mail kullanımda.";
      case "auth/invalid-email":
        return "Geçersiz e-mail adresi.";
      case "auth/user-not-found":
        return "Kullanıcı bulunamadı.";
      case "auth/wrong-password":
        return "Şifre hatalı.";
      case "auth/popup-closed-by-user":
        return "Giriş penceresini kapattınız.";
      default:
        return "Hata: " + hataKodu;
    }
  };

  useEffect(() => {
    const dinleyici = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "kullanicilar", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const veri = docSnap.data();
          setIlaclar(veri.ilaclar || []);
          setSuMiktari(veri.suMiktari || 0);
          setAktifKullanici({
            email: user.email,
            uid: user.uid,
            isim: veri.isim,
          });
        } else {
          // Google ile ilk gelişiyse, henüz veritabanında kaydı yok demektir.
          // State'i hemen güncelleme, veritabanı oluşunca hallolur.
          setAktifKullanici({
            email: user.email,
            uid: user.uid,
            isim: user.displayName || "Google Kullanıcısı",
          });
        }
      } else {
        setAktifKullanici(null);
        setIlaclar([]);
        setSuMiktari(0);
      }
      setYukleniyor(false);
    });
    return () => dinleyici();
  }, []);

  useEffect(() => {
    const veriyiBulutaKaydet = async () => {
      if (aktifKullanici && !yukleniyor) {
        try {
          const docRef = doc(db, "kullanicilar", aktifKullanici.uid);
          await setDoc(
            docRef,
            {
              ilaclar: ilaclar,
              suMiktari: suMiktari,
              isim: aktifKullanici.isim,
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Kaydetme hatası:", error);
        }
      }
    };
    veriyiBulutaKaydet();
  }, [ilaclar, suMiktari, aktifKullanici, yukleniyor]);

  // --- GİRİŞ FONKSİYONLARI ---

  const sistemeGirisYap = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(hatayiTurkceyeCevir(error.code));
    }
  };

  const sistemeKayitOl = async (email, password, isim) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "kullanicilar", cred.user.uid), {
        isim: isim,
        ilaclar: [],
        suMiktari: 0,
      });
    } catch (error) {
      alert(hatayiTurkceyeCevir(error.code));
    }
  };

  // --- YENİ: GOOGLE İLE GİRİŞ ---
  const googleIleGiris = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Veritabanında var mı bakalım?
      const docRef = doc(db, "kullanicilar", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // İLK KEZ GELİYOR -> Kaydını oluşturalım
        await setDoc(docRef, {
          isim: user.displayName, // Google'daki ismini alıyoruz
          ilaclar: [],
          suMiktari: 0,
        });
      }
    } catch (error) {
      alert(hatayiTurkceyeCevir(error.code));
    }
  };

  const cikisYap = async () => {
    await signOut(auth);
  };

  // --- EKRAN ---
  if (yukleniyor)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Yükleniyor...
      </div>
    );

  if (!aktifKullanici) {
    // googleGiris fonksiyonunu prop olarak gönderiyoruz
    return (
      <GirisEkrani
        onGiris={sistemeGirisYap}
        onKayit={sistemeKayitOl}
        onGoogleGiris={googleIleGiris}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f0f2f5",
        padding: "30px",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#1a3b5d",
            fontSize: "2.5rem",
          }}
        >
          Yaşlı Dostu Bakım Asistanı 
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "25px",
            alignItems: "start",
          }}
        >
          {/* 1. KUTU: ARTIK BURASI PROFİL KISMI (Kodda öne aldık) */}
          {/* Telefonda ilk sırada olduğu için EN ÜSTTE görünecek ✅ */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <ProfilOzet
              adSoyad={aktifKullanici.isim}
              suMiktari={suMiktari}
              suHedefi={2000}
              ilacDurumu={true}
              onCikisYap={cikisYap}
            />
            <SuTakip
              suMiktari={suMiktari}
              onSuEkle={(m) => setSuMiktari((prev) => Math.max(0, prev + m))}
            />
            <DemansTesti />
          </div>

          {/* 2. KUTU: ARTIK BURASI İLAÇ KISMI (Kodda sona aldık) */}
          {/* Telefonda profilin ALTINDA görünecek */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          >
            <div style={{ height: "600px" }}>
              <IlacTakip
                ilaclar={ilaclar}
                onIlacEkle={(ad, ekstra, saat, tok) =>
                  setIlaclar([
                    ...ilaclar,
                    {
                      id: Date.now(),
                      ad,
                      suEtkisi: ekstra ? 700 : 200,
                      saat,
                      tokluk: tok,
                    },
                  ])
                }
                onIlacSil={(id) =>
                  setIlaclar(ilaclar.filter((i) => i.id !== id))
                }
              />
            </div>
            {/* İlaç kutusunun altına bunları ekle: */}
            <DusmeRiski />
            <div style={{ marginTop: "25px" }}></div> {/* Araya boşluk olsun */}
            <KirilganlikTesti />
            <div style={{ marginTop: "25px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;