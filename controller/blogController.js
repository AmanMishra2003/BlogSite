//models
const Blog = require("../models/BlogModel")
const date = require('date-and-time');

function formateDate(d){
    return date.format(d, 'MMM DD YYYY')
}

// postBlogData, newBlogForm
module.exports = {
    showBlogPage : async(req,res)=>{
        const allblogs = await Blog.find({})
        res.render('Blog/blogPage',{allblogs, formateDate})
    },
    showUserPost : (req,res)=>{
        res.render('Blog/userPost')
    },
    newBlogForm : (req,res)=>{
        res.render('Blog/newBlogForm')
    },
    postBlogData : async(req,res)=>{
        const data = new Blog({...req.body, blogDate: new Date()})
        await data.save()
        res.redirect(`/blog/${data.id}`)
    },
    showSingleBlog : async(req,res)=>{
        const {id} = req.params
        const data = await Blog.findById(id).populate({path:'comments',populate:{path:'replies'}})
        res.render('Blog/singleBlogPage',{data, formateDate})
    },
    editBlogForm :async(req,res)=>{
        const {id} = req.params
        const data = await Blog.findById(id)
        res.render('Blog/Edit',{data})
    },
    editAndUpadteBlog : async(req,res)=>{
        const {id} = req.params
        const data = await Blog.findByIdAndUpdate(id, req.body, {runValidation:true, new:true})
        res.redirect(`/blog/${id}`)
    }
}