import React from "react";
//
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="section1">
        <div className="box">
          <p className="title">HỖ TRỢ KHÁCH HÀNG</p>
          <div>
            <p className="item">Hotline chăm sóc khách hàng: 0868216540</p>
            <p className="item">Các câu hỏi thường gặp</p>
            <p className="item">Gửi yêu cầu hỗ trợ</p>
            <p className="item">Hướng dẫn đặt hàng</p>
            <p className="item">Phương thức vận chuyển</p>
            <p className="item">Chính sách đổi trả</p>
          </div>
        </div>
        <div className="box">
          <p className="title">VỀ BOOKSHOP</p>
          <div>
            <p className="item">Giới thiệu Bookshop</p>
            <p className="item">Chính sách bảo mật thanh toán</p>
            <p className="item">Chính sách bảo mật thông tin cá nhân</p>
            <p className="item">Chính sách giải quyết khiếu nại</p>
            <p className="item">Điều khoản sử dụng</p>
          </div>
        </div>
        <div className="box">
          <p className="title">PHƯƠNG THỨC THANH TOÁN</p>
          <div>
            <div className="content">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/visa.svg"></img>
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/mastercard.svg"></img>
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/jcb.svg"></img>
            </div>
            <div className="content">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/cash.svg"></img>
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/internet-banking.svg"></img>
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/installment.svg"></img>
            </div>
          </div>
        </div>
        <div className="box">
          <p className="title">KẾT NỐI VỚI CHÚNG TÔI</p>
          <div className="content">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/fb.svg"></img>
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/youtube.svg"></img>
          </div>
        </div>
        <div className="box">
          <p className="title">TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</p>
          <div className="content_column">
            <img
              width="130"
              height="40"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
            ></img>
            <img
              width="130"
              height="40"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
            ></img>
          </div>
        </div>
      </div>
      <div className="section2">
        <BiCopyright /> 2021 | Bản quyền thuộc về Bookshop
      </div>
    </div>
  );
};

export default Footer;
