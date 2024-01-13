require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());

const actionRoutes = require('./Routes/ActionRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    let message = status === 500 ? "Internal Server Error" : error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
})

app.use(actionRoutes);

const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then((result) => {
        app.listen(PORT)
        console.log("Connection Established")
    })