
import axios from "axios";
import * as cheerio from "cheerio";

export async function getGoogleFundamentals(symbol: string) {
  try {
    
    const url = `https://www.google.com/finance/quote/${symbol}`;
    
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(html);

    let pe: string | null = null;

    
    // SCRAPE PE RATIO
    
    $('.gyFHrc').each((_, el) => {
      const label = $(el).find('.mfs7Fc').text().trim();
      const value = $(el).find('.P6K39c').text().trim();

      if (label.includes("P/E")) {
        pe = value;
      }
    });

    return {
      symbol,
      pe,
      earnings: null, // EPS removed because Google does not expose reliably
    };

  } catch (err: any) {
    console.error("Google PE Error:", err.response?.data || err.message);
    return null;
  }
}
