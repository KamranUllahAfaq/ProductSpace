import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Divider,
  Spin,
  Checkbox,
  Tabs,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import CommunityJobs from "./CommunityJobs";
import IndeedJobs from "./IndeedJobs";

const JobPostings = () => {
  const navigate = useNavigate();

  const tabs = [
    { label: "Jobs in Community", key: 1, children: <CommunityJobs /> },
    { label: "Indeed Jobs", key: 2, children: <IndeedJobs /> },
  ];

  return (
    <div style={{ paddingInline: "10%" }}>
      <div style={{ paddingTop: 20, width: "60%" }}>
        <Typography.Title level={2}>
          Your dream job could be here 👇
        </Typography.Title>
        <Typography.Text style={{ fontSize: 24 }}>
          Product Hunt is the best place to discover new products, connect with
          makers and find jobs worldwide.
        </Typography.Text>
      </div>
      <div style={{ marginTop: 25, marginBottom: 30 }}>
        {" "}
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate("/jobs/postjob");
          }}
        >
          Post a Job
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ marginLeft: 20 }}
          onClick={() => {
            navigate("/jobs/myjobs");
          }}
        >
          My Jobs
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ marginY: 32 }}
        items={tabs}
      />
    </div>
  );
};

export default JobPostings;
