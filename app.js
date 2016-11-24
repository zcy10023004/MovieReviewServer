var http = require('http'),
    express = require('express'),
    path = require('path'),
    assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    dbCmd = require('./mongodbCommands.js'),
    compression = require('compression'),
    bodyParser = require('body-parser');
 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));
app.use(compression());

var url = 'localhost';
var mongoPort = 27017;
var databaseName = "reviews";
 
var database;
MongoClient.connect("mongodb://" + url + ":" + mongoPort + "/" + databaseName, function(err, db) {
	assert.equal(null, err);
  console.log("Connected successfully to server");
  database = db
});

app.post('/review', function(req, res){

  dbCmd.insertReview(database, req.body.movieID, req.body.deviceName, req.body.reviewContent, function (){
    console.log(req.body.deviceName + ": " + req.body.reviewContent + ", regarding " + req.body.movieID)
  });

  res.setHeader('Content-Type', 'application/json');

  res.send("success");

  //debugging output for the terminal
  //console.log(req.body);
});

app.get('/review', function(req, res){

  dbCmd.getReviews(database, req.query.id, function(results) {
  //db.close();
    console.log("getting " + req.query.id);
    console.log(results.cursor.firstBatch);

    var package = new Object();
    
    package.reviews = results.cursor.firstBatch;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(package));
  });

  //debugging output for the terminal
  //console.log(req.query);
});
 
app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});