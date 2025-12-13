"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
const cmp_1 = __importDefault(require("./routes/cmp"));
const fundamentals_1 = __importDefault(require("./routes/fundamentals"));
const full_1 = __importDefault(require("./routes/full"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/* -------- MIDDLEWARE -------- */
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
/* -------- ROUTES -------- */
app.use("/api/cmp", cmp_1.default);
app.use("/api/fundamentals", fundamentals_1.default);
app.use("/api/stocks", full_1.default);
/* -------- HEALTH CHECK -------- */
app.get("/", (_req, res) => {
    res.send("Backend running successfully 🚀");
});
/* -------- SERVER -------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
