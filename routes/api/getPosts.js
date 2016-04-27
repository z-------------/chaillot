var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

/* GET posts. */
router.get("/", function(req, res, next) {
    var mongoURL = "mongodb://localhost:27017/chaillot";

    MongoClient.connect(mongoURL, function(err, db) {
        if (!err) {
            db.collection("posts").find({}, { _id: 0 }).toArray(function(err, docs) {
                if (!err) {
                    res.send(docs);
                } else {
                    res.sendStatus(500);
                }
                db.close();
            });
        } else {
            res.sendStatus(500);
            if (db) {
                db.close();
            }
        }
    });
});

module.exports = router;
