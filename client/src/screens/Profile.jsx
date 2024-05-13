import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileButtons from "../components/profile/ProfileButtons";
import ProfileAbout from "../components/profile/ProfileAbout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Following from "../components/profile/Following";
import FollowedProducts from "../components/profile/FollowedProducts";
import MyFollowers from "./MyFollowers";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [menu, setMenu] = useState("About");
  const [followedProducts, setFollowedProducts] = useState([]);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);

  const fetchFollowing = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}user/following/${user._id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFollowing(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}user/followedProducts/${user._id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFollowedProducts(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/myproducts/${user._id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMyProducts(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchFollowers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}user/followers/${user._id}`,

          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setFollowers(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowing();
    fetchProducts();
    fetchFollowers();
    fetchMyProducts();
  }, []);
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
        height: "100vh",
        paddingInline: "20%",
        paddingTop: 15,
      }}
    >
      <Modal
        centered
        open={followersOpen}
        onOk={() => setFollowersOpen(false)}
        onCancel={() => setFollowersOpen(false)}
        footer={null}
      >
        <MyFollowers followers={followers} />
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar size={100} icon={<UserOutlined />} src={user.image} />
          <div style={{ marginInline: 50 }}>
            <Typography.Title>{user.name}</Typography.Title>
            <Typography.Title level={5}>{user.headline}</Typography.Title>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography.Text level={5}>#323223</Typography.Text>

              <Button
                onClick={() => {
                  setFollowersOpen(!followersOpen);
                }}
                type="link"
                size="small"
              >
                {user?.followers.length} followers
              </Button>
              {/* <Button type="link" size="small">
                0 following
              </Button> */}
            </div>
          </div>
        </div>
        <div>
          <Button
            type="default"
            size="large"
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      {/* Profile Buttons */}
      <ProfileButtons menu={menu} setMenu={setMenu} />
      {menu === "About" && <ProfileAbout about={user.about} />}
      {menu === "Followed Products" && (
        <FollowedProducts followedProducts={followedProducts} />
      )}
      {menu === "Following" && <Following following={following} />}
      {menu === "Products" && (
        <FollowedProducts followedProducts={myProducts} />
      )}
    </div>
  );
};

export default Profile;
