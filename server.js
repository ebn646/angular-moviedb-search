var express = require('express'); // Express web server framework
var Showtimes = require('showtimes');

var app = express();

app.use(express.static(__dirname + '_build/'));
console.log('Listening on 3000');
app.listen(3000);