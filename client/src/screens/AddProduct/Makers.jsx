import React, { useState, useEffect } from "react";
import { Typography, Button, Radio, Space, Divider, Select } from "antd";

import axios from "axios";
import { toast } from "react-hot-toast";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const Makers = ({ productData, setProductData, setMenu }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("Maker");
  const [users, setUsers] = useState([]);
  const [makerNames, setMakerNames] = useState([]);

  const onChangeData = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
    setValue(event.target.value);
  };
  const onTagDelete = (e, index) => {
    var arr1 = [...makerNames];
    arr1.splice(index, 1);
    setMakerNames(arr1);

    var arr = [...productData.makers];
    arr.splice(index, 1);
    setProductData({
      ...productData,
      makers: arr,
    });
  };
  const onChange = (value, obj) => {
    if (productData.makers.length < 3) {
      setProductData({
        ...productData,
        makers: [...productData.makers, value],
      });
      setMakerNames([...makerNames, obj.label]);
    } else {
      toast.error("Limit Reached");
    }
  };
  const onSearch = (value) => {};

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}user`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(
            res.data.map((user) => {
              return { value: user._id, label: user.name };
            })
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div>
        <Typography.Title level={3}>
          Did you work on this product?
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          It’s fine either way. Just need to know.
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Radio.Group
            onChange={onChangeData}
            value={productData.role}
            name="role"
          >
            <Space direction="vertical">
              <Radio value="Maker" style={{ fontWeight: "bold" }}>
                I worked on this product
              </Radio>
              <Typography.Text style={{ marginLeft: 30, fontSize: 14 }}>
                I'll be listed as both Hunter and Maker of this product
              </Typography.Text>
              <Radio value="Hunter" style={{ fontWeight: "bold" }}>
                I didn't work on this product
              </Radio>
              <Typography.Text style={{ marginLeft: 30, fontSize: 14 }}>
                I'll be listed as Hunter of this product
              </Typography.Text>
            </Space>
          </Radio.Group>
        </div>
        <Divider />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={3}>
          Who worked on this product?{" "}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          You’re free to add anyone who worked on this product.
        </Typography.Text>
        <div
          style={{ flexDirection: "column", display: "flex", marginTop: 20 }}
        >
          <Typography.Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Makers
          </Typography.Text>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            value={productData.makers}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={users}
          />{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          {makerNames.map((maker, index) => (
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
                <Typography.Text>{maker}</Typography.Text>
              </div>
            </>
          ))}
        </div>
      </div>
      <Divider />

      <Button
        size="large"
        type="primary"
        onClick={() => {
          setMenu("extras");
        }}
      >
        Next Step: Extras
      </Button>
    </div>
  );
};

export default Makers;
