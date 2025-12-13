"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleService_1 = require("../services/googleService");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const symbol = req.query.symbol;
    if (!symbol) {
        return res.status(400).json({ error: "Symbol is required" });
    }
    const data = await (0, googleService_1.getGoogleFundamentals)(symbol);
    return res.json(data);
});
exports.default = router;
