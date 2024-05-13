import React, { useState } from "react";
import { Layout, Space, Menu, Input, Avatar, Segmented, Button } from "antd";

const ProfileButtons = ({ menu, setMenu }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <Segmented
        size="large"
        value={menu}
        onChange={setMenu}
        options={["About", "Followed Products", "Following", "Products"]}
      />
    </div>
  );
};

export default ProfileButtons;
