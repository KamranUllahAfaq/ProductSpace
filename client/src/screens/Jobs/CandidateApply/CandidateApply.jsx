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
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { toast } from "react-hot-toast";
import UploadCV from "../../../components/ambassador/UploadCV";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const CandidateApply = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const applyCandidate = async () => {
    if (
      data.name &&
      data.email &&
      data.age &&
      data.gender &&
      data.country &&
      data.city &&
      data.cv
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("studying", data.studying);
      formData.append("coverLetter", data.coverLetter);
      formData.append("experience", data.experience);
      formData.append("responsibilities", data.responsibilities);
      formData.append("companyName", data.companyName);
      formData.append("commute", data.commute);
      formData.append("job", job._id);
      formData.append("cv", data.cv);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .post(`${REST_API_ENDPOINT}candidate`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Application Added Successfully");
            navigate(-1);
          });
      } catch (error) {
        toast.error("Error Occured");

        console.log(error);
      }
    } else {
      toast.error("Please fill all the required details first");
    }
    setLoading(false);
  };

  const getJob = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}job/${params.id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setJob(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getJob();
    setLoading(false);
  }, []);

  return (
    <div>
      <>
        <div
          style={{
            paddingInline: "10%",
            paddingTop: 15,
            paddingBottom: 15,
            background:
              "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(12,1,10,1) 42%, rgba(23,1,19,1) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={job?.logo} alt="" width={50} />

            <Typography.Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                marginLeft: 14,
              }}
            >
              {job?.title}
            </Typography.Text>
          </div>

          <div style={{ width: "60%", marginTop: 10 }}>
            <Typography.Text
              style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
            >
              Do you have what it takes to be a candidate for this job?
            </Typography.Text>
            <Divider style={{ backgroundColor: "white" }} />
          </div>
        </div>
        <div
          style={{
            paddingInline: "10%",
            marginTop: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
              Job Title: {job?.title}
            </Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
              Organization: {job?.companyName}
            </Typography>
          </div>
          <div style={{ width: "50%" }}>
            <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
              Description:
            </Typography>
            <Typography>{job?.description}</Typography>
            <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
              Requirements:
            </Typography>
            <Typography>{job?.requirements}</Typography>
          </div>
        </div>

        <div
          style={{
            margin: "2%",
            paddingInline: "10%",
            backgroundColor: "white",
            border: "1px solid lightgrey",
            borderRadius: 20,
          }}
        >
          <Typography.Title level={2}>Tell Us About Yourself</Typography.Title>
          <Row>
            <Col
              xs={{
                span: 24,
              }}
              sm={{
                span: 24,
              }}
              md={{
                span: 12,
              }}
              lg={{
                span: 12,
              }}
              style={{ padding: "2%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Your Name
                </Typography.Text>
                <Input
                  placeholder="Enter your Full Name"
                  value={data.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Email
                </Typography.Text>
                <Input
                  placeholder="Enter your email"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Country
                </Typography.Text>
                <Input
                  placeholder="Country"
                  value={data.country}
                  name="country"
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col
              xs={{
                span: 24,
              }}
              sm={{
                span: 24,
              }}
              md={{
                span: 12,
              }}
              lg={{
                span: 12,
              }}
              style={{ padding: "2%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Your Age
                </Typography.Text>
                <Input
                  type="number"
                  placeholder="Age"
                  value={data.age}
                  name="age"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Gender
                </Typography.Text>
                <Select
                  name="age"
                  placeholder="Choose Gender"
                  onChange={(value) => setData({ ...data, gender: value })}
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female",
                      label: "Female",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                  ]}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  City
                </Typography.Text>
                <Input
                  placeholder="City Name"
                  value={data.city}
                  name="city"
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <div style={{ padding: "2%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <Typography.Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Are you studying/pursuing education fulltime?
              </Typography.Text>
              <Select
                name="studying"
                placeholder="Choose"
                onChange={(value) => setData({ ...data, studying: value })}
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </div>
            <div>
              <Typography.Title level={3}>Experience</Typography.Title>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Company Name
                </Typography.Text>
                <Input
                  name="companyName"
                  placeholder="Are you working somewhere?"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Job Responsibilites
                </Typography.Text>
                <Input.TextArea
                  rows={5}
                  name="responsibilities"
                  placeholder="Elaborate briefly?"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Typography.Title level={3}>
              Additional Information
            </Typography.Title>

            <Row>
              <Col
                xs={{
                  span: 24,
                }}
                sm={{
                  span: 24,
                }}
                md={{
                  span: 12,
                }}
                lg={{
                  span: 12,
                }}
                style={{ paddingRight: "2%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  <Typography.Text
                    style={{ fontWeight: "bold", marginBottom: 5 }}
                  >
                    Can you
                  </Typography.Text>
                  <Select
                    name="commute"
                    placeholder="Commute"
                    onChange={(value) => setData({ ...data, commute: value })}
                    options={[
                      {
                        value: "Willing to Commute",
                        label: "Willing to Commute",
                      },
                      {
                        value: "Can't Commute",
                        label: "Can't Commute",
                      },
                    ]}
                  />
                </div>
              </Col>
              <Col
                xs={{
                  span: 24,
                }}
                sm={{
                  span: 24,
                }}
                md={{
                  span: 12,
                }}
                lg={{
                  span: 12,
                }}
                style={{ paddingLeft: "2%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  <Typography.Text
                    style={{ fontWeight: "bold", marginBottom: 5 }}
                  >
                    What is your desired salary?
                  </Typography.Text>
                  <Input
                    name="desiredSalary"
                    placeholder="Salary Expectations"
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Cover Letter
                </Typography.Text>
                <Input.TextArea
                  rows={8}
                  name="coverletter"
                  placeholder="Please write cover letter"
                  onChange={handleChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Typography.Text
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Please Upload Your CV
                </Typography.Text>
                <UploadCV data={data} setData={setData} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              {loading ? (
                <Spin />
              ) : (
                <Button size="large" onClick={applyCandidate} type="primary">
                  Apply for Job
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CandidateApply;
