const express = require("express");
const app = express();
const port = 4000;

app.get("/", (_, res) => res.send("hello world!"));

app.post("/", (_, res) => res.send("post request!"));

app.listen(port, () =>
  console.log(`Server runing at http://localhost:${port}/`)
);
