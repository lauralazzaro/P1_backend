const http = require('http');

const mongoose = require('mongoose');
require('dotenv/config');

const server = http.createServer((req, res) => {
    res.end('Server created');
});

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(() => console.log('Connection to DB failed!'));

server.listen(process.env.PORT || 3000);