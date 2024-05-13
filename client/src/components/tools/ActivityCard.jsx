import { LikeFilled } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import Typography from "antd/es/typography/Typography";
import React from "react";

const ActivityCard = ({ title, CompIcon, stat }) => {
  const colors = [
    "#FFB093",
    "#D1CBC4",
    "#FFCD72",
    "#E3DDB2",
    "#CDDDAD",
    "##98CCE6",
    "#A1B8E3",
    "#C6BDF8",
    "#F498D2",
  ];

  function getRandomColor() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 8);
    return colors[randomNumber];
  }
  return (
    <div
      style={{
        padding: 12,
        backgroundColor: getRandomColor(),
        border: "1px solid gray",
        width: 260,
        borderRadius: 12,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontSize: 28, fontWeight: "bold" }}>
          {stat}
        </Typography>
        <CompIcon style={{ fontSize: 24 }} />
      </div>
      <Typography style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        {title}
      </Typography>
    </div>
  );
};

export default ActivityCard;
