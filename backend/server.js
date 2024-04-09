const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql2.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Sheetal@2311",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database successfully");
});
//get api
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json("Internal Server Error");
    }
    return res.json(data);
  });
});

//post api
app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (name, Email) VALUES (?, ?)";
  const values = [req.body.name, req.body.Email];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json("Internal Server Error");
    }
    return res.json(data);
  });
});
//put api
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, Email } = req.body;
  const sql = "UPDATE student SET name = ?, Email = ? WHERE id = ?";
  const values = [name, Email, id];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json("Internal Server Error");
    }
    return res.json(data);
  });
});
//delete api
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student WHERE id = ?";

  db.query(sql, id, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json("Internal Server Error");
    }
    return res.json({ message: "Student deleted successfully", data });
  });
});

app.listen(8081, () => {
  console.log("listening port at 8081");
});
