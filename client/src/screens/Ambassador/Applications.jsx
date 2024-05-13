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
  Tag,
  Space,
  Modal,
  Table,
} from "antd";
import axios from "axios";

import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Document, Page } from "react-pdf";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const Applications = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [applicant, setApplicant] = useState({});
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag
            color={
              status === "Applied"
                ? "blue"
                : status === "Selected"
                ? "green"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setApplicant(record);
              setOpen(true);
            }}
          >
            View {record.name}
          </Button>
        </Space>
      ),
    },
  ];

  const addAmbassador = async (id, productId, userId, product, email) => {
    try {
      var body = {
        userId: userId,
        productId: productId,
        productName: product,
        email: email,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .put(`${REST_API_ENDPOINT}ambassador/add/${id}`, body, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Ambassador Added");
          setOpen(false);
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  const getApplicants = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}ambassador/applicants/${user._id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const mydata = res.data.map((row, index) => {
            return {
              key: index,
              id: row._id,
              name: row.name,
              email: row.email,
              age: row.age,
              address: row.city + " " + row.country,
              productId: row.product._id,
              product: row.product.name,
              reason: row.reason,
              cv: row.cv,
              preferredLanguage: row.preferredLanguage,
              languageLevel: row.languageLevel,
              studying: row.studying,
              isAmbassador: row.isAmbassador,
              websites: row.websites,
              nameOfCommunity: row.nameOfCommunity,
              appliedBy: row.appliedBy,
              status: row.status,
            };
          });
          setData(mydata);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getApplicants();
    setLoading(false);
  }, [refresh]);
  return (
    <div>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
        width={1000}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 30,
            }}
          >
            <Button
              onClick={() => {
                addAmbassador(
                  applicant.id,
                  applicant.productId,
                  applicant.appliedBy,
                  applicant.product,
                  applicant.email
                );
              }}
            >
              Add as an Ambassador
            </Button>
          </div>
          <Typography.Title level={3}>Name: {applicant.name}</Typography.Title>
          <Typography.Title level={5}>Age: {applicant.age}</Typography.Title>
          <Typography.Title level={5}>
            Email: {applicant.email}
          </Typography.Title>
          <Typography.Title level={5}>
            Address: {applicant.address}
          </Typography.Title>

          <Typography.Text style={{ fontSize: 16 }}>
            Reason: {applicant.reason}
          </Typography.Text>

          <Typography.Title level={3}>Resume:</Typography.Title>

          <object
            data={applicant.cv}
            type="application/pdf"
            width="100%"
            height={600}
          >
            <p>Trouble Loading Resume....</p>
          </object>
        </div>
      </Modal>
      <div
        style={{
          paddingInline: "10%",
          paddingTop: 15,
          paddingBottom: 15,
          background:
            "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(12,1,10,1) 42%, rgba(23,1,19,1) 100%)",
        }}
      >
        <Typography.Title level={1} style={{ color: "white" }}>
          Ambassador Applicants
        </Typography.Title>
      </div>
      <div style={{ paddingInline: "10%", marginTop: 15 }}>
        {loading ? <Spin /> : <Table columns={columns} dataSource={data} />}
      </div>
    </div>
  );
};
export default Applications;
