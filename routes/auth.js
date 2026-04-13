const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 🔹 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.send(err);
        res.send("User Registered ✅");
      }
    );
  } catch (err) {
    res.send(err);
  }
});


// 🔹 LOGIN
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      }

      if (results.length === 0) {
        return res.json({ error: "Invalid email" });
      }

      const user = results[0];

      let isMatch = false;

      // check if hashed or plain
      if (user.password.startsWith("$2b$")) {
        isMatch = await bcrypt.compare(password, user.password);
      } else {
        isMatch = user.password === password;
      }

      if (!isMatch) {
        return res.json({ error: "Wrong password" });
      }

      res.json({ user });
    }
  );
});

router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error saving user");
      }

      res.send("User registered successfully ✅");
    }
  );
});
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error registering user");
      }

      res.send("Registration successful ✅");
    }
  );
}); router.get("/test", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      console.log("DB TEST ERROR ❌", err);
      return res.status(500).send("DB ERROR");
    }
    res.send("DB OK ✅");
  });
});router.get("/test", (req, res) => {
  res.send("TEST OK");
});
module.exports = router;