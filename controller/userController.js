const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const genJWT = (id)=>{
    return jwt.sign({id},'thisisasecret',{
        expiresIn : maxAge, //jwt take age in seconds and cookie take age in milliseconds
    });
}

module.exports = {
    loginForm : (req,res)=>{
        res.render('User/login')
    },
    signUpForm : (req,res)=>{
        res.render('User/signUp')
    },
    login : asyncHandler(async(req,res)=>{
        const {email, password} = req.body;
        console.log(email)
        const user = await User.login(email,password)
        const token = genJWT(user._id)
        res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly : true})
        res.redirect('/blog')
    }),
    signup : asyncHandler(async(req,res)=>{
        const {email, password, username, firstname, lastname } = req.body;
        const user = await User.create(req.body);
        const token = genJWT(user._id)
        res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly : true})
        res.redirect('/blog')
    }),
    logout : (req,res)=>{
        res.cookie('jwt','',{maxAge:1})
        res.redirect('/blog')
    }
}