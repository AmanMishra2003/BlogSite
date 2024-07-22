const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = Schema({
    image : {
        type: String,
    },
    category :{
        type: String
    },
    title :{
        type: String
    },
    Date : {
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
        ref:'Review'
    }]
    // author 
})

module.exports = mongoose.model('Blog', BlogSchema)