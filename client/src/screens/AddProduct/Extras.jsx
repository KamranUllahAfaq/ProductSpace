import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Button,
  Radio,
  Space,
  Divider,
  Checkbox,
} from "antd";

const Extras = ({ productData, setProductData, setMenu }) => {
  const [value, setValue] = useState("Free");
  const onChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
    setValue(event.target.value);
  };

  return (
    <div>
      <div>
        <Typography.Title level={3}>Pricing</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Optional, but the community really appreciates knowing.
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Radio.Group
            onChange={onChange}
            value={productData.pricing}
            name="pricing"
          >
            <Space direction="vertical">
              <Radio value="Free" style={{ fontWeight: "bold" }}>
                Free{" "}
              </Radio>
              <Typography.Text style={{ marginLeft: 30, fontSize: 14 }}>
                This product is free to use
              </Typography.Text>
              <Radio value="Paid" style={{ fontWeight: "bold" }}>
                Paid{" "}
              </Radio>
              <Typography.Text style={{ marginLeft: 30, fontSize: 14 }}>
                This product requires payment and there is no free option
              </Typography.Text>
              <Radio
                value="Paid with Free Trial"
                style={{ fontWeight: "bold" }}
              >
                Paid with Free Trial
              </Radio>
              <Typography.Text style={{ marginLeft: 30, fontSize: 14 }}>
                This product requires payment but also offers a free trial or
                version
              </Typography.Text>
            </Space>
          </Radio.Group>
        </div>
        <Divider />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={4}>Write the first comment</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          This comment will be posted when your product launches. Adding a first
          comment is essential to get the discussion started.
        </Typography.Text>
        <Input.TextArea
          style={{ marginTop: 20 }}
          size="large"
          rows={5}
          placeholder="Explain how you discovered this product? Invite other people to join the conversation"
          value={productData.firstComment}
          name="firstComment"
          onChange={onChange}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Typography.Title level={4}>Ambassador Program</Typography.Title>
        <Typography.Text
          style={{ fontSize: 16, marginTop: 20, marginBottom: 20 }}
        >
          Hire Applicants as an Ambassador for your product?
        </Typography.Text>
        <Checkbox
          checked={productData.ambassadorProgram}
          onChange={(e) => {
            setProductData({
              ...productData,
              ambassadorProgram: e.target.checked,
            });
          }}
        >
          Accept Applicants
        </Checkbox>
      </div>

      <Button
        size="large"
        type="primary"
        style={{ marginTop: 40, marginBottom: 20 }}
        onClick={() => {
          setMenu("launch");
        }}
      >
        Next Step: Launch Checklist
      </Button>
    </div>
  );
};

export default Extras;
