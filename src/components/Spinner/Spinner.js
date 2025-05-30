import { Spin } from "antd";

const Spinner = () => (
  <Spin
    tip="Loading..."
    size="large"
    style={{ display: "block", margin: "50px auto" }}
  />
);

export default Spinner;
