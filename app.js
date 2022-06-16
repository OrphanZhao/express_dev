const express = require("express");
const app = express();

/**
 * application/json
 * application/x-www-form-urlencoded
 */
app.use(express.json());
app.use(express.urlencoded());

/**
 * db
 */
const { getDb, saveDb } = require("./db");
function errFunction(res, error) {
  res.status(500).json({
    error: error.message,
  });
}

/**
 * http
 */
app.get("/todos", async (_, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db.todos);
  } catch (error) {
    errFunction(res, error);
  }
});
app.get("/todos/:id", async (req, res) => {
  try {
    const db = await getDb();
    const item = db.todos.find((v) => v.id == req.params.id);
    item ? res.status(200).json(item) : res.status(404).end();
  } catch (error) {
    errFunction(res, error);
  }
});
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body || {};
    const db = await getDb();
    if (title) {
      let item = {
        title,
        id: db.todos.length + 1,
      };
      db.todos.push({
        ...item,
      });
      await saveDb(db);
      res.status(200).json({
        ...item,
      });
    } else {
      res.status(500).send("failed");
    }
  } catch (error) {
    errFunction(res, error);
  }
});

/**
 * server `port`
 */
const port = 4000;
app.listen(port, () =>
  console.log(`Server runing at http://localhost:${port}/`)
);
