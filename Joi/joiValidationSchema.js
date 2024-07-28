const Joi = require('joi');

module.exports.BlogValidationSchema = Joi.object({
        image : Joi.object(),
        category :Joi.string().required(),
        title :Joi.string().required(),
        blogDate : Joi.date(),
        content : Joi.string().required()
})

module.exports.CommentValidationSchema = Joi.object({
    content: Joi.string().required()
}) 

module.exports.UserValidationSchema = Joi.object({
    username : Joi.string().required(),
    firstname: Joi.string().required(),
    lastname:Joi.string().required(),
    email :Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().min(8).required()
})