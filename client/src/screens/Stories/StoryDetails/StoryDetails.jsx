import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Divider, Typography } from "antd";
import parse from "html-react-parser";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const StoryDetails = () => {
  const params = useParams();
  const [story, setStory] = useState();
  const fetchStory = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}stories/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStory(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    fetchStory();
  }, []);
  return (
    <div style={{ marginInline: "12%", marginBlock: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%" }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 35,
            }}
          >
            {story?.description}
          </Typography>
          <div style={{ display: "flex", marginTop: 30 }}>
            <div style={{ alignItems: "center", justifyContent: "center" }}>
              <Typography>Published On</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {moment(story?.createdOn).format("MMM Do YYYY")}
              </Typography>
            </div>
            <div
              style={{
                marginLeft: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Author</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {story?.createdBy?.name}
              </Typography>
            </div>
            <div
              style={{
                marginLeft: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Category</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                {story?.type}
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img src={story?.thumbnail} alt="thumb" width={300} height="auto" />
        </div>
      </div>
      <Divider />
      <div style={{ margin: "4%" }}>
        <Typography style={{ fontSize: 24, fontWeight: "bold" }}>
          Story:
        </Typography>
        {story?.content ? parse(story?.content) : null}
      </div>
    </div>
  );
};

export default StoryDetails;
