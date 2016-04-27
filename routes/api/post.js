var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var zpad = require("zpad");

/* POST a post. */
router.post("/", function(req, res, next) {
    var postContent = req.body.content;
    var postID = new Date().getTime().toString() + zpad(Math.round(Math.random() * 999999), 6);
    var authorID = 3435;
    var postType = "text";

    var mongoURL = "mongodb://localhost:27017/chaillot";

    if (postContent && postID && authorID && postType) {
        MongoClient.connect(mongoURL, function(err, db) {
            if (!err) {
                db.collection("posts").insert({
                    id: postID,
                    author: authorID,
                    type: postType,
                    content: postContent
                }, function(err, result) {
                    if (!err) {
                        res.sendStatus(201);
                        db.close();
                    }
                });
            } else {
                res.sendStatus(500);
                if (db) {
                    db.close();
                }
            }
        });
    }
});

module.exports = router;
