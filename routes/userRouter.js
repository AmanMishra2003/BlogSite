const express = require('express')
const router = express.Router()

const {loginForm, signUpForm,login,signup,logout} = require('../controller/userController')
const {UserValidationRegister} = require('../Joi/validation')

router.route('/login')
    .get(loginForm)
    .post(login)

router.route('/signup')
    .get(signUpForm)
    .post(signup)

router.route('/logout')
    .get(logout)

module.exports = router;