const apiRouter = require('express').Router()
const articlesRouter = require('./articles-router')
const topicsRouter = require('./topics-router');
const commentsRouter = require('./comments-router');
const usersRouter = require('./users-router');
const { getEndpoints } = require("../db/controllers/app-controllers");

apiRouter.get('/', getEndpoints)

apiRouter.use('/articles', articlesRouter)

apiRouter.use('/topics', topicsRouter)

apiRouter.use('/comments', commentsRouter)

apiRouter.use('/users', usersRouter)

module.exports = apiRouter