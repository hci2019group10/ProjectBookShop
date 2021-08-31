import React, { useContext } from "react";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CartContext } from "../context/CartContext";
import { AuthorContext } from "../context/AuthorContext";
import getAuthorName from "../util/getAuthorName";
// util
import { customFetchAuth } from "../util/customFetch";
// design
import { AiFillStar } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { notification } from "antd";
import { Skeleton } from "antd";
// lazyload
import ProductCardLoading from "../util/ProductCardLoading";
import LazyLoad from "react-lazyload";

const openNotification = (placement) => {
  notification.success({
    message: "View your shopping bag!",
    description: "The product has been added to shopping bag.",
    placement,
  });
};

const ProductCard = (props) => {
  const { userId, productProps } = props;
  const history = useHistory();
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get cart-context
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  const [eventClickCartItem, setEventClickCartItem] = cartContextValue2;
  // get all author
  const [authors, setAuthors] = useContext(AuthorContext);
  const authorName = getAuthorName(authors, productProps.author);

  // get cart-item if already exist in cart with userId & productId
  const findCartItem = (userId, productId) => {
    const arrCartItem = cartItems.filter((cartItem) => {
      return cartItem.user === userId && cartItem.product === productId;
    });
    if (arrCartItem.length === 0) {
      return null;
    } else {
      return arrCartItem[0];
    }
  };

  // process add product to cart +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const addToCart = async () => {
    if (userSession.loggedin === false) {
      history.push({
        pathname: "/login",
        state: {
          from: "/nothing",
        },
      });
    } else {
      const getCartItem = findCartItem(userId, productProps.id);
      const cartItem = {
        id: getCartItem === null ? 0 : getCartItem.id,
        user: {
          id: userId,
        },
        product: {
          id: productProps.id,
        },
        quantity: getCartItem === null ? 1 : getCartItem.quantity + 1,
      };

      const URL = "/api/cartitems";
      const methodType = `${getCartItem === null ? "POST" : "PUT"}`;
      const bodyContent = JSON.stringify(cartItem);

      try {
        const response = await customFetchAuth(URL, methodType, bodyContent, {
          username: userSession.username,
          password: userSession.password,
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        setEventClickCartItem(Math.random()); // (!important)
        openNotification("bottomRight");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const redirectToProductDetail = () => {
    history.push({
      pathname: `/products/product/${productProps.id}`,
      state: {
        productProps: productProps,
      },
    });
  };

  return (
    <LazyLoad
      height={380}
      offset={[-380, 0]}
      debounce={500}
      placeholder={<ProductCardLoading />}
    >
      <div className="product_card">
        <LazyLoad once={true} placeholder={<Skeleton.Image />}>
          <div onClick={redirectToProductDetail}>
            <img
              className="card_image"
              loading="lazy"
              src={productProps.mainImage}
              alt="..."
            ></img>
            <div className="card_title_wrapper">
              <p className="card_title">{productProps.title}</p>
            </div>
          </div>
        </LazyLoad>
        <div className="card_body">
          <p className="card_author">{authorName}</p>
          <div className="card_rating">
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="icon_star">
              <AiFillStar />
            </span>
            <span className="card_reviews">5 reviews</span>
          </div>
          <div className="card_price">
            <p className="card_price_number">{`${
              productProps.price / 1000
            }.000 đ`}</p>
            <p className="card_price_promotion">
              -{productProps.productDetail.promotion} %
            </p>
          </div>
          <Button
            variant="outline-primary"
            className="card_button"
            onClick={addToCart}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </LazyLoad>
  );
};

export default ProductCard;
