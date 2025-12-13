import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const cmpCache: Record<string, { price: number; timestamp: number }> = {};
const CACHE_TTL = 15 * 60 * 1000;// 15 minutes

export async function getCMP(symbol: string) {


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
    const response = await axios.request(options);
    
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

  } catch (err: any) {
    console.error("CMP ERROR:", err.response?.data || err.message);
    return null;
  }
}
