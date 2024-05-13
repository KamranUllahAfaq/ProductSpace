import { Typography } from "antd";
import React from "react";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src="/Login.jpg" alt="Login" width={500} />
      <Typography style={{ fontSize: 40, fontWeight: "bolder" }}>
        Login First
      </Typography>
    </div>
  );
};

export default Login;
