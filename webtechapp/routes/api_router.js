var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();

router.use(bodyParser.urlencoded({extended: false}));
router.get('/test', function (req, res) {
    res.send('test succesfull!');
});
 
router.post('/create an account', function (req, res) {
    //res.send('Got a POST request')
    let user = req.body.username;
    let pass = req.body.password;
 })
 router.put('/user', function (req, res) {
     res.send('Got a PUT request at /user')
 })
 router.delete('/user', function (req, res) {
     res.send('Got a DELETE request at /user')
 })
 
module.exports = router;