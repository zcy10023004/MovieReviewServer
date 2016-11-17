var http = require('http'),
    express = require('express'),
    path = require('path'),
    assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    dbCmd = require('./mongodbCommands.js'),
    compression = require('compression');
 
var app = express();
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));
app.use(compression());

var url = 'localhost';
var mongoPort = 27017;
var databaseName = "reviews";
 
MongoClient.connect("mongodb://" + url + ":" + mongoPort + "/" + databaseName, function(err, db) {
	assert.equal(null, err);
  console.log("Connected successfully to server");
  dbCmd.insertReview(db, "angry bird", "jjack", "good movie!!!", function (){
  	dbCmd.getReviews(db, "angry bird",function() {
    db.close();
  });
  });
  
});

app.use(express.static(path.join(__dirname, 'public')));
 
app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});