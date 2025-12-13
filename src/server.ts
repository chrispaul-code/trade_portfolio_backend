import app from "./app";

const PORT = 5000;

const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

