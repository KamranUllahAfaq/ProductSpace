import React, { useState } from "react";
import { Menu } from "antd";
import MyDetails from "../components/profile/MyDetails";
import ChangePassword from "./ChangePassword";

const items = [
  {
    label: "My Details",
    key: "my details",
  },
  {
    label: "Settings",
    key: "settings",
  },
];

const EditProfile = () => {
  const [current, setCurrent] = useState("my details");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
        paddingTop: 15,
        height: "100vh",
      }}
    >
      <Menu
        onClick={onClick}
        style={{
          display: "flex",
          alignSelf: "center",
          paddingInline: "10%",
        }}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {current === "my details" && <MyDetails />}
      {current === "settings" && <ChangePassword />}
    </div>
  );
};

export default EditProfile;
