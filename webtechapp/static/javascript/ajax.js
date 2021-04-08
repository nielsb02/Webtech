function getFromDB(url, callback){  //AJAX function
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var obj = JSON.parse(req.responseText);
            callback(obj);
        }
    }
    req.send();
}