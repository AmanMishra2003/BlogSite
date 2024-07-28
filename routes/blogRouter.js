const {showBlogPage, showUserPost, postBlogData, newBlogForm, showSingleBlog, editBlogForm,editAndUpadteBlog, deleteblog} = require('../controller/blogController')
const multer = require('multer')
const {updateAndIncreaseView,authorizeUser,blogAuthorizationCheck} = require('../middleware')

const express = require('express')
const { storage } = require('../cloudinary')
const router = express.Router()

//multer config
const upload = multer({storage:storage})

//validation
const {BlogValidation} = require('../Joi/validation')



router.route('/')
    .get(showBlogPage)
    .post(authorizeUser,upload.single('image'),BlogValidation,postBlogData)

router.route('/newBlog')
    .get(authorizeUser,newBlogForm)

router.route('/userPost')
    .get(authorizeUser,showUserPost)
    
router.route('/:id')
    .get(updateAndIncreaseView,showSingleBlog)
    .patch(authorizeUser,blogAuthorizationCheck,upload.single('image'),BlogValidation,editAndUpadteBlog)
    .delete(authorizeUser,blogAuthorizationCheck,deleteblog)

router.route('/:id/edit')
    .get(blogAuthorizationCheck,editBlogForm)



module.exports = router;