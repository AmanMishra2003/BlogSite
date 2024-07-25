const ejsMate = require('ejs-mate')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')

const express = require('express')
const app = express();

//all settings
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

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
app.use('/blog',BlogRouter)
app.use('/blog/:id/comment',CommentRouter)
app.use('/users',UserRouter)

app.listen(3000,()=>{
    console.log("connection")
})