const usersRouter = require("express").Router()
const { getUsers, getUserByUsername } = require("../db/controllers/users-controllers");

usersRouter.route('/').get(getUsers)

usersRouter.route('/:username').get(getUserByUsername)

module.exports = usersRouter