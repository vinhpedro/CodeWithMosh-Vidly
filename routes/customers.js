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
ROUTES
------------*/

router.get('/', async (req, res) =>{
    const customers = await Customer
        .find()

    res.send(customers);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer
        .find({_id:req.params.id})

    res.send(customer)
})

router.post('/', async (req, res) => {
    let customer = await new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })

    customer = await customer.save();

    res.send(customer);
})

router.put('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        },
    }, {new:true});

    res.send(customer);
})

router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);

    res.send(customer);
})

/*-----------
EXPORTS
------------*/

module.exports = router;