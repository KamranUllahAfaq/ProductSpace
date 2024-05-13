import React from "react";
import { Typography } from "antd";
import MakersCard from "../products/makerscard/MakersCard";

const Following = ({ following }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {following.length > 0 ? (
        <>
          {following.map((user) => (
            <MakersCard user={user} />
          ))}
        </>
      ) : (
        <Typography style={{ fontSize: 20, textAlign: "center" }}>
          No Followed Users
        </Typography>
      )}
    </div>
  );
};

export default Following;
