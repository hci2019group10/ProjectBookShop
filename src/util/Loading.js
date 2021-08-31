import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const style = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "1rem",
};

const font = {
  color: "#017FFF",
  fontSize: "1.5rem",
};

const Loading = () => {
  return (
    <div style={style}>
      <LoadingOutlined style={font} />
      <p style={font}>Loading ...</p>
    </div>
  );
};

export default Loading;
