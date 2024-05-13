import React, { useState } from "react";
import { Typography, Button, Divider, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
const { confirm } = Modal;
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const MyProductCard = ({ product, refresh, setRefresh }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .delete(`${REST_API_ENDPOINT}product/${product._id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product Deleted Successfully");
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Error Occurred");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      content: "Confirm",
      okText: "Confirm Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  };
  return (
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
            <Typography.Text>Drafted On:</Typography.Text>
            <Typography.Text style={{ fontSize: 12, marginTop: 10 }}>
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
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/editproduct/${product._id}`);
            }}
          >
            Continue Editing
          </Button>
          <Button
            size="large"
            onClick={showDeleteConfirm}
            style={{ marginInline: 10 }}
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default MyProductCard;
