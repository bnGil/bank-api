import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import { router as v1 } from "./routes/v1.js";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const publicPath = path.join(__dirname, "../client/build");

const app = express();

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1);
app.use(cors);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
