import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import axios from "axios";
import MyFollowers from "./MyFollowers";
import ProfileButtons from "../components/profile/ProfileButtons";
import ProfileAbout from "../components/profile/ProfileAbout";
import FollowedProducts from "../components/profile/FollowedProducts";
import Following from "../components/profile/Following";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const UserProfile = () => {
  const params = useParams();
  const loggedUser = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(true);
  const [following, setFollowing] = useState([]);
  const [menu, setMenu] = useState("About");
  const [followedProducts, setFollowedProducts] = useState([]);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [userId, setUserId] = useState();

  const followUser = () => {
    var user2 = { ...user };
    if (user2.followers.includes(user._id)) {
      var ind = user2.followers.indexOf(user._id);
      user.followers.splice(ind, 1);
    } else {
      user.followers.push(user._id);
    }
    setUser(user2);
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
  const fetchUser = async () => {
    try {
      await axios
        .get(`${REST_API_ENDPOINT}user/${params.id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          setUser(res.data);
          setUserId(res.data._id);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

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
        .get(`${REST_API_ENDPOINT}product/myproducts/${userId}`, {
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
    fetchUser();
  }, [refresh]);
  useEffect(() => {
    if (userId) {
      fetchFollowing();
      fetchProducts();
      fetchFollowers();
      fetchMyProducts();
    }
  }, [userId]);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
        height: "100vh",
        paddingInline: "30%",
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
          {user?.image ? (
            <Avatar src={user.image} size={100} />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} />
          )}{" "}
          <div style={{ marginInline: 50 }}>
            <Typography.Title>{user?.name}</Typography.Title>
            <Typography.Title level={5}>{user?.headline}</Typography.Title>

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
            </div>
          </div>
        </div>
        <div>
          <Button
            type={
              user?.followers.includes(loggedUser?._id) ? "primary" : "text"
            }
            icon={
              user?.followers.includes(loggedUser?._id) ? null : (
                <PlusCircleOutlined />
              )
            }
            size="large"
            onClick={() => {
              followUser();
              followUserReq();
            }}
          >
            {user?.followers.includes(loggedUser?._id) ? "Unfollow" : "Follow"}{" "}
          </Button>
        </div>
      </div>

      <ProfileButtons menu={menu} setMenu={setMenu} />
      {menu === "About" && <ProfileAbout about={user?.about} />}
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

export default UserProfile;
