let worker = new Worker('worker.js');

// === YAPAY ZEKA VERİTABANI (Eğitim Dosyasından Çekildi) ===
const aiDatabase = {
  "Flört": [
    { name: "Gönüllü Köle (Simp)", cond: { dom: "sen_cok", resp: "karsi_yavas" }, texts: ["Karşı tarafın egosunu beslemekten kendi hayatını unutmuşsun. Acil taktiği değiştir, bu gemi batıyor.", "O sana saatler sonra 'hmm' yazarken, sen destan yazıyorsun. Kendine gel ve o telefonu yavaşça yere bırak."] },
    { name: "Kırmızı Bayrak Fabrikası", cond: { dom: "dengeli", resp: "hizli", vibe: "romantik" }, texts: ["İkiniz de saniyeler içinde cevap veriyorsunuz. Klavye alev almış! Ama bu kadar hızlı başlayan bir şeyin sonu genelde büyük bir ghosting hikayesidir.", "Chat değil adeta Romeo ve Juliet'in dijital günlüğü! Yoğun love bombing'in sonu engellenenler listesidir, dikkatli bas."] },
    { name: "Hayalet Avcısı Uzmanı", cond: { dom: "sen_cok", resp: "cok_yavas" }, texts: ["Karşı taraf bildiğin Casper olmuş, sen hala 'acaba işi mi var' diyorsun. Hayır, sadece sana cevap vermek istemiyor.", "Son 5 mesajı sen atmışsın, cevap 'görüldü'. Kendi kendine konuşmayı seviyorsan not defterini kullan."] },
    { name: "Ruh Eşi / Tam Uyum", cond: { dom: "dengeli", vibe: "romantik" }, texts: ["Tebrikler, dijital ruh eşinizi bulmuşsunuz! Ne sen onu boğuyorsun, ne o seni bekletiyor. Sevgi dozu tam ayarında.", "Eşit başlama, eşit yanıt, bol eğlence. Kimse taktik kasmamış. Nazar boncuğu emojisini buraya bırakıyorum."] },
    { name: "Karanlık Yedek Kulübesi", cond: { dom: "karsi_cok", vibe: "notr" }, texts: ["Seni adeta bir dert dinleme duvarı yapmış. Kendi hayatını anlatıp duruyor, sen flört sıkıştırmaya çalışıyorsun. Yedek kulübesinde üşüyeceksin."] }
  ],
  "Arkadaş": [
    { name: "Sömürülen Terapist", cond: { dom: "karsi_cok", resp: "sen_hizli" }, texts: ["Sen arkadaş değil, ücretsiz yaşam koçu olmuşsun! Karşı taraf dert olunca destan yazıyor, senin dertlerini 'hayırlısı' ile geçiştiriyor.", "Ona sadece canı sıkkınken lazımsın. Mutluluğunu başkalarıyla, derdini seninle paylaşıyor. Bu arkadaşlık değil, sömürü."] },
    { name: "İleri Düzey Dedikodu Masası", cond: { dom: "dengeli", vibe: "eglenceli", media: "cok" }, texts: ["Bu sohbeti MİT okusa işi bırakır! Hızınıza ve arşivinize FBI bile yetişemez. İkiniz dünyayı yakarsınız.", "Story reply'ları, atılan postlar, çekiştirilen insanlar... Sırf bu geçmiş yüzünden cehennemde yan yana localarınız hazır."] },
    { name: "Sadece İşi Düşünce", cond: { dom: "karsi_az", resp: "cok_yavas" }, texts: ["Aylarca ses yok, birden 'Kanka senin Netflix şifren neydi?' İnanılmaz bir menfaat ilişkisi. Bu kişiyi çöp kutusuna taşı.", "Gelen her mesajın sonu ya bir iyilik istemeye ya da borca bağlanıyor. O bir arkadaş değil, sen onun sponsorun gibisin."] },
    { name: "Toksik Savaşçı Kankalar", cond: { dom: "dengeli", vibe: "toksik" }, texts: ["Sohbetiniz mayın tarlası gibi. Sürekli birbirinize laf sokuyorsunuz. Bu toksik bağa psikiyatrlar bile teşhis koyamaz.", "Birbirinize ettiğiniz beddualar tutsa ikiniz de şu an hayatta değildiniz. Harika ve bir o kadar da tehlikeli bir iletişim."] }
  ],
  "Aile": [
    { name: "Helikopter Ebeveyn Pro", cond: { dom: "karsi_cok", vibe: "toksik" }, texts: ["Nefes alışını bile takip etmek istiyorlar. Üst üste ses kayıtları, soru yağmuru. Dijital bir açık cezaevindesin.", "Yediğin yemekten her şeye rapor istiyorlar. Geç cevap verdiğinde duygu sömürüsü başlıyor. Allah sabır versin."] },
    { name: "CFO İletişimi (Bankamatik)", cond: { dom: "sen_az", vibe: "notr" }, texts: ["Sohbetin %90'ı IBAN ve dekont! Ailenle arandaki tek bağ EFT saatleri. Sevgi kelimelerinin yerini 'para yattı mı' almış."] },
    { name: "Teyit.org Kabusu", cond: { media: "cok", vibe: "notr" }, texts: ["Karşı taraf Anadolu Ajansı gibi! Sürekli asılsız sağlık haberleri, Cuma mesajları, Facebook videoları. Haklı olarak okumuyorsun.", "WhatsApp değil adeta teyit edilmemiş bilgi çöplüğü. Her gördüğü linki sana ileten bu büyüğümüzü acil sessize almalısın."] }
  ],
  "Eski_Sevgili": [
    { name: "Gece 02:00 Pişmanlığı", cond: { dom: "karsi_cok", resp: "sen_yavas" }, texts: ["Mesajların %90'ı gece atılmış. Alkolün cesaretiyle sana dönmeye çalışıyor ama sabahları yok. Engeli bas uyu.", "Gündüzleri kanlı bıçaklı, geceleri 'seni unutamadım'. Bu arkadaşın terapiye, senin de onu sessize almaya ihtiyacın var."] },
    { name: "Mahkeme Salonu (Kaos)", cond: { dom: "dengeli", vibe: "toksik", resp: "hizli" }, texts: ["Ayrılmışsınız ama hesaplaşma bitmemiş! Destanlar yazılıyor, suçlamalar havada. İkiniz de bu toksik kaostan zevk alıyorsunuz.", "Ayrılık iletişimi, sevgiliyken olduğundan ateşli. Mahkeme salonuna çevirmişsiniz WhatsApp'ı!"] },
    { name: "Bağımlı Döngü", cond: { dom: "dengeli", vibe: "romantik" }, texts: ["Ayrıldığınıza emin misiniz? Bütün gün şakalaşıp kalp atmaya devam ediyorsunuz. Ex'ten next olmaz ama inatçısınız.", "Ayrıyız deyip her sabah günaydınlaşmak hangi kitabın kuralı? İkiniz de birbirinizi başkasına yar etmemek için oyalıyor."] }
  ],
  "Is_Egitim": [
    { name: "Beyaz Yaka Robotu", cond: { dom: "dengeli", vibe: "notr" }, texts: ["Saygılar, sevgiler, iyi çalışmalar... Bu sohbet bir e-postadan farksız. Ne bir emoji ne bir samimiyet. Kurumsallığın dibi.", "Plaza dili WhatsApp'a inmiş. 'Aksiyon alalım', 'toplantı set edelim'. Bu chatte ruh yok, sadece PowerPoint sunumu var."] },
    { name: "Grup Projesi Hamalı", cond: { dom: "sen_cok", resp: "karsi_yavas" }, texts: ["Projenin grup projesi olduğuna emin miyiz? Çünkü her şeyi sen yapıyor, onlara sadece onay için yalvarıyorsun.", "Sürekli yapılması gerekenleri hatırlatan darlayıcı bir asistana dönüşmüşsün. Onlar yatıyor, notu beraber alacaksınız."] },
    { name: "Kurumsal Siper Yoldaşı", cond: { dom: "dengeli", vibe: "eglenceli" }, texts: ["İş/okul stresi içinde çölde vaha gibisiniz. Hem birbirinizin işini örtbas ediyor hem de çok eğleniyorsunuz. Gerçek bir dostluk."] }
  ],
  "Situationship": [
    { name: "Bipolar Termostat", cond: { dom: "dengeli", vibe: "toksik" }, texts: ["Bir gün evlenecek gibisiniz, ertesi gün asker arkadaşı. Bu duygu dalgalanmaları psikolojini mahveder. Gaslighting'in kitabı yazılıyor.", "Sana bir gün prens/prenses, diğer gün yabancı muamelesi yapıyor. İlgiye doyduğu an seni rafa kaldırıyor."] },
    { name: "Son Dakika Ekicisi", cond: { dom: "sen_cok", resp: "karsi_yavas" }, texts: ["Mesajda buluşmak için ölüp bitiyor ama iş icraata gelince sürekli bir bahanesi var. Sanal dünyada kalmaya yemin etmiş biri.", "Sen hevesle plan yaparken o son dakika yalanlarıyla seni yarı yolda bırakıyor. Saygısı olmayan biriyle zaman kaybetme."] },
    { name: "Kıdemli Yedek", cond: { dom: "karsi_az", resp: "cok_yavas" }, texts: ["Hayatında biri varken sana yazmıyor, boşta kalınca 'özledim' diyor. En klasik, en ucuz yedekleme taktiği. Kanma buna.", "Başka seçenekleri tükenene kadar seni beklemeye almış. Seni bir dolapta saklıyor, canı sıkıldığında çıkarıp oynuyor."] }
  ]
};

document.getElementById('chatFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const relation = document.getElementById('relationType').value;
    if (!file) return;

    document.getElementById('pBar').style.display = "block";
    document.getElementById('status').innerText = "Veriler cihazınızda okunuyor...";
    document.getElementById('exportBtn').style.display = "none";
    document.getElementById('dashboard').style.display = "none";
    
    let text = "";
    try {
        if (file.name.endsWith('.zip')) {
            const zip = await new JSZip().loadAsync(file);
            const txtFile = Object.keys(zip.files).find(n => n.endsWith('.txt'));
            text = await zip.files[txtFile].async("string");
        } else {
            text = await file.text();
        }
        worker.postMessage({ text, relation });
    } catch (err) {
        document.getElementById('status').innerText = "Hata: Dosya okunamadı.";
    }
});

worker.onmessage = function(e) {
    if (e.data.type === 'PROGRESS') {
        document.getElementById('pInner').style.width = e.data.progress + "%";
    }
    if (e.data.type === 'RESULT') {
        const data = e.data.payload;
        document.getElementById('pBar').style.display = "none";
        document.getElementById('dashboard').style.display = "flex";
        
        document.getElementById('totalMsgs').innerText = data.totalMessages.toLocaleString();
        document.getElementById('startDate').innerText = data.startDate;
        document.getElementById('peakDate').innerText = `${data.peakDate.date} (${data.peakDate.count})`;
        document.getElementById('longestSilence').innerText = `${data.longestSilence} Gün`;

        const senders = Object.keys(data.senders);
        let peopleHTML = "";
        
        // Karar motoru için verileri basitleştir
        let userA = senders[0];
        let userB = senders[1] || userA;
        let pA = data.senders[userA] / data.totalMessages;
        let pB = data.senders[userB] / data.totalMessages;
        
        senders.forEach((s, i) => {
            const percent = Math.round((data.senders[s] / data.totalMessages) * 100);
            const color = i === 0 ? '#25D366' : '#34b7f1';
            const initCount = data.initiators[s] || 0;
            const respTime = data.avgResponse[s] || 0;

            peopleHTML += `
                <div class="person-row">
                    <div class="person-info">
                        <b style="color: #fff;">${s} (%${percent})</b>
                        <div class="percent-bar"><div class="percent-fill" style="width: ${percent}%; background: ${color}"></div></div>
                    </div>
                    <div class="person-metrics">
                        <span>⏳ Yanıt: <b>${respTime} dk</b></span>
                        <span>🔥 Başlatma: <b>${initCount}</b></span>
                    </div>
                </div>
            `;
        });
        document.getElementById('peopleStats').innerHTML = peopleHTML;

        document.getElementById('emojiList').innerHTML = data.topEmojis.map(em => `<div class="pill">${em}</div>`).join('');
        document.getElementById('wordCloud').innerHTML = data.topWords.map(w => `<div class="pill">${w}</div>`).join('');

        // === LOKAL KARAR MOTORUNU ÇALIŞTIR ===
        document.getElementById('status').innerText = "Algoritmik teşhis konuluyor...";
        runLocalAI(data, pA, pB, userA, userB);
    }
};

function runLocalAI(data, pA, pB, userA, userB) {
    const rel = data.relationType;
    const scenarios = aiDatabase[rel];
    
    // Güvenlik: Eğer o kategori için veri yoksa genel bir metin bas
    if (!scenarios || scenarios.length === 0) {
        document.getElementById('scenarioName').innerText = "Bilinmeyen Dinamik";
        document.getElementById('aiSummaryText').innerText = "Bu ilişkiyi algoritmalar bile çözemedi. Karmaşık ve kendine has bir dinamiğiniz var.";
        finishRender(); return;
    }

    // Metrikleri hesapla
    const isBalancedDom = Math.abs(pA - pB) < 0.15; // İkisi de %42-%58 arasıysa dengeli
    const isToxic = data.vibe.toxic > data.vibe.pos;
    const isFun = data.vibe.laugh > data.vibe.neg;
    const isFast = (data.avgResponse[userA] || 0) < 15 && (data.avgResponse[userB] || 0) < 15;
    
    let bestScenario = scenarios[0];
    let maxScore = -1;

    // Her senaryoyu puanla
    scenarios.forEach(sc => {
        let score = 0;
        const c = sc.cond;
        
        // Hakimiyet (Dominance) Puanlaması
        if (c.dom === "dengeli" && isBalancedDom) score += 2;
        if (c.dom === "sen_cok" && pA > 0.6) score += 2;
        if (c.dom === "karsi_cok" && pB > 0.6) score += 2;
        if (c.dom === "sen_az" && pA < 0.3) score += 2;
        if (c.dom === "karsi_az" && pB < 0.3) score += 2;

        // Vibe Puanlaması
        if (c.vibe === "toksik" && isToxic) score += 2;
        if (c.vibe === "eglenceli" && isFun) score += 2;
        if (c.vibe === "romantik" && !isToxic && data.vibe.pos > data.vibe.laugh) score += 2;
        if (c.vibe === "notr" && !isToxic && !isFun) score += 1;

        // Yanıt Süresi (Response) Puanlaması
        if (c.resp === "hizli" && isFast) score += 1;
        if (c.resp === "karsi_yavas" && (data.avgResponse[userB] || 0) > 60) score += 1;
        if (c.resp === "cok_yavas" && !isFast) score += 1;

        if (score > maxScore) {
            maxScore = score;
            bestScenario = sc;
        }
    });

    // En uygun senaryodan rastgele bir varyasyon seç
    const randomText = bestScenario.texts[Math.floor(Math.random() * bestScenario.texts.length)];

    document.getElementById('scenarioName').innerText = `🏆 ${bestScenario.name}`;
    document.getElementById('aiSummaryText').innerText = `"${randomText}"`;
    finishRender();
}

function finishRender() {
    document.getElementById('status').innerText = "Analiz %100 Cihazınızda Tamamlandı.";
    document.getElementById('exportBtn').style.display = "block";
}

document.getElementById('exportBtn').addEventListener('click', () => {
    const renderElement = document.getElementById('renderArea');
    const watermark = document.getElementById('watermark');
    watermark.style.display = "block";

    html2canvas(renderElement, { backgroundColor: '#0b141a', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Offline-Sohbet-Analizi.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        watermark.style.display = "none";
    });
});
