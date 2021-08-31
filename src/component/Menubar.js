import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, Dropdown, Input, AutoComplete } from "antd";
import avatar_default from "../img/avatar_default.jpg";
import { Link, useHistory } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { UserSessionContext } from "../context/UserSessionContext";
const Menubar = ()=>{
    const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
    const [userSession, setUserSession] = userSessionContextValue1;
    const userName = userSession.username;
    return(
        <div className="left-menu">
            <div className="profile">
                <img src={avatar_default}/>
                <div className="profile-name">{userName}</div>
            </div>
            <div class="profile-menu">
                <ul>
                    <li><i className="fa fa-user-circle"></i> &ensp;<Link to="/user/account/profile">My Account</Link>
                        <ul>
                            <li><Link to="/user/account/profile">Profile</Link></li>
                            <li><Link to="/user/account/changePassword">Change password</Link></li>
                            <li><Link to="/user/account/address">Address</Link></li>
                        </ul>
                    </li>
                    <li><i className="fa fa-shopping-bag"></i> &ensp;<Link to="profile.html">My order</Link></li>

                </ul>
            </div>
        
        </div>

    );
};

export default Menubar;
    
