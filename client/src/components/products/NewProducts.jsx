import { useState, useEffect } from "react";
import {
  Layout,
  Space,
  Menu,
  Input,
  Avatar,
  Button,
  Dropdown,
  Divider,
  Row,
  Col,
  Typography,
  Select,
  Card,
} from "antd";
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productcard/ProductCard";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fetchAllProducts = async () => {
    try {
      await axios
        .get(`${REST_API_ENDPOINT}product/newproducts/new`)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setFilteredProducts(res.data);
        });
    } catch (error) {
      console.log(error.message);
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
    fetchAllProducts();
    setLoading(false);
  }, [refresh]);

  return (
    <div style={{ paddingInline: "10%" }}>
      <div>
        <div>
          <Card
            size="small"
            title="Which App Do you use the most on your phone?"
            extra={<RetweetOutlined />}
            style={{
              width: "100%",
              padding: "2%",
              background:
                "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
            }}
          >
            <Input
              size="large"
              placeholder="Search Products"
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                filterProducts(event.target.value);
              }}
            />
          </Card>
        </div>
      </div>
      <Divider />
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <Typography style={{ fontWeight: "bold", fontSize: 24 }}>
          New Products Added a Week Ago
        </Typography>
        <div style={{ width: "60%" }}>
          {filterProducts.length < 1 && (
            <Typography style={{ fontSize: 24 }}>No Products Found</Typography>
          )}
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
