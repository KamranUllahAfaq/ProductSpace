import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Avatar,
  Button,
  Typography,
  Radio,
  Row,
  Col,
  Divider,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchOutlined, CaretUpOutlined } from "@ant-design/icons";
import moment from "moment";
import Loader from "../../../components/loader/Loader";
import { topics } from "../AddDiscussions/topicsData";
import DiscussionDetails from "../DiscussionDetails/DiscussionDetails";
import { useSelector } from "react-redux";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const DiscussionsPage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [topic, setTopic] = useState("All");
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllDiscussions = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.get(`${REST_API_ENDPOINT}discussion`).then((res) => {
        console.log(res.data);
        setDiscussions(res.data);
        setFilteredDiscussions(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const filterDiscussions = (value) => {
    setSearch(value);
    setFilteredDiscussions(
      discussions.filter((discussion) => {
        return discussion.title.includes(value);
      })
    );
    if (value === "") {
      setFilteredDiscussions(discussions);
    }
  };
  const filterDiscussionsByTopics = (value) => {
    setTopic(value);
    setFilteredDiscussions(
      discussions.filter((discussion) => {
        return discussion.topic === value;
      })
    );
    if (value === "All") {
      setFilteredDiscussions(discussions);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAllDiscussions();

    setLoading(false);
  }, []);

  return (
    <div style={{ paddingInline: "10%" }}>
      <div style={{ marginTop: 100 }}>
        <Typography.Title level={1}>Discussions</Typography.Title>
        <Typography.Title level={4}>
          Ask Questions, find support and connect with the community
        </Typography.Title>
        <Button
          type="primary"
          style={{
            marginTop: 20,
            width: 200,
            height: 50,
            fontWeight: "bold",
            fontSize: 16,
          }}
          onClick={() => navigate("/community/discussions/new")}
        >
          New Discussion
        </Button>
      </div>
      <div>
        <Row style={{ marginTop: 50 }}>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Input
                placeholder="Search Discussions"
                style={{ width: 300 }}
                prefix={<SearchOutlined />}
                size="large"
                value={search}
                onChange={(event) => filterDiscussions(event.target.value)}
              />
            </div>
            <div style={{ marginTop: 50 }}>
              {loading ? (
                <Loader />
              ) : (
                <DiscussionBox
                  discussions={discussions}
                  filteredDiscussions={filteredDiscussions}
                />
              )}
            </div>
          </Col>
          <Col xs={{ span: 1 }} lg={{ span: 1 }}>
            <Divider type="vertical" style={{ height: "100vh", width: 1 }} />
          </Col>{" "}
          <Col xs={{ span: 23 }} lg={{ span: 8 }}>
            <Typography.Text>Topics</Typography.Text>

            {topics.map((topic, index) => (
              <div>
                <Button
                  type="link"
                  style={{ color: "green" }}
                  onClick={() => {
                    filterDiscussionsByTopics(topic.value);
                  }}
                >
                  {topic.label}
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};
const DiscussionBox = ({ type, discussions, filteredDiscussions }) => {
  return (
    <div>
      {filteredDiscussions.length < 1 && (
        <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
          No Discussions Added Yet
        </Typography>
      )}
      {filteredDiscussions.map((discussion, index) => (
        <Discussion discussion={discussion} key={index} />
      ))}
    </div>
  );
};
const Discussion = ({ discussion }) => {
  const [discussion1, setdiscussion1] = useState(discussion);
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const user = useSelector((state) => state.user);

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
          console.log("Discussion Liked");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Modal
        centered
        open={detailsOpen}
        onOk={() => setDetailsOpen(false)}
        onCancel={() => setDetailsOpen(false)}
        destroyOnClose
        footer={null}
        width={1000}
      >
        <DiscussionDetails
          discussion={discussion1}
          setDetailsOpen={setDetailsOpen}
        />
      </Modal>
      <Avatar src={discussion1.createdBy.image} size={46} />
      <div style={{ marginLeft: 25 }}>
        <Button
          type={
            discussion1?.upvotes.includes(user?._id) ? "primary" : "default"
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
              color: discussion1?.upvotes.includes(user?._id)
                ? "white"
                : "black",
            }}
          >
            {discussion1?.upvotes.length}
          </Typography.Text>
        </Button>
      </div>
      <div
        style={{
          marginLeft: 25,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/discussion/details/${discussion1._id}`, {
            state: discussion1,
          });
        }}
      >
        <Typography.Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
  );
};
export default DiscussionsPage;
