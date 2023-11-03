const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db"); // Require db.js
const port = process.env.PORT || 5000;

// Connect to the database
mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

