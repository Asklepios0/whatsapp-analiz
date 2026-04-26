export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Sadece POST desteklenir' });
    }

    const { prompt } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'API Key Vercel ortamına eklenmemiş.' });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        
        // Hata ayıklama
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }
        
        const aiText = data.candidates[0].content.parts[0].text;
        res.status(200).json({ text: aiText });
    } catch (error) {
        res.status(500).json({ error: 'Google sunucularına bağlanılamadı.' });
    }
}
