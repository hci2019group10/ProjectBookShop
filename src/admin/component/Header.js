import React, { useContext, useState } from "react";
// logo
import logo from "../../logo.svg";
// router dom
import { Link, useHistory } from "react-router-dom";
// component
// context
import { UserSessionContext } from "../../context/UserSessionContext";
import { CategoryContext } from "../../context/CategoryContext";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
// design
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { Navbar, Badge } from "react-bootstrap";
import { Menu, Dropdown, Input } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import { FiUser, FiList, FiShoppingBag } from "react-icons/fi";

// custom css
const linkStyle = {
  textDecoration: "none",
  color: "white",
};
const linkMenuItemStyle = {
  textDecoration: "none",
  fontSize: "14px",
};
const linkMyAccount = {
  textDecoration: "none",
  fontSize: "16px",
};
const linkMenuItemStyleBig = {
  textDecoration: "none",
  fontSize: "16px",
};
const fontSizeIcon = {
  fontSize: "2.5rem",
};
const fontSizeIcon2rem = {
  fontSize: "2rem",
};
const searchInput = {
  height: "2.5rem",
  borderTopLeftRadius: "1px",
  borderBottomLeftRadius: "1px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  border: "none",
};

const Header = () => {
  const history = useHistory();
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get all categories
  const [categories, setCategories] = useContext(CategoryContext);
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  // get all cart-items by user id
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;


  // * logout method
  const logout = () => {
    try {
      localStorage.clear();
      setUserSession({
        loggedin: false,
        username: "Account",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // header-item: account item dropdown
  const accountItemDropdown =
    // depends on the user-session loggedin property
    userSession.loggedin === false ? (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <Link to="/signup" style={linkMenuItemStyleBig}>
              Sign up
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login" style={linkMenuItemStyleBig}>
              Login
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/sendmail" style={linkMenuItemStyleBig}>
              Send mail
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    ) : (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <Link to="/user/account/profile" style={linkMyAccount}>Account Info</Link>
             
          </Menu.Item>
          <Menu.Item>
            <Link to="/verify" style={linkMenuItemStyleBig}>
              Verify account
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/ordertablelist" style={linkMenuItemStyleBig}>
              My order list
            </Link>
          </Menu.Item>
          <Menu.Item>
            <p onClick={logout}>Logout</p>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );

  return (
    <Navbar sticky="top" className="header" expand="lg">
       
      <div className="header_nav">
        {/* LOGO --------------------------------------------------------------------------- */}
        <div className="header_logo">
          <img
            src={logo}
            width="40"
            height="40"
            className="header_logo d-inline-block align-top"
            alt=""
          />{" "}
          <Link to="/" style={linkStyle}>
            <p className="header_logo_text">Admin</p>
          </Link>
        </div>
       
        
        {/* HEADER ACCOUNT ITEM DROPDOWN --------------------------------------------------------- */}
        <div className="header_account">
          <Dropdown overlay={accountItemDropdown} trigger={["click"]} arrow>
            <a
              style={linkStyle}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="custom_header_item">
                <FiUser style={fontSizeIcon2rem} />
                <div className="text">
                  <span className="text1">Account</span>
                  <span className="text2">
                    {userSession.username} <BsCaretDownFill />
                  </span>
                </div>
              </div>
            </a>
          </Dropdown>
        </div>
        
      </div>
    </Navbar>
  );
};

export default Header;
