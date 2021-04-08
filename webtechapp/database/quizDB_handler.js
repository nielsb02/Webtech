var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var file = "webtechapp/database/quiz.db";
var exists = fs.existsSync(file);

getQuizData = function(query, callback){
    console.log(exists);

    var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            //next(err);
          console.log(err.message);
        }
        console.log('Connected to the quiz database.');
    });

    var data = []; //for storing the rows.

    db.serialize(function() {
        db.each(query, function(err, row) {
            if (err) {
                //next(err);
                console.log(err.message);
            }
            data.push(row); //pushing rows into array
        }, function(){ // calling function when all rows have been pulled
            db.close((err) => {
                if (err) {
                    //next(err);
                    console.log(err.message);
                }
                console.log('Close the database connection.');
            }); //closing connection
            callback(data); 
        });
    });
}

storeQuizData = function(query, callback){
    console.log(exists);

    var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            //next(err);
          console.log(err.message);
        }
        console.log('Connected to the quiz database.');
    });
}

module.exports = {getQuizData, storeQuizData};