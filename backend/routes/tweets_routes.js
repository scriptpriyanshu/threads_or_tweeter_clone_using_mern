const tweetsController = require("../controllers/tweets_controllers");
const express = require("express");
const authenticateUser = require("../middlewares/authentication");
const trouter = express.Router();

trouter.route("/createtweet").post(authenticateUser ,tweetsController.CreateTweet);
trouter.route("/gettweet").get(tweetsController.GetTweet);
trouter.route("/like/:id").put(authenticateUser, tweetsController.LikeOrDislike);

module.exports = trouter;
