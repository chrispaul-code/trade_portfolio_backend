import axios from "axios";

export async function getGoogleFundamentals(symbol: string) {
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_finance",
        q: symbol,
        api_key: process.env.SERPAPI_KEY , // put your SerpAPI key in .env
      },
    });

    const result = response.data;

    if (!result) {
      return {
        symbol,
        pe: null,
        earnings: null,
        raw: response.data,
      };
    }

    const pe = result?.knowledge_graph?.key_stats?.stats[5]?.value ?? null;
    const earnings = result?.financials[0]?.results[0]?.table[2].value ?? null;
    const price = result?.price ?? null;

    console.log("PE:", pe)

    console.log("Earnings:", earnings)

    return {
      symbol,
      // price,
      pe,
      earnings,
      raw: result,
    };

  } catch (err: any) {
    console.error("SerpAPI Error:", err.response?.data || err.message);
    return null;
  }
}





// import axios from "axios";
// import * as cheerio from "cheerio";

// export async function getGoogleFundamentals(symbol: string) {
//   try {
//     const url = `https://www.google.com/finance/quote/${symbol}`;

//     const { data: html } = await axios.get(url, {
//       headers: { "User-Agent": "Mozilla/5.0" },
//     });

//     const $ = cheerio.load(html);

//     let pe: string | null = null;
//     let eps: string | null = null;

//     // ---------------------------
//     // 1. Scrape visible PE
//     // ---------------------------
//     $(".gyFHrc").each((_, el) => {
//       const label = $(el).find(".mfs7Fc").text().trim();
//       const value = $(el).find(".P6K39c").text().trim();

//       if (label.includes("P/E")) pe = value;
//     });

//     // ---------------------------
//     // 2. Extract EPS from JSON
//     // ---------------------------
//     $('script[jsname="CGzTgf"]').each((_, script) => {
//       const jsonText = $(script).html();
//       if (!jsonText) return;

//       try {
//         // Remove "var ..." prefix
//         const cleaned = jsonText.replace(/^[^{]+/, "").replace(/;$/, "");
//         const json = JSON.parse(cleaned);

//         // EPS appears in different positions based on the stock
//         const fromFinancials =
//           json?.financials?.incomeStatement?.earningsPerShare?.ttm;

//         const fromEarnings =
//           json?.earnings?.earningsChart?.quarterly?.[0]?.actual;

//         eps = fromFinancials || fromEarnings || eps;

//         console.log("Extracted EPS for :", eps);
//       } catch (e) {}
//     });

//     return {
//       symbol,
//       pe,
//       earnings: eps,
//     };
//   } catch (err: any) {
//     console.error("Google PE/EPS Error:", err.message);
//     return null;
//   }
// }



