/*-----------
DEPENDENCIES
------------*/

const express = require('express');
const router=express.Router();
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

/*-----------
DATABASE
------------*/

mongoose.connect('mongodb://localhost/genres', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => console.error(err))

const genreSchema = new mongoose.Schema({
    name:{type:String, min:3}
})

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre(bodyObj){
    const genre = new Genre(bodyObj)

    try{
        const result = await genre.save();
        console.log(genre);
    }

    catch(ex){
        for(field in ex.errors){
            console.log(ex.errors[field].message)
        }
    }
}

/*-----------
VALIDATION
------------*/

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
};

/*-----------
ROUTES
------------*/

router.get('/', (req, res) => {
    res.send(genres)
});

router.get('/:id', (req, res) => {
    const genre = (genres.find(g => g.id === parseInt(req.params.id)));

    if (!genre) res.status(404).send(`No genre found for that ID... Genres contains ${genres.length} items...`);

    res.send(genre)
});

router.post('/', (req, res) => {

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(newGenre);
    res.send(newGenre);

});

router.put('/:id', (req, res) => {

    const genre = (genres.find(g => g.id === parseInt(req.params.id)));

    if (!genre) return res.status(404).send(`No genre found for that ID... Genres contains ${genres.length} items...`);

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);

});

router.delete('/:id', (req, res) => {

    const genre = (genres.find(g => g.id === parseInt(req.params.id)));

    if (!genre) return res.status(404).send(`No genre found for that ID... Genres contains ${genres.length} items...`);

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);

});

module.exports = router;