const express = require("express");
const apiLogger = require("../log/api_logger");
var bodyParser = require("body-parser");
const apiError = require("../error/api_error");

var router = express.Router();
//router.use(bodyParser.urlencoded({extended: false}));
 
//router.use(apiLogger);

router.get('/test', function (req, res, next) {
    //res.send(200, 'test succesfull!');
    next(apiError.notFound(req.url + " not found"));
});

router.get("/" , function (req, res, next){
    next();
});

router.get("/")
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