const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const home=require('./routes/home');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const rentals=require('./routes/rentals');
const users=require('./routes/users');
const auth=require('./routes/auth');
const error=require('./middleware/error');

const app = express();

process.on('uncaughtException', (ex) => {
    winston.error(ex.message);
    process.exit(1);
})

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message);
    process.exit(1);
})

winston.add(new winston.transports.File({filename: 'logfile.log'}));
winston.add(new (winston.transports.MongoDB)( {
    db: 'mongodb://localhost/vidly'
} ));

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined...')
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => console.error(err))

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;

app.listen(port, () =>{console.log(`Listening on port ${port}, environment: ${app.get('env')}`)});