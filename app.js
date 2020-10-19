const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoute');
const sauceRoutes = require('./routes/sauceRoute');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true
    })// eslint-disable-next-line no-console
    .then(() => console.log('Connected to DB!'))
    // eslint-disable-next-line no-console
    .catch(() => console.log('Connection to DB failed!'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(bodyParser.json());

app.use(mongoSanitize());

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

app.use('', (req, res, next) => {
    res.end('Server Created!');
});

module.exports = app;