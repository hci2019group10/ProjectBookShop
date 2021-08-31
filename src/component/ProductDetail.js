import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// util
import { customFetch, customFetchAuth } from "../util/customFetch";
// context
import { CartContext } from "../context/CartContext";
import { UserSessionContext } from "../context/UserSessionContext";
import { AuthorContext } from "../context/AuthorContext";
import getAuthorName from "../util/getAuthorName";
// component
import CommentItem from "./CommentItem";
// design
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "antd/dist/antd.css";
import { Table, Rate, Image, Form, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AiFillGift } from "react-icons/ai";
import { notification } from "antd";

const openNotification = (placement) => {
  notification.success({
    message: "View your shopping bag!",
    description: "The product has been added to shopping bag.",
    placement,
  });
};

const ProductDetail = () => {
  const history = useHistory();
  const productProps = history.location.state.productProps;

  // cart-context for listen onchange cart-item
  const { cartContextValue1, cartContextValue2 } = useContext(CartContext);
  const [cartItems, setCartItems] = cartContextValue1;
  const [eventClickCartItem, setEventClickCartItem] = cartContextValue2;
  //
  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;
  // get all author
  const [authors, setAuthors] = useContext(AuthorContext);
  const authorName = getAuthorName(authors, productProps.author);
  // ...
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

  // process add product to cart ++++++++++++++++++++++++++++++++++++++++++++++++++++
  const addToCart = async () => {
    if (userSession.loggedin === false) {
      history.push({
        pathname: "/login",
        state: {
          from: "/nothing",
        },
      });
    } else {
      const getCartItem = findCartItem(userSession.id, productProps.id);
      const cartItem = {
        id: getCartItem === null ? 0 : getCartItem.id,
        user: {
          id: userSession.id,
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

  // load review +++++++++++++++++++++++++++++++++++++++++++++
  const [reviews, setReviews] = useState([]);
  const [reviewsChange, setReviewsChange] = useState(0);

  const averageStar = () => {
    let sum = 0;
    const reviewsClone = [...reviews];
    if (reviewsClone.length === 0) {
      return 0;
    }
    reviewsClone.forEach((review) => {
      sum += review.rating;
    });
    const average = sum / reviewsClone.length;
    console.log("Số sao: ", average);
    return average;
  };
  const averageRating = averageStar();

  const getReviews = async () => {
    const URL = `/api/reviews/product/${productProps.id}`;
    try {
      const response = await customFetch(URL, "GET", null);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [reviewsChange]);

  // comment ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [review, setReview] = useState("");
  const typeReview = (e) => {
    setReview(e.target.value);
  };

  const [star, setStar] = useState(4);
  const onChangeRating = (e) => {
    setStar(e);
  };

  const addReview = async () => {
    const URL = "/api/reviews";
    const bodyContent = JSON.stringify({
      user: { id: userSession.id },
      product: { id: productProps.id },
      comment: `${review}`,
      rating: star,
    });
    try {
      const response = await customFetchAuth(URL, "POST", bodyContent, {
        username: userSession.username,
        password: userSession.password,
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      setReviewsChange(Math.random());
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (userSession.loggedin === false) {
      history.push({
        pathname: "/login",
        state: {
          from: "/nothing",
        },
      });
    } else {
      addReview();
    }
  };

  // DESIGN -------------------------------------------------------------------------------
  // table
  const dataSource = [
    {
      key: "1",
      detail: "Code",
      value: `${productProps.productDetail.code}`,
    },
    {
      key: "2",
      detail: "Country",
      value: `${productProps.productDetail.country}`,
    },
    {
      key: "3",
      detail: "Language",
      value: `${productProps.productDetail.language}`,
    },
    {
      key: "4",
      detail: "Format",
      value: `${productProps.productDetail.format}`,
    },
    {
      key: "5",
      detail: "Dimensions",
      value: `${productProps.productDetail.dimensions}`,
    },
    {
      key: "6",
      detail: "Date Realease",
      value: `${productProps.productDetail.dateRelease}`,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSourceDetail = [
    {
      key: "1",
      detail: `${productProps.productDetail.detailDescription}`,
    },
  ];

  const columnDetail = [
    {
      title: "SHORT DESCRIPTION",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  // upload
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // custom css
  const fontSize = {
    fontSize: "14px",
    textDecoration: "none",
  };

  // END DESIGN ---------------------------------------------------------------------

  return (
    <div className="product_detail">
      <div className="product_detail_section_1">
        <div className="section_left">
          <Carousel>
            <Carousel.Item>
              <div className="carousel_item">
                <Image loading="lazy" src={productProps.mainImage}></Image>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel_item">
                <Image
                  loading="lazy"
                  src={productProps.productDetail.image1}
                ></Image>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel_item">
                <Image
                  loading="lazy"
                  src={productProps.productDetail.image2}
                ></Image>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="section_right">
          <div className="main">
            <p className="product_title">{productProps.title}</p>
            <div className="text1">
              <p className="product_author">
                Author:{" "}
                <Link to="/" style={fontSize}>
                  {authorName}
                </Link>
              </p>
              <p className="product_category">
                | Category:{" "}
                <Link to="/" style={fontSize}>
                  {productProps.category}
                </Link>
              </p>
              <p className="product_publisher">
                | Publisher:{" "}
                <Link to="/" style={fontSize}>
                  {productProps.publisher}
                </Link>
              </p>
            </div>
            <div className="product_rating">
              <Rate disabled value={averageRating} />
              <span className="product_reviews">
                <Link to="/" style={fontSize}>
                  View {reviews.length} reviews
                </Link>
              </span>
            </div>

            <div className="text2">
              <span className="purchase_number">
                {productProps.productDetail.numberOfProduct -
                  productProps.productDetail.purchaseNumber}{" "}
                remains
              </span>
              <span className="purchase_number">
                {productProps.productDetail.purchaseNumber} solds
              </span>
            </div>

            <span className="product_price">
              {`${productProps.price / 1000}.000 `}
              <ins>đ</ins>
            </span>
            <div className="product_old_price">
              <del>{`${productProps.price / 1000}.000 đ`}</del>
              <span className="product_promotion">{` -${productProps.productDetail.promotion}%`}</span>
            </div>
          </div>
          <button
            className="btn_addtocart"
            variant="outline-primary"
            onClick={addToCart}
          >
            ADD TO SHOPPING BAG
          </button>
        </div>
        <div className="section_option">
          <img
            height="200"
            src="https://salt.tikicdn.com/cache/280x280/ts/product/3a/86/d9/51c5872cc9b1f8776114c1484f5a8faa.jpg"
          ></img>
          <p className="text">
            <AiFillGift /> Tặng bạn voucher bộ file thuyết trình 1500+,
            Powerpoint Template, 800+ Infographic, 3000+ Icon - Tải Trực tuyến,
            truy cập TRỌN ĐỜI
          </p>
        </div>
      </div>
      <span className="section_title">Detail description</span>
      <div className="product_detail_section_2">
        <div className="content">
          <div className="section_left">
            <Table
              style={fontSize}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
            />
          </div>
          <div className="section_right">
            <Table
              style={fontSize}
              dataSource={dataSourceDetail}
              columns={columnDetail}
              pagination={false}
              bordered
            />
          </div>
        </div>
      </div>
      <span className="section_title">Reviews</span>
      <div className="product_detail_section_4">
        <div className="section_down">
          {reviews.map((review) => (
            <CommentItem
              key={review.id}
              userId={review.user}
              reviewId={review.id}
              comment={review.comment}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
      <span className="section_title">Comment</span>
      <div className="product_detail_section_3">
        <form className="section_up" onSubmit={submitReview}>
          <div className="haha">
            <i className="section_up_title">* Rating:</i>
            <Rate onChange={onChangeRating} />
          </div>

          <div>
            <i className="section_up_title">* Content:</i>
            <textarea
              placeholder="Type your comment here"
              className="text_area"
              value={review}
              onChange={typeReview}
            ></textarea>
          </div>

          <div>
            <i className="section_up_title">{`Upload image (optional):`}</i>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-hint">
                  Click or drag file to this area to upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>
          <button className="button_submit" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="product_detail_section_5"></div>
    </div>
  );
};

export default ProductDetail;
