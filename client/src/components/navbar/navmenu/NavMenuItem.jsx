import React from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./navmenu.css";
const NavMenuItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="navItem"
      onClick={() => {
        if (item.link === "/products/Web3") {
          navigate(item.link, {
            state: {
              topic: "Web3",
              desc: "The future on blockchain. All things wagmi, ngmi, and more.",
            },
          });
        } else {
          navigate(item.link);
        }
      }}
    >
      {item.icon}
      <div style={{ marginLeft: 10, display: "flex", flexDirection: "column" }}>
        <Typography.Text style={{ fontSize: 16 }}>{item.name}</Typography.Text>
        <Typography.Text style={{ fontSize: 12 }}>
          {item.headline}
        </Typography.Text>
      </div>
    </div>
  );
};

export default NavMenuItem;
