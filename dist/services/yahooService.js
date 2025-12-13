"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCMP = getCMP;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cmpCache = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
async function getCMP(symbol) {
    const cached = cmpCache[symbol];
    const now = Date.now();
    if (cached && now - cached.timestamp < CACHE_TTL) {
        console.log("Returning CMP from CACHE for:", symbol);
        return {
            symbol,
            cmp: cached.price,
            cached: true,
        };
    }
    const options = {
        method: "GET",
        url: "https://yahoo-finance-real-time1.p.rapidapi.com/stock/get-summary",
        params: {
            region: "IND",
            symbol: symbol,
        },
        headers: {
            "x-rapidapi-key": process.env.RAPIDAP_KEY,
            "x-rapidapi-host": "yahoo-finance-real-time1.p.rapidapi.com",
        },
    };
    try {
        const response = await axios_1.default.request(options);
        const cmpValue = response.data?.price?.regularMarketPrice;
        console.log("Fetched NEW CMP:", symbol, cmpValue);
        cmpCache[symbol] = {
            price: cmpValue,
            timestamp: now,
        };
        return {
            symbol,
            cmp: cmpValue,
            cached: false,
        };
    }
    catch (err) {
        console.error("CMP ERROR:", err.response?.data || err.message);
        return null;
    }
}
