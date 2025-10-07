const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

app.use(cors());

app.get("/coins/markets", async (req, res) => {
  try {
    const { page = 1, per_page = 10 } = req.query;
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page,
        page,
        price_change_percentage: "24h",
      },
    });

    const data = response.data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${COINGECKO_API_URL}/coins/${id}`, {
      params: {
        localization: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    const coinData = {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image?.large,
      description: coin.description?.en || "No description available.",
      current_price: coin.market_data?.current_price?.eur ?? null,
      high_24h: coin.market_data?.high_24h?.eur ?? null,
      low_24h: coin.market_data?.low_24h?.eur ?? null,
      price_changes: {
        "24h": coin.market_data?.price_change_percentage_24h ?? 0,
        "7d": coin.market_data?.price_change_percentage_7d ?? 0,
        "14d": coin.market_data?.price_change_percentage_14d ?? 0,
        "30d": coin.market_data?.price_change_percentage_30d ?? 0,
        "60d": coin.market_data?.price_change_percentage_60d ?? 0,
        "200d": coin.market_data?.price_change_percentage_200d ?? 0,
        "1y": coin.market_data?.price_change_percentage_1y ?? 0,
      },
    };

    res.json(coinData);
  } catch (error) {
    console.error("Error fetching coin details:", error.message);
    res.status(500).json({ error: "Failed to fetch coin details" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
