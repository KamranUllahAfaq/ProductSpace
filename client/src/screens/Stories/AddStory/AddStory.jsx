import React, { useEffect, useMemo, useState } from "react";
import RichTextBox from "../../../components/richtextbox/RichTextBox";
import { Typography, Button, Divider, Select, Spin, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// import { colors } from "../../../theme/Colors";
import { storyData } from "../data/storyData";
import ThumbnailStory from "../../../components/story/ThumbnailStory/ThumbnailStory";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const AddStory = () => {
  const [value, setValue] = useState();
  const [type, setType] = useState();
  const [product, setProduct] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [description, setDescription] = useState();

  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (value) => {
    setType(value);
  };
  const handlePChange = (value) => {
    setProduct(value);
  };
  const options = useMemo(() => {
    return storyData.map((item) => {
      return { label: item.type, value: item.type };
    });
  }, []);

  const saveStory = async () => {
    if (value && type && product && thumbnail) {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));

        const formData = new FormData();
        formData.append("content", value);
        formData.append("description", description);

        formData.append("thumbnail", thumbnail);
        formData.append("product", product);
        formData.append("type", type);
        formData.append("createdBy", user._id);
        await axios
          .post(`${REST_API_ENDPOINT}stories`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast.success("Story Added Successfully");
            navigate(-1);
          });
      } catch (error) {
        toast.error("Error Occurred");
      }
      setLoading(false);
    } else {
      toast.error("Please Enter All The Details");
    }
  };

  const fetchMyProducts = async () => {
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
          const products = res.data.map((item) => {
            return { label: item.name, value: item._id };
          });
          setMyProducts(products);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMyProducts();
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
              Add Your Stories to Product Hunt
            </Typography.Text>
          </div>

          <Typography.Text
            style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
          >
            Write the best stories of your Products
          </Typography.Text>
          <Divider style={{ backgroundColor: "white" }} />
        </div>
      </div>
      <div style={{ margin: "7%" }}>
        <Typography
          style={{
            textAlign: "center",
            margin: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Add Your Story
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Select
            defaultValue="Select Type"
            style={{
              minWidth: 400,
              maxWidth: 250,
              margin: 10,
            }}
            size="large"
            onChange={handleChange}
            options={options}
          />
          {loading ? (
            <Spin />
          ) : (
            <Select
              defaultValue="Select Product"
              style={{
                minWidth: 400,
                maxWidth: 250,
                margin: 10,
              }}
              size="large"
              onChange={handlePChange}
              options={myProducts}
            />
          )}
        </div>
        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 20,
            // width: 450,
          }}
        >
          <ThumbnailStory thumbnail={thumbnail} setThumbnail={setThumbnail} />
          <Typography style={{ fontSize: 20 }}>Add Thumbnail</Typography>
        </div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Typography style={{ fontSize: 20 }}>Title</Typography>

          <Input.TextArea
            placeholder="Add Title for your story"
            rows={2}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></Input.TextArea>
        </div>
        <Typography style={{ fontSize: 20 }}>Content</Typography>

        <RichTextBox value={value} setValue={setValue} />
        <Button
          size="large"
          type="primary"
          style={{ width: "100%", marginTop: 70 }}
          onClick={saveStory}
        >
          Add Story
        </Button>
      </div>
    </div>
  );
};

export default AddStory;
