exports.getDbStats = function(db, callback) {
      db.command({'dbStats': 1},
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};

exports.insertReview = function(db, title, username, review, callback) {

	var cmd = {
      insert: title,
      documents: [
         { user: username, content: review }
      ],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
      db.command(cmd,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};

exports.getReviews = function(db, title, callback) {

	var cmd = {
      find: title
   }
      db.command(cmd,
      function(err, results) {
        //console.log(results.cursor);
        callback(results);
    }
  );
};