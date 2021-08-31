import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";
import HomeAdmin  from "./Home";
import  ProductAdmin from "./Product";
import PrivateRouteAdmin from "../util/PrivateRouteAdmin";

const AdminSwitch = () => {
    const match = useRouteMatch();
    return (
        <div className="admin-switch">
            
            <Switch>
                <PrivateRouteAdmin path={`${match.url}`} component={HomeAdmin}></PrivateRouteAdmin>
                <PrivateRouteAdmin path={`${match.url}/products`} component={ProductAdmin}></PrivateRouteAdmin>
            </Switch>
        </div>
    )
}

// haha
export default AdminSwitch;