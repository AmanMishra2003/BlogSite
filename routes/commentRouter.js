const {addComment,addCommentReply, deletComment,deleteReply} = require('../controller/commentController')
const express = require('express')
const router = express.Router({mergeParams:true})
const {authorizeUser,commentAuthorizationCheck} = require('../middleware')

router.route('/')
    .post(authorizeUser,addComment)
router.route('/:commentId')
    .delete(authorizeUser,commentAuthorizationCheck,deletComment)

router.route('/:commentId/replies')
    .post(authorizeUser, addCommentReply)

router.route('/:commentId/replies/:replyId')
    .delete(authorizeUser,commentAuthorizationCheck,deleteReply)



module.exports = router;