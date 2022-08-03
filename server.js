const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  database: "crud_db",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connect");
  // Untuk GET data
  app.get("/", (req, res) => {
    const query = "SELECT * FROM user";
    db.query(query, (err, result) => {
      const user = JSON.parse(JSON.stringify(result));
      console.log("Hasil database ->", user);
      res.render("index", { users: user, title: "DAFTAR MURID" });
    });
  });

  // untuk insert data
  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO user(Nama, Kelas) VALUES('${req.body.Nama}', '${req.body.Kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("server ready...");
});
