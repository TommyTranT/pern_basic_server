const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middle ware
app.use(cors());
app.use(express.json());

//ROUTES//

// Adding data to database
app.post("/names", async (req, res) => {
  try {
    const { first_name } = req.body;
    const newName = await pool.query(
      "INSERT INTO names (first_name) VALUES($1) RETURNING *",
      [first_name]
    );

    res.json(newName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all data from database
app.get("/names", async (req, res) => {
  try {
    const allNames = await pool.query("SELECT * FROM names");
    res.json(allNames.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5001, () => {
  console.log("server has started on port 5001");
});
