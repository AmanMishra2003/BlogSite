const Comment = require('../models/CommentModel')
const Blog = require('../models/BlogModel')

module.exports = {
   addComment : async(req, res)=>{
        const {id} =req.params;
        const blog = await Blog.findById(id)
        const comment = new Comment(req.body)
        blog.comments.push(comment)
        await comment.save()
        await blog.save()
        res.redirect(`/blog/${id}`)
   },
   addCommentReply : async(req,res)=>{
        const {id, commentId} = req.params;
        const comment = await Comment.findById(commentId);
        const reply = new Comment(req.body)
        comment.replies.push(reply)
        await comment.save()
        await reply.save()
        res.redirect(`/blog/${id}`)
   }
}