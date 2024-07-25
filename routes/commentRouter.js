const {addComment,addCommentReply, deletComment,deleteReply} = require('../controller/commentController')
const express = require('express')
const router = express.Router({mergeParams:true})

router.route('/')
    .post(addComment)


router.route('/:commentId')
    .delete(deletComment)

router.route('/:commentId/replies')
    .post(addCommentReply)

router.route('/:commentId/replies/:replyId')
    .delete(deleteReply)



module.exports = router;
// /blog/<%= data.id %>/comment/<%= reply.id %>