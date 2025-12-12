
import axios from "axios";

export async function getCMP(symbol: string) {
  const options = {
    method: "GET",
    url: "https://yahoo-finance166.p.rapidapi.com/api/stock/get-price",
    params: {
      region: "US",
      symbol: symbol,
    },
    headers: {
      "x-rapidapi-key": "02a1ac5569msheb8ad13e47e59a5p1766bdjsna4673ef0843b",
      "x-rapidapi-host": "yahoo-finance166.p.rapidapi.com",
    },
  };
  

  try {
    const response = await axios.request(options);
//     console.log("response:", response.data.quoteSummary?.result[0]);
//     console.log("cmpData:",response.data.quoteSummary?.result[0]?.price?.regularMarketPrice?.raw);
//   console.log("Fetching CMP for:", symbol);
    return {
      symbol,
      cmp: response.data.quoteSummary?.result[0]?.price?.regularMarketPrice?.raw,
      raw: response.data, // useful if you want other fields later
    };

    

  } catch (err: any) {
    console.error("CMP ERROR:", err.response?.data || err.message);
    return null;
  }
}
