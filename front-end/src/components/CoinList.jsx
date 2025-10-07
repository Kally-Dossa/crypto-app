import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "../Css/CoinList.css";

const API_URL = "http://localhost:3000/coins/markets";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchCoins = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=${page}&per_page=10`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCoins(data);
      setHasMore(data.length === 10);
    } catch (e) {
      alert("Failed to fetch coins");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

  return (
    <div className="main-container">
      <h1>
        Check Crypto Price <ShowChartIcon fontSize="large" />
      </h1>
      <div className="coin-list">
        {loading && <p>Loading...</p>}
        {!loading && coins.length === 0 && <p>No coins found.</p>}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24H Change</th>
              <th>High 24h</th>
              <th>Low 24h</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} onClick={() => navigate(`/coin/${coin.id}`)}>
                <td>{(page - 1) * 10 + index + 1}</td>
                <td className="coin-name">
                  <span className="name">{coin.name}</span>
                  <span className="symbol">{coin.symbol.toUpperCase()}</span>
                </td>
                <td>€{coin.current_price}</td>
                <td
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td>€{coin.high_24h}</td>
                <td>€{coin.low_24h}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="icon-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ArrowBackIosNewIcon />
          </button>
          <span>Page {page}</span>
          <button
            className="icon-btn"
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoinList;
