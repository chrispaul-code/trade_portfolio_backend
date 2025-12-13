"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullStockData = getFullStockData;
const yahooService_1 = require("./yahooService");
const googleService_1 = require("./googleService");
async function getFullStockData(stock, totalPortfolioValue) {
    const { symbol, exchange, purchasePrice, qty } = stock;
    // Yahoo symbol (NSE -> .NS)
    let yahooSymbol = symbol;
    if (exchange === "NSE")
        yahooSymbol = symbol + ".NS";
    if (exchange === "BSE")
        yahooSymbol = symbol + ".BO";
    // Google symbol requires :NSE format
    let googleSymbol = symbol;
    if (exchange === "NSE")
        googleSymbol = symbol + ":NSE";
    if (exchange === "BSE")
        googleSymbol = symbol + ":BOM";
    if (exchange === "NASDAQ")
        googleSymbol = symbol + ":NASDAQ";
    // Fetch CMP from Yahoo
    const cmpData = await (0, yahooService_1.getCMP)(yahooSymbol);
    // Fetch PE from Google
    const fundamentals = await (0, googleService_1.getGoogleFundamentals)(googleSymbol);
    const cmp = cmpData?.cmp ?? 0;
    const investment = purchasePrice * qty;
    const presentValue = cmp * qty;
    const gainLoss = presentValue - investment;
    const portfolioPercentage = totalPortfolioValue
        ? ((investment / totalPortfolioValue) * 100).toFixed(2)
        : 0;
    return {
        symbol,
        exchange,
        purchasePrice,
        qty,
        investment,
        cmp,
        presentValue,
        gainLoss,
        portfolioPercentage,
        pe: fundamentals?.pe ?? null,
        earnings: fundamentals?.earnings ?? null
    };
}
