const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const app = express();

require('./startup/routes')(app);
require('./startup/database');

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

const port = process.env.PORT || 3000;

app.listen(port, () =>{console.log(`Listening on port ${port}, environment: ${app.get('env')}`)});