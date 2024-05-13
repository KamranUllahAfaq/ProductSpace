import React from "react";
import { Typography, Input, Button, Divider, Menu } from "antd";
import Thumbnail from "../../components/addproducts/Thumbnail";
import Gallery from "../../components/addproducts/Gallery";

const ImagesMedia = ({ productData, setProductData, setMenu }) => {
  return (
    <div>
      <div>
        <Typography.Title level={3}>Thumbnail</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Let's make your product look nice
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Thumbnail
            productData={productData}
            setProductData={setProductData}
          />
          <Typography.Text style={{ fontSize: 12 }}>
            Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB
          </Typography.Text>
          <br />
          {productData.thumbnail &&
            typeof productData.thumbnail === "string" && (
              <Typography.Text style={{ fontSize: 12 }}>
                {productData.thumbnail}
              </Typography.Text>
            )}
        </div>

        <Divider />
      </div>
      <div>
        <Typography.Title level={3}>Gallery</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          The first image will be used as the social preview when your link is
          shared online. We recommend at least 3 or more images.{" "}
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Gallery productData={productData} setProductData={setProductData} />
          <Typography.Text style={{ fontSize: 12 }}>
            Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB
          </Typography.Text>
          <br />
          {productData.gallery.length > 0 &&
            typeof productData.gallery[0] === "string" &&
            productData.gallery.map((pic) => (
              <Typography.Text style={{ fontSize: 12 }}>{pic} </Typography.Text>
            ))}
        </div>
        <Divider />
      </div>
      <div>
        <Typography.Title level={3}>Youtube Video</Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          This is optional but we find that showing how your product works is
          helpful to convince people. If you do add a video, it will appear as
          the first item in your gallery when you launch.
        </Typography.Text>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Typography.Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Youtube Link
          </Typography.Text>
          <Input
            size="large"
            placeholder="Video of the product"
            name="youtubeLink"
            value={productData.youtubeLink}
            onChange={(event) => {
              setProductData({
                ...productData,
                youtubeLink: event.target.value,
              });
            }}
          />
        </div>
        <Divider />
      </div>

      <div
        style={{
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setMenu("makers");
          }}
        >
          Next Step: Makers
        </Button>
      </div>
    </div>
  );
};

export default ImagesMedia;
