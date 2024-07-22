const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    username : {
        type:String
    }
})