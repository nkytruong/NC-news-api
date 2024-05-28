const express = require("express")
const app = express()
const {getTopics} = require("./db/controllers/topics-controllers")

app.get("/api/topics", getTopics)

module.exports = app