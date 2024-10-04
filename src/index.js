const express = require('express')
const { fetchStockPrice } = require('./api/api')
const { monitorStockPrice, executeTrade, generateSummaryReport } = require('./services/bot')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

// API Endpoint to return realtime stock prices
app.get('/', async (req, res) => {   
    const currentStockPrice = await fetchStockPrice()
    res.json({
        "Price" : currentStockPrice
    })
})

// API Endpoint to return summary report
app.get('/summary', (req, res) => {
    const summary = generateSummaryReport();
    res.json(summary);
  });

app.get('/bot-status', async (req, res) => {
    const report = await executeTrade();
    res.json(report);
});

// Start monitoring the stock price
monitorStockPrice(); // Start the bot's price monitoring and trading decisions
  

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))