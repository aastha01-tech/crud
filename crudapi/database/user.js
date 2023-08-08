const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save',async function(next){
if(this.isModified('password')){
this.password = await bcrypt.hash(this.password,15)
}
next()
})

userSchema.methods.getAuthToken = async function () {
    let params = {
        id: this._id,
        email: this.email,
        password: this.password
    }
let secretKey = "gdshskfjkdggndh"
    var tokenValue = jwt.sign(params, secretKey)
    this.tokens = this.tokens.concat({ token: tokenValue })
    await this.save()
    return tokenValue;
}

module.exports = mongoose.model('user', userSchema, 'user')

