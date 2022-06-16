const fs = require("fs");

const express = require("express");
const app = express();
const port = 4000;

app.get("/todos", (_, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const db = JSON.parse(data);
    res.status(200).json(db.todos);
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    const db = JSON.parse(data);
    const item = db.todos.find((v) => v.id == req.params.id) || {};
    res.status(200).json(item);
  });
});

app.listen(port, () =>
  console.log(`Server runing at http://localhost:${port}/`)
);
