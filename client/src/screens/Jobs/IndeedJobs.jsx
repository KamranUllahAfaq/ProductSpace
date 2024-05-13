import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Typography, Input, Button, Divider, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const IndeedJobs = () => {
  const [jobSearch, setJobSearch] = useState("Python developer in Texas, USA");
  // const [location, setLocation] = useState("chicago");
  const [jobs, setJobs] = useState();
  const [filteredJobs, setFilteredJobs] = useState();
  const [loading, setLoading] = useState(false);

  const filterJobsOnLocation = (value) => {
    // setLocation(value);
    setFilteredJobs(
      jobs.filter((Job) => {
        return Job.location.includes(value);
      })
    );
    if (value === "") {
      setFilteredJobs(jobs);
    }
  };

  const filterJobsOnQuery = (value) => {
    setJobSearch(value);
    // setFilteredJobs(
    //   jobs.filter((Job) => {
    //     return Job.location.includes(value);
    //   })
    // );
    // if (value === "") {
    //   setFilteredJobs(jobs);
    // }
  };

  const fetchJobsIndeed = async () => {
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: jobSearch,
        page: "1",
        num_pages: "1",
      },
      headers: {
        "X-RapidAPI-Key": "344f9fb632msh482a89fa4894a88p15ba6djsn2ff247622286",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setFilteredJobs(response.data.data);
      setJobs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchJobsIndeed();
  }, [jobSearch]);

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
          <div
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography.Text strong style={{ fontSize: 16 }}>
              Search Jobs
            </Typography.Text>
            <Input
              placeholder="Search Jobs..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              value={jobSearch}
              onChange={(event) => {
                filterJobsOnQuery(event.target.value);
              }}
            />
          </div>
          <div
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Typography.Text strong style={{ fontSize: 16 }}>
              Location
            </Typography.Text>
           <Input
              placeholder="Search Location..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              value={location}
              onChange={(event) => {
                filterJobsOnLocation(event.target.value);
              }}
            /> */}
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
            {filteredJobs?.map((job) => (
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
                        src={job?.employer_logo}
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
                        {job?.employer_name}
                      </Typography.Text>
                      <Typography.Text strong style={{ fontSize: 18 }}>
                        {job?.job_title}
                      </Typography.Text>
                      <Typography.Text style={{ fontSize: 16 }}>
                        {job?.job_city}, {job?.job_country}
                      </Typography.Text>
                    </div>
                  </div>
                  <div className="rightDiv">
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        window.open(job?.job_apply_link);
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

export default IndeedJobs;
