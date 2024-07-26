const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require("./CommentModel")

const ImageSchema = Schema({
    path: String,
    filename: String
})

const BlogSchema = Schema({
    image : ImageSchema,
    category :{
        type: String,
        required : true
    },
    title :{
        type: String,
        required : true
    },
    blogDate : {
        type : Date,required : true
    },
    content : {
        type: String,required : true
    },
    views:{
        type:Number,
        default:0
    },
    comments :[{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }],
    author :{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

BlogSchema.post('findOneAndDelete',async(blog)=>{
    if(blog){
        await Comment.deleteMany({
            _id :{
                $in: blog.comments
            }
        })
    }
})

module.exports = mongoose.model('Blog', BlogSchema)