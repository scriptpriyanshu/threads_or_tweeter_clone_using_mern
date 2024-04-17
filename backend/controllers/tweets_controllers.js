const Tweet = require("../models/tweet");

const CreateTweet = async (req, res) => {
  try {
    const { text, author } = req.body;

    const newTweet = await Tweet.create({ text, author });

    res.status(200).json({ msg: "Thread Posted", newTweet });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const GetTweet = async (req, res) => {
  try {
    const allTweets = await Tweet.find();

    res.status(200).json({ allTweets });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const LikeOrDislike = async (req, res) => {
  try {
    const userId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(userId)) {
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: userId } });
      return res.status(200).json({ msg: "User disliked your Tweet" });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: userId } });
      return res.status(200).json({ msg: "User liked your Tweet" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

module.exports = { CreateTweet, GetTweet, LikeOrDislike };
