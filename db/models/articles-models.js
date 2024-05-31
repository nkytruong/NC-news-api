const db = require("../connection");

exports.selectArticleById = (article_id) => {
  let queryStr = `SELECT
    articles.*,
    CAST(COUNT(comments.body) AS INT) AS comment_count 
    FROM articles
   JOIN topics ON topics.slug = articles.topic
     JOIN users ON users.username = articles.author
     JOIN comments ON articles.article_id = comments.article_id
     GROUP BY articles.article_id
     HAVING articles.article_id = $1`;

  const queryValues = [article_id];

  const notANumber = /[a-zA-Z]/.test(article_id);
  if (notANumber) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  } else {
    return db.query(queryStr, queryValues).then((result) => {
      return result.rows;
    });
  }
};

exports.selectArticles = (topic) => {
  let queryStr = `SELECT articles.title, 
  articles.topic, 
  articles.author, 
  articles.created_at, 
  articles.votes, 
  articles.article_img_url, 
  articles.article_id, 
  CAST(COUNT(comments.body) AS INT) AS comment_count 
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id `;

  let queryValues = [];

  if (topic) {
    queryStr += `WHERE topic = $1 `;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id
  ORDER BY articles.created_at DESC ;`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "No Articles Found" });
    } else {
      return rows;
    }
  });
};

exports.checkArticleIdExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
    });
};

exports.updateArticleVotesById = (body, article_id) => {
  const { inc_votes } = body;

  const queryStr = `UPDATE articles 
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`;
  const queryValues = [inc_votes, article_id];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows[0];
  });
};
