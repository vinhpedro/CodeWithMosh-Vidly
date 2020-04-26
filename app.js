const express = require('express');
const Joi = require('@hapi/joi');
const genres=require('./routes/genres');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
    res.send("Hello World!")
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{console.log(`Listening on port ${port}, environment: ${app.get('env')}`)});