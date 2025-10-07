import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../Css/CoinDetail.css";

const API_URL = "http://localhost:3000/coins";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCoinDetail = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch coin details");
      const data = await res.json();
      setCoin(data);
    } catch (e) {
      alert("Failed to fetch coin details");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchCoinDetail(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!coin) return null;

  const priceChange24h = coin.price_changes?.["24h"] ?? 0;
  const priceHistory = Object.entries(coin.price_changes || {}).map(
    ([period, value]) => ({
      period,
      value,
    })
  );

  return (
    <div className="coin-detail">
      <div className="coin-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </button>
        <h2>{coin.name}</h2>
      </div>

      <div className="coin-info">
        {coin.image && (
          <img src={coin.image} alt={coin.name} className="coin-img" />
        )}
        <p className="desc">
          {coin.description
            ? coin.description.split(". ")[0] + "."
            : "No description available."}
        </p>
      </div>

      <div className="stats">
        <div>
          <strong>Current Price:</strong> €
          {coin.current_price?.toLocaleString() ?? "N/A"}
        </div>
        <div>
          <strong>24h High:</strong> €{coin.high_24h?.toLocaleString() ?? "N/A"}
        </div>
        <div>
          <strong>24h Low:</strong> €{coin.low_24h?.toLocaleString() ?? "N/A"}
        </div>
        <div>
          <strong>Price Change (24h):</strong>{" "}
          <span className={priceChange24h > 0 ? "positive" : "negative"}>
            {priceChange24h?.toFixed(2)}%
          </span>
        </div>
      </div>

      <h3 className="chart-title">Price Change Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="period" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#16c784"
            strokeWidth={2}
            dot={{ fill: "#16c784" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CoinDetail;
