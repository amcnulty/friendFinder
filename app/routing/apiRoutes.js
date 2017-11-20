const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/friends', function(req, res) {
    console.log("Handling GET request from api/friends");
});

router.post('/friends', function(req, res) {
    console.log("Handling POST request from api/friends");
    console.log(req.body);
    res.status(200).send();
});

module.exports = router;