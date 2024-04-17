const { model, Schema } = require("mongoose");

const tweetSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Tweet = model("Tweet", tweetSchema);

module.exports = Tweet;
