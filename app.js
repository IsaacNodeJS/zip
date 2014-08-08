var express = require("express");
var logfmt = require("logfmt");
var config = require('./config');
var pg = require('pg');
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	pg.connect(/*config.db.url*/process.env.DATABASE_URL, function(err, client, done) {
		client.query('select * from "testTable"', function(err, result) {
			done();
			if(err) {
				return console.error(err);
			};
			
			res.send(result.rows);
		});
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
