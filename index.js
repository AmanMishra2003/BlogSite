const ejsMate = require('ejs-mate')
const path = require('path')

const express = require('express')
const app = express();

//all settings
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

//routers
const BlogRouter = require('./routes/blogRouter')
const ReviewRouter = require('./routes/reviewRouter')
const UserRouter = require("./routes/userRouter")



//all routes written here
app.use('/blog',BlogRouter)
app.use('/blog/:id/review',ReviewRouter)
app.use('/users',UserRouter)

app.listen(3000,()=>{
    console.log("connection")
})