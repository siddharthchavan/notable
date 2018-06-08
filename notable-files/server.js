var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require("body-parser");
var db = require("./config/db");

var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require("./app/routes")(app, database);
  app.listen(port, () => {
    console.log("Server hosted on port " + port);
  })
})
