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
} from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";

import { toast } from "react-hot-toast";

import ProductCard from "../components/products/productcard/ProductCard";
import Web3header from "../components/topics/Web3header";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const ProductsByTopics = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getTopicProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}product/topic/${state.topic}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setProducts(res.data);
          setFilteredProducts(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  const filterProducts = (value) => {
    setSearch(value);

    setFilteredProducts(
      products.filter((product) => {
        return product.name.includes(value);
      })
    );
    if (value === "") {
      setFilteredProducts(products);
    }
  };
  useEffect(() => {
    setLoading(true);
    getTopicProducts();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          {state.topic === "Web3" ? (
            <Web3header>
              <ProductsBody
                state={state}
                search={search}
                filterProducts={filterProducts}
                filteredProducts={filteredProducts}
              />
            </Web3header>
          ) : (
            <div style={{ width: "70%", paddingInline: "10%" }}>
              <ProductsBody
                state={state}
                search={search}
                filterProducts={filterProducts}
                filteredProducts={filteredProducts}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ProductsBody = ({ state, search, filterProducts, filteredProducts }) => {
  return (
    <div
      style={{
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      <div style={{ marginTop: 10 }}>
        <Typography.Title style={{ fontWeight: "bold", fontSize: 50 }}>
          {state.topic}
        </Typography.Title>
        <Typography.Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {state.desc}
        </Typography.Text>
        <Divider style={{ backgroundColor: "white" }} />
        <Input
          size="large"
          placeholder="Search Products"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => {
            filterProducts(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </>
        ) : (
          <Typography.Title level={2}>No Product Found</Typography.Title>
        )}
      </div>
    </div>
  );
};

export default ProductsByTopics;
