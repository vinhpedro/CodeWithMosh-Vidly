/*-----------
DEPENDENCIES
------------*/

const express = require('express');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const router=express.Router();

/*-----------
SCHEMA
------------*/

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
})

const Customer = mongoose.model('Customer', customerSchema);

/*-----------
VALIDATION
------------*/

const validateCustomer = (customer)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
        phone:Joi.string().length(11).required(),
        isGold:Joi.boolean()
    })

    return schema.validate(customer);
}

/*-----------
ROUTES
------------*/

router.get('/', async (req, res) =>{
    const customers = await Customer
        .find()

    res.send(customers);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer
    .find({_id:req.params.id});

    if (!customer) res.status(404).send("No customer found for that ID...");

    res.send(customer)
})

router.post('/', async (req, res) => {

    const {error} = validateCustomer(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    let customer = await new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })

    customer = await customer.save();

    res.send(customer);
})

router.put('/:id', async (req, res)=>{

    const {error} = validateCustomer(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        },
    }, {new:true});

    if (!customer) res.status(404).send("No customer found for that ID...");

    res.send(customer);
})

router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) res.status(404).send("No customer found for that ID...");

    res.send(customer);
})

/*-----------
EXPORTS
------------*/

module.exports = router;