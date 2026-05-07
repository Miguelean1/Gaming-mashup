// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Configurar caché (los datos durarán 1 hora en caché)
const cache = new NodeCache({ stdTTL: 3600 });

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda (q)' });

    // 1. MECANISMO DE CACHÉ: Comprobar si ya buscamos este juego
    if (cache.has(query.toLowerCase())) {
        console.log(`[CACHE] Devolviendo resultados cacheados para: ${query}`);
        return res.json({ source: 'cache', data: cache.get(query.toLowerCase()) });
    }

    try {
        console.log(`[API] Haciendo peticiones reales para: ${query}`);
        
        // 2. PETICIONES A LAS 3 APIs EN PARALELO
        const rawgUrl = `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&key=${process.env.RAWG_API_KEY}&page_size=1`;
        const cheapSharkUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(query)}&limit=3`;
        const redditUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}+subreddit:gaming&limit=3`;

        const [rawgRes, cheapRes, redditRes] = await Promise.all([
            axios.get(rawgUrl),
            axios.get(cheapSharkUrl),
            axios.get(redditUrl)
        ]);

        // Construir el objeto de respuesta combinado (Mashup)
        const resultData = {
            gameInfo: rawgRes.data.results[0] || null,
            deals: cheapRes.data || [],
            discussions: redditRes.data.data.children.map(child => child.data) || []
        };

        // Guardar en la caché para futuras peticiones idénticas
        cache.set(query.toLowerCase(), resultData);

        // Enviar al frontend
        res.json({ source: 'api', data: resultData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar las APIs externas.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});