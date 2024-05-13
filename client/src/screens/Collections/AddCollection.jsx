import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Modal,
  Carousel,
  Button,
  Typography,
  Radio,
  Tabs,
  Row,
  Col,
  Divider,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  RightOutlined,
  SearchOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { colors } from "../../theme/Colors";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const AddCollection = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  const [values, setValues] = useState({
    title: "",
    tagline: "",
    products: [],
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleProductsChange = (value) => {
    setValues({ ...values, products: value });
  };
  const addCollection = async () => {
    if (values.title) {
      try {
        var body = {
          title: values.title,
          user: user._id,
          products: values.products,
          tagline: values.tagline,
        };
        const token = JSON.parse(localStorage.getItem("token"));
        await axios
          .post(`${REST_API_ENDPOINT}collection`, body, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Collection Added Successfully");
            navigate(-1);
          });
      } catch (error) {
        toast.error("Error Occurred");
      }
    }
  };

  const getAllProducts = async () => {
    try {
      await axios.get(`${REST_API_ENDPOINT}product`).then((res) => {
        setProducts(
          res.data.map((product) => {
            return { label: product.name, value: product._id };
          })
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: colors.lightgrey,
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          width: 600,
          marginTop: 40,
          height: "fit-content",
          paddingInline: 50,
          paddingTop: 20,
          paddingBottom: 20,
          borderRadius: 10,
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <div style={{ justifyContent: "flex-start" }}>
          <Typography.Title level={3}>New Collection</Typography.Title>

          <Input.TextArea
            placeholder="9 things useful for you"
            style={{ marginTop: 50, border: "none", fontSize: 20 }}
            rows={2}
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <Input.TextArea
            placeholder="Add Description or tagline"
            style={{ marginTop: 20, border: "none" }}
            rows={5}
            name="tagline"
            value={values.tagline}
            onChange={handleChange}
          />
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Select
                placeholder="Select Products"
                mode="multiple"
                allowClear
                name="products"
                style={{
                  width: 220,
                }}
                onChange={handleProductsChange}
                options={products}
                size="large"
              />
              <Button size="large" type="primary" onClick={addCollection}>
                Add Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCollection;
