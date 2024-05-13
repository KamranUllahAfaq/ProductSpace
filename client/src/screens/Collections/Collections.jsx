import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Input, Button, Divider, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import CollectionCard from "../../components/collection/CollectionCard";
const REST_API_ENDPOINT = process.env.REACT_APP_API;
const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const filterCollections = (value) => {
    setSearch(value);

    setFilteredCollections(
      collections.filter((collection) => {
        return collection.title.includes(value);
      })
    );
    if (value === "") {
      setFilteredCollections(collections);
    }
  };

  const fetchAllCollections = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${REST_API_ENDPOINT}collection`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          setCollections(res.data);
          setFilteredCollections(res.data);
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
            <Typography.Title level={2}>Collections</Typography.Title>
            <Typography.Text style={{ fontSize: 24 }}>
              Community-curated collections for the best tools, inspiration,
              starter packs, and more…
            </Typography.Text>
          </div>
          <div
            style={{
              marginTop: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Input
              placeholder="Search Collections..."
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                filterCollections(event.target.value);
              }}
            />
            <div>
              <Button
                style={{ margin: 2 }}
                type="primary"
                onClick={() => {
                  navigate("/collections/my");
                }}
              >
                My Collections
              </Button>
              <Button
                style={{ margin: 2 }}
                type="primary"
                onClick={() => {
                  navigate("/collections/add");
                }}
              >
                Add New Collection
              </Button>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div style={{ marginTop: 20 }}>
              {filteredCollections.length < 1 && (
                <Typography style={{ fontSize: 20 }}>
                  No Collection Found
                </Typography>
              )}
              <Row gap={4}>
                {filteredCollections?.map((collection) => (
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
                    {collection.products.length < 1 ? (
                      <Typography style={{ fontSize: 20 }}>
                        No Collection Found
                      </Typography>
                    ) : (
                      <CollectionCard collection={collection} />
                    )}
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

export default Collections;
