import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <Spin style={{ color: "green" }} tip="Loading"></Spin>
    </div>
  );
};

export default Loader;
