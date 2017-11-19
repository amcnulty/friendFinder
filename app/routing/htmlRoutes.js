const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/home.html'));
});

router.get('/survey', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/survey.html'));
});

router.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/home.html'));
});

module.exports = router;