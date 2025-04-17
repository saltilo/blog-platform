import React from "react";
import { Alert } from "antd";

const ErrorMessage = ({ text = "Что-то пошло не так" }) => (
  <Alert message="Ошибка" description={text} type="error" showIcon />
);

export default ErrorMessage;
