# whatsapp-analiz
Sevgiliniz, arkadaşlarınız ve aileniz tüm WhatsApp sohbetlerinizi analiz edin ve paylaşın.
# 📱 Sohbet İstihbaratı (WhatsApp Chat Analyzer) - %100 Lokal & AI Destekli

![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![Privacy](https://img.shields.io/badge/Privacy-100%25_Local-blue.svg)
![License](https://img.shields.io/badge/License-MIT-orange.svg)

**Sohbet İstihbaratı**, WhatsApp dışa aktarılan sohbet dökümlerini (.txt veya .zip) tarayıcı içinde analiz eden, veri gizliliğini en üst seviyede tutan bir analiz aracıdır. Diğer araçların aksine, verileriniz asla bir sunucuya yüklenmez; her şey sizin cihazınızda gerçekleşir.

---

## 🚀 Öne Çıkan Özellikler

- **%100 Yerel Analiz:** Verileriniz cihazınızdan asla dışarı çıkmaz. İnternet bağlantınız olmasa bile çalışır.
- **Algoritmik Teşhis (Local AI):** Gelişmiş JSON karar ağacı motoru sayesinde, sohbet dinamiklerinize Onedio tarzı, esprili ve vurucu "İlişki Teşhisleri" koyar.
- **Psikolojik Metrikler:**
  - **Mesaj Hakimiyeti:** Kimin daha çok konuştuğunu yüzde (%) bazında görün.
  - **Ghosting Endeksi:** Karşı tarafın ortalama yanıt süresini ölçün.
  - **Sohbet Başlatıcı (Initiator):** Sessizliği en çok kimin bozduğunu tespit edin.
  - **En Uzun Sessizlik:** Aranızdaki en uzun "küslük" süresini gün bazında hesaplayın.
- **Görselleştirme:** Sık kullanılan kelimeler ve favori emojiler için modern "Pill" tasarımı.
- **📸 Story Export:** Analiz sonuçlarını Instagram veya WhatsApp hikayelerinde paylaşmak için yüksek kaliteli tek bir dikişsiz infografik olarak indirin.

---

## 🛠️ Teknik Altyapı

Bu proje, herhangi bir backend veya API bağımlılığı olmaksızın modern web teknolojileriyle inşa edilmiştir:

- **Vanilla JavaScript:** Çekirdek mantık ve DOM yönetimi.
- **Web Workers:** Büyük sohbet dökümlerini tarayıcıyı kasmadan arka planda işlemek için.
- **JSON Karar Motoru:** İstatistikleri yorumlayıp mantıksal senaryolarla eşleştiren yerel veritabanı.
- **JSZip:** WhatsApp'ın .zip formatındaki dışa aktarımlarını tarayıcıda açmak için.
- **html2canvas:** Sonuçları cihaz içi görselleştirip PNG formatında dışa aktarmak için.

---

## 📦 Kurulum ve Dağıtım

Proje statik dosyalardan oluştuğu için herhangi bir sunucu kurulumu gerektirmez.

1. Bu depoyu klonlayın: `git clone https://github.com/Asklepios0/whatsapp-analiz.git`
2. `index.html` dosyasını tarayıcınızda açın.
3. (Opsiyonel) Ücretsiz hosting için **GitHub Pages** veya **Vercel** üzerinden tek tıkla yayına alabilirsiniz.

---

## 🛡️ Gizlilik Bildirimi

Bu uygulama, **Gizlilik Odaklı Tasarım (Privacy by Design)** ilkesine dayanır. 
- Analiz için kullanılan JavaScript kodları, verilerinizi hiçbir uzak sunucuya veya üçüncü tarafa iletmez. 
- Dosya okuma işlemleri tarayıcınızın `FileReader` ve `Web Worker` API'leri üzerinden tamamen "offline" (çevrimdışı) gerçekleştirilir.

---

## 🤝 Katkıda Bulunma

Geliştirme önerileriniz veya hata bildirimleriniz için lütfen bir **Issue** açın veya **Pull Request** gönderin. Karar motoru için yeni senaryo önerilerine her zaman açığız!

---

## 👤 Geliştirici

**Bedirhan Bıyıkcı** *Gazetecilik Öğrencisi & AI Entegrasyon Meraklısı* [GitHub](https://github.com/bedirhanbiyikci) | [LinkedIn](https://linkedin.com/in/bedirhanbiyikci)

---

### 📝 Lisans
Bu proje **MIT Lisansı** altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.
