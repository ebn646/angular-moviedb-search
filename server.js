var express = require('express'); // Express web server framework
var Showtimes = require('showtimes');

var app = express();

//var api = new Showtimes(10001, {});
//
//api.getTheaters(function (error, theaters) {
//    if (error) {
//        throw error
//    }
//
//    console.log(theaters);
//});

app.use(express.static(__dirname + '_build/'));
console.log('Listening on 8888');
app.listen(8888);