const fs = require('fs');

function apiLogger(req, res, next) {
    let date = new Date();
    let formatted_date = date.getFullYear() + "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = formatted_date + url.toString() + status.toString();
  fs.appendFile("webtechapp/log/request_logs.txt", log + "\n", err => { 
    if (err) {
      console.log(err);
    }
  });
  console.log(log);

  next();
}

module.exports = apiLogger;
