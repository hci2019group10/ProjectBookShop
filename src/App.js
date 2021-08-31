// router dom
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// css
import "./App.css";
// context provider
import { UserSessionProvider } from "./context/UserSessionContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { AuthorProvider } from "./context/AuthorContext";
import { OrderTableProvider } from "./context/OrderTableContext";
import { UserProvider } from "./context/UserContext";
// component

// import ProductList from "./component/ProductList";
// import ProductDetail from "./component/ProductDetail";
// import Home from "./component/Home";
// import Header from "./component/Header";
// import Login from "./component/Login";
// import Signup from "./component/Signup";
// import VerifyAccount from "./component/VerifyAccount";
// import Cart from "./component/Cart";
// import OrderProcess from "./component/OrderProcess";
// import OrderTableList from "./component/OrderTableList";
// import Footer from "./component/Footer";
// import SendMail from "./component/SendMail";
// import ProcessResult from "./component/ProcessResult";
// utils
import PrivateRoute from "./util/PrivateRoute";
import NotFound from "./util/NotFound";
import Loading from "./util/Loading";
//
import { BackTop } from "antd";
import { BsArrowUp } from "react-icons/bs";
import React from "react";
// 
import PrivateRouteAdmin from "./admin/util/PrivateRouteAdmin";
import AdminBar from "./admin/component/AdminBar";

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

function App() {
  const ProductList = React.lazy(() => import("./component/ProductList"));
  const ProductDetail = React.lazy(() => import("./component/ProductDetail"));
  const Home = React.lazy(() => import("./component/Home"));
  const Header = React.lazy(() => import("./component/Header"));
  const Login = React.lazy(() => import("./component/Login"));
  const Signup = React.lazy(() => import("./component/Signup"));
  const VerifyAccount = React.lazy(() => import("./component/VerifyAccount"));
  const Cart = React.lazy(() => import("./component/Cart"));
  const OrderProcess = React.lazy(() => import("./component/OrderProcess"));
  const OrderTableList = React.lazy(() => import("./component/OrderTableList"));
  const Footer = React.lazy(() => import("./component/Footer"));
  const SendMail = React.lazy(() => import("./component/SendMail"));
  const ProcessResult = React.lazy(() => import("./component/ProcessResult"));
  const User = React.lazy(() => import("./component/User"));
  const Menubar = React.lazy(() => import("./component/Menubar"));
  const ChangePassword = React.lazy(() => import("./component/ChangePassword"));
  const Address = React.lazy(() => import("./component/Address"));
  const HeaderAdmin = React.lazy(() => import("./admin/component/Header"));
  const HomeAdmin = React.lazy(() => import("./admin/component/Home"));
  const MenuBarAdmin = React.lazy(() => import("./admin/component/Menubar"));
  // const Order = React.lazy(() => import("./component/Address"));
  // const OrderAdmin = React.lazy(() => import("./admin/component/Order"));
  // const OrderDetailAdmin = React.lazy(() => import("./admin/component/OrderDetail"));
  const ProductAdmin = React.lazy(() => import("./admin/component/Product"));
  // const AddProductAdmin = React.lazy(() => import("./admin/component/Address"));
  // const Address = React.lazy(() => import("./admin/component/Address"));
  // const Address = React.lazy(() => import("./admin/component/Address"));
  const AdminSwitch = React.lazy(()=> import("./admin/component/AdminSwitch"));
  // 
  

  return (
    // user session wrap all component
    <Suspense fallback={<Loading />}>
      <UserSessionProvider>
        <UserProvider>
          <CategoryProvider>
            <CartProvider>
              <OrderTableProvider>
                <ProductProvider>
                  <AuthorProvider>
                    <Router>
                      <div className="App">
                  
                        <Header />
                        <AdminBar/>
                        <Switch>
                          <Redirect exact from="/" to="/home"></Redirect>
                          <Route path="/home"  exact component={Home}></Route>
                          <Route path="/login" component={Login}></Route>
                          <Route path="/signup" component={Signup}></Route>
                          <PrivateRoute
                            path="/verify"
                            component={VerifyAccount}
                          ></PrivateRoute>
                          {/* ------------------------------------------------- */}
                          <Route
                            path="/products/product/:productid"
                            exact
                            component={ProductDetail}
                          ></Route>
                          <Route
                            path="/products/all/"
                            exact
                            component={ProductList}
                          ></Route>
                          <Route
                            path="/products/category/:categoryid"
                            exact
                            component={ProductList}
                          ></Route>
                          <Route
                            path="/products/search/:searchkey"
                            exact
                            component={ProductList}
                          ></Route>
                          <Route
                            path="/products/author/:authorid"
                            exact
                            component={ProductList}
                          ></Route>
                          <Route
                            path="/products/publisher/:publisherid"
                            exact
                            component={ProductList}
                          ></Route>
                          <Route
                            path="/products/filter/:filterkey"
                            exact
                            component={ProductList}
                          ></Route>
                          {/* ------------------------------------------------ */}
                          {/* <Route path="/cart" component={Cart}></Route> */}
                          <PrivateRoute
                            path="/cart"
                            component={Cart}
                          ></PrivateRoute>
                          <PrivateRoute
                            path="/orderprocess"
                            component={OrderProcess}
                          ></PrivateRoute>
                          <PrivateRoute
                            path="/processresult"
                            component={ProcessResult}
                          ></PrivateRoute>
                          <PrivateRoute
                            path="/ordertablelist"
                            component={OrderTableList}
                          ></PrivateRoute>
                          {/* <Router>
                            <div className="account-content">
                              <Menubar/>
                              <Switch>
                                <PrivateRoute path="/user/account/profile" exact component= {User}/>
                                <PrivateRoute path="/user/account/changePassword" exact component= {ChangePassword}/>
                                <PrivateRoute path="/user/account/address" exact component= {Address}/>
                              </Switch>
                            </div>
                          </Router> */}
                          {/* ADMIN  */}
                          <PrivateRouteAdmin path="/admin" exact component={HomeAdmin}></PrivateRouteAdmin>
                          <PrivateRouteAdmin path="/admin/products" exact component={ProductAdmin}></PrivateRouteAdmin>
                          <Route component={() => <NotFound />}></Route>
                        </Switch>
                        <Footer />
                        <BackTop>
                          <div style={style}>
                            <BsArrowUp />
                          </div>
                        </BackTop>
                      </div>
                    </Router>
                   
                  </AuthorProvider>
                </ProductProvider>
              </OrderTableProvider>
            </CartProvider>
          </CategoryProvider>
        </UserProvider>
      </UserSessionProvider>
    </Suspense>
  );
}

export default App;
