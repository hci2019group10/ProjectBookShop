import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
const Menubar = ()=>{
    return(
        <div id="sidebar" class="nav-collapse">
            <div class="leftside-navigation">
                <ul class="sidebar-menu" id="nav-accordion">
                    <li>
                        <Link to="/">
                            <i class="fa fa-home"></i>
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/order">
                            <i class="fa fa-shopping-cart"></i>
                            <span>Đặt hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            <i class="fa fa-product-hunt"></i>
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories">
                            <i class="fa fa-tags"></i>
                            <span>Thể loại</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/author">
                            <i class="fa fa-users"></i>
                            <span>Tác giả</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/publisher">
                            <i class="fa fa-tasks"></i>
                            <span>Nhà xuất bản</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="users.html">
                            <i class="fa fa-users"></i>
                            <span>Người dùng</span>
                        </Link>
                    </li> */}
                    {/* <li class="sub-menu">
                        <Link to="javascript:;">
                            <i class="fa fa-backward"></i>
                            <span>Phản hồi</span>
                        </Link>
                        <ul class="sub">
                            <li><Link to="mail.html">Thư</Link></li>
                            <li><Link to="mail_compose.html">Soạn thư</Link></li>
                            <li><Link to="comment.html">Bình luận</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link href="..\user\index.html">
                            <i class="fa fa-user"></i>
                            <span>Trang User</span>
                        </Link>
                    </li> */}
                </ul>
            </div>
            
        </div>
    );
};
export default Menubar;