const Blog = require('./models/BlogModel')
const asyncHandler = require('express-async-handler')

module.exports.updateAndIncreaseView = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const blog = await Blog.findByIdAndUpdate(id ,{$inc : {views : 1}})
    next()
})