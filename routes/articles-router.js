const articlesRouter = require("express").Router();
const {
  getArticlesById,
  getArticles,
  patchArticleVotesById,
} = require("../db/controllers/articles-controllers");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../db/controllers/comments-controllers");

articlesRouter.route("/").get(getArticles);

articlesRouter
.route("/:article_id")
.get(getArticlesById)
.patch(patchArticleVotesById);


articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)

module.exports = articlesRouter;
