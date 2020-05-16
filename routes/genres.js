const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', async (req, res) => {
    
    const genres = await Genre
    .find();
    
    res.send(genres);

});

router.get('/:id', async (req, res) => {

    const genre = await Genre
    .find({_id:req.params.id})

    if (!genre) res.status(404).send(`No genre found for that ID...`);
        
    res.send(genre)

});

router.post('/', async (req, res) => {

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name:req.body.name
    })
    
    genre = await genre.save();

    res.send(genre);

});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name
        }
    },{new:true});

    if (!genre) res.status(404).send(`No genre found for that ID...`);

    res.status(200).send(genre);

});

router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) res.status(404).send(`No genre found for that ID...`);

    res.status(200).send(genre);

});

module.exports = router;