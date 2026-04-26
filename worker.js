onmessage = function(e) {
    const { text, relation } = e.data;
    const lines = text.split('\n');
    const totalLines = lines.length;

    let results = {
        totalMessages: 0, senders: {}, media: {}, startDate: "",
        dateCounts: {}, peakDate: { date: "", count: 0 },
        initiators: {}, responseTimes: {}, avgResponse: {},
        emojis: {}, words: {}, vibe: { pos: 0, neg: 0, toxic: 0, laugh: 0 },
        activeDates: new Set()
    };

    const regex = /\[?(\d{1,2}[\.\-\/]\d{1,2}[\.\-\/]\d{2,4})[ ,]+(\d{1,2}:\d{2}).*?\]?[\s\-]+([^:]+):\s+(.*)/;
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    const stopWords = ["ve", "bir", "bu", "da", "de", "için", "çok", "ne", "var", "gibi", "mi", "ama", "tamam", "evet", "hayır", "ben", "sen", "o", "bana", "sana", "bende", "sende", "olan", "öyle", "sonra", "diye", "yani", "yok", "yaa", "daha", "kadar", "bişey", "iyi", "nasılsın"];

    const toxicWords = ["amk", "aq", "salak", "aptal", "gerizekalı", "siktir", "sg", "sus", "lan", "bela", "nefret", "ayrıl"];
    const laughWords = ["hahaha", "haha", "jsjsjs", "xdd", "lol", "koptum"];
    const posWords = ["aşk", "canım", "harika", "süper", "teşekkür", "kalp", "sevgilim", "özledim", "tatlı", "güzel"];

    let lastTime = null, lastSender = null;

    lines.forEach((line, index) => {
        const match = line.match(regex);
        if (match) {
            const dateStr = match[1], timeStr = match[2], sender = match[3].trim();
            let content = match[4].toLowerCase();

            // Medya Kullanımını Say (Karar motoru için önemli)
            if (content.includes("medya dahil edilmedi") || content.includes("şifrelenmiş") || content.includes("ses kaydı")) {
                results.media[sender] = (results.media[sender] || 0) + 1;
                return;
            }

            if (!results.startDate) results.startDate = dateStr;
            results.totalMessages++;
            results.senders[sender] = (results.senders[sender] || 0) + 1;
            results.dateCounts[dateStr] = (results.dateCounts[dateStr] || 0) + 1;

            const dParts = dateStr.split(/[\.\-\/]/);
            const validDate = `${dParts[1]}/${dParts[0]}/${dParts[2].length === 2 ? '20'+dParts[2] : dParts[2]}`;
            results.activeDates.add(new Date(validDate).getTime());

            const currentTime = new Date(`${validDate} ${timeStr}`).getTime();
            if (currentTime && lastTime) {
                const diff = currentTime - lastTime;
                if (diff > 28800000) results.initiators[sender] = (results.initiators[sender] || 0) + 1;
                if (sender !== lastSender && diff <= 28800000 && diff > 0) {
                    if (!results.responseTimes[sender]) results.responseTimes[sender] = { t: 0, c: 0 };
                    results.responseTimes[sender].t += diff;
                    results.responseTimes[sender].c += 1;
                }
            }
            lastTime = currentTime || lastTime; lastSender = sender;

            const ems = content.match(emojiRegex);
            if (ems) ems.forEach(em => {
                results.emojis[em] = (results.emojis[em] || 0) + 1;
                if(em === "😂" || em === "🤣") results.vibe.laugh++;
                if(em === "❤️" || em === "🥰") results.vibe.pos++;
            });

            content.split(/[\s\.\,\?\!]+/).forEach(w => {
                if (toxicWords.includes(w)) results.vibe.toxic++;
                if (laughWords.includes(w)) results.vibe.laugh++;
                if (posWords.includes(w)) results.vibe.pos++;

                if (w.length > 2 && !stopWords.includes(w) && !emojiRegex.test(w)) {
                    results.words[w] = (results.words[w] || 0) + 1;
                }
            });
        }
        if (index % 1000 === 0) postMessage({ type: 'PROGRESS', progress: Math.round((index / totalLines) * 100) });
    });

    for (const [d, count] of Object.entries(results.dateCounts)) {
        if (count > results.peakDate.count) results.peakDate = { date: d, count: count };
    }

    const sortedDates = Array.from(results.activeDates).sort((a,b) => a - b);
    results.longestSilence = 0;
    for (let i = 1; i < sortedDates.length; i++) {
        const gap = (sortedDates[i] - sortedDates[i-1]) / 86400000;
        if (gap > results.longestSilence) results.longestSilence = Math.floor(gap);
    }

    Object.keys(results.responseTimes).forEach(s => {
        results.avgResponse[s] = Math.round((results.responseTimes[s].t / results.responseTimes[s].c) / 60000);
    });

    results.topEmojis = Object.entries(results.emojis).sort((a,b) => b[1]-a[1]).slice(0, 10).map(x => x[0]);
    results.topWords = Object.entries(results.words).sort((a,b) => b[1]-a[1]).slice(0, 10).map(x => x[0]);

    results.relationType = relation;
    postMessage({ type: 'RESULT', payload: results });
};
