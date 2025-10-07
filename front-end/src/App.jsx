import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinList from "./components/CoinList";
import CoinDetail from "./components/CoinDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
