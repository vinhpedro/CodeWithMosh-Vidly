const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{type:String, minlength:3, required:true}
})

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;