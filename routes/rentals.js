const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const {Rental,validate} = require('../models/rental')

router.get('/', async (req, res) =>{
    const rentals = await Rental
        .find()

    res.send(rentals);
})

router.post('/', async (req, res)=>{
    let rental = await new Rental({

    })

    rental = await rental.save();

    res.send(rental);
})

router.get('/:id', async (req, res) => {

    const rental = await Rental
    .find({_id:req.params.id});

    if (!rental) res.status(404).send("No rental found for that ID...");

    res.send(rental);

})