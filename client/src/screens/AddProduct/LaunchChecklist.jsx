import React, { useState } from "react";
import { Typography, Button, Checkbox, Space, Divider, Spin } from "antd";
import { useParams } from "react-router-dom";

const LaunchChecklist = ({
  productData,
  setProductData,
  addProduct,
  loading,
}) => {
  const params = useParams();

  return (
    <div>
      <div>
        <Typography.Title level={3}>Required Info</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Check that you’ve completed all of the required information.
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Space direction="vertical">
            <Checkbox
              value="name"
              defaultChecked={productData.name ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Product Name
            </Checkbox>

            <Checkbox
              value="tagline"
              defaultChecked={productData.tagline ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Product tagline
            </Checkbox>

            <Checkbox
              value="description"
              style={{ fontSize: 16, marginTop: 10 }}
              defaultChecked={productData.description ? true : false}
            >
              Description
            </Checkbox>

            <Checkbox
              value="topics"
              defaultChecked={productData.topics ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Topics
            </Checkbox>
          </Space>
          <Space direction="vertical" style={{ marginLeft: 40 }}>
            <Checkbox
              value="thumbnail"
              defaultChecked={productData.thumbnail ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Thumbnail
            </Checkbox>
            <Checkbox
              value="gallery"
              defaultChecked={productData.gallery ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Add Images to Gallery
            </Checkbox>
          </Space>
        </div>
        <Divider />
      </div>
      <div>
        <Typography.Title level={3}>Suggested</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Go the extra mile and add suggested information. Successful launches
          usually do.
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Space direction="vertical">
            <Checkbox
              value="otherLinks"
              defaultChecked={productData.link ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Other Links
            </Checkbox>

            <Checkbox
              value="makers"
              defaultChecked={productData.makers ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Additional Makers
            </Checkbox>

            <Checkbox
              value="pricing"
              defaultChecked={productData.pricing ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Pricing
            </Checkbox>

            <Checkbox
              value="role"
              defaultChecked={productData.role ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Did you worked on this product?
            </Checkbox>
          </Space>
          <Space direction="vertical" style={{ marginLeft: 40 }}>
            <Checkbox
              value="youtubeLink"
              defaultChecked={productData.youtubeLink ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Youtube Video
            </Checkbox>
            <Checkbox
              value="comment"
              defaultChecked={productData.firstComment ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              First Comment{" "}
            </Checkbox>
            <Checkbox
              value="ambassador"
              defaultChecked={productData.ambassadorProgram ? true : false}
              style={{ fontSize: 16, marginTop: 10 }}
            >
              Ambassador Program
            </Checkbox>
          </Space>
        </div>
        <Divider />
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Button
          size="large"
          type="primary"
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={addProduct}
        >
          {params.id ? "Edit Product Details" : "Launch Product"}
        </Button>
      )}
    </div>
  );
};

export default LaunchChecklist;
