import React from "react";
import Login from "../screens/Login/Login";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
  return <>{isAuthenticated ? <Element /> : <Login />}</>;
};

export default PrivateRoute;
