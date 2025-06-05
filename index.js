// File: index.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();
const signalLogic = require('./utils/signalLogic');

const app = express();
const PORT = process.env.PORT || 3000;

let liveData = [];

// Middleware
app.use(express.json());

// Endpoint for frontend
app.get('/signals', async (req, res) => {
  try {
    const prices = await fetchLivePrices();
    const signals = signalLogic.generateSignals(prices);
    res.json({ status: 'success', data: signals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Sample function to simulate price fetching (replace with Angel One API call)
async function fetchLivePrices() {
  // TODO: Replace with real Angel One WebSocket or REST API logic
  return [
    { symbol: 'TRENT', ltp: 5697.5, volume: 1023000 },
    { symbol: 'DRREDDY', ltp: 1294, volume: 983000 },
    { symbol: 'BHARTIARTL', ltp: 1879, volume: 2045000 }
  ];
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
