var fs = require('fs');
const apiError = require("./api_error");

function api_static_error_handler (req, res, next) {
    if(['/images', '/packages', '/scripts', '/stylesheets'].includes(req.path)) {
        if (!fs.existsSync(path.join(__dirname, siteSettings.publicFolder, req.originalUrl))) {
            next();
        }
    }
    next();
}

module.exports = api_static_error_handler;
