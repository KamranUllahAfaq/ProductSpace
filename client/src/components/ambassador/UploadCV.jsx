import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const UploadCV = ({ data, setData }) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      setData({
        ...data,
        cv: info.file.originFileObj,
      });
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
  };

  return (
    <Dragger name="cv" customRequest={dummyRequest} onChange={handleChange}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Upload at Your CV</p>
    </Dragger>
  );
};
export default UploadCV;
