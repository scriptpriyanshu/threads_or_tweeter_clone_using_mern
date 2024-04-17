import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateTweet = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tweet, setTweet] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    userId: "",
  });

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

  const redirect = () => {
    if (!token) {
      navigate('/login')
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [tweet]);

  useEffect(() => {
    redirect();
  })

  const handleTweet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/tweets/createtweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ text: tweet, author: profile.userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setTweet("");
        toast.success(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTweetInput = (e) => {
    setTweet(e.target.value);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="w-full flex justify-center px-5 py-32 bg-gray-200 items-center">
        <div className="rounded-xl bg-white w-full md:w-2/3 lg:w-2/3 xl:w-2/4">
          <div className="px-5 py-3 flex items-center justify-between text-blue-400 border-b">
            <p className="inline hover:bg-blue-100 px-4 py-3 rounded-full font-bold cursor-pointer">
              Threads
            </p>
          </div>
          <form onSubmit={handleTweet}>
            <div className="flex p-4">
              <div className="ml-3 flex flex-col w-full">
                <textarea
                  placeholder="What's happening?"
                  name="Tweet"
                  value={tweet}
                  onChange={handleTweetInput}
                  className="w-full text-xl resize-none outline-none h-32"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between text-blue-600 py-6 px-4 border-t">
              <div></div>
              <div>
                <button className="float-right inline px-4 py-2 rounded-full font-bold text-white bg-blue-600 cursor-pointer">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTweet;
