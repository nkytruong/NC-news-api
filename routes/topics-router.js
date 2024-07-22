const topicsRouter = require("express").Router()
const { getTopics } = require("../db/controllers/topics-controllers");

topicsRouter.route('/').get(getTopics)

module.exports = topicsRouter
