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

function sendToDB(url, data, callback){  //AJAX function
    var req = new XMLHttpRequest();
    
    req.open("POST", url);
    req.setRequestHeader('Content-Type', 'application/json');

    let storeData = JSON.stringify(data);
    req.send(storeData);
}