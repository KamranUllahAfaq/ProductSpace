import { Button, Avatar, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import { authActions } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);

  const handleImgUpload = async (e) => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        await axios
          .post(`${REST_API_ENDPOINT}user/uploadImage`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(authActions.updateUser({ user: res.data }));
            toast.success("Image Updated Successfully");
            window.location.reload(false);
          });
      } catch (error) {
        toast.error("Trouble Uploading the Image");

        console.log(error);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: 50 }}>
        {user.image && (
          <Avatar
            shape="square"
            src={user.image}
            style={{
              height: 96,
              mb: 2,
              width: 96,
            }}
          ></Avatar>
        )}
        {!user.image && (
          <Avatar
            shape="square"
            style={{
              height: 96,
              mb: 2,
              width: 96,
            }}
          ></Avatar>
        )}
        <form style={{ marginTop: 30 }}>
          <input
            type="file"
            accept={"image/*"}
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          ></input>
        </form>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Button
          size="large"
          style={{ marginLeft: 10 }}
          onClick={() => {
            handleImgUpload();
          }}
        >
          Upload my avatar
        </Button>
      )}
    </div>
  );
};
export default App;
