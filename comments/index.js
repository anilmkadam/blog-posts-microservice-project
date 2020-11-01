const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsBypostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsBypostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsBypostId[postId] || [];
  comments.push({ id: commentId, content });

  commentsBypostId[postId] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening at 4001...");
});
