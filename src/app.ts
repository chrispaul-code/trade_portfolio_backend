import express from "express";
import cmpRoute from "./routes/cmp";
import fundamentalsRoute from "./routes/fundamentals";
import fullRoute from "./routes/full";

const app = express();

app.use(express.json());

// Routes
app.use("/api/cmp", cmpRoute);
app.use("/api/fundamentals", fundamentalsRoute);
app.use("/api/stocks", fullRoute);

export default app;
