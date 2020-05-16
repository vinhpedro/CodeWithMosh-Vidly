const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: {
        type:Boolean,
        default:false
    },

    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:50
    },

    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:11
    }
})

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
        phone:Joi.string().length(11).required(),
        isGold:Joi.boolean()
    })

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;