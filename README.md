# Crypto App (React + Express)
A full-stack application that provides information about cryptocurrency prices. The application will contain 2 basic pages, the list of all the coins and the detailed coin page.

## Getting Started

### Environment Variables

#### Backend (`back-end/.env`)

```ini
COINGECKO_API_URL=url_from_the_demo_plan
PORT=api_port
COINGECKO_API_KEY=your_api_key
```

- `COINGECKO_API_URL` – Root URL for Demo Plan API
- `PORT` – Port exposed by the Express API.
- `COINGECKO_API_KEY` – The API key you get from CoinGecko.
  
#### Frontend (`front-end/.env`)

```ini
VITE_API_URL=http://localhost:{port}/coins
VITE_API_URL_MARKETS=http://localhost:{port}/coins/markets
```
**Clone the repository**
```bash
git clone https://github.com/Kally-Dossa/crypto-app.git
cd crypto-app
```

**Backend**
Runs on http://localhost:3000
```bash
cd back-end
npm install
node index.js
```

**Frontend**
Runs on http://localhost:5173

Open a new terminal:
```bash
cd front-end
npm install
npm run dev
```
