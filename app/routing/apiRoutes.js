const express = require('express');
const router = express.Router();
const path = require('path');
var Friends = require('../../app/data/friends');

var systemUsers = new Friends();

router.get('/friends', function(req, res) {
    res.status(200).send(systemUsers.getFriends());
});

router.post('/friends', function(req, res) {
    var matches = systemUsers.getBestMatch(req.body);
    res.status(200).send(JSON.stringify(matches));
    systemUsers.addFriend(req.body);
});

module.exports = router;