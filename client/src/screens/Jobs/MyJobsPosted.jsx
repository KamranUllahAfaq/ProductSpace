import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Divider,
  Spin,
  Select,
  Checkbox,
} from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const MyJobsPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}job/myjobs/${user._id}`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);
  return (
    <div style={{ paddingInline: "10%" }}>
      <div style={{ marginTop: "20px" }}>
        <Typography style={{ fontSize: 26, fontWeight: "bold" }}>
          My Posted Jobs
        </Typography>
      </div>
      <div style={{ marginTop: "30px", width: "70%" }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {jobs.length < 1 && (
              <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
                No Jobs Added Yet
              </Typography>
            )}
            {jobs?.map((job) => (
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
                        {job.location}
                      </Typography.Text>
                    </div>
                  </div>
                  <div className="rightDiv">
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        navigate(`/jobs/candidates/${job._id}`);
                      }}
                    >
                      View Candidates
                    </Button>
                    <Button
                      size="large"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        navigate(`/jobs/editJob/${job._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <Divider />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyJobsPosted;
