const {addComment,addCommentReply, deletComment,deleteReply} = require('../controller/commentController')
const express = require('express')
const router = express.Router({mergeParams:true})
const {authorizeUser} = require('../middleware')

router.route('/')
    .post(addComment)
router.route('/:commentId')
    .delete(authorizeUser,deletComment)

router.route('/:commentId/replies')
    .post(authorizeUser, addCommentReply)

router.route('/:commentId/replies/:replyId')
    .delete(authorizeUser,deleteReply)



module.exports = router;