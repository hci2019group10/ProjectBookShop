import React, { useContext } from "react";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CartContext } from "../context/CartContext";
// util
import GetSingleProductById from "../util/GetSingleProductById";
// component
import CartItem from "./CartItem";
// design
import "antd/dist/antd.css";
import { Input } from "antd";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = () => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get cart-context
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;

  let totalPrice = 0;

  return (
    <div className="cart_wrapper">
      <div className="cart_wrapper_header">
        <span className="cart_wrapper_title">Shopping bag</span>
      </div>
      <div className="cart_wrapper_body">
        <div className="cart">
          <div className="cart_header">
            <div className="text" style={{ width: "40%", paddingLeft: "1rem" }}>
              Product: ({cartItems.length} products)
            </div>
            <div className="text" style={{ width: "20%" }}>
              Price
            </div>
            <div className="text" style={{ width: "20%" }}>
              Quantity
            </div>
            <div className="text" style={{ width: "20%" }}>
              Update
            </div>
          </div>
          <div className="cart_body">
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItemProps={cartItem}
                totalPrice={
                  (totalPrice +=
                    (GetSingleProductById(cartItem.product) &&
                      GetSingleProductById(cartItem.product).price) *
                    cartItem.quantity)
                }
              />
            ))}
          </div>
        </div>
        <div className="promotion_and_order">
          <div className="cart_header">
            <FiShoppingBag />{" "}
            <i>Shopping bag have {cartItems.length} products</i>
          </div>
          <div className="promotion">
            <span className="promotion_title">Discount code</span>
            <Input placeholder="Enter the discount code" allowClear />
          </div>
          <div className="price">
            <div className="total_price">
              <span className="text">Total price:</span>
              <span className="number">{`${totalPrice / 1000}.000 đ`}</span>
            </div>
            <div className="after_promotion">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="text">After discount:</span>
                <span className="text">- 0%</span>
              </div>
              <span className="number">{`${
                (totalPrice * 1) / 1000
              }.000 đ`}</span>
            </div>
          </div>
          {userSession.loggedin === false ? (
            <div></div>
          ) : (
            <Link
              to={{
                pathname: "/orderprocess",
                state: {
                  totalPrice: totalPrice,
                },
              }}
            >
              <button className="btn_proceedtoorder">PROCEED TO ORDER</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
