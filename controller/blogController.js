//models
const Blog = require("../models/BlogModel")
const User = require("../models/UserModel")
const date = require('date-and-time');
const {cloudinary} = require('../cloudinary');

const asyncHandler = require('express-async-handler')



function formateDate(d){
    return date.format(d, 'MMM DD YYYY')
}

// postBlogData, newBlogForm
module.exports = {
    showBlogPage : asyncHandler(async(req,res,next)=>{
         let allblogs;
        if(req.query.title){
            allblogs = await Blog.find({title: {$regex : req.query.title, $options : 'i'}})
        }else{
            allblogs = await Blog.find({})
        }
        res.render('Blog/blogPage',{allblogs, formateDate})
    }),
    showUserPost : asyncHandler(async(req,res,next)=>{
        const currentUserId = res.locals.currentUser._id
        let blog;
        if(req.query.title){
            blog = await Blog.find({author:currentUserId,title: {$regex : req.query.title, $options : 'i'}})
        }else{
            blog = await Blog.find({author:currentUserId})
        }
        res.render('Blog/userPost',{blog, formateDate})
    }),
    newBlogForm : (req,res)=>{
        res.render('Blog/newBlogForm')
    },
    postBlogData : asyncHandler(async(req,res,next)=>{
        const currentUserId = res.locals.currentUser._id
        const user = await User.findById(currentUserId)
        // console.log(user)
        const data = new Blog({...req.body, blogDate: new Date()})
        data.image = {
            path: req.file.path,
            filename: req.file.filename,
        }
        data.author = user
        await data.save()
        res.redirect(`/blog/${data.id}`)
    }),
    showSingleBlog :asyncHandler(async(req,res,next)=>{
        const {id} = req.params
        const data = await Blog.findById(id).populate('author').populate({path:'comments',populate:{path:'replies'}})
        res.render('Blog/singleBlogPage',{data, formateDate})
    }),
    editBlogForm :asyncHandler(async(req,res,next)=>{
        const {id} = req.params
        const data = await Blog.findById(id)
        res.render('Blog/Edit',{data})
    }),
    editAndUpadteBlog :asyncHandler( async(req,res,next)=>{
        const {id} = req.params;
        const blogToBeEdited = await Blog.findById(id)
        const currentBlogImage = blogToBeEdited.image;
        const data = await Blog.findByIdAndUpdate(id, req.body, {runValidation:true, new:true})
        if(!req.file){
            data.image = currentBlogImage
        }else{
            await cloudinary.uploader.destroy(currentBlogImage.filename)
            data.image = {
                filename :req.file.filename,
                path : req.file.path 
            }
        }
        await data.save();
        res.redirect(`/blog/${id}`)
    }),
    deleteblog :asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        await Blog.findByIdAndDelete(id)
        res.redirect('/blog/userPost')
    })
}