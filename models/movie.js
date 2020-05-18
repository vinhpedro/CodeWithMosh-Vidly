const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },

    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },

})

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;