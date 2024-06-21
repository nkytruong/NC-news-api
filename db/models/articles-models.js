const db = require("../connection");

exports.selectArticleById = (article_id) => {
  let queryStr = `SELECT
    articles.*,
   CAST(COUNT(comments.body) AS INT) AS comment_count 
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    HAVING articles.article_id = $1`;

  const queryValues = [article_id];

  return db.query(queryStr, queryValues).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "No Article Found" });
    } else {
      return result.rows[0];
    }
  });
};

exports.selectArticles = (topic, sort_by = "created_at", order = "desc") => {
  const validSortBy = ["created_at", "comment_count", "votes"]
  const validOrder = ["asc", "desc"]

  if(!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({status: 400, msg: "Bad Request"})
  }
console.log(topic, sort_by, order)
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

  queryStr += "GROUP BY articles.article_id "

  if(sort_by === "comment_count"){
    queryStr += `ORDER BY ${sort_by} ${order}`
  } else {
    queryStr += ` ORDER BY articles.${sort_by} ${order} ;`;
  }
  
  

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "No Articles Found" });
    } else {
      console.log(rows)
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
