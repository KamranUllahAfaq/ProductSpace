import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Divider, Button, Menu, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const MyProductsTools = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/myproducts/${user._id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMyProducts(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
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
        <Typography.Title level={2}>My Products</Typography.Title>
      </div>
      <Divider />
      {myProducts.length < 1 && (
        <Typography.Title level={2}>No Products Found</Typography.Title>
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
              {myProducts.map((product, index) => (
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
                        <img src={product.thumbnail} alt="thummb" width={76} />
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
                          {product.name}
                        </Typography.Text>
                        <Typography.Text>
                          Drafted On:{" "}
                          {moment(product.createdOn).format("MMM Do YYYY")}
                        </Typography.Text>
                        <Typography.Text
                          style={{ fontSize: 12, marginTop: 10 }}
                        >
                          Edited:{" "}
                          {moment(
                            moment(product.UpdatedOn).format("MMM Do YY"),
                            "MMM Do YY"
                          ).fromNow()}
                        </Typography.Text>
                      </div>
                    </div>
                    <div className="rightDiv">
                      <Button
                        size="large"
                        icon={<InfoCircleOutlined />}
                        onClick={() => {
                          navigate(`/tools/product/${product._id}`);
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

export default MyProductsTools;
