import React, { useState, useEffect } from "react";
import { Typography, Input, Radio } from "antd";
import { SearchOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import News from "./News";
const Newsletter = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Technology");

  const fetchNewsData = async () => {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news",
      params: {
        count: "40",
        category: type,
        mkt: "en-US",
        safeSearch: "Off",
        textFormat: "Html",
      },
      headers: {
        "content-type": "application/octet-stream",
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "344f9fb632msh482a89fa4894a88p15ba6djsn2ff247622286",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setNews(response.data.value);
      setFilteredNews(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  const filterNews = (value) => {
    setSearch(value);
    setFilteredNews(
      news.filter((m) => {
        return m.name.includes(value);
      })
    );
    if (value === "") {
      setFilteredNews(news);
    }
  };
  useEffect(() => {
    fetchNewsData();
  }, [type]);
  return (
    <div style={{ marginTop: "10px", paddingInline: "20%" }}>
      <div>
        <div
          style={{
            backgroundColor: "#eef2ff",
            width: "100%",
            height: "150px",
            alignItems: "center",
            display: "flex",
            padding: "20px",
          }}
        >
          <Typography
            style={{
              color: "black",
              fontSize: "22px",
              width: "500px",
              fontWeight: "bold",
            }}
          >
            💌 Join 500K+ subscribers who get the best of tech every day right
            to their inbox
          </Typography>
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="New">New</Radio.Button>
            <Radio.Button value="Technology">Technology</Radio.Button>
            <Radio.Button value="Web3">Web3</Radio.Button>
            <Radio.Button value="Finance">Finance</Radio.Button>
          </Radio.Group>
          <Input
            placeholder="Search News"
            style={{ width: 500 }}
            prefix={<SearchOutlined />}
            size="large"
            value={search}
            onChange={(event) => filterNews(event.target.value)}
          />
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <News news={filteredNews} />
      </div>
    </div>
  );
};

export default Newsletter;
