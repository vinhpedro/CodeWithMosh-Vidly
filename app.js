const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const home=require('./routes/home');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const rentals=require('./routes/rentals');

const app = express();

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => console.error(err))

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;

app.listen(port, () =>{console.log(`Listening on port ${port}, environment: ${app.get('env')}`)});