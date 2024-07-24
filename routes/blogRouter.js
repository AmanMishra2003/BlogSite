const {showBlogPage, showUserPost, postBlogData, newBlogForm, showSingleBlog, editBlogForm,editAndUpadteBlog} = require('../controller/blogController')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(showBlogPage)
    .post(postBlogData)

router.route('/newBlog')
    .get(newBlogForm)

router.route('/userPost')
.get(showUserPost)

router.route('/:id')
    .get(showSingleBlog)
    .patch(editAndUpadteBlog)

router.route('/:id/edit')
    .get(editBlogForm)



module.exports = router;