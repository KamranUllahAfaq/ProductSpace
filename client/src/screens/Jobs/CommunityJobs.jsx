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
import axios from "axios";
import "./jobs.css";
import { useNavigate } from "react-router-dom";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const CommunityJobs = () => {
  const [search, setSearch] = React.useState("");
  const [Jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const filterJobs = (value) => {
    setSearch(value);

    setFilteredJobs(
      Jobs.filter((Job) => {
        return Job.location.includes(value);
      })
    );
    if (value === "") {
      setFilteredJobs(Jobs);
    }
  };
  const handleCategoryFilter = (event) => {
    if (event.target.checked) {
      setFilteredJobs(
        Jobs.filter((Job) => {
          return Job.categories[0].includes(event.target.name);
        })
      );
    } else {
      setFilteredJobs(Jobs);
    }
  };
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}job`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setJobs(res.data);
          setFilteredJobs(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <Row>
      <Col
        xs={{
          span: 24,
          order: 1,
        }}
        sm={{
          span: 24,
          order: 1,
        }}
        md={{
          offset: 1,
          span: 7,
          order: 2,
        }}
        lg={{
          offset: 1,
          span: 9,
          order: 2,
        }}
      >
        <div>
          <Typography.Text strong style={{ fontSize: 16 }}>
            Job Filters
          </Typography.Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 15,
            }}
          >
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Engineering"
            >
              Engineering
            </Checkbox>
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Marketing"
            >
              Marketing
            </Checkbox>
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Sales"
            >
              Sales
            </Checkbox>
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Customer Support"
            >
              Customer Support
            </Checkbox>
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Design"
            >
              Design
            </Checkbox>
            <Checkbox
              style={{ margin: 5 }}
              onClick={handleCategoryFilter}
              name="Product"
            >
              Product
            </Checkbox>
          </div>
          <div
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography.Text strong style={{ fontSize: 16 }}>
              Location
            </Typography.Text>
            <Input
              placeholder="Search Location..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                filterJobs(event.target.value);
              }}
            />
          </div>
        </div>
      </Col>
      <Col
        xs={{
          span: 24,
          order: 2,
        }}
        sm={{
          span: 24,
          order: 2,
        }}
        md={{
          span: 16,
          order: 1,
        }}
        lg={{
          span: 14,
          order: 1,
        }}
      >
        {loading ? (
          <Spin />
        ) : (
          <div style={{ marginTop: 20 }}>
            {filteredJobs.length < 1 && (
              <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
                No Jobs Added Yet
              </Typography>
            )}
            {filteredJobs.map((job) => (
              <>
                <div
                  className="jobCard hoverEffect"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingInline: 10,
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
                        src={job.logo}
                        alt="thummb"
                        width={76}
                        style={{ borderRadius: 5 }}
                      />
                    </div>
                    <div
                      className="JobDetails"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 15,
                      }}
                    >
                      <Typography.Text style={{ fontSize: 16 }}>
                        {job.companyName}
                      </Typography.Text>
                      <Typography.Text strong style={{ fontSize: 18 }}>
                        {job.title}
                      </Typography.Text>
                      <Typography.Text style={{ fontSize: 16 }}>
                        Location | {job.location}
                      </Typography.Text>
                    </div>
                  </div>
                  <div className="rightDiv">
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        navigate(`/jobs/candidates/apply/${job._id}`);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default CommunityJobs;
