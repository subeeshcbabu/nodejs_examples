const express = require('express');
const requester = require('../core/keepalive/keepalive_client');

const app = express();
var i = 0;

app.get('/favicon.ico', function(req, res) {
    res.status(204).send('');
});

app.use('/error', (req, res, next) => {

    requester(i++, '/error');
    res.status(200).send('Hi from a Node.js express app : Error');
});

app.use('/close', (req, res, next) => {

    requester(i++, '/remote_close');
    res.status(200).send('Hi from a Node.js express app: Close');
});

app.use('/', (req, res, next) => {

    requester(i++);
    res.status(200).send('Hi from a Node.js express app');
});

app.listen(8000, () => {
    console.log("started app on " + 8000);
});
