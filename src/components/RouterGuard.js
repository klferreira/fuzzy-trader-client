import React from "react";
import { Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const RouterGuard = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const isAuthenticated = () => {
    if (!token) return false;

    const base64 = token.split(".")[1].replace("-", "+").replace("_", "/");
    const jwtData = JSON.parse(atob(base64));

    if (Date.now().valueOf() / 1000 > jwtData.exp) return false;

    return true;
  };

  return isAuthenticated() ? children : <Redirect to="/login" />;
};

export default connect()(RouterGuard);
