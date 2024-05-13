import React, { useState } from "react";
import { Row, Col, Typography, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
const SubmitProduct = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }} style={{ height: "100vh" }}>
          <img
            src="./background.jpg"
            alt=""
            srcset=""
            width="100%"
            style={{ height: "100vh" }}
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12, offset: 1 }}
          style={{ paddingInline: "5%" }}
        >
          <div>
            <Typography.Title level={1}>Submit a Product</Typography.Title>
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography.Text style={{ fontSize: 18 }}>
              Found a cool product you want everyone to know about? Or maybe you
              made one yourself and want the world to know about it? You're in
              the right place. So relax and follow the steps.
            </Typography.Text>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
              }}
            >
              <Typography.Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Link to this product
              </Typography.Text>
              <Input size="large" placeholder="https://" name="link" />
            </div>
            <div style={{ marginTop: 30 }}>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  navigate("/addProductDetials");
                }}
              >
                Get Started
              </Button>
            </div>
            <div style={{ marginTop: 50 }}>
              <Typography.Title level={5}>
                Your existing drafts:
              </Typography.Title>
              <Button size="large" type="link">
                Post Draft
              </Button>
              <Button size="large" type="link">
                Post Draft
              </Button>
              <Button size="large" type="link">
                Post Draft
              </Button>
              <Button size="large" type="link">
                Post Draft
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubmitProduct;
