import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Radio,
  Divider,
  Row,
  Col,
  Input,
  Avatar,
  Space,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import CommentBox from "../../../components/comments/CommentBox";
import { CaretUpOutlined } from "@ant-design/icons";
import moment from "moment";
import ProfileCard from "../../../components/profileCard/ProfileCard";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const DiscussionDetails = ({ discussion, setDetailsOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);
  const [discussion1, setdiscussion1] = useState(discussion);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const likediscussion = () => {
    var discussion2 = { ...discussion1 };
    if (discussion2.upvotes.includes(user._id)) {
      var ind = discussion2.upvotes.indexOf(user._id);
      discussion2.upvotes.splice(ind, 1);
    } else {
      discussion2.upvotes.push(user._id);
    }
    setdiscussion1(discussion2);
  };

  const likediscussionReq = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .put(
          `${REST_API_ENDPOINT}discussion/upvote/${discussion1._id}`,
          { userId: user._id },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const getdiscussion = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}discussion/${discussion1._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setdiscussion1(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const fetchAllComments = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}discussion/comments/${discussion1._id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setComments(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const postComment = async (comment1, commentId) => {
    if (comment1) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        var body;
        if (commentId) body = { text: comment1, parentComment: commentId };
        else body = { text: comment1 };
        await axios
          .post(
            `${REST_API_ENDPOINT}discussion/comments/${discussion1._id}`,
            body,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            toast.success("Comment Submitted Successfully");
            setComment("");
            setRefresh(!refresh);
          });
      } catch (error) {
        toast.error("Error Occured");

        console.log(error.message);
      }
    } else {
      toast.error("Write Comment First! ");
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  useEffect(() => {
    getdiscussion();
    fetchAllComments();
  }, [refresh]);

  return (
    <div style={{ padding: "8%" }}>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                type={
                  discussion1.upvotes.includes(user._id) ? "primary" : "default"
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 60,
                }}
                onClick={() => {
                  likediscussion();
                  likediscussionReq();
                }}
              >
                <CaretUpOutlined style={{ fontSize: 14 }} />
                <Typography.Text
                  style={{
                    padding: 0,
                    margin: 0,
                    color: discussion1.upvotes.includes(user._id)
                      ? "white"
                      : "black",
                  }}
                >
                  {discussion1?.upvotes.length}
                </Typography.Text>
              </Button>
              <div style={{ marginLeft: 25 }}>
                <Typography.Text style={{ fontSize: 28, fontWeight: "bold" }}>
                  {discussion1.title}
                </Typography.Text>

                <div>
                  <Typography.Text style={{ marginLeft: 2 }}>
                    {discussion1.createdBy.name} in {discussion1.topic}
                  </Typography.Text>
                  {/* <Typography.Text style={{ marginLeft: 15 }}>
            16 replies
          </Typography.Text> */}
                  <Typography.Text style={{ marginLeft: 15 }}>
                    {moment(discussion1.createdOn).format("MMM Do YYYY")}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 50 }}>
              <Typography.Text style={{ fontSize: 20, marginTop: 30 }}>
                {discussion1?.description}
              </Typography.Text>
              <div style={{ marginTop: 30 }}>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    {discussion1.type === "poll" && (
                      <>
                        {discussion1?.options.map((option, index) => (
                          <Radio value={option} size="large" key={index}>
                            {option}
                          </Radio>
                        ))}
                      </>
                    )}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>
          <Divider />
          <Input
            size="large"
            placeholder="Enter Your Comment"
            prefix={<Avatar src={user.image} />}
            enterButton="Comment"
            style={{ marginTop: 20, padding: 20 }}
            suffix={
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  postComment(comment, "");
                }}
              >
                Comment
              </Button>
            }
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <Typography
            style={{ fontSize: 20, fontWeight: "bold", marginTop: 40 }}
          >
            Replies
          </Typography>
          <div style={{ marginTop: 20 }}>
            <CommentBox
              comments={comments}
              refresh={refresh}
              setRefresh={setRefresh}
              postComment={postComment}
            />
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
          <ProfileCard user={discussion1.createdBy} />
        </Col>
      </Row>
    </div>
  );
};

export default DiscussionDetails;
