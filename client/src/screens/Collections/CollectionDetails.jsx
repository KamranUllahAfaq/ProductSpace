import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Radio,
  Divider,
  Row,
  Col,
  Input,
  Avatar,
  Space,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProductCard from "../../components/products/productcard/ProductCard";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const CollectionDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [refresh, setRefresh] = useState(false);
  const [collection, setCollection] = useState();

  const getCollection = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}collection/${params.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCollection(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, [refresh]);

  return (
    <div style={{ paddingInline: "10%", marginTop: 30 }}>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 25 }}>
                <Typography.Text style={{ fontSize: 28, fontWeight: "bold" }}>
                  {collection?.title}
                </Typography.Text>
                <div style={{ marginTop: 20 }}>
                  <Typography.Text style={{ fontSize: 18 }}>
                    Description:
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 18, display: "block" }}>
                    {collection?.tagline}
                  </Typography.Text>
                </div>
                <div style={{ marginTop: 30 }}>
                  <Typography.Text style={{ marginLeft: 2 }}>
                    Posted By: {collection?.createdBy.name}
                  </Typography.Text>
                  {/* <Typography.Text style={{ marginLeft: 15 }}>
            16 replies
          </Typography.Text> */}
                  <Typography.Text style={{ marginLeft: 15 }}>
                    {moment(collection?.createdOn).format("MMM Do YYYY")}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 50 }}>
              <Typography.Text style={{ fontSize: 20, marginTop: 30 }}>
                {collection?.description}
              </Typography.Text>
              <div style={{ marginTop: 30 }}>
                <Typography.Text style={{ fontSize: 20, marginTop: 30 }}>
                  Tools and Products
                </Typography.Text>
                {collection?.products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            </div>
          </div>
          <Divider />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
          <ProfileCard user={collection?.createdBy} />
        </Col>
      </Row>
    </div>
  );
};

export default CollectionDetails;
