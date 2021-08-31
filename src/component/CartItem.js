import React, { useContext } from "react";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { AuthorContext } from "../context/AuthorContext";
import getAuthorName from "../util/getAuthorName";
// util
import { customFetchAuth } from "../util/customFetch";
// design
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";

const CartItem = (props) => {
  const { cartItemProps } = props;
  //
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // update cart
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [eventClickCartItem, setEventClickCartItem] = cartContextValue2;
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  //
  // get single product
  const getProductInfo = () => {
    const index = products.findIndex(
      (product) => product.id === cartItemProps.product
    );
    return products[index];
  };
  const getProduct = getProductInfo();
  // get all author
  const [authors, setAuthors] = useContext(AuthorContext);
  const authorName = getAuthorName(authors, getProduct.author);

  // update increase quantity ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const increaseCartItemQuantity = async () => {
    const URL = "/api/cartitems";
    const cartItem = {
      id: cartItemProps.id,
      user: {
        id: cartItemProps.user,
      },
      product: {
        id: cartItemProps.product,
      },
      quantity: cartItemProps.quantity + 1,
    };
    const bodyContent = JSON.stringify(cartItem);
    try {
      const response = await customFetchAuth(URL, "PUT", bodyContent, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setEventClickCartItem(Math.random()); // rerender cart
  };

  // update decrease quantity +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const decreaseCartItemQuantity = async () => {
    const URL = "/api/cartitems";
    // if quantity = 1, can not reduce anymore
    const remainQuantity =
      cartItemProps.quantity > 2 ? cartItemProps.quantity - 1 : 1;
    const cartItem = {
      id: cartItemProps.id,
      user: {
        id: cartItemProps.user,
      },
      product: {
        id: cartItemProps.product,
      },
      quantity: remainQuantity,
    };
    const bodyContent = JSON.stringify(cartItem);
    try {
      const response = await customFetchAuth(URL, "PUT", bodyContent, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setEventClickCartItem(Math.random());
  };

  // delete cart-item ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const deleteCartItem = async () => {
    const URL = `/api/cartitems/${cartItemProps.id}`;
    try {
      const response = await customFetchAuth(URL, "DELETE", null, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) throw new Error(response.status);
    } catch (error) {
      console.log(error);
    }
    setEventClickCartItem(Math.random());
  };

  return (
    <div className="cart_item">
      <div className="product_id_image" style={{ width: "40%" }}>
        <img
          alt="..."
          className="product_image"
          width="80"
          height="80"
          src={getProduct.mainImage}
        ></img>
        <div className="product_title">
          <span className="text1">{getProduct.title}</span>
          <span className="text2">{authorName}</span>
        </div>
      </div>
      <div className="product_price" style={{ width: "20%" }}>
        <span>{`${getProduct.price / 1000}.000 đ`}</span>
      </div>
      <div style={{ width: "20%", paddingLeft: "1rem" }}>
        <span className="quantity">{cartItemProps.quantity}</span>
      </div>
      <div
        className="group_button"
        style={{ width: "20%", paddingRight: "1rem" }}
      >
        <Tooltip title="Decrease 1">
          <Button
            type="primary"
            onClick={decreaseCartItemQuantity}
            shape="circle"
            icon={<BiMinus></BiMinus>}
          />
        </Tooltip>
        <Tooltip title="Increase 1">
          <Button
            type="primary"
            onClick={increaseCartItemQuantity}
            shape="circle"
            icon={<BiPlus></BiPlus>}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="primary"
            onClick={deleteCartItem}
            danger
            shape="circle"
            icon={<RiCloseLine></RiCloseLine>}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default CartItem;
