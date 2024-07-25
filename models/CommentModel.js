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
commentSchema.post('findOneAndDelete',async(reply)=>{
  if(reply){
      await Comment.deleteMany({
          _id :{
              $in: reply.replies
          }
      })
  }
})
const Comment = mongoose.model('Comment', commentSchema)


module.exports = Comment