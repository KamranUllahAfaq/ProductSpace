import React from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Button,
  Dropdown,
  Divider,
  Row,
  Col,
  Typography,
  Select,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./jobcard.css";
import { useNavigate } from "react-router-dom";
const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ marginBottom: 20, cursor: "pointer" }}
      className="hoverEffect"
    >
      <div
        alt="csac"
        onClick={() => {
          navigate(`/jobs/candidates/apply/${job._id}`);
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography.Text style={{ fontWeight: "bold" }}>
            {job.title}
          </Typography.Text>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 7 }}>
            <Typography.Text style={{ fontSize: 12 }}>
              {job.companyName}
            </Typography.Text>
            <Typography.Text style={{ marginLeft: 10, fontSize: 12 }}>
              Location | {job.location}
            </Typography.Text>
          </div>
        </div>
        <div>
          <Button
            type="text"
            onClick={() => {
              navigate(`/jobs/candidates/apply/${job._id}`);
            }}
          >
            <CaretRightOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
