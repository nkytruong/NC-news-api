const { checkArticleIdExists } = require('../models/articles-models')
const {selectCommentsByArticleId, addComment, selectCommentByCommentID, removeCommentByCommentId} = require('../models/comments-models')

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params

    const promises = [selectCommentsByArticleId(article_id)]

    if(article_id){
        promises.push(checkArticleIdExists(article_id))
    }
    Promise.all(promises)
    .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
        res.status(200).send({comments})
    })
    .catch(next)
}

exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const newComment = req.body

   const promises = [addComment(newComment, article_id), checkArticleIdExists(article_id)]

    Promise.all(promises)
    .then((resolvedPromises) => {
        const postedComment = resolvedPromises[0]
        res.status(201).send({postedComment})
    }).catch(next)
}

exports.deleteCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params

    const promises = [selectCommentByCommentID(comment_id), removeCommentByCommentId(comment_id)]
    
    Promise.all(promises)
    .then(() => {
        res.status(204).send()
    }).catch(next)
}