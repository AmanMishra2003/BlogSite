const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Author',
    //     required: true
    //   },
      content: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }]
})

module.exports = mongoose.model('Comment', commentSchema)