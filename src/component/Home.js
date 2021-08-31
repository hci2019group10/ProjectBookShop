import React, { useContext, useEffect, useState } from "react";
// util
import { customFetch } from "../util/customFetch";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
// component
import ProductCard from "./ProductCard";
// design
import "antd/dist/antd.css";
import { Skeleton, Spin, Carousel } from "antd";
import { FcFlashOn } from "react-icons/fc";
// lazyload
import LazyLoad from "react-lazyload";

// css
const fontSizeIcon = {
  fontSize: "2rem",
};

const Home = () => {
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get categories-context
  const [categories, setCategories] = useContext(CategoryContext);
  // get products
  const [products, setProducts] = useContext(ProductContext);

  const productList1 = [...products];
  const discountProducts = productList1.sort(
    (a, b) => b.productDetail.promotion - a.productDetail.promotion
  );
  //
  const productList2 = [...products];
  const mostPurchaseProducts = productList2.sort(
    (a, b) => b.productDetail.purchaseNumber - a.productDetail.purchaseNumber
  );

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [dateReleaseProducts, setDateReleaseProducts] = useState([]);
  const getDateReleaseProducts = async () => {
    const URL = "/api/products/daterelease";
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setDateReleaseProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDateReleaseProducts();
  }, []);

  // pagination
  const [visible1, setVisible1] = useState(10);
  const showMoreProducts1 = () => {
    setVisible1((preValue) => preValue + 10);
  };
  //
  const [visible2, setVisible2] = useState(10);
  const showMoreProducts2 = () => {
    setVisible2((preValue) => preValue + 10);
  };
  //

  // carousel
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          width: "50px",
          height: "50px",
          border: "2px solid white",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          display: "block",
          inset: "0",
          margin: "0",
          background: "transparent",
          color: "white",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          marginTop: "-25px",
          left: "100%",
          marginLeft: "-50px",
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          width: "50px",
          height: "50px",
          border: "2px solid white",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
          display: "block",
          inset: "0",
          margin: "0",
          background: "transparent",
          color: "white",
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          marginTop: "-25px",
          left: "0",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="home">
      <div className="main_carousel">
        <Carousel autoplay arrows {...settings}>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              loading="lazy"
              className="d-block w-100"
              src="https://salt.tikicdn.com/ts/banner/a0/e5/c3/bcf9f95fafcbfebd26260167eac5befc.jpg"
              alt="First slide"
            />
          </div>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              loading="lazy"
              className="d-block w-100"
              src="https://salt.tikicdn.com/ts/banner/b8/6d/cc/7dfce808a26d60e44698f698f64a9f65.jpg"
              alt="Third slide"
            />
          </div>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              loading="lazy"
              className="d-block w-100"
              src="https://salt.tikicdn.com/ts/banner/cf/ef/65/89b87701d2db98dc14a17bed4fcfbad2.jpg"
              alt="Third slide"
            />
          </div>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              loading="lazy"
              className="d-block w-100"
              src="https://salt.tikicdn.com/ts/banner/b9/e2/4e/8da743d575aecda9c96e190035d32f9e.jpg"
              alt="Third slide"
            />
          </div>
          <div>
            <img
              style={{ borderRadius: "5px" }}
              loading="lazy"
              className="d-block w-100"
              src="https://salt.tikicdn.com/ts/banner/40/97/bd/5757c29ce9c5dfd500ded4f7ba832825.jpg"
              alt="Second slide"
            />
          </div>
        </Carousel>
      </div>

      <div className="products_show">
        <div className="products_show_header">
          <span className="products_show_title">
            HOT <FcFlashOn style={fontSizeIcon} /> SALE
          </span>
        </div>
        <div className="products_show_body">
          {discountProducts.map((product) => (
            <ProductCard
              key={product.id}
              userId={userSession.id}
              productProps={product}
            />
          ))}
        </div>
        <div className="products_show_footer"></div>
      </div>

      <div className="all_categories">
        <div className="products_show_header">
          <span className="all_categories_header">ALL CATEGORIES</span>
        </div>
        <div className="all_categories_body">
          {categories.map((category) => (
            <LazyLoad key={category.id} placeholder={<Skeleton />}>
              <div className="category_box" key={category.id}>
                <img
                  className="category_box_image"
                  width="50"
                  height="50"
                  src="https://salt.tikicdn.com/cache/280x280/ts/product/15/11/f8/56b303e000cb42faada663569fc5d7c9.jpg"
                ></img>
                <div className="category_box_name">{category.categoryName}</div>
              </div>
            </LazyLoad>
          ))}
        </div>
      </div>

      <div className="products_show">
        <div className="products_show_header">
          <span className="products_show_title">TOP SELLER</span>
        </div>
        <div className="products_show_body">
          {mostPurchaseProducts.slice(0, visible1).map((product) => (
            <ProductCard
              key={product.id}
              userId={userSession.id}
              productProps={product}
            />
          ))}
        </div>
        <div className="products_show_footer">
          <button onClick={showMoreProducts1} className="view_more">
            View mores
          </button>
        </div>
      </div>

      <div className="products_show">
        <div className="products_show_header">
          <span className="products_show_title">LATEST RELEASE</span>
        </div>
        <div className="products_show_body">
          {dateReleaseProducts.slice(0, visible2).map((product) => (
            <ProductCard
              key={product.id}
              userId={userSession.id}
              productProps={product}
            />
          ))}
        </div>
        <div className="products_show_footer">
          <button onClick={showMoreProducts2} className="view_more">
            View mores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
