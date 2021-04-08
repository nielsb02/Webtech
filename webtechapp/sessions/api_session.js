var express = require("express");
const app = express();

var session = require('express-session');
var FileStore = require('session-file-store')(session);