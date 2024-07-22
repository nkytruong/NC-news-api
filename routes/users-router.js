const usersRouter = require("express").Router()
const { getUsers } = require("../db/controllers/users-controllers");

usersRouter.route('/').get(getUsers)

module.exports = usersRouter