import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// context
import { UserSessionContext } from "../../context/UserSessionContext";
import NotFound from "../../util/NotFound";

const PrivateRoute = (props) => {
  const { path, component } = props;

  const { userSessionContextValue1, userSessionContextValue2 } =
    useContext(UserSessionContext);
  const [userSession, setUserSession] = userSessionContextValue1;

  if (userSession.loggedin === false) {
    return <Redirect from={path} to="/login"></Redirect>;
  }
  if(!userSession.roles.includes(1) ){
    return <Redirect from={path} to="/notfound"></Redirect>;
  }
  
  return <Route path={path} exact component={component}></Route>;
  
};

export default PrivateRoute;
