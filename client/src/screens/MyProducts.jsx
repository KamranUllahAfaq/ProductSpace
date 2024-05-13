import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Divider, Menu, Spin } from "antd";
import {
  InfoCircleOutlined,
  FileImageOutlined,
  FireOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import MyProductCard from "../components/myproducts/MyProductCard";
import { useSelector } from "react-redux";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [getItem("All", "all", <InfoCircleOutlined />)];

const MyProducts = () => {
  const [menu, setMenu] = useState("all");
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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

  const changeMenu = ({ key }) => {
    setMenu(key);
  };
  return (
    <div style={{ paddingInline: "7%", backgroundColor: "rgb(248, 248, 248)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Typography.Title level={2}>My Products and Launches</Typography.Title>
      </div>
      <Divider />

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 7 }} style={{ height: "100vh" }}>
          <Menu
            style={{
              width: 256,
              position: "-webkit-sticky",
              position: "sticky",
              top: "0px",
              backgroundColor: "rgb(248, 248, 248)",
            }}
            defaultSelectedKeys={["main"]}
            items={items}
            onClick={changeMenu}
          />
        </Col>
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
              {myProducts.length < 1 && (
                <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
                  No Products Added Yet
                </Typography>
              )}
              {myProducts.map((product, index) => (
                <MyProductCard
                  key={index}
                  product={product}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              ))}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyProducts;
