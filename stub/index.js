const express = require("express");
const app = express();
const https = require('https');
const axios = require('axios');
const fs = require('fs');


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get("/api/getUsername", (req, res) =>
    res.send({ username: 12345673453543453, userDefaultTown: 898 })
);


app.get("/mock/api/events/*", (req, res) => {

});

function mockEvents(res) {
    fs.readFile("stub/mock/events.json", 'utf8', (err, data) => {
        if (err)
            console.log(err)
       res.send(JSON.stringify(JSON.parse(data)));
    });
}

function mockEvent(res) {
    fs.readFile("stub/mock/event.json", 'utf8', (err, data) => {
        if (err)
            console.log(err)
        res.send(JSON.stringify(JSON.parse(data)));
    });
}

app.get("/api/events/*", (req, res) => {

    if(process.env.API === 'MOCK') {
        if (req.url.substring(12).length>0 && req.url.substring(12)[0] ==='?'){
            mockEvents(res);
        }
        else {
            mockEvent(res);
        }
    }
    else {
        axios.get("https://kudago.com/public-api/v1.4/events/" + req.url.substring(12))
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
});
app.listen(8090, () => console.log("Listening on port 8090!"));

module.exports = app;
