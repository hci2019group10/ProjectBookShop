import React, { useState, createContext, useEffect } from "react";
// util
import { customFetch } from "../util/customFetch";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [usernames, setUsernames] = useState([]);
  const [rerenderUsernames, setRerenderUsernames] = useState(0);

  useEffect(() => {
    getUsernames();
  }, [rerenderUsernames]);

  const getUsernames = async () => {
    const URL = "/api/users";
    try {
      const response = await customFetch(URL, "GET", null);
      if (!response.ok) throw new Error("Problem get usernames");
      const data = await response.json();
      setUsernames(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userContextValue1: usernames,
        userContextValue2: setRerenderUsernames,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
