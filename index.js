const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middle ware
app.use(cors());
app.use(express.json());

//ROUTES//

// Adding data to database
app.post("/post", async (req, res) => {
  try {
    const { first_name } = req.body;
    const newPost = await pool.query(
      "INSERT INTO names (first_name) VALUES($1)",
      [first_name]
    );

    res.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5001, () => {
  console.log("server has started on port 5001");
});
