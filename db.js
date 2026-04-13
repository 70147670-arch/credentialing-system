const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "8ARNMqo7uXgU5NTweEmWn46Hvewjcp1PtqfXTKDZTj29",
  database: "railway",
  port: 27375
});

db.connect((err) => {
  if (err) {
    console.log("DB Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;
