const apiError = require("./api_error");
var express = require('express');
const apiLogger = require("../log/api_logger");

const app = express();
app.use(apiLogger);

function apiErrorHandler(err, req, res, next){
    if (err instanceof apiError){
        res.statusCode = err.code;
        res.json(err.message);
        return;
    }
    res.status(500);
    res.json("something went wrong");
}

module.exports = apiErrorHandler;

