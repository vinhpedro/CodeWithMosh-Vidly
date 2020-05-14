const express = require('express');
const mongoose = require('mongoose');
const home=require('./routes/home');
const genres=require('./routes/genres');
const customers=require('./routes/customers')

const app = express();

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => console.error(err))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);

const port = process.env.PORT || 3000;

app.listen(port, () =>{console.log(`Listening on port ${port}, environment: ${app.get('env')}`)});