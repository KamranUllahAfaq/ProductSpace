import React from "react";
import { Input, Card, Button, Dropdown } from "antd";
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
const HeaderCard = () => {
  return (
    <div>
      <Card
        size="small"
        title="Which App Do you use the most on your phone?"
        extra={
          <a href="#">
            <RetweetOutlined />
          </a>
        }
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
        />
      </Card>
    </div>
  );
};

export default HeaderCard;
