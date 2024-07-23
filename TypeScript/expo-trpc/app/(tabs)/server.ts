import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;

// Open the SQLite database
const db = new sqlite3.Database(
  process.env.DATABASE_URL || "./default/path/to/your/database.db",
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error("Error opening database", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

// Route to get a single post by postId
app.get("/api/posts/:postId", (req: Request, res: Response) => {
  const { postId } = req.params;

  db.get("SELECT * FROM posts WHERE postId = ?", [postId], (err, row) => {
    if (err) {
      console.error("Error fetching post", err);
      res.status(500).send("Error fetching post");
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).send("Post not found");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
