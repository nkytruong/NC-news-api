const db = require("../connection");

exports.selectCommentsByArticleId = (article_id) => {
  const queryStr = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;
  const queryValues = [article_id];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.addComment = (newComment, article_id) => {
  const { body, username } = newComment;

  const queryStr = `INSERT INTO comments (body, article_id, author, votes)
        VALUES ($1, $2, $3, DEFAULT) RETURNING *;`;
  const queryValues = [body, article_id, username];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows[0];
  });
};

exports.selectCommentByCommentID = (comment_id) => {
  const queryStr = `SELECT * FROM comments
    WHERE comment_id = $1;`;
  const queryValues = [comment_id];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Comment Does Not Exist" });
    }
  });
};

exports.removeCommentByCommentId = (comment_id) => {
  const queryStr = `DELETE FROM comments
    WHERE comment_id = $1;`;
  const queryValues = [comment_id];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.updateCommentVotesByCommentId = (body, comment_id) => {
  const { inc_votes } = body;

  const queryStr = `UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *;`;
  const queryValues = [inc_votes, comment_id];

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Comment Not Found" });
    } else {
      return rows[0];
    }
  });
};
