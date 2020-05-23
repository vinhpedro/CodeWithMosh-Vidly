const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:50
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    }
})

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().required(),
        password:Joi.string().min(6).required(),
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;