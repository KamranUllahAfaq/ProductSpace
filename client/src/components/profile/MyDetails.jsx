import React, { useState } from "react";
import {
  Input,
  Typography,
  Button,
  Avatar,
  Radio,
  Row,
  Col,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProfileImage from "./ProfileImage";
import axios from "axios";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: user.name,
    headline: user.headline,
    phone: user.phone,
    job: user.job,
    company: user.company,
    about: user.about,
    gender: user.gender,
  });
  const handleProfileEdit = async () => {
    if (data.name && data.headline) {
      setLoading(true);
      var obj = {
        name: data.name,
        headline: data.headline,
        company: data.company,
        job: data.job,
        about: data.about,
        gender: data.gender,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .put(`${REST_API_ENDPOINT}user/update`, obj, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
            dispatch(authActions.updateUser({ user: res.data }));
            window.location.reload(false);
            toast.success("Profile Updated Successfully");
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Error Occured");
      }
    } else {
      toast.error("Please Specify Profile Details Correctly");
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div style={{ paddingInline: "10%", marginTop: 10, height: "100vh" }}>
      <Row justify="space-between" align="top">
        <Col
          md={{
            span: 24,
          }}
          lg={{
            span: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Title level={3}>My Details</Typography.Title>
            <Button
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Details
            </Button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Name
            </Typography.Text>
            <Input
              size="large"
              placeholder="Your Name"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Gender
            </Typography.Text>
            <Radio.Group
              name="gender"
              onChange={handleChange}
              value={data.gender}
            >
              <Space direction="vertical">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Space>
            </Radio.Group>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Headline
            </Typography.Text>
            <Input
              size="large"
              placeholder="Headline"
              value={data.headline}
              name="headline"
              onChange={handleChange}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Job Title
            </Typography.Text>
            <Input
              size="large"
              style={{ width: "70%" }}
              value={data.job}
              placeholder="Your Job Title"
              name="job"
              onChange={handleChange}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              Current Company
            </Typography.Text>
            <Input
              size="large"
              style={{ width: "70%" }}
              placeholder="Current Company"
              value={data.company}
              name="company"
              onChange={handleChange}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography.Text style={{ fontWeight: "bold" }}>
              About
            </Typography.Text>
            <Input.TextArea
              size="large"
              rows={5}
              placeholder="Tell the community about yourself, your goals, and your ambitions"
              value={data.about}
              name="about"
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col
          md={{
            span: 24,
          }}
          lg={{
            span: 7,
            offset: 1,
          }}
          style={{ marginTop: 20 }}
        >
          <ProfileImage />
        </Col>
      </Row>
      <div style={{ marginTop: 30 }}>
        <Button size="large" type="primary" onClick={handleProfileEdit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default MyDetails;
