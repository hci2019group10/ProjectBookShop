import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "./Header";
import MenuBarAdmin from "./Menubar";
// context


// css
const customCarouselItem = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};
const fontSizeIcon = {
  fontSize: "2rem",
};

const Home = () => {


  return (
    <div className="home">
           <HeaderAdmin/>
            <MenuBarAdmin/>
           <p>home</p>
    </div>
  );
};

export default Home;
