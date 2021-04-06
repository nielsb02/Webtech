var express = require("express");
var path = require("path");
const apiRouter = require("./routes/api_router");
const apiLogger = require("./log/api_logger");
const apiStaticErrorHandler = require("./error/api_static_error_handler");
const apiErrorHandler = require("./error/api_error_handler");

var staticPath = path.join(__dirname, "static");
const app = express();

app.use(apiLogger);
app.use(express.static(staticPath, {fallthrough: false}));
app.use(apiRouter);
app.use(apiStaticErrorHandler);
app.use(apiErrorHandler);

app.listen(8031, () => console.log("server Running on port 8031"));
