const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to check for API key
const apiKeyMiddleware = (req, res, next) => {
    const userApiKey = req.headers['x-api-key'];
    const validApiKey = process.env.USER_API_KEY; // Your user API key

    if (!userApiKey || userApiKey !== validApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
    next();
};

app.use(apiKeyMiddleware);

app.get('/quote', async (req, res) => {
    const symbol = req.query.symbol;
    const apiKey = process.env.FINNHUBAPIKEY;
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}`;
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`;
    
    try {
        // First API call to get the stock quote
        const quoteResponse = await axios.get(quoteUrl, {
            headers: {
                'X-Finnhub-Token': apiKey
            }
        });
        const stockQuote = quoteResponse.data;

        // Second API call to get the stock profile
        const profileResponse = await axios.get(profileUrl, {
            headers: {
                'X-Finnhub-Token': apiKey
            }
        });
        const stockProfile = profileResponse.data;

        let quoteResponseBody = {
            Price: stockQuote.c,
            Change: stockQuote.d,
            ChangePercent: stockQuote.dp,
            DayHigh: stockQuote.h,
            DayLow: stockQuote.l,
            OpenPrice: stockQuote.o,
            PreviousClose: stockQuote.pc,
            Symbol: stockProfile.ticker,
            Name: stockProfile.name
        }

        res.status(200).send(quoteResponseBody);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
