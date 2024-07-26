const {showBlogPage, showUserPost, postBlogData, newBlogForm, showSingleBlog, editBlogForm,editAndUpadteBlog, deleteblog} = require('../controller/blogController')
const multer = require('multer')
const {updateAndIncreaseView,authorizeUser,checkUser} = require('../middleware')

const express = require('express')
const { storage } = require('../cloudinary')
const router = express.Router()

//multer config
const upload = multer({storage:storage})



router.route('/')
    .get(showBlogPage)
    .post(authorizeUser,upload.single('image'),postBlogData)

router.route('/newBlog')
    .get(authorizeUser, newBlogForm)

router.route('/userPost')
    .get(authorizeUser,showUserPost)

router.route('/:id')
    .get(updateAndIncreaseView,showSingleBlog)
    .patch(authorizeUser,upload.single('image'),editAndUpadteBlog)
    .delete(authorizeUser,deleteblog)

router.route('/:id/edit')
    .get(authorizeUser,editBlogForm)



module.exports = router;