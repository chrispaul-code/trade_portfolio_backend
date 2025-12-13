import express from "express";
const cors = require('cors');
import dotenv from "dotenv";

import cmpRoute from "./routes/cmp";
import fundamentalsRoute from "./routes/fundamentals";
import fullRoute from "./routes/full";

dotenv.config();

const app = express();

/* -------- MIDDLEWARE -------- */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* -------- ROUTES -------- */
app.use("/api/cmp", cmpRoute);
app.use("/api/fundamentals", fundamentalsRoute);
app.use("/api/stocks", fullRoute);

/* -------- HEALTH CHECK -------- */
app.get("/", (_req, res) => {
  res.send("Backend running successfully 🚀");
});

/* -------- SERVER -------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
