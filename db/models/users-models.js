const db = require("../connection");

exports.selectUsers = () => {
  const queryStr = `SELECT * FROM users;`;
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByUsername = (username) => {
  const queryStr = `SELECT * FROM users WHERE username = $1;`
  const queryValues = [username]

  return db.query(queryStr, queryValues).then(({rows}) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "No User Found" });
    } else {
    return rows[0]
    }
  })
}