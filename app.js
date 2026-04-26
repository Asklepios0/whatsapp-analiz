let worker = new Worker('worker.js');

document.getElementById('chatFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const relation = document.getElementById('relationType').value;
    if (!file) return;

    document.getElementById('pBar').style.display = "block";
    document.getElementById('status').innerText = "Veriler cihazınızda analiz ediliyor...";
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

worker.onmessage = async function(e) {
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

        document.getElementById('status').innerText = "Yapay zeka özeti çıkarıyor...";
        await fetchGeminiAI(data.aiPayload);
    }
};

async function fetchGeminiAI(payload) {
    const prompt = `Aşağıda anonimleştirilmiş "${payload.relationType}" WhatsApp sohbeti var. Eğlenceli, iğneleyici bir sosyal medya analizcisisin. İletişim tarzlarını maksimum 40 kelimeyle esprili özetle. Asla isim kullanma. Sadece sonucu yaz.\n\nÖrneklem: ${JSON.stringify(payload.chatSample)}`;

    try {
        // Doğrudan backend'e istek atıyoruz (Vercel Serverless Function)
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const resData = await response.json();
        if (resData.error) throw new Error(resData.error);
        
        document.getElementById('aiSummaryText').innerText = `"${resData.text.trim()}"`;
        document.getElementById('status').innerText = "Analiz Tamamlandı!";
    } catch (error) {
        console.error("API Hatası:", error);
        document.getElementById('aiSummaryText').innerText = "Yapay zeka sunucularına ulaşılamadı. Kod Vercel'de çalışmıyor olabilir.";
        document.getElementById('status').innerText = "Kısmi Hata.";
    } finally {
        document.getElementById('exportBtn').style.display = "block";
    }
}

document.getElementById('exportBtn').addEventListener('click', () => {
    const renderElement = document.getElementById('renderArea');
    const watermark = document.getElementById('watermark');
    watermark.style.display = "block";

    html2canvas(renderElement, { backgroundColor: '#0b141a', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'AI-Sohbet-Analizi.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        watermark.style.display = "none";
    });
});
