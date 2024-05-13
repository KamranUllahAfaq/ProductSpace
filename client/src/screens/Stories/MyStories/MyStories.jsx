import React, { useState, useEffect } from "react";
import { Typography, Button, Divider, Modal, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const { confirm } = Modal;
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MyStories = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyStories = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      await axios
        .get(`${REST_API_ENDPOINT}stories/mystories/${user._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStories(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMyStories();
    setLoading(false);
  }, [refresh]);

  return (
    <div style={{ marginInline: "12%", marginBlock: 40 }}>
      <Typography style={{ fontSize: 30, fontWeight: "bold" }}>
        My Stories
      </Typography>
      <div style={{ marginTop: 30 }}>
        {stories.length < 1 && (
          <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
            No Stories Found
          </Typography>
        )}
        {loading ? (
          <Spin />
        ) : (
          <>
            {stories.map((story, index) => (
              <MyStoryCard
                story={story}
                key={index}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyStories;

const MyStoryCard = ({ story, refresh, setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .delete(`${REST_API_ENDPOINT}stories/${story._id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Story Deleted Successfully");
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occurred");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this story?",
      icon: <ExclamationCircleFilled />,
      content: "Confirm",
      okText: "Confirm Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <div
        className="mainDiv"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="leftDiv"
          style={{
            display: "flex",
            flexDirection: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="thumbnail"
            onClick={() => {
              navigate(`/story/details/${story?._id}`);
            }}
          >
            <img src={story?.thumbnail} alt="thummb" width={100} />
          </div>
          <div
            className="productDetails"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 15,
            }}
          >
            <Typography.Text strong style={{ fontSize: 18 }}>
              {story.description}
            </Typography.Text>
            <Typography.Text>
              Created On: {moment(story.createdOn).format("MMM Do YYYY")}
            </Typography.Text>
          </div>
        </div>
        <div className="rightDiv">
          <Button
            size="large"
            onClick={showDeleteConfirm}
            style={{ marginInline: 10 }}
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};
