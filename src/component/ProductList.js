import React, { useContext, useEffect, useState } from "react";
// context
import { UserSessionContext } from "../context/UserSessionContext";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import { AuthorContext } from "../context/AuthorContext";
// component
import ProductCard from "./ProductCard";
// form
import { useForm } from "react-hook-form";
// design
import { Skeleton, Spin, Radio, Space, Rate } from "antd";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FcFlashOn } from "react-icons/fc";
// lazyload
import LazyLoad from "react-lazyload";

const ProductList = ({ match }) => {
  console.log(match.url);
  // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get all products
  const [products, setProducts] = useContext(ProductContext);
  // get all categories
  const [categories, setCategories] = useContext(CategoryContext);
  // get all authors
  const [authors, setAuthors] = useContext(AuthorContext);

  //// pagination
  const [visible, setVisible] = useState(8);
  const showMoreProducs = () => {
    setVisible((preValue) => preValue + 8);
  };

  // do anything here
  const [pathRoot, pathRoute, pathBody, pathParam] = match.url.split("/");
  const [productShows, setProductShows] = useState([]);
  const [prevProductShows, setPrevProductShows] = useState([]);

  useEffect(() => {
    getProductShows();
  }, [pathBody, pathParam]);

  function getProductShows() {
    const newProductShows = filterProductShows();
    setProductShows(newProductShows);
    setPrevProductShows(newProductShows);
  }

  function filterProductShows() {
    if (pathBody === "all") {
      return products;
    }
    if (pathBody === "category") {
      return products.filter((p) => p.category == pathParam);
    }
    if (pathBody === "search") {
      return products.filter((p) =>
        p.title.toLowerCase().includes(pathParam.toLowerCase())
      );
    }
  }

  // other filter
  function getAllProducts() {
    innerFilterProductShows("all");
  }
  function getProductsFromLowPrice() {
    innerFilterProductShows("low-price");
  }
  function getProductsFromHighPrice() {
    innerFilterProductShows("high-price");
  }
  function getProductsHotSale() {
    innerFilterProductShows("hot-sale");
  }

  function innerFilterProductShows(filterType, filterKey) {
    const productShowsClone = [...productShows];
    let innerProductShows = [];
    if (filterType === "all") {
      innerProductShows = [...products];
    }
    if (filterType === "low-price") {
      innerProductShows = productShowsClone.sort((a, b) => a.price - b.price);
    }
    if (filterType === "high-price") {
      innerProductShows = productShowsClone.sort((a, b) => b.price - a.price);
    }
    if (filterType === "hot-sale") {
      innerProductShows = productShowsClone.sort(
        (a, b) =>
          b.productDetail.purchaseNumber - a.productDetail.purchaseNumber
      );
    }
    setProductShows(innerProductShows);
  }

  // left filter
  function onChangeStarRating(e) {
    console.log("checked = ", e.target.value);
  }
  function onChangeCategoryChecked(e) {
    const value = e.target.value;
    const prevProducShowsClone = [...prevProductShows];
    if (value === "all") {
      setProductShows(prevProducShowsClone);
    } else {
      const productShowsByCategory = prevProducShowsClone.filter(
        (p) => p.category == value
      );
      setProductShows(productShowsByCategory);
    }
  }
  function onChangeAuthorChecked(e) {
    const value = e.target.value;
    const prevProductShowsClone = [...prevProductShows];
    if (value === "all") {
      setProductShows(prevProductShowsClone);
    } else {
      const productShowsByAuthor = prevProductShowsClone.filter(
        (p) => p.author == value
      );
      setProductShows(productShowsByAuthor);
    }
  }
  function onChangePublisherChecked(checkedValues) {
    console.log("checked = ", checkedValues);
  }
  // price filter
  const { register, handleSubmit, errors } = useForm();
  const onSubmitFormPrice = (e) => {
    console.log(e);
    const prevProductShowsClone = [...prevProductShows];
    if (e.lowPrice === "" && e.highPrice === "") {
      setProductShows(prevProductShowsClone);
    } else {
      const productShowsByPrice = prevProductShowsClone.filter(
        (p) => p.price >= e.lowPrice && p.price <= e.highPrice
      );
      setProductShows(productShowsByPrice);
    }
  };

  return (
    <div className="product_list_container">
      <div className="product_list_header">
        <span className="product_list_title">
          List of products: {prevProductShows.length} results
        </span>
      </div>
      <div className="product_list_body">
        <div className="product_list_body_left">
          <div className="sec_1">
            <div className="product_list_body_left_header">
              SEARCH BY: <span className="searchby">{pathBody}</span>
            </div>
            <p className="keyword">
              Keyword: <span>{pathParam}</span>
            </p>
          </div>
          <div className="sec_2">
            <div className="product_list_body_left_header">RATINGS</div>
            <Radio.Group onChange={onChangeStarRating}>
              <Space direction="vertical">
                <Radio value="5star" checked={true}>
                  <Rate disabled defaultValue={5} />
                </Radio>
                <Radio value="4star">
                  <Rate disabled defaultValue={4} />
                </Radio>
                <Radio value="3star">
                  <Rate disabled defaultValue={3} />
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="sec_3">
            <div className="product_list_body_left_header">FILTER BY PRICE</div>
            <form onSubmit={handleSubmit(onSubmitFormPrice)}>
              <input
                name="lowPrice"
                {...register("lowPrice")}
                placeholder="From"
              ></input>
              <input
                name="highPrice"
                {...register("highPrice")}
                placeholder="To"
              ></input>
              <button type="submit">Filter</button>
            </form>
          </div>
          <div className="sec_4">
            <div className="product_list_body_left_header">CATEGORIES</div>
            <Radio.Group
              onChange={onChangeCategoryChecked}
              style={{
                height: "22rem",
                overflowY: "scroll",
              }}
            >
              <Space direction="vertical">
                <Radio value="all" checked>
                  All category
                </Radio>
                {categories.map((c) => (
                  <Radio value={c.id} key={c.id}>
                    {c.categoryName}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
          <div className="sec_5">
            <div className="product_list_body_left_header">AUTHORS</div>
            <Radio.Group
              onChange={onChangeAuthorChecked}
              style={{
                height: "22rem",
                overflowY: "scroll",
              }}
            >
              <Space direction="vertical">
                <Radio value="all" checked>
                  All author
                </Radio>
                {authors.map((a) => (
                  <Radio value={a.id} key={a.id}>
                    {a.authorName}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="product_list">
          <div className="product_list_top">
            <span>Filter with:</span>
            <button onClick={getAllProducts}>All</button>
            <button onClick={getProductsFromLowPrice}>
              From low price <BsArrowDown />
            </button>
            <button onClick={getProductsFromHighPrice}>
              From high price <BsArrowUp />
            </button>
            <button onClick={getProductsHotSale}>
              Hot Sale
              <FcFlashOn />
            </button>
            <button>Latest Release</button>
          </div>
          <div className="product_list_mid">
            {productShows.slice(0, visible).map((product) => (
              <ProductCard
                key={product.id}
                userId={userSession.id}
                productProps={product}
              />
            ))}
          </div>
          <div className="product_list_bottom">
            <button onClick={showMoreProducs} className="view_more">
              Show more products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
