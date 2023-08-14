const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middle ware
app.use(cors());
app.use(express.json());

app.listen(5001, () => {
  console.log("server has started on port 5001");
});
