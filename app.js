require("dotenv").config();
const express = require("express");
const app = express();
const exampleRoutes = require("./routes/exampleRoutes");
const registerRoutes = require("./routes/registerRoutes");
const authMiddleware = require("./middleware/auth");

const PORT = process.env.PORT || 4010;

app.use(express.json());
app.use(authMiddleware); // All routes protected by API key
app.use("/api/example", exampleRoutes);
app.use("/api/register", registerRoutes);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
