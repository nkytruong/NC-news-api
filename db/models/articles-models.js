const db = require("../connection")

exports.selectArticleById = (article_id) => {
    let queryStr = `SELECT
    articles.*
    FROM articles
   JOIN topics ON topics.slug = articles.topic
     JOIN users ON users.username = articles.author
    WHERE articles.article_id = $1`
    const queryValues = [article_id]

    const notANumber = /[a-zA-Z]/.test(article_id)
    if(notANumber){
        return Promise.reject({status: 400, msg: "Bad Request"})
    } else {
        return db.query(queryStr, queryValues).then((result) => {
            return result.rows
        })

    }

}