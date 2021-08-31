import React from "react";

const style = {
  width: "100vw",
  height: "10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const font = {
  color: "#017FFF",
};
const NotFound = () => {
  return (
    <div style={style}>
      <h1 style={font}>PAGE NOT FOUND</h1>
    </div>
  );
};

export default NotFound;
