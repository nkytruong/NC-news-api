const express = require("express");
const app = express();
const { getTopics } = require("./db/controllers/topics-controllers");
const { getEndpoints } = require("./db/controllers/app-controllers");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

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
