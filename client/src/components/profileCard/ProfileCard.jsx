import React from "react";
import { Typography, Avatar, Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: 20,
        border: "0.5px solid gray",
        borderRadius: 10,
      }}
    >
      <div>
        <Typography.Text
          textAlign="center"
          style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
        >
          About Maker
        </Typography.Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Avatar size={70} src={user?.image}></Avatar>
        <Typography.Text style={{ fontSize: 18, marginLeft: 20 }}>
          {user?.name}
        </Typography.Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 16, marginLeft: 20 }}>
          Joined: {moment(user?.dateJoined).format("MMM Do YYYY")}
        </Typography.Text>
      </div>
      <div>
        <Button
          onClick={() => navigate(`/profile/${user?._id}`)}
          type="default"
          style={{ width: "90%", margin: 20 }}
        >
          Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
