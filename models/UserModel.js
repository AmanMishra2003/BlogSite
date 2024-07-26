const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = Schema({
    username : {
        type:String,
        required:[true ,'username is required'],
        unique: true,
    },
    firstname:{
        type:String,
        required:[true ,'firstname is required'],
    },
    lastname:{
        type:String,
        required:[true ,'lastname is required'],
    },
    email :{
        type:String,
        required:[true ,'email is required'],
        unique: true,
        lowercase:true
    },
    password :{
        type:String,
        required:[true, 'password is required'],
        minlength: [8, 'minimum length should be 8']
    }
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

//static method
UserSchema.statics.login= async function(email, password){

    const user = await this.findOne({email})
    if(user){
        const compareBool = await bcrypt.compare(password, user.password)
        if(compareBool){
            return user;
        }
        throw Error('Incorrect Password')
    }else{
        throw Error('Incorrect Email Id!')
    }
}

module.exports = mongoose.model('User', UserSchema)