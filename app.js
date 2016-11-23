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

app.post('/review', function(req, res){
    res.setHeader('Content-Type', 'application/json');

    res.send("success");

    //debugging output for the terminal
    console.log(req.body);
});

app.get('/review', function(req, res){
    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify({
        firstName: "hellp",
        lastName: "got get request"
    }));

    //debugging output for the terminal
    console.log(req.query);
});

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
 
app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});