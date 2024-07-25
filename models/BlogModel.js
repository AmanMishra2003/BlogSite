const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = Schema({
    path: String,
    filename: String
})

const BlogSchema = Schema({
    image : ImageSchema,
    category :{
        type: String
    },
    title :{
        type: String
    },
    blogDate : {
        type : Date
    },
    content : {
        type: String
    },
    views:{
        type:Number
    },
    comments :[{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }]
    // author 
})

module.exports = mongoose.model('Blog', BlogSchema)