const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors())

const apiRouter = require('./routes/api-router')

app.use('/api', apiRouter)


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
    console.log(err)
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error :(" });
});

module.exports = app;
