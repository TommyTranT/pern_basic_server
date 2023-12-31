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

// Get specific data from database
app.get("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const name = await pool.query("SELECT * FROM names WHERE name_id = $1", [
      id,
    ]);

    res.json(name.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

// Update data in database based on ID number
app.put("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name } = req.body;
    const updateName = await pool.query(
      "UPDATE names SET first_name = $1 WHERE name_id = $2",
      [first_name, id]
    );

    res.json("Name was successfully Updated!");
  } catch (error) {
    console.error(err.message);
  }
});

// Delete data from database
app.delete("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteName = await pool.query(
      "DELETE FROM names WHERE name_id = $1",
      [id]
    );

    res.json("Name was deleted");
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5001, () => {
  console.log("server has started on port 5001");
});
