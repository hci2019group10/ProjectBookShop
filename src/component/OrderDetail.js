import React, { useContext } from "react";
// context
import { ProductContext } from "../context/ProductContext";

const OrderDetail = (props) => {
  const { orderDetailProps } = props;
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  // get single product
  const getProductInfo = () => {
    const index = products.findIndex(
      (product) => product.id === orderDetailProps.productId
    );
    return products[index];
  };
  const getProduct = getProductInfo();

  return (
    <div className="order_detail">
      <img width="40" height="40" src={getProduct.mainImage}></img>
      <div className="div_product_title">
        <p className="product_title">{getProduct.title}</p>
      </div>
      <p className="product_title">{`${getProduct.price / 1000}.000 đ`}</p>
      <p className="product_title">x {orderDetailProps.quantity}</p>
    </div>
  );
};

export default OrderDetail;
