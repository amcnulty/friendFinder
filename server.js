const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const htmlRoutes = require('./app/routing/htmlRoutes');
const apiRoutes = require('./app/routing/apiRoutes');

var app = express();

app.use(favicon(path.join(__dirname, 'app/public', 'res/icon/favicon.ico')));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/app/public')));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log("Friend Finder is running on port " + app.get('port'));
});