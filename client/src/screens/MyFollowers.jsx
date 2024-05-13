import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProfileButtons from "../components/profile/ProfileButtons";
import ProfileAbout from "../components/profile/ProfileAbout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Following from "../components/profile/Following";

const MyFollowers = ({ followers }) => {
  return (
    <div>
      {followers?.length < 1 && (
        <Typography
          style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
        >
          No Followers
        </Typography>
      )}
      <div>
        <Following following={followers} />
      </div>
    </div>
  );
};

export default MyFollowers;
