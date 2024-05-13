import ActivityCard from "../../components/tools/ActivityCard";
import {
  LikeOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Table } from "antd";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MakersCard from "../../components/products/makerscard/MakersCard";
import ProfileCard from "../../components/profileCard/ProfileCard";
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
    render: (text) => <p>{moment(text).format("MMM Do YYYY")}</p>,
  },
];

const ProductTools = () => {
  const [data, setData] = useState();
  const params = useParams();
  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}tools/product/${params.id}`,

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
        Product Stats
      </Typography>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(5, 1fr)", // Default: 4 items per row
        }}
      >
        <ActivityCard
          stat={data?.upvotes}
          title="Total Upvotes"
          CompIcon={LikeOutlined}
        />
        <ActivityCard
          stat={data?.comments}
          title="Total Comments"
          CompIcon={MessageOutlined}
        />
        <ActivityCard
          stat={data?.ambassadors.length}
          title="Total Ambassadors"
          CompIcon={UsergroupAddOutlined}
        />
        <ActivityCard
          stat={data?.events}
          title="Total Events"
          CompIcon={GlobalOutlined}
        />
        <ActivityCard
          stat={data?.disscussions}
          title="Appeared in Discussions"
          CompIcon={CommentOutlined}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: 500 }}>
            <div>
              <Typography
                style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}
              >
                Product Name: {data?.product.name}
              </Typography>
            </div>
            <div>
              <Typography style={{ fontSize: 24, fontWeight: "bold" }}>
                Description:
              </Typography>
              <Typography>{data?.product.description}</Typography>
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <Typography
              style={{ marginTop: 70, fontWeight: "bold", fontSize: 24 }}
            >
              People who follow this product
            </Typography>
            <Table columns={columns} dataSource={data?.followedBy} />
          </div>
        </div>
        <Typography style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
          Ambassadors
        </Typography>

        <Row style={{ marginTop: 20 }} gap={4}>
          {data?.ambassadors.map((amb) => (
            <Col
              style={{ backgroundColor: "white", margin: 20 }}
              xs={{ span: 24 }}
              lg={{ span: 6 }}
            >
              <ProfileCard user={amb} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductTools;
