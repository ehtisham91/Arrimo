import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getLocalStorage } from "../../utils";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getLocalStorage("token")) {
      navigate("/login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <>{children}</>;
};

export default Auth;
