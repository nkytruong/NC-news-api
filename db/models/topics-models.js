const db = require("../connection");

exports.selectTopics = () => {
  let queryStr = `SELECT * FROM topics `;
  queryStr += ";";

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};
