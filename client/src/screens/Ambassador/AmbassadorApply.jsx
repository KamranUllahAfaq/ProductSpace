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
import UploadCV from "../../components/ambassador/UploadCV";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const AmbassadorApply = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({ thumbnail: "", name: "" });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const applyAmbassador = async () => {
    if (
      data.name &&
      data.email &&
      data.age &&
      data.gender &&
      data.reason &&
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
      formData.append("developer", data.developer);
      formData.append("studying", data.studying);
      formData.append("reason", data.reason);
      formData.append("isAmbassador", data.isAmbassador);
      formData.append("nameOfCommunity", data.nameOfCommunity);
      formData.append("product", product._id);
      formData.append("websites", data.websites);
      formData.append("languageLevel", data.languageLevel);
      formData.append("preferredLanguage", data.preferredLanguage);
      formData.append("cv", data.cv);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .post(`${REST_API_ENDPOINT}ambassador`, formData, {
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

  const getProduct = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/${params.id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProduct(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getProduct();
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
            <img src={product.thumbnail} alt="" width={50} />

            <Typography.Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                marginLeft: 14,
              }}
            >
              {product.name}
            </Typography.Text>
          </div>

          <div style={{ width: "60%", marginTop: 10 }}>
            <Typography.Text
              style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
            >
              Do you have what it takes to be an ambassador
            </Typography.Text>
            <Divider style={{ backgroundColor: "white" }} />
          </div>
        </div>

        <div style={{ margin: "5%", padding: "5%", backgroundColor: "white" }}>
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
                  min={10}
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
              <Typography.Title level={3}>Language</Typography.Title>
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
                  What is your level of english?{" "}
                </Typography.Text>
                <Select
                  name="languageLevel"
                  placeholder="Choose"
                  onChange={(value) =>
                    setData({ ...data, languageLevel: value })
                  }
                  options={[
                    {
                      value: "Basic",
                      label: "Basic",
                    },
                    {
                      value: "Good",
                      label: "Good",
                    },
                    {
                      value: "Excellent",
                      label: "Excellent",
                    },
                    {
                      value: "Native",
                      label: "Native",
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
                  Other Preferred Language
                </Typography.Text>
                <Input
                  name="preferredLanguage"
                  placeholder="Which Language do you speak?"
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
                  Reason to be {product.name}'s Ambassador
                </Typography.Text>
                <Input.TextArea
                  rows={5}
                  name="reason"
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
                    Are you an ambassador or do you actively participate in any
                    community
                  </Typography.Text>
                  <Select
                    name="isAmbassador"
                    placeholder="Choose"
                    onChange={(value) =>
                      setData({ ...data, isAmbassador: value })
                    }
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
                    If yes then what is the name of community or ecosystem?
                  </Typography.Text>
                  <Input
                    name="nameOfCommunity"
                    placeholder="Choose"
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
                  Are you a developer? What type?
                </Typography.Text>
                <Select
                  name="developer"
                  placeholder="Choose"
                  onChange={(value) => setData({ ...data, developer: value })}
                  options={[
                    {
                      value: "Frontend",
                      label: "Frontend",
                    },
                    {
                      value: "Backend",
                      label: "Backend",
                    },
                    {
                      value: "FullStack",
                      label: "FullStack",
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
                  Which websites do u use for getting news?
                </Typography.Text>
                <Input.TextArea
                  rows={3}
                  name="websites"
                  placeholder="Please Specify"
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
                <Button size="large" onClick={applyAmbassador} type="primary">
                  Apply for Ambassador
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AmbassadorApply;
