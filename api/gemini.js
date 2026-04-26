export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Sadece POST desteklenir' });

    const { prompt } = req.body;
    const key = process.env.GEMINI_API_KEY; 

    if (!key) return res.status(500).json({ error: 'Sunucu Hatası: API Key Vercel ortamında bulunamadı.' });

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Google API Hatası' });
        }
        
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Özet çıkarılamadı.";
        res.status(200).json({ text: aiText });
    } catch (error) {
        res.status(500).json({ error: 'Sunucu Bağlantı Hatası: ' + error.message });
    }
}
