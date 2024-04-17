import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Tweet = () => {
  const token = localStorage.getItem("token");

  const [tweets, setTweets] = useState([]);
  const [expandedTweetIds, setExpandedTweetIds] = useState(new Set());

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    userId: "",
  });

  const fetchTweets = async () => {
    try {
      const response = await fetch("http://localhost:2000/tweets/gettweet", {
        method: "GET",
      });
      const data = await response.json();
      setTweets(data.allTweets);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:2000/profile", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile({
          username: data.username,
          email: data.email,
          userId: data._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTweets();
    fetchProfile();
  }, [tweets]);

  const handleReadMoreClick = (index) => {
    setExpandedTweetIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.add(index);
      return newIds;
    });
  };

  const renderTweetText = (text, index) => {
    const words = text.split(" ");
    if (words.length > 40 && !expandedTweetIds.has(index)) {
      const displayedText = words.slice(0, 40).join(" ") + "...";
      return (
        <>
          {displayedText}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleReadMoreClick(index)}
          >
            Read More
          </button>
        </>
      );
    }
    return text;
  };

  const handleLike = async (tweetId) => {
    try {
      const response = await fetch(
        `http://localhost:2000/tweets/like/${tweetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            id: profile.userId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-200 pb-20 flex-col justify-center px-5 w-full items-center gap-20">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className=" bg-white shadow-lg max-w-2xl w-full sm:w-2/4 md:w-2/3 lg:w-2/3 xl:w-2/3 rounded-2xl border px-6 py-4"
        >
          <div className="flex items-center">
            <div className="flex flex-col ml-4">
              <a className="font-bold text-black" href="#">
                Walter Bishop
              </a>
              <span className="text-grey">@walterb</span>
            </div>
          </div>
          <div className="mt-3 py-2 mb-1 overflow-hidden leading-normal text-lg">
            {renderTweetText(tweet.text, index)}
          </div>
          <div className="flex text-grey">
            <div className="flex items-center">
              <button
                onClick={() => {
                  handleLike(tweet._id);
                }}
                className="flex items-center"
              >
                <div className="hover:bg-blue-300 mr-2 rounded-full cursor-pointer">
                  {tweet.like.length > 0 ? (
                    <FaHeart className="text-blue-600 w-10 h-10 p-2" />
                  ) : (
                    <FaRegHeart className="text-blue-600 w-10 h-10 p-2" />
                  )}
                </div>
                <span>{tweet.like.length}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweet;
