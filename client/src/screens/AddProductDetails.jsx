import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Input, Button, Spin, Divider, Menu } from "antd";
import {
  SmileOutlined,
  InfoCircleOutlined,
  FileImageOutlined,
  FireOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import MainInfo from "./AddProduct/MainInfo";
import ImagesMedia from "./AddProduct/ImagesMedia";
import Makers from "./AddProduct/Makers";
import Extras from "./AddProduct/Extras";
import LaunchChecklist from "./AddProduct/LaunchChecklist";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Main Info", "main", <InfoCircleOutlined />),
  getItem("Images and media", "images", <FileImageOutlined />),
  getItem("Makers", "makers", <SmileOutlined />),
  getItem("Extras", "extras", <FireOutlined />),
  getItem("Launch Checklist", "launch", <RightCircleOutlined />),
];
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const AddProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState({
    name: "",
    tagline: "",
    link: "",
    links: [],
    description: "",
    topics: [],
    thumbnail: "",
    gallery: [],
    youtubeLink: "",
    role: "Maker",
    makers: [],
    pricing: "Free",
    firstComment: "",
    status: "Draft",
    ambassadorProgram: false,
  });
  const [menu, setMenu] = useState("main");

  const addProduct = async () => {
    if (
      productData.name &&
      productData.tagline &&
      productData.description &&
      productData.thumbnail &&
      productData.gallery &&
      productData.topics
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("tagline", productData.tagline);
      formData.append("description", productData.description);
      formData.append("pricing", productData.pricing);
      formData.append("role", productData.role);
      formData.append("ambassadorProgram", productData.ambassadorProgram);
      for (let i = 0; i < productData.topics.length; i++) {
        formData.append("topics", productData.topics[i]);
      }
      formData.append("link", productData.link);
      for (let i = 0; i < productData.makers.length; i++) {
        formData.append("makers", productData.makers[i]);
      }
      formData.append("youtubeLink", productData.youtubeLink);
      formData.append("firstComment", productData.firstComment);
      formData.append("status", productData.status);
      formData.append("thumbnail", productData.thumbnail);
      for (let i = 0; i < productData.gallery.length; i++) {
        formData.append("gallery", productData.gallery[i]);
      }
      // formData.append("gallery", productData.gallery);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .post(`${REST_API_ENDPOINT}product`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Product Added Successfully");
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

  const getEditProductData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
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
          setProductData(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  const updateProduct = async () => {
    if (
      productData.name &&
      productData.tagline &&
      productData.description &&
      productData.thumbnail &&
      productData.gallery &&
      productData.topics
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("tagline", productData.tagline);
      formData.append("description", productData.description);
      formData.append("pricing", productData.pricing);
      formData.append("role", productData.role);
      formData.append("ambassadorProgram", productData.ambassadorProgram);
      for (let i = 0; i < productData.topics.length; i++) {
        formData.append("topics", productData.topics[i]);
      }
      formData.append("link", productData.link);
      for (let i = 0; i < productData.makers.length; i++) {
        formData.append("makers", productData.makers[i]);
      }
      formData.append("youtubeLink", productData.youtubeLink);
      formData.append("firstComment", productData.firstComment);
      formData.append("status", productData.status);
      formData.append("thumbnail", productData.thumbnail);
      for (let i = 0; i < productData.gallery.length; i++) {
        formData.append("gallery", productData.gallery[i]);
      }
      // formData.append("gallery", productData.gallery);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .patch(`${REST_API_ENDPOINT}product/${params.id}`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Product Updated Successfully");
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

  useEffect(() => {
    if (params.id) {
      setEditLoading(true);
      getEditProductData();
      setEditLoading(false);
    }
  }, []);

  const renderSwitchCases = () => {
    switch (menu) {
      case "main":
        return (
          <MainInfo
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
          />
        );
      case "images":
        return (
          <ImagesMedia
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
          />
        );
      case "makers":
        return (
          <Makers
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
          />
        );
      case "extras":
        return (
          <Extras
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
          />
        );

      case "launch":
        return (
          <LaunchChecklist
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
            addProduct={params.id ? updateProduct : addProduct}
            loading={loading}
          />
        );
      default:
        return (
          <MainInfo
            productData={productData}
            setProductData={setProductData}
            setMenu={setMenu}
          />
        );
    }
  };
  const changeMenu = ({ key }) => {
    const nextIndex = (currentIndex + 1) % items.length;
    setMenu(items[nextIndex].key);
    setCurrentIndex(nextIndex);
  };
  return (
    <div style={{ paddingInline: "7%", backgroundColor: "rgb(248, 248, 248)" }}>
      {editLoading ? (
        <Spin />
      ) : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <div style={{ flexDirection: "column", display: "flex" }}>
              <Typography.Text strong style={{ fontSize: 16 }}>
                {productData.name ? productData.name : "Post Draft"}
              </Typography.Text>
              <Typography.Text style={{ fontSize: 16 }}>
                Status: {productData.status}
              </Typography.Text>
            </div>
            <Typography.Text style={{ fontSize: 16 }}>
              Autosaved few seconds ago
            </Typography.Text>
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
                openKeys={menu}
                items={items}
                onClick={({ key }) => setMenu(key)}
                selectedKeys={[menu]}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 16 }}
              style={{ paddingInline: "5%" }}
            >
              <form>{renderSwitchCases()}</form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default AddProductDetails;
