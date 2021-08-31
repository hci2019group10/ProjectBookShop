import React, { useContext } from "react";
import {UserSessionContext} from "../../context/UserSessionContext";
import MenuBar from "./Menubar";

const AdminBar = () => {

    // get user-session-context
  const { userSessionContextValue1, userSessionContextValue2 } =
  useContext(UserSessionContext);
const [userSession, setUserSession] = userSessionContextValue1;
    if (userSession.loggedin === false) {
        return <div></div>
    } else

    if (!userSession.roles.includes(1)) {
        return (
            <div></div>
        )
    }

    return (
        <MenuBar/>
    )
}

export default AdminBar;