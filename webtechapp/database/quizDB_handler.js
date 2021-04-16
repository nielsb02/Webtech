var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
const apiError = require("../error/api_error");
var file = "webtechapp/database/quiz.db";
var exists = fs.existsSync(file);

getQuizData = function(query, array, next, callback){
    console.log(exists);

    var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            //next(apiError.database(err.message));
        console.log(err.message);
        }
        console.log('Connected to the quiz database.');
    });

    var data = []; //for storing the rows.

    db.serialize(function() {
        let stmt = db.prepare(query, (err) => { if (err) {next(apiError.database(err.message));}});
        stmt.each(array, (err, row) => {
            if (err) {
                next(apiError.database(err.message));
            }            
            data.push(row); //pushing rows into array
        }, function(){ // calling function when all rows have been pulled
            stmt.finalize((err) => {
                if (err) {
                    next(apiError.database(err.message));
                }
            });
            db.close((err) => {
                if (err) {
                    next(apiError.database(err.message));
                }
                console.log('Close the database connection.');
            }); //closing connection
            callback(data) 
        });
    });
}

storeQuizData = function(query, values, next, callback){
    console.log(exists);

    var db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            next(apiError.database(err.message));
        }
        console.log('Connected to the quiz database.');
    });

    db.serialize(function() {
        db.run(query, values, (err)=> {
            if (err) {
                next(apiError.database(err.message));
            }
        });
        db.close((err) => {
            if (err) {
                next(apiError.database(err.message));
            }
            console.log('Close the database connection.');
        }); //closing connection
        callback();
    });
}

module.exports = {getQuizData, storeQuizData};