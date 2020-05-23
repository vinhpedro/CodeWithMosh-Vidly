const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },

    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1024
    }
})

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(6).max(1024).required(),
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;