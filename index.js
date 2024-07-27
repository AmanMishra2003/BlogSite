const ejsMate = require('ejs-mate')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
const {checkUser} = require('./middleware')

const express = require('express')
const app = express();

//all settings
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
app.use(flash())

app.use(checkUser)
app.use((req,res,next)=>{
    res.locals.currentPath = req.path
    res.locals.flasherrors = req.flash('error')
    next();
})

//mongodb connection 
const DB_url = process.env.DB_URL
mongoose.connect(DB_url).then(()=>{
    console.log("Connection Made!!")
})

//routers
const BlogRouter = require('./routes/blogRouter')
const CommentRouter = require('./routes/commentRouter')
const UserRouter = require("./routes/userRouter")



//all routes written here

app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/blog',BlogRouter)
app.use('/blog/:id/comment',CommentRouter)
app.use('/user',UserRouter)



app.use((err,req,res,next)=>{
    // res.send(err)
    res.render('error',{err})
    // console.log(err)
})

app.listen(3000,()=>{
    console.log("connection")
})