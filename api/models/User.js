const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    number: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min: 4
    },
})

const UserModel = model('users', UserSchema)

module.exports = UserModel