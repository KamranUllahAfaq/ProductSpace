import React, { useState } from "react";
import { Typography, Input, Button, Spin, Modal } from "antd";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { authActions } from "../../state";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InvalidData from "./InvalidData";
import { toast } from "react-hot-toast";
import ForgotPasswordModal from "./ForgotPasswordModal";
const CLIENT_ID = "avs";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const SignInModal = ({ setSignInOpen, setSignUpOpen }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    isEmailValid: true,
    isPasswordValid: true,
  });
  const [isLoading, setLoading] = useState(false);

  const emailChange = (event) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(String(event.target.value).toLowerCase())) {
      setValues({
        ...values,
        email: event.target.value,
        isEmailValid: true,
      });
    } else {
      setValues({
        ...values,
        email: event.target.value,
        isEmailValid: false,
      });
    }
    if (event.target.value === "") {
      setValues({
        ...values,
        email: event.target.value,
        isEmailValid: true,
      });
    }
  };

  const changeValue = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const signIn = async () => {
    if (values.isEmailValid && values.email && values.password) {
      setLoading(true);

      try {
        await axios
          .post(`${REST_API_ENDPOINT}auth/login`, values)
          .then(async (response) => {
            if (response.data) {
              await new Promise((resolve) => {
                dispatch(authActions.login(response.data));
                resolve();
              }).then(() => {
                // navigate("/loading");
                setSignInOpen(false);
                window.location.reload(false);
                toast.success("Logged In Successfully");
              });
            } else {
              toast.error("Error Occurred");
            }
          });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Error Occurred");
      }
      setLoading(false);
    } else {
      toast.error("Please Enter All the Fields");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="./logo.png" alt="r" width={200} />
          <Typography.Title level={4}>Welcome Back</Typography.Title>
        </div>
        <Typography.Text style={{ fontWeight: "bold" }}>Email</Typography.Text>
        <Input
          size="large"
          placeholder="Your Email"
          value={values.email}
          name="email"
          onChange={emailChange}
        />
        {values.isEmailValid ? null : <InvalidData state="Email" />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Password
        </Typography.Text>
        <Input.Password
          size="large"
          type="password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          placeholder="Your Password"
          value={values.password}
          name="password"
          onChange={(e) => {
            changeValue(e);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Button
          type="link"
          onClick={() => {
            setForgotOpen(true);
          }}
        >
          Forgot Password?
        </Button>
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <Spin style={{ color: "green" }} />
        ) : (
          <Button
            type="primary"
            onClick={signIn}
            size="large"
            style={{ width: "100%", borderRadius: 14 }}
          >
            Login
          </Button>
        )}

        <Button
          type="text"
          onClick={() => {
            setSignInOpen(false);
            setSignUpOpen(true);
          }}
          size="large"
          style={{
            width: "100%",
            marginTop: 6,
            borderRadius: 14,
            backgroundColor: "lightgrey",
          }}
        >
          Sign Up
        </Button>
      </div>
      <Modal
        centered
        open={forgotOpen}
        onOk={() => setForgotOpen(false)}
        onCancel={() => setForgotOpen(false)}
        footer={null}
      >
        <ForgotPasswordModal
          setForgotOpen={setForgotOpen}
          setSignInOpen={setSignInOpen}
        />
      </Modal>
    </div>
  );
};

export default SignInModal;
