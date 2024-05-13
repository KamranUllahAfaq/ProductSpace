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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { toast } from "react-hot-toast";
import UploadCV from "../../components/ambassador/UploadCV";
import ProductCard from "../../components/products/productcard/ProductCard";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const AmbassadorApply = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getAmbassadorProducts = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(`${REST_API_ENDPOINT}product/ambassador/products`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data);
        });
    } catch (error) {
      toast.error("Error Occured");

      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getAmbassadorProducts();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div
            style={{
              paddingInline: "10%",
              paddingTop: 15,
              paddingBottom: 15,
              background:
                "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(12,1,10,1) 42%, rgba(23,1,19,1) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="primary"
                onClick={() => navigate("/ambassador/applications")}
              >
                Received Applications
              </Button>
            </div>

            <div style={{ width: "60%", marginTop: 10 }}>
              <Typography.Text
                style={{ color: "white", fontWeight: "bold", fontSize: 50 }}
              >
                Hire Candidates for your Community/ These communities are
                looking for ambassadors
              </Typography.Text>
              <Divider style={{ backgroundColor: "white" }} />
            </div>
          </div>
          <div style={{ paddingInline: "10%", width: "70%", marginTop: 40 }}>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AmbassadorApply;
