const {showBlogPage, showUserPost, postBlogData, newBlogForm, showSingleBlog, editBlogForm,editAndUpadteBlog, deleteblog} = require('../controller/blogController')
const multer = require('multer')
const {updateAndIncreaseView} = require('../middleware')

const express = require('express')
const { storage } = require('../cloudinary')
const router = express.Router()

//multer config
const upload = multer({storage:storage})

router.route('/')
    .get(showBlogPage)
    .post(upload.single('image'),postBlogData)

router.route('/newBlog')
    .get(newBlogForm)

router.route('/userPost')
    .get(showUserPost)

router.route('/:id')
    .get(updateAndIncreaseView,showSingleBlog)
    .patch(upload.single('image'),editAndUpadteBlog)
    .delete(deleteblog)

router.route('/:id/edit')
    .get(editBlogForm)



module.exports = router;