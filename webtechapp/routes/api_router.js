const express = require("express");
const dbHandler = require("../database/quizDB_handler");
var bodyParser = require("body-parser");
const apiError = require("../error/api_error");
var session = require('express-session');
var sqlsession = require('session-file-store')(session);
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

var options = {
    store: new sqlsession(),
    genid: function(req){
        return uuidv4();
    },
    cookie: {
        sameSite: 'strict',
        path: "/",
        httpOnly: true,
        maxAge: 60*60*24*365
    },
    resave: false,
    saveUninitialized: false,
    name: "webtechG31.sid",
    secret: "my secret"
};

var router = express.Router();
router.use(bodyParser.json());
router.use(session(options));
var currentSession;

router.get("/", function (req, res, next){
    res.redirect("/index.html");
})

router.get("/*.html$/", function (req, res, next){
    currentSession = req.session;
    if(currentSession.id) 
    {
        console.log("sessie")
        res.cookie("accountStatus", "notLoggedIn", {
            expires: new Date(Date.now() + 365*24*60*60*1000),
            sameSite: 'strict'
        });
    }
    else 
    {
        console.log("no sessions");
    }
    next();
});

router.get("/favicon.ico", function (req, res, next){
    res.status(200).json("no favicon set up");
});

router.get("/gettopics.js", function (req, res, next){
    res.contentType('application/json');
    var sql = "SELECT TopicID as tid, Title FROM Topic";

    dbHandler.getQuizData(sql, [], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
});

router.get("/getActiveQuiz.js", function (req, res, next){
    res.contentType('application/json');
    let quizID = req.query.quizID;
    var sql =  "SELECT linkDescription FROM Quiz WHERE quizID=?";

    dbHandler.getQuizData(sql, [quizID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
});

router.get("/getQuiz.js", function (req, res, next){
    res.contentType('application/json');
    let topicID = req.query.topicID;
    var sql =  "SELECT * FROM quiz WHERE topicID=?";

    dbHandler.getQuizData(sql, [topicID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
});

router.get("/getQuestion.js", function (req, res, next){
    res.contentType('application/json');
    let quizID = req.query.quizID;
    var sql = "SELECT * FROM Question WHERE quizID=?";

    dbHandler.getQuizData(sql, [quizID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getOptions.js", function (req, res, next){
    res.contentType('application/json');
    let questionID = req.query.questionID;
    var sql = "SELECT * FROM Option WHERE QuestionID=?";

    dbHandler.getQuizData(sql, [questionID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getAnswer.js", function (req, res, next){
    res.contentType('application/json');
    let questionID = req.query.questionID;
    var sql =  ("SELECT * FROM Option WHERE Is_correct = true AND QuestionID=?");

    dbHandler.getQuizData(sql, [questionID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/checkUserAnswered.js", function (req, res, next){
    res.contentType('application/json');
    currentSession = req.session;
    let questionID = req.query.questionID;
    var sql =  "SELECT EXISTS (SELECT * FROM UserAnswer WHERE QuestionID =? AND UserID =?) AS bool";
    
    dbHandler.getQuizData(sql, [questionID, currentSession.userID], next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    });
   
});

router.get("/getUserAnswer.js", function (req, res, next){
    currentSession = req.session;
    var values = [currentSession.userID, req.query.questionID];
    var sql = "SELECT OptionID, Is_correct FROM Option WHERE OptionID IN (SELECT OptionID FROM UserAnswer WHERE UserID =? AND QuestionID =?)";
    
    dbHandler.getQuizData(sql, values, next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    })
});

router.get("/getFillUserAnswer.js", function (req, res, next){
    currentSession = req.session;
    var values = [currentSession.userID, req.query.questionID];
    console.log(values);
    var sql = "SELECT OptionID, Option FROM UserAnswer WHERE UserID=? AND QuestionID=?";
    
    dbHandler.getQuizData(sql, values, next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    })
});

router.get("/getQuizResults", function (req, res, next){
    currentSession = req.session;
    var values = [currentSession.userID, req.query.quizID];
    var sql = "SELECT OptionID, Is_correct FROM Option WHERE OptionID IN (SELECT OptionID FROM UserAnswer WHERE UserID =? AND QuestionID IN (SELECT QuestionID FROM Question WHERE QuizID =?))";
    
    dbHandler.getQuizData(sql, values, next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    })
});

router.get('/checkEmail.js', function (req, res, next){
    var values = [req.query.email];
    var sql = "SELECT EXISTS (SELECT * FROM User WHERE email=?) AS bool";
    
    dbHandler.getQuizData(sql, values, next, function(data){
        console.log("send data...", data);
        res.status(200).json({dbData:  data});
    })
});

router.get("/loggedIn.js", function (req, res, next){
    currentSession = req.session;
    let loggedIn;
    if(currentSession.userID)
    {
        loggedIn = true
    }
    else
    {
        loggedIn = false
    }
    res.status(200).json({bool: loggedIn}); 
});

router.post("/login.js", function (req, res, next){
    currentSession = req.session;

    console.log("try logging in:", req.body);
    var values = [req.body.username, req.body.password];
    var sql = "SELECT UserID, first_name, last_name FROM User WHERE email=? AND password=?";
    
    dbHandler.getQuizData(sql, values, next, function(data){
        var json, status, code;
        console.log(data);
        if(data[0])
        {
            currentSession.userID = data[0].UserID;
            console.log(currentSession);
            let userData = data[0];
            delete userData.UserID;

            status = "loggedIn";
            json = {dbData: userData};
        }
        else
        {
            status = "notLoggedIn";
            json = "";
        }
        res.cookie("accountStatus", status, {
            expires: new Date(Date.now() + 365*24*60*60*1000),
            sameSite: 'strict',
        });
        res.status(200).json(json);
    });
});

router.post("/storeAccount.js", function (req, res, next){
    currentSession = req.session;

    console.log("store user:", req.body);
    var values = [req.body.first_name, req.body.last_name, req.body.email, req.body.password];
    var sql = "INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

    dbHandler.storeQuizData(sql, values, next, function(){
        sql = "SELECT UserID FROM USER WHERE email=?"
        dbHandler.getQuizData(sql, [req.body.email], next, function(data){
            currentSession = req.session;
            if(data[0])
            {
                currentSession.userID = data[0].UserID;
                console.log(currentSession);

            }
            res.send(200, "answer deleted");
        });
    });
});

router.post("/storeUserAnswer.js", function (req, res, next){
    currentSession = req.session;

    console.log("store answer:", req.body);
    var values = [req.body.QuestionID, req.body.optionID, currentSession.userID, req.body.option];
    var sql = "INSERT INTO UserAnswer (QuestionID, OptionID, UserID, Option) VALUES (?, ?, ?, ?)";
    
    dbHandler.storeQuizData(sql, values, next, function(){
        res.send(200, "answer stored");
    })
});

router.post("/clearAnswer.js", function (req, res, next){
    currentSession = req.session;
    console.log("delete answer:", req.body);
    var values = [req.body.QuestionID, currentSession.userID];
    var sql = "DELETE FROM UserAnswer WHERE QuestionID =? AND UserID =?";
    
    dbHandler.storeQuizData(sql, values, next, function(){
        res.send(200, "answer deleted");
    })
});

router.put('/', function (req, res) {
    res.send(200, 'Got a PUT request at /user')
});

router.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user')
});

module.exports = router;