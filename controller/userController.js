const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const genJWT = (id)=>{
    return jwt.sign({id},process.env.JWTSECRET,{
        expiresIn : maxAge, 
    });
}

const handleError = (err)=>{
    console.log(err.message)
    let error = {
        username:'',
        firstname:'',
        lastname:'',
        email :'',
        password :''
    }

    //invalid credential
    if(err.message === 'Incorrect Email Id!'){
        error.email = "Email not registered"
    }
    if(err.message === 'Incorrect Password'){
        error.password = "Password not valid"
    }
    if(err.message === "Credentials are required!"){
        error.email = "Enter Email"
        error.password = "Enter Password"
    }


    // console.log(err.message, err)
    if(err.code===11000){
        if(Object.keys(err.keyValue).includes('username')){
            error.username = "username already exist"
        }else{
            error.email = "email already exist"
        }
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach((prooperties)=>{
            error[prooperties.path] = prooperties.message;
        })
    }

    return error
}

module.exports = {
    loginForm : (req,res)=>{
        res.render('User/login')
    },
    signUpForm : (req,res)=>{
        res.render('User/signUp')
    },
    login : async(req,res)=>{
        try{
            const {email, password} = req.body;
            const user = await User.login(email,password)
            const token = genJWT(user._id)
            res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly : true})
            res.status(201).json({user : user.id})
        }catch(err){
            const error = handleError(err)
            res.status(400).json({error})
        }
        
    },
    signup : async(req,res)=>{
        try{
            const {email, password, username, firstname, lastname } = req.body;
            const user = await User.create(req.body);
            const token = genJWT(user._id)
            res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly : true})
            res.status(201).json({user : user.id})
        }catch(err){
            const error = handleError(err)
            res.status(400).json({error})
        }
    },
    logout : (req,res)=>{
        res.cookie('jwt','',{maxAge:1})
        res.redirect('/')
    }
}