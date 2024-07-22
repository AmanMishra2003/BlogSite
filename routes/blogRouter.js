const {showBlogPage, showUserPost} = require('../controller/blogController')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(showBlogPage)

router.route('/userPost')
    .get(showUserPost)


module.exports = router;