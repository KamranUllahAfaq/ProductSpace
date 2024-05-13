import React, { useEffect, useState } from "react";
import { Typography, Input, Button, Spin, Row, Col, Divider } from "antd";
import "./styles.css";
import { colors } from "../../theme/Colors";
import axios from "axios";
const Web3header = ({ children }) => {
  const [coinData, setCoinData] = useState([]);
  const [sideBarData, setSideBarData] = useState([]);
  const fetchCoinData = () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": "344f9fb632msh482a89fa4894a88p15ba6djsn2ff247622286",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCoinData(response.data.data.coins);
        setSideBarData(response.data.data.coins.slice(0, 5));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCoinData();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", height: 300 }} className="web3header">
        <div>
          <Typography.Title
            style={{ color: "white", marginBottom: 0, fontWeight: "bold" }}
          >
            gm
          </Typography.Title>
          <Typography.Title
            style={{
              color: "#C21E56",
              marginTop: 0,
              fontWeight: "bold",
              fontSize: 60,
              marginBottom: 0,
            }}
          >
            Web 3
          </Typography.Title>
          <Typography.Text
            style={{ color: "white", marginTop: 0, fontSize: 20 }}
          >
            Latest Web 3 products
          </Typography.Text>
        </div>
        <div
          style={{
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
            padding: 20,
            width: 450,
            height: 230,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography.Text
            style={{ color: "#C21E56", marginTop: 0, fontSize: 20 }}
          >
            web 3
          </Typography.Text>
          <Typography.Text
            style={{ color: "white", marginTop: 0, fontSize: 20 }}
          >
            What is Dao?
          </Typography.Text>
          <Typography.Text
            style={{ color: "lightgray", marginTop: 0, fontSize: 14 }}
          >
            DAO (pronounced “Dow” like “the Dow Jones”) stands for Decentralized
            Autonomous Organization. That’s quite a mouthful to say all at once,
            which is why crypto-natives almost always say just simply “DAO.”
          </Typography.Text>
        </div>
        <div
          style={{
            backgroundColor: "black",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
            padding: 20,
            width: 450,
            height: 230,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography.Text
            style={{ color: "#C21E56", marginTop: 0, fontSize: 20 }}
          >
            web 3
          </Typography.Text>
          <Typography.Text
            style={{ color: "white", marginTop: 0, fontSize: 20 }}
          >
            What is play to earn?
          </Typography.Text>
          <Typography.Text
            style={{ color: "lightgray", marginTop: 0, fontSize: 14 }}
          >
            You need to buy an NFT to play the game.
          </Typography.Text>
          <Typography.Text
            style={{ color: "lightgray", marginTop: 0, fontSize: 14 }}
          >
            You earn in-game items in the form of NFTs and tokens as you play.
          </Typography.Text>
          <Typography.Text
            style={{ color: "lightgray", marginTop: 0, fontSize: 14 }}
          >
            You can reinvest these tokens into the game or cash them out for a
            profit.
          </Typography.Text>
        </div>
      </div>
      <div style={{ margin: 10 }}>
        <div className="inner">
          <div className="scroll-parent">
            <section className="scroll-element primary">
              {coinData.map((coin, index) => (
                <>
                  <img
                    src={coin.iconUrl}
                    height={17}
                    alt="coinpic"
                    style={{ marginLeft: 10, marginTop: 7 }}
                  ></img>
                  <Typography.Text style={{ fontSize: 12, marginLeft: 3 }}>
                    {coin.symbol}:
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 12, marginLeft: 3 }}>
                    {(Math.round(coin.price * 100) / 100).toFixed(2)}$
                  </Typography.Text>
                </>
              ))}
            </section>
            <section className="scroll-element secondary">
              {coinData.map((coin, index) => (
                <>
                  <img
                    src={coin.iconUrl}
                    height={17}
                    alt="coinpic"
                    style={{ marginLeft: 10, marginTop: 7 }}
                  ></img>
                  <Typography.Text style={{ fontSize: 12, marginLeft: 3 }}>
                    {coin.symbol}:
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 12, marginLeft: 3 }}>
                    {(Math.round(coin.price * 100) / 100).toFixed(2)}$
                  </Typography.Text>
                </>
              ))}
            </section>
          </div>
        </div>
      </div>
      <div>
        <Row style={{ paddingInline: "10%" }}>
          <Col xs={{ span: 23 }} lg={{ span: 7 }} style={{ height: "100vh" }}>
            <div style={{ marginTop: 100 }}>
              {sideBarData.map((item, index) => (
                <div
                  style={{
                    marginTop: 35,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: "10%",
                  }}
                >
                  <div>
                    <img src={item.iconUrl} height={30} alt="coinpic"></img>

                    <Typography.Text style={{ fontSize: 20, marginLeft: 20 }}>
                      {item.symbol}
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ fontSize: 20 }}>
                    {(Math.round(item.price * 100) / 100).toFixed(2)}$
                  </Typography.Text>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={{ span: 1 }} lg={{ span: 1 }}>
            <Divider type="vertical" style={{ height: "100vh", width: 1 }} />
          </Col>
          <Col
            xs={{ span: 23 }}
            lg={{ span: 15 }}
            style={{ paddingInline: "5%" }}
          >
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Web3header;
