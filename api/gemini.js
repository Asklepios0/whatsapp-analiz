// Dosya: api/gemini.js
// İsim aynı kalıyor (ön yüz bozulmasın diye), ama motor artık Groq (Llama 3)
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Sadece POST desteklenir' });

    const { prompt } = req.body;
    
    // Vercel'den GROQ anahtarını çekiyoruz
    const key = process.env.GROQ_API_KEY; 

    if (!key) return res.status(500).json({ error: 'API_KEY_YOK: Vercel paneline GROQ_API_KEY eklenmemiş.' });

    try {
        // Groq API Endpoint'ine gidiyoruz
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Hem çok hızlı hem Türkçe anlayan Llama 3 modeli
                messages: [
                    { role: "system", content: "Sen eğlenceli ve iğneleyici bir sosyal medya analizcisisin. İsim kullanmadan, sadece 40 kelimeyle ilişki dinamiklerini özetlersin." },
                    { role: "user", content: prompt }
                ]
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json({ error: `GROQ_HATASI: ${data.error?.message}` });
        }
        
        const aiText = data.choices[0].message.content;
        res.status(200).json({ text: aiText });
    } catch (error) {
        res.status(500).json({ error: 'SUNUCU_BAGLANTI_HATASI: Groq API ulaşılamadı.' });
    }
}
