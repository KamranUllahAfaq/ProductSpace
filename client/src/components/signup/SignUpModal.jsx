import React, { useState } from "react";
import { Typography, Input, Button, Spin } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";

import InvalidData from "./InvalidData";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const SignUpModal = ({ setSignInOpen, setSignUpOpen }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isEmailValid: true,
    isPasswordValid: true,
  });

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

  const passwordChange = (event) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (reg.test(String(event.target.value))) {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        isPasswordValid: true,
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        isPasswordValid: false,
      });
    }
    if (event.target.value === "") {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        isPasswordValid: true,
      });
    }
  };

  const changeValue = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const signUp = async () => {
    if (
      values.isEmailValid &&
      values.email &&
      values.password &&
      values.name &&
      values.isPasswordValid &&
      values.password === values.confirmPassword
    ) {
      setLoading(true);

      try {
        await axios
          .post(`${REST_API_ENDPOINT}auth/register`, values)
          .then((res) => {
            toast.success("User Account Created Successfully.");
            setSignUpOpen(false);
            setSignInOpen(true);
          });
      } catch (error) {
        console.log(error);
        toast.error("Error Occured");
      }
      setLoading(false);
    } else {
      toast.error("Please Enter All the Fields Correctly");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
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
          <Typography.Title level={4}>Create a New Account</Typography.Title>
        </div>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Full Name
        </Typography.Text>
        <Input
          size="large"
          value={values.name}
          placeholder="Your Name"
          name="name"
          onChange={(e) => {
            changeValue(e);
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>Email</Typography.Text>
        <Input
          value={values.email}
          size="large"
          placeholder="Your Email"
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
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          value={values.password}
          size="large"
          type="password"
          placeholder="Your Password"
          name="password"
          onChange={passwordChange}
        />
        {values.isPasswordValid ? null : <InvalidData state="Password" />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
        <Typography.Text style={{ fontWeight: "bold" }}>
          Confirm Password
        </Typography.Text>
        <Input.Password
          visibilityToggle={{
            visible: confirmPasswordVisible,
            onVisibleChange: setConfirmPasswordVisible,
          }}
          value={values.confirmPassword}
          size="large"
          type="password"
          placeholder="Your Confirm Password"
          name="confirmPassword"
          onChange={changeValue}
        />
        {values.confirmPassword === values.password ? null : (
          <InvalidData state="Confirm Password" />
        )}
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
          <Spin />
        ) : (
          <Button
            type="primary"
            onClick={signUp}
            size="large"
            style={{ width: "100%", borderRadius: 14 }}
          >
            Sign Up
          </Button>
        )}
        <Button
          type="text"
          onClick={() => {
            setSignUpOpen(false);
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
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignUpModal;
