import React from "react";
import ProductCard from "../products/productcard/ProductCard";
import { Typography } from "antd";

const FollowedProducts = ({ followedProducts }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {followedProducts.length > 0 ? (
        <>
          {followedProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </>
      ) : (
        <Typography style={{ fontSize: 20, textAlign: "center" }}>
          No Product Found
        </Typography>
      )}
    </div>
  );
};

export default FollowedProducts;
