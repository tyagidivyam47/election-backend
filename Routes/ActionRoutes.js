const express = require('express');

const electionController = require("../Controller/Election");

const route = express.Router();

route.post("/createElection", electionController.createElection);

module.exports = route;