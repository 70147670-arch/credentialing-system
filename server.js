const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// uploads
app.use("/uploads", express.static("uploads"));

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});