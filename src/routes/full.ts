import express from "express";
import { getFullStockData } from "../services/fullService";

const router = express.Router();

router.post("/", async (req, res) => {
  const stocks = req.body.stocks;

  if (!stocks || !Array.isArray(stocks)) {
    return res.status(400).json({ error: "stocks array is required" });
  }

  // Calculate total portfolio investment
  const totalPortfolioValue = stocks.reduce((sum, stock) => {
    return sum + stock.purchasePrice * stock.qty;
  }, 0);

  // Build full data for each stock
  const results = [];
  for (const stock of stocks) {
    const data = await getFullStockData(stock, totalPortfolioValue);
    results.push(data);
  }

  res.json({
    totalInvestment: totalPortfolioValue,
    stocks: results,
  });
});

export default router;
