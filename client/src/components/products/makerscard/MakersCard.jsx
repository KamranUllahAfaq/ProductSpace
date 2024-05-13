import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MakersCard = ({ user }) => {
  const [user1, setUser1] = useState(user);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const signedInUser = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const followUser = () => {
    var user2 = { ...user1 };
    if (user2.followers.includes(user._id)) {
      var ind = user2.followers.indexOf(user._id);
      user.followers.splice(ind, 1);
    } else {
      user.followers.push(user._id);
    }
    setUser1(user2);
  };

  const followUserReq = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}user/follow/${user._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}user/${user._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser1(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [refresh]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        {user.image ? (
          <Avatar src={user.image} size={50} />
        ) : (
          <Avatar size={50} icon={<UserOutlined />} />
        )}

        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
        >
          <Typography.Text style={{ fontWeight: "bold" }}>
            {user1.name}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 14 }}>
            {user1.followers.length} followers
          </Typography.Text>
        </div>
      </div>
      <div>
        {signedInUser ? (
          <>
            <Button
              type={
                user1.followers.includes(signedInUser._id) ? "primary" : "text"
              }
              icon={
                user1.followers.includes(signedInUser._id) ? null : (
                  <PlusCircleOutlined />
                )
              }
              onClick={() => {
                if (isLoggedIn) {
                  followUser();
                  followUserReq();
                } else {
                  navigate("/login");
                }
              }}
            >
              {user1.followers.includes(signedInUser._id)
                ? "Followed"
                : "Follow"}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="text"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                toast.error("Sign IN First");
              }}
            >
              Follow
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MakersCard;
