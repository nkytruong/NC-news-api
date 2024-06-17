const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors())

const { getTopics } = require("./db/controllers/topics-controllers");
const { getEndpoints } = require("./db/controllers/app-controllers");
const {
  getArticlesById,
  getArticles,
  patchArticleVotesById,
} = require("./db/controllers/articles-controllers");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
} = require("./db/controllers/comments-controllers");
const { getUsers } = require("./db/controllers/users-controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleVotesById);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.get("/api/users", getUsers);


app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error :(" });
});

module.exports = app;
