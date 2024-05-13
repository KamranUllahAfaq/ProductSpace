import Typography from "antd/es/typography/Typography";
import React, { useState, useCallback, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Line,
} from "recharts";
import moment from "moment";
import axios from "axios";
import { Collapse, Table, Tag, Space } from "antd";
const { Panel } = Collapse;
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const EventCard = ({ event }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEventTools = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get(
          `${REST_API_ENDPOINT}tools/event/${event._id}`,

          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const pieData = [
            { name: "Male", value: res.data.going.Male },
            { name: "Female", value: res.data.going.Female },
            { name: "Other", value: res.data.going.Other },
          ];
          setPieChartData(pieData);
          const barData = [
            { name: "Going", uv: res.data.guestCount },
            { name: "Interested", uv: res.data.interestedCount },
          ];
          setBarChartData(barData);
          const mydata = res.data.guestList.map((row, index) => {
            return {
              key: index,
              id: row._id,
              name: row.name,
              email: row.email,
              age: row.age,
              gender: row.gender,
            };
          });
          setTableData(mydata);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEventTools();
  }, []);
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(226,176,206,0.2) 0%, rgba(194,180,217,0.2) 53%, rgba(238,174,202,0.2) 100%)",
        padding: 20,
        borderRadius: 30,
      }}
    >
      <Collapse accordion style={{ backgroundColor: "white" }}>
        <Panel key="1" header={<CustomHeader event={event} />}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <PieChart1 data1={pieChartData} />
            <BarChart1 data1={barChartData} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography style={{ fontWeight: "bold", fontSize: 18 }}>
              Guests List
            </Typography>
            <CustomTable data={tableData} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

const CustomTable = ({ data }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

const CustomHeader = ({ event }) => {
  return (
    <div>
      <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
        {event.title}
      </Typography>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography style={{ fontSize: 16 }}>({event.venue})</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div>
          <Typography style={{ fontSize: 12 }}>Start Date</Typography>
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {moment(event.startDate).format("MMM Do YYYY")}
          </Typography>
        </div>
        <div>
          <Typography style={{ fontSize: 12 }}>End Date</Typography>
          <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
            {moment(event.endDate).format("MMM Do YYYY")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const PieChart1 = ({ data1 }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%" aspect={1}>
      <PieChart width={500} height={500}>
        <Pie
          data={data1}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="black"
          dataKey="value"
        >
          {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const BarChart1 = ({ data1 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data1[activeIndex];

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <p style={{ fontSize: 15 }}>Interested / Going Ratio </p>
      <BarChart width={300} height={300} data={data1}>
        <Bar dataKey="uv" onClick={handleClick}>
          {data1.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="content">{`No. of "${activeItem.name}" People: ${activeItem.uv}`}</p>
    </div>
  );
};

export default EventCard;
