import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Modal,
  Carousel,
  Button,
  Typography,
  Radio,
  Tabs,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  RightOutlined,
  SearchOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { colors } from "../../../theme/Colors";
import { topics } from "./topicsData";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const DiscussionsPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
    title: "",
    description: "",
    options: ["", ""],
    topic: "",
  });
  const [type, setType] = useState("discussion");

  const addOption = () => {
    setValues({ ...values, options: [...values.options, ""] });
  };
  const deleteOption = (index) => {
    var temp = values.options;
    temp.splice(index, 1);
    setValues({ ...values, options: temp });
  };
  const changeOption = (index, value) => {
    var temp = [...values.options];
    temp[index] = value;
    setValues({
      ...values,
      options: temp,
    });
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleTopicChange = (value) => {
    setValues({ ...values, topic: value });
  };
  const postDiscussion = async () => {
    if (values.title) {
      if (type === "poll" && (!values.options[0] || !values.options[1])) {
        toast.error("Please Specify Option for Poll");
      } else {
        try {
          var body = {
            title: values.title,
            user: user._id,
            description: values.description,
            options: values.options,
            topic: values.topic,
            type: type,
          };
          const token = JSON.parse(localStorage.getItem("token"));
          await axios
            .post(`${REST_API_ENDPOINT}discussion`, body, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              toast.success("Discussion Added Successfully");
              navigate(-1);
            });
        } catch (error) {
          toast.error("Error Occurred");
        }
      }
    } else {
      toast.error("Please Enter Title for your discussion");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: colors.lightgrey,
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          width: 600,
          marginTop: 40,
          height: "fit-content",
          paddingInline: 50,
          paddingTop: 20,
          paddingBottom: 20,
          borderRadius: 10,
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <div style={{ justifyContent: "flex-start" }}>
          <Typography.Title level={3}>New Discussion</Typography.Title>
          <Radio.Group
            style={{ marginTop: 20 }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <Radio.Button value="discussion">Discussion</Radio.Button>
            <Radio.Button value="poll">Poll</Radio.Button>
          </Radio.Group>
          <Input.TextArea
            placeholder="ex Ah ha Moment as a founder?"
            style={{ marginTop: 50, border: "none", fontSize: 20 }}
            rows={2}
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <Input.TextArea
            placeholder="Text (Optional)"
            style={{ marginTop: 20, border: "none" }}
            rows={5}
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <div style={{ marginTop: 20 }}>
            {type === "poll" && (
              <>
                <Typography style={{ fontSize: 16 }}>Options:</Typography>
                {values.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Input
                      value={option}
                      placeholder={`Option ${index + 1}`}
                      onChange={(event) => {
                        changeOption(index, event.target.value);
                      }}
                    ></Input>
                    {values.options.length > 2 && (
                      <Button
                        type="primary"
                        style={{ marginLeft: 10 }}
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          deleteOption(index);
                        }}
                      ></Button>
                    )}
                  </div>
                ))}
                <Button style={{ marginTop: 10 }} onClick={addOption}>
                  Add Option
                </Button>
              </>
            )}
            <div
              style={{
                marginTop: 30,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Select
                placeholder="Select Topic (Optional)"
                name="topic"
                style={{
                  width: 220,
                }}
                onChange={handleTopicChange}
                options={topics}
                size="large"
              />
              <Button size="large" type="primary" onClick={postDiscussion}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiscussionsPage;
