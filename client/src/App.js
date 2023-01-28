import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "materialize-css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import useRoutes from "./routes";
import AuthContext from "./context/AuthContext";
import useAuth from "./hooks/auth.hook";

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuth = !!token;
  // перенаправляем при авторизации
  const routes = useRoutes(isAuth);
  return (
    // чтобы данные были доступны везде
    <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
