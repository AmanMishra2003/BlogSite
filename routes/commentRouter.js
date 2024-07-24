const {addComment,addCommentReply} = require('../controller/commentController')
const express = require('express')
const router = express.Router({mergeParams:true})

router.route('/')
    .post(addComment)

router.route('/:commentId/replies')
    .post(addCommentReply)

module.exports = router;