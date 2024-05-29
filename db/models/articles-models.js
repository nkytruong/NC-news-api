const db = require("../connection");

exports.selectArticleById = (article_id) => {
  let queryStr = `SELECT
    articles.*
    FROM articles
   JOIN topics ON topics.slug = articles.topic
     JOIN users ON users.username = articles.author
    WHERE articles.article_id = $1`;
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

exports.selectArticles = () => {
  const queryStr = `SELECT articles.title, 
  articles.topic, 
  articles.author, 
  articles.created_at, 
  articles.votes, 
  articles.article_img_url, 
  articles.article_id, 
  CAST(COUNT(comments.body) AS INT) AS comment_count 
  FROM articles
  JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.checkArticleIdExists = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 404, msg: "Article Not Found"})
        }
    })
}