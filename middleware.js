const Blog = require('./models/BlogModel')
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

