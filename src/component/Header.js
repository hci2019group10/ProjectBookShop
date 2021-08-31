import React, { useContext, useState } from "react";
import HeaderAdmin from "../admin/component/Header";
import MenuBarAdmin from "../admin/component/Menubar";
// logo
import logo from "../logo.svg";
// router dom
import { Link, useHistory } from "react-router-dom";
// component
import AutoCompleteOption from "../component/AutoCompleteOption";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CategoryContext } from "../context/CategoryContext";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
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
  borderTopLeftRadius: "50px",
  borderBottomLeftRadius: "50px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  paddingLeft: "1.2rem",
  border: "none",
  outline: "none",
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

  // search
  const [search, setSearch] = useState("");
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // search auto complete
  const [optionSearchs, setOptionSearch] = useState([]);

  const submitSearchAction = (e) => {
    e.preventDefault();
    setOptionSearch([]);
    history.push(`/products/search/${search}`);
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
    } else {
      const options = products.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setOptionSearch(options);
    }
  };

  // header-item: categories item dropdown
  const menuCategories = (
    <Menu>
      <Menu.ItemGroup title="">
        <Menu.Item>
          <Link to="/products/all/" style={linkMenuItemStyle}>
            All Products
          </Link>
        </Menu.Item>
        {categories.map((category) => (
          <Menu.Item key={category.id}>
            <Link
              to={`/products/category/${category.id}`}
              style={linkMenuItemStyle}
            >
              {category.categoryName}
            </Link>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  // * logout method
  const logout = () => {
    try {
      localStorage.clear();
      setUserSession({
        loggedin: false,
        username: "login",
        password: "none",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //
  const redirectToLogin = () => {
    history.push({
      pathname: "/login",
      state: {
        from: "/signup",
      },
    });
  };

  // header-item: account item dropdown
  const accountItemDropdown =
    // depends on the user-session loggedin property
    userSession.loggedin === false ? (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <p onClick={redirectToLogin}>Sign In</p>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup" style={linkMenuItemStyleBig}>
              Sign Up
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/sendmail" style={linkMenuItemStyleBig}>
              Send Mail
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    ) : (
      <Menu>
        <Menu.ItemGroup title="">
          <Menu.Item>
            <Link to="/ordertablelist" style={linkMenuItemStyleBig}>
              Order list
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/user/account/profile" style={linkMenuItemStyleBig}>
              My Account
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/verify" style={linkMenuItemStyleBig}>
              Verify Account
            </Link>
          </Menu.Item>

          <Menu.Item>
            <p onClick={logout}>Sign Out</p>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    );

    console.log(userSession);

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
            <p className="header_logo_text">Bookshop</p>
          </Link>
        </div>
        {/* HEADER CATEGORIES ITEM ----------------------------------------------------------- */}
        <div className="header_category">
          <Dropdown overlay={menuCategories} trigger={["click"]} arrow>
            <a
              style={linkStyle}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <div className="custom_header_item">
                <FiList style={fontSizeIcon} />
                <div className="text">
                  <span className="text1">Product</span>
                  <span className="text2">
                    Categories <BsCaretDownFill />
                  </span>
                </div>
              </div>
            </a>
          </Dropdown>
        </div>
        {/* HEADER SEARCH FORM -------------------------------------------------------------- */}
        <form className="header_search_form" onSubmit={submitSearchAction}>
          <div className="search_input_container">
            <Input
              style={searchInput}
              placeholder="Search by product name ..."
              value={search}
              onChange={updateSearch}
              onKeyUp={autoComplete}
            />
            <div className="auto_complete">
              {optionSearchs.map((optionSearch) => (
                <AutoCompleteOption
                  key={optionSearch.id}
                  optionText={optionSearch.title}
                  productId={optionSearch.id}
                  categoryId={optionSearch.category}
                />
              ))}
            </div>
          </div>

          <button className="search_button" type="submit">
            <BiSearchAlt /> Search
          </button>
        </form>
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
        {/* HEADER CART ITEM --------------------------------------------------------------------- */}
        <div className="header_cart">
          <Link to={`/cart`} style={linkStyle}>
            <div className="custom_header_item">
              <FiShoppingBag style={fontSizeIcon2rem} />
              <div className="text">
                <div className="text1">Shopping</div>
                <div className="text2">
                  Bag{" "}
                  <Badge pill variant="warning" className="cart_badge">
                    {cartItems.length}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
