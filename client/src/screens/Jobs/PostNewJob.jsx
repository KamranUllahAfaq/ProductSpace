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
import { SearchOutlined } from "@ant-design/icons";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LogoUpload from "../../components/jobs/LogoUpload";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const options = [
  { value: "Engineering", label: "Engineering" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Product", label: "Product" },
];

const PostNewJob = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCategoriesChange = (value) => {
    setData({ ...data, categories: value });
  };

  const checkLocationCheckbox = (event) => {
    if (event.target.checked) {
      setData({ ...data, location: "Remote" });
    } else {
      setData({ ...data, location: "" });
    }
  };

  const postJob = async () => {
    if (
      data.title &&
      data.companyName &&
      data.link &&
      data.contactEmail &&
      data.location &&
      data.categories
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("companyName", data.companyName);
      formData.append("companyTagline", data.companyTagline);
      formData.append("description", data.description);
      formData.append("requirements", data.requirements);

      for (let i = 0; i < data.categories.length; i++) {
        formData.append("categories", data.categories[i]);
      }
      formData.append("location", data.location);
      formData.append("link", data.link);
      formData.append("contactEmail", data.contactEmail);
      formData.append("image", data.logo);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .post(`${REST_API_ENDPOINT}job`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Job Added Successfully");
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

  const updateJob = async () => {
    if (
      data.title &&
      data.companyName &&
      data.link &&
      data.contactEmail &&
      data.location &&
      data.categories &&
      data.description &&
      data.requirements
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("companyName", data.companyName);
      formData.append("companyTagline", data.companyTagline);
      formData.append("description", data.description);
      formData.append("requirements", data.requirements);

      for (let i = 0; i < data.categories.length; i++) {
        formData.append("categories", data.categories[i]);
      }
      formData.append("location", data.location);
      formData.append("link", data.link);
      formData.append("contactEmail", data.contactEmail);
      formData.append("image", data.logo);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .put(`${REST_API_ENDPOINT}job/${params.id}`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Job Added Successfully");
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

  const fetchUpdatedJob = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}job/${params.id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (params.id) fetchUpdatedJob();
  }, []);
  return (
    <div>
      <div
        style={{
          paddingInline: "10%",
          paddingTop: 15,
          paddingBottom: 15,
          background:
            "linear-gradient(90deg, rgba(0,54,46,1) 0%, rgba(11,94,125,1) 100%)",
        }}
      >
        <div style={{ width: "60%" }}>
          <div
            style={{
              width: "fit-content",
              padding: 5,
              backgroundColor: "#1b4655",
            }}
          >
            <Typography.Text style={{ color: "white", fontWeight: "bold" }}>
              Jobs on Product Hunt
            </Typography.Text>
          </div>

          <Typography.Text
            style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
          >
            Hire the Makers behind the best product
          </Typography.Text>
          <Divider style={{ backgroundColor: "white" }} />
        </div>
      </div>
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
        >
          <div
            style={{ paddingInline: "10%", marginTop: 20, marginBottom: 30 }}
          >
            <Typography.Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Create your job listing
            </Typography.Text>
            <div
              style={{
                padding: 15,
                borderBottomWidth: "1px",
                borderBottomColor: "black",
                borderRadius: 5,
                backgroundColor: "white",
              }}
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
                  Company Name
                </Typography.Text>
                <Input
                  placeholder="Ex Acme Corp"
                  value={data.companyName}
                  name="companyName"
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
                  Company Tagline
                </Typography.Text>
                <Input
                  placeholder="Optional"
                  value={data.companyTagline}
                  name="companyTagline"
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
                  Job Title
                </Typography.Text>
                <Input
                  placeholder="What is the title of this Job?"
                  value={data.title}
                  name="title"
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
                  Categories
                </Typography.Text>
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Categories for this role"
                  name="categories"
                  value={data.categories}
                  onChange={handleCategoriesChange}
                  options={options}
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
                  Location
                </Typography.Text>
                <Input
                  placeholder="Location"
                  value={data.location}
                  name="location"
                  onChange={handleChange}
                />

                <Checkbox
                  style={{ marginTop: 10 }}
                  onChange={checkLocationCheckbox}
                >
                  Remote
                </Checkbox>
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
                  Link to Job Description
                </Typography.Text>
                <Input
                  placeholder="https://"
                  value={data.link}
                  name="link"
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
                  Company Logo{" "}
                </Typography.Text>
                <div>
                  <LogoUpload data={data} setData={setData} />
                  <div>
                    <Typography.Text>
                      Recommended size: 240x240px
                    </Typography.Text>
                    <div>
                      <Typography.Text>
                        JPG, PNG, GIF. Max size: 2MB
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, marginBottom: 20 }}>
                {loading ? (
                  <Spin />
                ) : (
                  <Button
                    size="large"
                    onClick={() => {
                      if (params.id) {
                        updateJob();
                      } else {
                        postJob();
                      }
                    }}
                    type="primary"
                  >
                    {params.id ? "Edit Job" : "Post Job"}
                  </Button>
                )}
              </div>
            </div>
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
            span: 11,
          }}
          lg={{
            span: 11,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 70,
            }}
          >
            <Typography.Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Job Description
            </Typography.Text>
            <Input.TextArea
              rows={8}
              placeholder="Description for the job? "
              value={data.description}
              name="description"
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
            <Typography.Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Job Requirements
            </Typography.Text>
            <Input.TextArea
              rows={8}
              placeholder="Requirements for the job? "
              value={data.requirements}
              name="requirements"
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
            <Typography.Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Contact Email
            </Typography.Text>
            <Input
              placeholder="Write your email"
              value={data.contactEmail}
              name="contactEmail"
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostNewJob;
