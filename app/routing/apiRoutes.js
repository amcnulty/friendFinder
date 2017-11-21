const express = require('express');
const router = express.Router();
const path = require('path');
var Friends = require('./app/data/friends');

var systemUsers = new Friends();

router.get('/friends', function(req, res) {
    console.log("Handling GET request from api/friends");
    res.status(200).send(systemUsers.getFriends());
});

router.post('/friends', function(req, res) {
    console.log("Handling POST request from api/friends");
    console.log(req.body);
    systemUsers.addFriend(req.body);
    res.status(200).send(systemUsers.getBestMatch());
});

module.exports = router;