const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsBypostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsBypostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsBypostId[postId] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentsBypostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending"
    }
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("event Received. ", req.body.type);

  const {type, data} = req.body;
  const {id, postId, status, content} = data;

  if(type === "CommentModerated") {
    const comments = commentsBypostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:4005/events", {
    type: "CommentUpdated",
    data: {
      id,
      content,
      postId,
      status
    }
  });    
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening at 4001...");
});
