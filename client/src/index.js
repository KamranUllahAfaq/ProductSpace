import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./state";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import toast, { Toaster } from "react-hot-toast";

const theme = {
  token: {
    colorPrimary: "#3D9970",
    colorSecondary: "#083128",
  },
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster toastOptions={{ position: "bottom-center" }} />
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
