const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports=function(){

    winston.exceptions.handle(
        new winston.transports.Console({colorize:true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );

    process.on('uncaughtException', (ex) => {
        winston.error(ex.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message);
        process.exit(1);
    });

    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    winston.add(new (winston.transports.MongoDB)( {
        db: 'mongodb://localhost/vidly'
    } ));
};