import ActivityCard from "../../components/tools/ActivityCard";
import {
  LikeOutlined,
  InfoCircleOutlined,
  CommentOutlined,
  GlobalOutlined,
  HistoryOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Space,
  Table,
  Tag,
  Divider,
  Button,
  Menu,
  Spin,
  Avatar,
} from "antd";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventCard from "./EventCard";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Joined Date",
    dataIndex: "dateJoined",
    key: "dateJoined",
  },
];

const AmbassadorTools = () => {
  const [data, setData] = useState();
  const params = useParams();
  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}tools/ambassador/${params.id}`,

          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
        paddingInline: 60,
        paddingTop: 15,
        minHeight: "100vh",
      }}
    >
      <Typography style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Ambassador Stats
      </Typography>
      <div
        style={{
          display: "grid",
          gap: "20px",
          justifyContent: "center",
          gridTemplateColumns: "repeat(6, 1fr)", // Default: 4 items per row
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {data?.user.image ? (
            <Avatar src={data?.user.image} size={40} />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} />
          )}
          <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
            {data?.user.name}
          </Typography>
          <Typography style={{ fontSize: 14 }}>{data?.user.email}</Typography>
        </div>
        <ActivityCard
          stat={data?.disscussionsCreated}
          title="Total Discussions Created"
          CompIcon={CommentOutlined}
        />
        <ActivityCard
          stat={data?.eventsCreated.length}
          title="Total Events"
          CompIcon={GlobalOutlined}
        />

        <ActivityCard
          stat={data?.totalFollowers.length}
          title="Total Followers"
          CompIcon={UserOutlined}
        />
        <ActivityCard
          stat={data?.totalComments}
          title="Total Comments In Community"
          CompIcon={MessageOutlined}
        />
      </div>
      <Typography style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Events Created
      </Typography>
      {data?.eventsCreated.length < 1 && (
        <Typography style={{ marginTop: 20, fontSize: 22 }}>
          No Event Found
        </Typography>
      )}
      <Row style={{ marginTop: 20 }} gap={15}>
        {data?.eventsCreated.map((event) => (
          <Col style={{ margin: 10 }} xs={{ span: 24 }} lg={{ span: 11 }}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
      {/* <div>
        <Typography style={{ marginTop: 30, fontWeight: "bold", fontSize: 24 }}>
          People who follow
        </Typography>
        <div style={{ width: "60%" }}>
          <Table columns={columns} dataSource={data?.followedBy} />
        </div>
        <Typography style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
          Ambassadors
        </Typography>

        <Row style={{ marginTop: 20 }} gap={4}>
          {data?.ambassadors.map((amb) => (
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ProfileCard user={amb} />
            </Col>
          ))}
        </Row>
      </div> */}
    </div>
  );
};

export default AmbassadorTools;
