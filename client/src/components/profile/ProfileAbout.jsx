import React from "react";
import { Typography, Card } from "antd";

const ProfileAbout = ({ about }) => {
  return (
    <div
      style={{
        justifyContent: "center",
        marginTop: 50,
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
      }}
    >
      <Typography.Title level={5}>About</Typography.Title>
      <Card style={{ backgroundColor: "white", padding: 10, borderRadius: 20 }}>
        {about
          ? about
          : "Add a bio to help people get a better idea of you, your skills, history, and talents"}
      </Card>
    </div>
  );
};

export default ProfileAbout;
