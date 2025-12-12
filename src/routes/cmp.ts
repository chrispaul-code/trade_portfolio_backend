import express from "express";
import { getCMP } from "../services/yahooService";

const router = express.Router();

// since base path is already /api/cmp
router.get("/", async (req, res) => {
  const symbol = req.query.symbol as string;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const data = await getCMP(symbol);
  return res.json(data);
});

export default router;

