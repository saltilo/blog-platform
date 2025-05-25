import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { App as AntdApp, ConfigProvider } from "antd";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ConfigProvider>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </AuthProvider>
);
