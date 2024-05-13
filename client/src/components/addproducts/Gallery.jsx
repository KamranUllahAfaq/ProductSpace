import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const Gallery = ({ productData, setProductData }) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      setProductData({
        ...productData,
        gallery: info.fileList.map((pic) => pic.originFileObj),
      });
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
  };

  return (
    <Dragger
      name="gallery"
      multiple={true}
      beforeUpload={beforeUpload}
      customRequest={dummyRequest}
      onChange={handleChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Upload at Least One Image</p>
    </Dragger>
  );
};
export default Gallery;
