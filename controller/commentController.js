const Comment = require('../models/CommentModel')
const Blog = require('../models/BlogModel')
const User = require('../models/UserModel')

module.exports = {
     addComment: async (req, res) => {
          const { id } = req.params;
          //user
          const currentUserId = res.locals.currentUser._id
          const user = await User.findById(currentUserId)

          const blog = await Blog.findById(id)
          const comment = new Comment(req.body)
          comment.author = user
          blog.comments.push(comment)
          await comment.save()
          await blog.save()
          res.redirect(`/blog/${id}`)
     },
     addCommentReply: async (req, res) => {
          const { id, commentId } = req.params;
          //user
          const currentUserId = res.locals.currentUser._id
          const user = await User.findById(currentUserId)
          
          const comment = await Comment.findById(commentId);
          const reply = new Comment(req.body)
          reply.author = user
          comment.replies.push(reply)
          await comment.save()
          await reply.save()
          res.redirect(`/blog/${id}`)
     },
     deletComment: async (req, res) => {
          const { id, commentId } = req.params;
          const blog = await Blog.findById(id)
          const comment = await Comment.findById(commentId)
          blog.comments.pull(comment)
          await blog.save()
          await Comment.findByIdAndDelete(commentId)
          res.redirect(`/blog/${id}`)
     },
     deleteReply: async (req, res) => {
          const { id, commentId, replyId } = req.params;
          const comment = await Comment.findById(commentId)
          const reply = await Comment.findById(replyId)
          comment.replies.pull(reply)
          comment.save();
          await Comment.findByIdAndDelete(replyId)
          res.redirect(`/blog/${id}`)
     }
}