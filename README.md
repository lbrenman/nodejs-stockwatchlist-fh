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
