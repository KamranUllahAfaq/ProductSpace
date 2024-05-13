import React from "react";
import { Typography } from "antd";
const InvalidData = ({ state }) => {
  return (
    <div
      style={{
        marginTop: 4,
        padding: 10,
        borderRadius: 10,
        borderColor: "1px solid red",
        borderWidth: 1,
        display: "flex",
        backgroundColor: "lightpink",
      }}
    >
      <Typography.Text style={{ color: "red" }}>
        {state === "Password"
          ? "Password must be minimum eight characters, at least one letter and one number"
          : state === "Email"
          ? "Invalid Email"
          : state === "Confirm Password"
          ? "Confirm Password must be equal to Password"
          : null}
      </Typography.Text>
    </div>
  );
};

export default InvalidData;
