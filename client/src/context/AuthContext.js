import React, { createContext } from "react";

function noop() {}

const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuth: false,
});

export default AuthContext;
