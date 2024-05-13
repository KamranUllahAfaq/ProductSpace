import { Button, Divider, Segmented, Typography, Input, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { storyData } from "../data/storyData";
import moment from "moment";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const StoriesScreen = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("All Stories");
  const [description, setDescription] = useState("");

  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [search, setSearch] = useState();

  const fethcAllStories = async () => {
    try {
      await axios.get(`${REST_API_ENDPOINT}stories`).then((res) => {
        console.log(res.data);
        setStories(res.data);
        setFilteredStories(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterType = () => {
    setFilteredStories(
      stories.filter((story) => {
        return story.type === type;
      })
    );
    setDescription(
      storyData.map((item) => {
        if (item.type === type) return item.description;
      })
    );
    if (type === "All Stories") {
      setFilteredStories(stories);
      setDescription("");
    }
  };
  const filterStories = (value) => {
    setSearch(value);

    setFilteredStories(
      stories.filter((story) => {
        return story.description.includes(value);
      })
    );
    if (value === "") {
      setFilteredStories(stories);
    }
  };
  useEffect(() => {
    fethcAllStories();
  }, []);

  useEffect(() => {
    filterType();
  }, [type]);
  return (
    <div style={{ marginInline: "7%", marginTop: 20 }}>
      <div
        style={{
          height: 100,
          background:
            "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
          marginBlock: 40,
          padding: 50,
          paddingBlock: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={{ width: "50%", fontSize: 26 }}>
          💌 Join 500K+ subscribers who get the best of tech every day right to
          their inbox
        </Typography>
        <div>
          <Button type="primary" onClick={() => navigate("/stories/mystories")}>
            My Stories
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            onClick={() => navigate("/stories/new")}
          >
            Add Story
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Segmented
          type="primary"
          size="large"
          options={[
            "All Stories",
            "Makers",
            "Opinions",
            "News",
            "Announcements",
            "How To",
            "Interviews",
          ]}
          value={type}
          onChange={setType}
        />
        {type === "All Stories" && (
          <Input
            size="large"
            placeholder="Search Stories"
            value={search}
            onChange={(event) => {
              filterStories(event.target.value);
            }}
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
          />
        )}
      </div>

      <Stories
        type={type}
        description={description}
        stories={filteredStories}
      />
    </div>
  );
};

const Stories = ({ type, description, stories }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Typography
        style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}
      >
        {type}
      </Typography>
      <Typography style={{ fontSize: 18, marginBottom: 10 }}>
        {description}
      </Typography>
      <Divider />
      {stories.length < 1 && (
        <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
          No Stories Found
        </Typography>
      )}
      <Row gutter={16}>
        {stories.map((story, index) => (
          <Col
            key={index}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <Story story={story} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const Story = ({ story }) => {
  //   console.log(story?.thumbnail);
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigate(`/story/details/${story?._id}`);
      }}
    >
      <img src={story?.thumbnail} width="100%" height="auto" alt="thumbnail" />
      <div style={{ display: "flex" }}>
        <Typography style={{ fontSize: 12 }}>
          {story?.createdBy.name}
        </Typography>
        <Typography style={{ fontSize: 12, marginLeft: 6 }}>
          {story?.type}
        </Typography>
        <Typography style={{ fontSize: 12, marginLeft: 6 }}>
          {moment(story?.createdOn).format("MMM Do YYYY")}
        </Typography>
      </div>
      <div>
        <Typography
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {story.description}
        </Typography>
      </div>
    </div>
  );
};

export default StoriesScreen;
