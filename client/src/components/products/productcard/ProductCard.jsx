import React, { useEffect } from "react";
import { Modal, Button, Typography } from "antd";
import "./productcard.css";
import { CommentOutlined, CaretRightFilled } from "@ant-design/icons";
import ProductDetails from "../../../screens/ProductDetails/ProductDetails";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const ProductCard = ({ product, refresh, setRefresh }) => {
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div>
      <Modal
        centered
        open={detailsOpen}
        onOk={() => setDetailsOpen(false)}
        onCancel={() => setDetailsOpen(false)}
        destroyOnClose
        footer={null}
        width={1000}
      >
        <ProductDetails product={product} setDetailsOpen={setDetailsOpen} />
      </Modal>
      <div
        className="product"
        onClick={() => {
          if (isLoggedIn) setDetailsOpen(true);
          else navigate("/login");
        }}
      >
        <div className="innerContainer">
          <div>
            <img src={product.thumbnail} alt="logo" style={{ width: 90 }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography.Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {product.name}
              </Typography.Text>
              <Typography.Text>{product.tagline}</Typography.Text>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <CommentOutlined />
              <Typography.Text style={{ fontSize: 12, marginLeft: 10 }}>
                {product.topics[0]}
              </Typography.Text>
              <Typography.Text style={{ fontSize: 12, marginLeft: 10 }}>
                {product.pricing}
              </Typography.Text>
            </div>
          </div>
        </div>
        <div>
          <Button
            shape="round"
            // type={product.upvotes.includes(user._id) ? "primary" : "default"}
            type="default"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 5,
              alignItems: "center",
              width: 55,
              height: 80,
            }}
            onClick={() => {
              if (isLoggedIn)
                navigate(`/product/details/${product._id}`, {
                  state: product,
                });
              else navigate("/login");
            }}

            // onClick={() => {
            //   likeProduct();
            //   likeProductReq();
            // }}
          >
            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CaretRightFilled />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
