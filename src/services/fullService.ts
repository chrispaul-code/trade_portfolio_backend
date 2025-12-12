import { getCMP } from "./yahooService";
import { getGoogleFundamentals } from "./googleService";

export async function getFullStockData(stock: any, totalPortfolioValue: number) {
  const { symbol, exchange, purchasePrice, qty } = stock;

  // Yahoo symbol (NSE -> .NS)
  let yahooSymbol = symbol;
  if (exchange === "NSE") yahooSymbol = symbol + ".NS";
  if (exchange === "BSE") yahooSymbol = symbol + ".BO";

  // Google symbol requires :NSE format
  let googleSymbol = symbol;
  if (exchange === "NSE") googleSymbol = symbol + ":NSE";
  if (exchange === "BSE") googleSymbol = symbol + ":BOM";
  if (exchange === "NASDAQ") googleSymbol = symbol + ":NASDAQ";

  // Fetch CMP from Yahoo
  const cmpData = await getCMP(yahooSymbol);

  // Fetch PE from Google
  const fundamentals = await getGoogleFundamentals(googleSymbol);

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
