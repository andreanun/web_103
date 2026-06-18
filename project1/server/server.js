import express from "express";
import dotenv from "./config/dotenv.js";
import path from "path";
import { fileURLToPath } from "url";
import actsRouter from "./routes/acts.js";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());

// Serve all static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use("/", actsRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎤 Server running at http://localhost:${PORT}`);
});
