var express = require("express");
var path = require("path");
var serveStatic = require('serve-static');
const apiRouter = require("./routes/api_router");
const apiLogger = require("./log/api_logger");
const apiErrorHandler = require("./error/api_error_handler");

var staticPath = path.join(__dirname, "static");
const app = express();

app.use(apiLogger);
app.use(apiRouter);
app.use(serveStatic(staticPath, {
    fallthrough: false,
    index: "index.html"}));
app.use(apiErrorHandler);

app.listen(8031, () => console.log("server Running on port 8031"));
