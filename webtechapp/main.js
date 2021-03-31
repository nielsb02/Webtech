var express = require('express');
var path = require("path");
const apiRouter = require("./routes/api_router");
const apiErrorHandler = require("./error/api_error_handler");
const { nextTick } = require('process');

var staticPath = path.join(__dirname, "static");
const app = express();

try{
    app.use(express.static(staticPath));
}
catch
{
    
}
app.use(apiRouter);


app.use(apiErrorHandler);
app.listen(8031, () => console.log("server Running on port 8031"));
