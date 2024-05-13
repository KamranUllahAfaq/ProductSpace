import React, { useState } from "react";
import { Typography, Input, Button, Spin } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "../../state";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InvalidData from "./InvalidData";
import { toast } from "react-hot-toast";

const REST_API_ENDPOINT = process.env.REACT_APP_API;
const ForgotPasswordModal = ({ setForgotOpen, setSignInOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    isEmailValid: true,
  });
  const [isLoading, setLoading] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);

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

  const forgotPassword = async () => {
    if (values.isEmailValid && values.email) {
      setLoading(true);

      try {
        await axios
          .put(`${REST_API_ENDPOINT}auth/forgotPassword`, values)
          .then(async (response) => {
            if (response.data) {
              toast.success("Password is sent to your Mail");

              setForgotOpen(false);
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
          <Typography.Title level={4}>Forgot Password</Typography.Title>
        </div>
        <Typography.Text style={{ textAlign: "center" }}>
          Please enter your registered email so password can be sent to your
          email
        </Typography.Text>

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
            onClick={forgotPassword}
            size="large"
            style={{ width: "100%", borderRadius: 14 }}
          >
            Send Email
          </Button>
        )}

        <Button
          type="text"
          onClick={() => {
            setForgotOpen(false);
            setSignInOpen(true);
          }}
          size="large"
          style={{
            width: "100%",
            marginTop: 6,
            borderRadius: 14,
            backgroundColor: "lightgrey",
          }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
