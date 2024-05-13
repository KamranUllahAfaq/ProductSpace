import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Input, Button, Divider, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./topics.css";
import Loader from "../../components/loader/Loader";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const filterTopics = (value) => {
    setSearch(value);

    setFilteredTopics(
      topics.filter((topic) => {
        return topic.name.includes(value);
      })
    );
    if (value === "") {
      setFilteredTopics(topics);
    }
  };

  const fetchAllTopics = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}topic`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTopics(res.data);
          setFilteredTopics(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);
  return (
    <div style={{ paddingInline: "10%" }}>
      <Row>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 24,
          }}
          md={{
            span: 16,
          }}
          lg={{
            span: 14,
          }}
        >
          <div style={{ paddingTop: 20 }}>
            <Typography.Title level={2}>Topics</Typography.Title>
            <Typography.Text style={{ fontSize: 24 }}>
              Follow your favorite topics to be notified of the newest products
              in that space.
            </Typography.Text>
          </div>
          <div style={{ marginTop: 15 }}>
            {" "}
            <Input
              placeholder="Search Topics..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                filterTopics(event.target.value);
              }}
            />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div style={{ marginTop: 20 }}>
              {filteredTopics.map((topic) => (
                <>
                  <div
                    className="TopicCard"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                    onClick={() => {
                      navigate(`/products/${topic.name}`, {
                        state: { topic: topic.name, desc: topic.description },
                      });
                    }}
                  >
                    <div
                      className="leftDiv"
                      style={{
                        display: "flex",
                        flexDirection: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="thumbnail">
                        <img
                          src={
                            "https://w7.pngwing.com/pngs/871/53/png-transparent-purple-square-pattern-vector-diagonal-background-repeating-template-decorative-shape-thumbnail.png"
                          }
                          alt="thummb"
                          width={76}
                        />
                      </div>
                      <div
                        className="topicDetails"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 5,
                        }}
                      >
                        <Typography.Text strong style={{ fontSize: 18 }}>
                          {topic.name}
                        </Typography.Text>
                        <Typography.Text>{topic.description}</Typography.Text>
                      </div>
                    </div>
                    <div className="rightDiv">
                      <Button
                        size="large"
                        style={{ marginLeft: 10 }}
                        onClick={() => {}}
                      >
                        View Products
                      </Button>
                    </div>
                  </div>
                  <Divider />
                </>
              ))}
            </div>
          )}
        </Col>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 24,
          }}
          md={{
            span: 8,
          }}
          lg={{
            span: 10,
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default Topics;
