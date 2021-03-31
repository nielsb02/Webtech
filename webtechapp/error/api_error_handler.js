const apiError = require("./api_error");

function apiErrorHandler(err, req, res, next){
    console.log(err); // own logging 

    // if it is in the error class 
    if (err instanceof apiError){
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json("something went wrong");
}

module.exports = apiErrorHandler;
