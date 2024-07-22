const commentsRouter = require("express").Router()
const {deleteCommentByCommentId} = require("../db/controllers/comments-controllers");

commentsRouter.route('/:comment_id').delete(deleteCommentByCommentId)

module.exports = commentsRouter