var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var http = require("http");

var routes = [{
    path: "/", router: "index"
}, {
    path: "/api/post", router: "api/post"
}, {
    path: "/api/get_posts", router: "api/getPosts"
}];

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "source/jade"));
app.set("view engine", "jade");

// app.use(favicon(path.join(__dirname, "/public/assets/img/icon16.png")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

for (routeDef of routes) {
    app.use(routeDef.path, require("./routes/" + routeDef.router));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("status", {
        status: err.status,
        message: err.message,
        error: {}
    });
});

module.exports = app;
