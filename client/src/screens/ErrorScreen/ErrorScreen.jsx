import React from "react";
import { Typography } from "antd";
const ErrorScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width={500} src="/Error.jpg" alt="Error 404" />
    </div>
  );
};

export default ErrorScreen;
