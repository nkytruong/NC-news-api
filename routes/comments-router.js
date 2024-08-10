const commentsRouter = require("express").Router()
const {deleteCommentByCommentId, patchCommentVotesByCommentId} = require("../db/controllers/comments-controllers");

commentsRouter.route('/:comment_id').delete(deleteCommentByCommentId).patch(patchCommentVotesByCommentId)

module.exports = commentsRouter