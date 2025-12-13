"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fullService_1 = require("../services/fullService");
const router = express_1.default.Router();
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
        const data = await (0, fullService_1.getFullStockData)(stock, totalPortfolioValue);
        results.push(data);
    }
    res.json({
        totalInvestment: totalPortfolioValue,
        stocks: results,
    });
});
exports.default = router;
