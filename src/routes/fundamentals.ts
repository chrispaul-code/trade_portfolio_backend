import express from "express";
import { getGoogleFundamentals } from "../services/googleService";

const router = express.Router();

router.get("/", async (req, res) => {
  const symbol = req.query.symbol as string;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const data = await getGoogleFundamentals(symbol);
  return res.json(data);
});

export default router;
