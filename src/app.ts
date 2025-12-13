import express from "express";
import cmpRoute from "./routes/cmp";
import fundamentalsRoute from "./routes/fundamentals";
import fullRoute from "./routes/full";
const cors = require('cors');
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/cmp", cmpRoute);
app.use("/api/fundamentals", fundamentalsRoute);
app.use("/api/stocks", fullRoute);

export default app;
