import React, { useState, useEffect, createContext, useContext } from "react";
// context
import { UserSessionContext } from "./UserSessionContext";
// util
import useDidMountEffect from "../component/useDidMountEffect";
import { customFetchAuth } from "../util/customFetch";

export const CartContext = createContext();

export const CartProvider = (props) => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;

  // initialize
  const [cartItems, setCartItems] = useState([]);
  const [eventClickCartItem, setEventClickCartItem] = useState(0);

  const getCartItems = async () => {
    const URL = `/api/cart/${userSession.id}`;
    try {
      if (userSession.loggedin !== false) {
        const response = await customFetchAuth(URL, "GET", null, {
          username: userSession.username,
          password: userSession.password,
        });
        console.log("cart: ", userSession.username, userSession.password);
        if (!response.ok) {
          throw new Error("Problem get cart");
        }
        const data = await response.json();
        console.log(data);
        setCartItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useDidMountEffect(getCartItems, [userSession, eventClickCartItem]);

  return (
    <CartContext.Provider
      value={{
        cartContextValue1: [cartItems, setCartItems],
        cartContextValue2: [eventClickCartItem, setEventClickCartItem],
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
