const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const { User, validate } = require('../models/user');

router.post('/', (req, res) => {

    const {error} = validate(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    const user = await new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    await user.save();

    res.send(user);

})