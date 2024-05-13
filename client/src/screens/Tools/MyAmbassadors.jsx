import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Menu,
  Spin,
  Avatar,
} from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const MyAmbassadors = () => {
  const [myAmbassadors, setMyAmbassadors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const fetchAllAmbassadors = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/myambassadors/123`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMyAmbassadors(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllAmbassadors();
  }, [refresh]);

  return (
    <div
      style={{
        paddingInline: "7%",
        backgroundColor: "rgb(248, 248, 248)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Typography.Title level={2}>My Ambassadors</Typography.Title>
      </div>
      <Divider />
      {myAmbassadors.length < 1 && (
        <Typography.Title level={2}>No Ambassadors Found</Typography.Title>
      )}

      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 16 }}
          style={{ paddingInline: "1%" }}
        >
          {/* My Product Card */}
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography.Title level={2}>Loading...</Typography.Title>
              <Spin />
            </div>
          ) : (
            <>
              {myAmbassadors.map((ambassador, index) => (
                <div>
                  <div
                    className="mainDiv"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                        <Avatar
                          src={ambassador.image ? ambassador.image : null}
                          alt="thummb"
                          icon={<UserOutlined />}
                          //   width={76}
                          size={50}
                        />
                      </div>
                      <div
                        className="productDetails"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 5,
                        }}
                      >
                        <Typography.Text strong style={{ fontSize: 18 }}>
                          {ambassador.name}
                        </Typography.Text>
                        <Typography.Text>
                          Drafted On:{" "}
                          {moment(ambassador.createdOn).format("MMM Do YYYY")}
                        </Typography.Text>
                      </div>
                    </div>
                    <div className="rightDiv">
                      <Button
                        size="large"
                        icon={<InfoCircleOutlined />}
                        onClick={() => {
                          navigate(`/tools/ambassador/${ambassador._id}`);
                        }}
                      >
                        View Tools
                      </Button>
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyAmbassadors;
