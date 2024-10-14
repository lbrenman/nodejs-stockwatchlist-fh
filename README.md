# Stock Watchlist API

Stock Watchlist API built in NodeJS/Express

Uses API Key Authentication

Add a .env file to your NodeJS project to contain your API Key list and MongoDB username and password

```
FINNHUBAPIKEY={{Your finnhub.io API Key}}
USER_API_KEY={{API Key for client calls}}
```

## Get Quote

```bash
curl --location '{{BASEURL}}/quote?symbol=intc' \
--header 'x-api-key: {{API KEY}}
```

with response:

```json
{
    "Price": 23.56,
    "Change": 0.34,
    "ChangePercent": 1.4643,
    "DayHigh": 23.82,
    "DayLow": 22.98,
    "OpenPrice": 23.05,
    "PreviousClose": 23.22,
    "Symbol": "INTC",
    "Name": "Intel Corp"
}
```
