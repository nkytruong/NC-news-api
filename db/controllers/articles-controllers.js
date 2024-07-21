const {
  selectArticleById,
  selectArticles,
  updateArticleVotesById,
  checkArticleIdExists,
} = require("../models/articles-models");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  selectArticles(topic, sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticleVotesById = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;

  const promises = [
    checkArticleIdExists(article_id),
    updateArticleVotesById(body, article_id),
  ];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const updatedArticle = resolvedPromises[1];
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};
