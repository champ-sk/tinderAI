import React from "react";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;

    const res = await axios.get(BASE_URL + "/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res?.data?.data));
  };
  useEffect(() => {
    getFeed();
  }, []);

   if (!feedData) return;

  if (feedData.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
 
  return (feedData &&(<div className="flex justify-center my-10"  >
    <UserCard user={feedData[0]}/>
    </div>));
};

export default Feed;
