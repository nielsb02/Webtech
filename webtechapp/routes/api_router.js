const express = require("express");
const dbHandler = require("../database/quizDB_handler");
const apiLogger = require("../log/api_logger");
var bodyParser = require("body-parser");

const apiError = require("../error/api_error");

var router = express.Router();
//router.use(bodyParser.urlencoded({extended: false}));
 
//router.use(apiLogger);

router.get('/test', function (req, res, next) {
    res.send(200, 'test succesfull!');
    //next(apiError.notFound(req.url + " not found"));
});

router.get("/assessment.html", function (req, res, next) {
    //next(apiError.notFound(req.url + " not found"));
});

router.get("/gettopics.js", function (req, res){
    res.contentType('application/json');
    var sql = "SELECT TopicID as tid, Title FROM Topic";

    dbHandler.getQuizData(sql, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getQuiz.js", function (req, res){
    res.contentType('application/json');
    let topicID = req.query.topicID;
    var sql =  "SELECT * FROM quiz WHERE topicID=" + topicID;
    console.log(sql);

    dbHandler.getQuizData(sql, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getQuestion.js", function (req, res){
    res.contentType('application/json');
    let quizID = req.query.quizID;
    var sql =  "SELECT * FROM Question WHERE quizID=" + quizID;

    dbHandler.getQuizData(sql, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getOptions.js", function (req, res){
    res.contentType('application/json');
    let questionID = req.query.questionID;
    var sql =  "SELECT * FROM Option WHERE QuestionID=" + questionID;

    dbHandler.getQuizData(sql, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/" , function (req, res, next){
    console.log("get..");
    //next();
});

router.post('/create an account', function (req, res) {
    //res.send('Got a POST request')
    let user = req.body.username;
    let pass = req.body.password;
})

router.put('/user', function (req, res) {
     res.send(200, 'Got a PUT request at /user')
})

router.delete('/user', function (req, res) {
     res.send('Got a DELETE request at /user')
})

module.exports = router;