// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001; // Порт для вашего сервера

// Разрешить CORS для всех доменов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/image-search', async (req, res) => {
  const { query } = req.query;
  const apiUrl = `https://api.qwant.com/v3/search/images?t=images&q=${query}&count=50&locale=en_CA&offset=0&device=desktop&tgp=1&safesearch=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Qwant API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
