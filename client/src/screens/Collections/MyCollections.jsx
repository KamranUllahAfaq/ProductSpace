import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Input, Button, Divider, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import CollectionCard from "../../components/collection/CollectionCard";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const MyCollections = () => {
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const fetchAllCollections = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${REST_API_ENDPOINT}collection/user/${user._id}`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          setCollections(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllCollections();
  }, []);
  return (
    <div style={{ paddingInline: "10%" }}>
      <Row>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 24,
          }}
          md={{
            span: 24,
          }}
          lg={{
            span: 24,
          }}
        >
          <div style={{ paddingTop: 20 }}>
            <Typography.Title level={2}>My Collections</Typography.Title>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div style={{ marginTop: 20 }}>
              {collections.length < 1 && (
                <Typography style={{ fontSize: 20 }}>
                  No Collection Found
                </Typography>
              )}
              <Row gap={4}>
                {collections?.map((collection) => (
                  <Col
                    xs={{
                      span: 24,
                    }}
                    sm={{
                      span: 24,
                    }}
                    md={{
                      span: 8,
                    }}
                    lg={{
                      span: 8,
                    }}
                  >
                    <CollectionCard collection={collection} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyCollections;
