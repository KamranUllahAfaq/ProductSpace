import { Avatar, Typography } from "antd";
import React from "react";
import ProductCard from "../products/productcard/ProductCard";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid lightgrey",
        borderRadius: 20,
        maxHeight: 500,
        overflow: "scroll",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/collection/details/${collection._id}`)}
    >
      <div>
        <Typography style={{ fontSize: 23, fontWeight: "bold" }}>
          {collection.title}
        </Typography>
        <Typography style={{ fontSize: 12, marginTop: 10 }}>
          Created By: {collection.createdBy.name}
        </Typography>
        <Typography style={{ fontSize: 14, marginTop: 10 }}>
          {collection.tagline}
        </Typography>
        <div>
          {collection?.products.map((product) => (
            <div>
              <div className="product">
                <div className="innerContainer">
                  <div>
                    <img
                      src={product.thumbnail}
                      alt="logo"
                      style={{ width: 40 }}
                    />
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
                      <Typography.Text
                        style={{ fontSize: 12, fontWeight: "bold" }}
                      >
                        {product.name}
                      </Typography.Text>
                      <Typography.Text>{product.tagline}</Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
