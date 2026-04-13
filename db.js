const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "XbHhDUUgBasERoLXeefrsKdbEDDAdogq",
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
