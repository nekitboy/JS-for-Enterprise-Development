const express = require("express");
const app = express();
const https = require('https');
const axios = require('axios');


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get("/api/getUsername", (req, res) =>
    res.send({ username: 12345673453543453, userDefaultTown: 898 })
);


app.get("/api/events/*", (req, res) => {
    axios.get("https://kudago.com/public-api/v1.4/events/" + req.url.substring(12))
        .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log(error);
            });
});
app.listen(8090, () => console.log("Listening on port 8090!"));

module.exports = app;
