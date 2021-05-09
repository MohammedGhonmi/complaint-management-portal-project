import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";

const AuthContext = React.createContext({
  user: null,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    // Update the logged in status using get user API
    if (localStorage.getItem("token")) {
      UserDataService.getCurrentUser()
        .then((res) => {
          const newUser = { username: res.data.username, role: res.data.role };
          setIsAdmin(newUser.role == "admin" ? true : false);
          setUser(newUser);
          console.log(newUser);
        })
        .catch((err) => {
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [isLogged]);

  const loginHandler = (token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLogged(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLogged(false);
  };

  const contextValue = {
    user: user,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
