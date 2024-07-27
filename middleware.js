const Blog = require('./models/BlogModel')
const Comment = require('./models/CommentModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//model
const User = require('./models/UserModel')

module.exports.checkUser = asyncHandler(async(req,res,next)=>{
    const token  = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'thisisasecret', async(err,decodedToken)=>{
            if(err){
                res.locals.currentUser = null;
                next();
            }else{
                const user = await User.findById(decodedToken.id)
                // console.log(user)
                if(user){
                    res.locals.currentUser = user;
                }else {
                    res.locals.currentUser = null;
                }
                next()
            }
        })
    }else{
        res.locals.currentUser = null;
        // console.log(res.locals.currentUser)
        next();
    }
})

module.exports.updateAndIncreaseView = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const blog = await Blog.findByIdAndUpdate(id ,{$inc : {views : 1}})
    next()
})

module.exports.authorizeUser = asyncHandler(async(req,res,next)=>{
    const token = req.cookies['jwt']

    //check jwt token exist and verify
    if(token){
         jwt.verify(token, 'thisisasecret',(err,decodedToken)=>{
            if(err){
                req.flash('error','Login Required!!')
                res.redirect('/user/login')
            }else{
                next()
            }
         })
    }else{
        req.flash('error','Login Required!!')
        res.redirect('/user/login')
    }
})

module.exports.blogAuthorizationCheck = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const currentBlog = await Blog.findById(id);
    const user = res.locals.currentUser._id
    if(currentBlog.author.equals(user)){
        next()
    }else{
        req.flash("error","You Do not have Permission .")
        res.redirect(`/blog/${id}`)
    }
})

module.exports.commentAuthorizationCheck = asyncHandler(async(req,res,next)=>{
    const {id,commentId, replyId} = req.params;
    const user = res.locals.currentUser._id
    let comment ;
    if(replyId){
        comment = await Comment.findById(replyId)
    }
    else if(commentId){
        comment = await Comment.findById(commentId)
    }
    
    if (!comment) {
        req.flash("error", "Comment not found.");
        return res.redirect(`/blog/${id}`);
    }

    if (comment.author.equals(user)) {
        return next();
    } else {
        req.flash("error", "You do not have permission.");
        return res.redirect(`/blog/${id}`);
    }
})
