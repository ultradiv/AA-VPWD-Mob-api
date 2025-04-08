require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const exampleRoutes = require("./routes/exampleRoutes");
const registerRoutes = require("./routes/registerRoutes");
const statsRoutes = require("./routes/statsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const geoRoutes = require("./routes/geoRoutes");
const authMiddleware = require("./middleware/auth");

const PORT = process.env.PORT || 4010;
app.use(
  cors({
    origin: "https://aa-mob.vpwd.net", // <-- your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true,
  })
);
app.use(express.json());
app.use(authMiddleware); // All routes protected by API key

app.use("/api/example", exampleRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/geo", geoRoutes);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
