const db = require("../db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!results.length) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({ user });
  } catch (err) {
    console.log("LOGIN ERROR ❌", err);
    res.status(500).json({ error: "Server error" });
  }
});