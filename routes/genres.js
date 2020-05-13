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
    name:{type:String, minlength:3}
})

const Genre = mongoose.model('Genre', genreSchema);

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
    async function getGenres(){
        const genres = await Genre
        .find();
        res.send(genres);
    }

    getGenres();

});

router.get('/:id', (req, res) => {

    async function getGenreById(){
        const genre = await Genre
        .find({_id:req.params.id});
        
    res.send(genre)

    }

    getGenreById();
});

router.post('/', (req, res) => {

    // const { error } = validateGenre(req.body);

    // if (error) return res.status(400).send(error.details[0].message);

    async function createGenre(){
        const genre = new Genre({
            name:req.body.name
        })

        try{
            const result = await genre.save();
            const message = `Genre added to database: ${genre}`;
            res.send(message);
            console.log(message);
        }

        catch(ex){
            for(field in ex.errors){
                const message = `Error: ${ex.errors[field].message}`;
                res.status(400).send(message);
                console.log(message)
            }
        }

    }

    createGenre();

});

router.put('/:id', (req, res) => {

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    async function updateGenre(id){
        const result = await Genre.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name
            }
        },{new:true});

        try{

            const message = `Genre updated: ${result}`;
            res.status(200).send(message);
            console.log(message);
        
        }

        catch(ex){
            for(field in ex.errors){
                const message = `Error: ${ex.errors[field].message}`;
                res.status(400).send(message);
                console.log(message);
            }
        }

    }

    updateGenre();

});

router.delete('/:id', (req, res) => {

    async function deleteGenre(){

        const genre = await Genre.findByIdAndRemove(req.params.id);

        const message = `Genre removed: ${genre}`;
        res.status(200).send(message);
        console.log(message);
        
    }

    deleteGenre();

});

module.exports = router;