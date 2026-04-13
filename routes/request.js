const multer = require("multer");
const express = require("express");
const router = express.Router();
const db = require("../db");

// ============================
// 📦 MULTER CONFIG
// ============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ============================
// 📝 SUBMIT REQUEST
// ============================
router.post("/submit", (req, res) => {
  const { user_id, service_type } = req.body;

  db.query(
    "INSERT INTO requests (user_id, service_type) VALUES (?, ?)",
    [user_id, service_type],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Request Submitted ✅");
    }
  );
});


// ============================
// 📎 UPLOAD FILE
// ============================
router.post("/upload/:request_id", upload.single("file"), (req, res) => {
  const request_id = req.params.request_id;
  const filePath = req.file.path;

  db.query(
    "INSERT INTO documents (request_id, file_path) VALUES (?, ?)",
    [request_id, filePath],
    (err, result) => {
      if (err) return res.send(err);
      res.send("File Uploaded ✅");
    }
  );
});


// ============================
// 👤 USER REQUESTS (WITH FILE)
// ============================
router.get("/my/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = `
    SELECT r.id, r.service_type, r.status,
    (SELECT file_path 
     FROM documents 
     WHERE request_id = r.id 
     ORDER BY id DESC 
     LIMIT 1) AS file_path
    FROM requests r
    WHERE r.user_id = ?
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) return res.send(err);

    console.log("USER REQUESTS 👉", result);
    res.json(result);
  });
});


// ============================
// 🧑‍💼 ADMIN - ALL REQUESTS (WITH FILE)
// ============================
router.get("/all", (req, res) => {
  console.log("🔥 NEW ROUTE WORKING");

  const sql = `
    SELECT r.id, r.service_type, r.status,
    (SELECT file_path 
     FROM documents 
     WHERE request_id = r.id 
     ORDER BY id DESC 
     LIMIT 1) AS file_path
    FROM requests r
  `;

  db.query(sql, (err, result) => {
    if (err) return res.send(err);

    console.log("DATA 👉", result);
    res.json(result);
  });
});

// ============================
// 🔄 UPDATE STATUS
// ============================
router.put("/update/:id", (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE requests SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Status Updated ✅");
    }
  );
});


module.exports = router;