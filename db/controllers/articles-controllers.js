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
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "No Article Found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticleVotesById = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;

  const promises = [
    updateArticleVotesById(body, article_id),
    checkArticleIdExists(article_id),
  ];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const updatedArticle = resolvedPromises[0];
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};
