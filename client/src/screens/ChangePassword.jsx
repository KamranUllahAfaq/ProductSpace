import React, { useState } from "react";
import { Input, Typography, Button, Avatar, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";
import InvalidData from "../components/signup/InvalidData";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [newVisible, setNewVisible] = React.useState(false);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
    isPasswordValid: true,
    isNewPasswordValid: true,
  });
  const handleChangePassword = async () => {
    if (
      data.isPasswordValid &&
      data.password &&
      data.newPassword &&
      data.isNewPasswordValid &&
      data.newPassword === data.newConfirmPassword
    ) {
      setLoading(true);
      var obj = {
        currentPassword: data.password,
        newPassword: data.newPassword,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .put(`${REST_API_ENDPOINT}auth/changePassword`, obj, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
            toast.success("Password Updated Successfully");
            navigate(-1);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Invalid Details");
      }
    } else {
      toast.error("Please Provide All Details");
    }
  };
  const passwordChange = (event) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (reg.test(String(event.target.value))) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isPasswordValid: true,
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isPasswordValid: false,
      });
    }
    if (event.target.value === "") {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isPasswordValid: true,
      });
    }
  };
  const newPasswordChange = (event) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (reg.test(String(event.target.value))) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isNewPasswordValid: true,
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isNewPasswordValid: false,
      });
    }
    if (event.target.value === "") {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        isNewPasswordValid: true,
      });
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div
      style={{
        paddingInline: "10%",
        marginTop: 10,
        width: "50%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={3}>Change Password</Typography.Title>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Password
        </Typography.Text>
        <Input.Password
          size="large"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          type="password"
          placeholder="Your Password"
          value={data.password}
          name="password"
          onChange={passwordChange}
        />
      </div>
      {data.isPasswordValid ? null : <InvalidData state="Password" />}

      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>
          New Password
        </Typography.Text>
        <Input.Password
          size="large"
          visibilityToggle={{
            visible: newVisible,
            onVisibleChange: setNewVisible,
          }}
          type="password"
          placeholder="New Password"
          value={data.newPassword}
          name="newPassword"
          onChange={newPasswordChange}
        />
      </div>
      {data.isNewPasswordValid ? null : <InvalidData state="Password" />}

      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Confirm Password
        </Typography.Text>
        <Input.Password
          size="large"
          type="password"
          visibilityToggle={{
            visible: confirmVisible,
            onVisibleChange: setConfirmVisible,
          }}
          placeholder="Confirm Password"
          value={data.newConfirmPassword}
          name="newConfirmPassword"
          onChange={handleChange}
        />
      </div>
      {data.newConfirmPassword === data.newPassword ? null : (
        <InvalidData state="Confirm Password" />
      )}
      <div style={{ marginTop: 30 }}>
        <Button size="large" type="primary" onClick={handleChangePassword}>
          Update Password
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
