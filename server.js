const db = require("./db");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express();
const requestRoutes = require("./routes/request"); 

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API is working 🚀");
}); 
app.use("/uploads", express.static("uploads"));
app.listen(5000, () => {
  console.log("Server running on port 5000");
});