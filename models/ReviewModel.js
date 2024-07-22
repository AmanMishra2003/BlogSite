const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = Schema({
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
        ref: 'review'
      }]
})

module.exports = mongoose.model('review', ReviewSchema)