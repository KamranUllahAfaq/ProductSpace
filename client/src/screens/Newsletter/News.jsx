import { Row, Typography, Col } from "antd";
import React from "react";
import moment from "moment";
const News = ({ news }) => {
  return (
    <div>
      <Row gap={4}>
        <Col lg={{ span: 14 }} md={{ span: 24 }}>
          <div
            style={{ width: 550, height: 400, cursor: "pointer" }}
            onClick={() => {
              window.open(news[0].url);
            }}
          >
            <img
              src={
                news[0]?.image?.thumbnail?.contentUrl ||
                news[0]?.provider[0]?.image?.thumbnail?.contentUrl
              }
              alt="news-thumb"
              style={{ width: "inherit", height: "inherit" }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                style={{ fontSize: 12, fontWeight: "light", marginRight: 10 }}
              >
                {news[0]?.provider[0]?.name}
              </Typography>
              <Typography
                style={{ fontSize: 12, fontWeight: "light", marginRight: 10 }}
              >
                {news[0]?._type}
              </Typography>
              <Typography
                style={{ fontSize: 12, fontWeight: "light", marginRight: 10 }}
              >
                {moment(news[1]?.datePublished).format("MMM Do YYYY")}
              </Typography>
            </div>
            <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
              {news[0]?.name}
            </Typography>
          </div>
        </Col>
        <Col lg={{ span: 9, offset: 1 }} md={{ span: 24 }}>
          <div
            style={{ width: 350, height: 150, cursor: "pointer" }}
            onClick={() => {
              window.open(news[1].url);
            }}
          >
            <img
              src={
                news[1]?.image?.thumbnail?.contentUrl ||
                news[1]?.provider[0]?.image?.thumbnail?.contentUrl
              }
              alt="news-thumb"
              style={{ width: "inherit", height: "inherit" }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {news[1]?.provider[0]?.name}
              </Typography>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {news[1]?._type}
              </Typography>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {moment(news[1]?.datePublished).format("MMM Do YYYY")}
              </Typography>
            </div>
            <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
              {news[1]?.provider[0]?.name}
            </Typography>
          </div>
          <div
            style={{
              width: 350,
              height: 150,
              marginTop: "100px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(news[2].url);
            }}
          >
            <img
              src={
                news[2]?.image?.thumbnail?.contentUrl ||
                news[2]?.provider[0]?.image?.thumbnail?.contentUrl
              }
              alt="news-thumb"
              style={{ width: "inherit", height: "inherit" }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {news[2]?.provider[0]?.name}
              </Typography>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {news[2]?._type}
              </Typography>
              <Typography
                style={{ fontSize: 10, fontWeight: "light", marginRight: 10 }}
              >
                {moment(news[2]?.datePublished).format("MMM Do YYYY")}
              </Typography>
            </div>
            <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
              {news[2]?.provider[0]?.name}
            </Typography>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: "100px" }}>
        <Row gutter={[16, 16]}>
          {news.slice(3).map((item, index) => (
            <Col
              style={{ marginTop: "20px" }}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 6 }}
            >
              <div
                style={{
                  width: 250,
                  height: 120,
                  marginTop: "100px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.open(item.url);
                }}
              >
                <img
                  src={
                    item?.image?.thumbnail?.contentUrl ||
                    item?.provider[0]?.image?.thumbnail?.contentUrl
                  }
                  alt="news-thumb"
                  style={{ width: "inherit", height: "inherit" }}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    style={{
                      fontSize: 10,
                      fontWeight: "light",
                      marginRight: 10,
                    }}
                  >
                    {item?.provider[0]?.name}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      fontWeight: "light",
                      marginRight: 10,
                    }}
                  >
                    {item?._type}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 10,
                      fontWeight: "light",
                      marginRight: 10,
                    }}
                  >
                    {moment(item.datePublished).format("MMM Do YYYY")}
                  </Typography>
                </div>
                <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {item.name}
                </Typography>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default News;
