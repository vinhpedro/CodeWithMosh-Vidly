const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const router=express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find();

    res.send(users);
})

router.post('/', async (req, res) => {

    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email })

    if(!user) return res.status(400).send('Invalid email or password...');

    const vaildPassword = await bcrypt.compare(req.body.password, user.password);

    if(!vaildPassword) return res.status(400).send('Invalid email or password...');

    res.send(true);

})

const validate = (req) => {
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(6).max(1024).required()
    })

    return schema.validate(req);
}

module.exports = router;