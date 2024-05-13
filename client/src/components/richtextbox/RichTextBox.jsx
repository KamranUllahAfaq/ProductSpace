import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { Button } from "antd";
function RichTextBox({ setValue }) {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <div>
      <ReactQuill
        modules={modules}
        theme="snow"
        placeholder="Content goes here..."
        onChange={setValue}
        style={{ height: 400 }}
      />
    </div>
  );
}

export default RichTextBox;
