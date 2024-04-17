import React from "react";
import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";

const Home = () => {
  return (
    <div className="bg-gray-200">
      <CreateTweet />
      <Tweet/>
    </div>
  );
};

export default Home;
