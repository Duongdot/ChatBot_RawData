const path = require('path');
const bodyParser = require('body-parser');
const app = require('express')();
const express = require('express');
const cors = require('cors')
require('dotenv').config();
var jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const PROJECT_DIR = path.normalize(__dirname)+ '/sdk';
console.log(PROJECT_DIR)

app.use('/',express.static(path.join(PROJECT_DIR, '')));

app.post('/jwt_service', (req, res) => {
    jwt_data = {
        "sub": req.body.identity,
        "iss": req.body.clientId,
        "algorithm": "HS256"
    }
    jwt.sign(jwt_data, process.env.CLIENT_SECRET, { algorithm: 'HS256' }, function (err, token) {
        res.send({
            "jwt": token
        })
    });
})

module.exports = app;