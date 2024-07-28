const Joi = require('joi')
const {BlogValidationSchema, CommentValidationSchema, UserValidationSchema} = require('./joiValidationSchema')

//validation middleware
module.exports.BlogValidation = (req,res,next)=>{
    const validate = BlogValidationSchema.validate(req.body)
    if(!validate.error){
        return next();
    }
    req.flash('error',validate.error.details[0].message);
    if(req.originalUrl === '/blog'){
        res.redirect('/blog/newblog')
    }else{
        const redirectUrl = req.originalUrl + '/edit'
        res.redirect(redirectUrl)
    }
}

module.exports.CommentValidation = (req,res,next)=>{
    const {id} = req.params
    const validate  = CommentValidationSchema.validate(req.body);
    if(!validate.error){
        return next();
    }
    req.flash('error',validate.error.details[0].message);
    res.redirect(`/blog/${id}`)
}
