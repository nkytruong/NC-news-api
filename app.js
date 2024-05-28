const express = require("express")
const app = express()
const {getTopics} = require("./db/controllers/topics-controllers")
const {getEndpoints} = require("./db/controllers/app-controllers")

app.get("/api/topics", getTopics)
app.get("/api", getEndpoints)



module.exports = app