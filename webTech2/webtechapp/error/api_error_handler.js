const apiError = require("./api_error");
var express = require('express');
const apiLogger = require("../log/api_logger");

const app = express();
app.use(apiLogger);

function apiErrorHandler(err, req, res, next){
    console.log(err);
    if (err instanceof apiError){
        res.status(err.code);
        res.json(err.message);
        return;
    }
    if(err.statusCode == 404){
        res.status(404).send("<div style=text-align:center;font-size:1.3rem;><p style=font-size:1.9rem;><strong> 404 </strong> </p><p>We can't find the page: <em>" + req.headers.host + req.url + "</em></p> <p> Sorry for the inconvenience. <a href = http://" + req.headers.host + "> Go back to the home page </a></p></div>");
        return;
    }
    res.status(500);
    res.json("something went wrong");
}

module.exports = apiErrorHandler;

