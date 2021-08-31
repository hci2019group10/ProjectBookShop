import React, { useContext } from "react";
// context
import { ProductContext } from "../context/ProductContext";

const OrderItem = (props) => {
  const { cartItemProps } = props;
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  // get single product
  const getProductInfo = () => {
    const index = products.findIndex(
      (product) => product.id === cartItemProps.product
    );
    return products[index];
  };
  const getProduct = getProductInfo();

  return (
    <div className="order_item">
      <img width="50" height="50" src={getProduct.mainImage}></img>
      <div className="product_title">
        <p>{getProduct.title}</p>
      </div>
      <p>{`${getProduct.price / 1000}.000 đ`}</p>
      <p>x {cartItemProps.quantity}</p>
    </div>
  );
};

export default OrderItem;
