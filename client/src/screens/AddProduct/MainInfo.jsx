import React, { useState, useEffect } from "react";
import { Typography, Input, Button, Divider, Select, Tag } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MainInfo = ({ productData, setProductData, setMenu }) => {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const onChangeData = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const onTagDelete = (e, index) => {
    var arr = [...productData.topics];
    arr.splice(index, 1);

    setProductData({
      ...productData,
      topics: arr,
    });
  };
  const onChange = (value) => {
    if (productData.topics.length < 3) {
      setProductData({
        ...productData,
        topics: [...productData.topics, value],
      });
    } else {
      toast.error("Limit Reached");
    }
  };
  const onSearch = (value) => {};

  const fetchAllTopics = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}topic`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTopics(
            res.data.map((topic) => {
              return { value: topic.name, label: topic.name };
            })
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);

  return (
    <div>
      <div>
        <Typography.Title level={3}>
          Tell us more about this product
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          We’ll need its name, tagline, links, topics and description.
        </Typography.Text>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Name of the product
        </Typography.Text>
        <Input
          size="large"
          placeholder="Simply the name of product"
          name="name"
          value={productData.name}
          onChange={onChangeData}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Text style={{ fontSize: 16 }}>Tagline</Typography.Text>
        <Input
          size="large"
          placeholder="Concise and descriptive tagline for the product"
          name="tagline"
          value={productData.tagline}
          onChange={onChangeData}
        />
      </div>
      <Divider />
      {/* Links */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={4}>Links</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Links to the product
        </Typography.Text>
        <Input
          size="large"
          placeholder="https://"
          name="link"
          value={productData.link}
          onChange={onChangeData}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={4}>Description</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>Description</Typography.Text>
        <Input.TextArea
          size="large"
          rows={5}
          placeholder="Short Description about the product"
          name="description"
          value={productData.description}
          onChange={onChangeData}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={3}>Topics</Typography.Title>

        <div
          style={{ flexDirection: "column", display: "flex", marginTop: 20 }}
        >
          <Typography.Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select upto three topics
          </Typography.Text>
          <Select
            showSearch
            placeholder="Select a topic"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={topics}
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          {productData.topics.map((topic, index) => (
            <>
              <div
                onClick={(e) => {
                  onTagDelete(e, index);
                }}
                style={{
                  backgroundColor: "lightgreen",
                  padding: 5,
                  margin: 2,
                  borderRadius: 10,
                }}
              >
                <Typography.Text>{topic}</Typography.Text>
              </div>
            </>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setMenu("images");
          }}
        >
          Next Step: Images and Media
        </Button>
      </div>
    </div>
  );
};

export default MainInfo;
