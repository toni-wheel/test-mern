import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const useRoutes = (isAuth) => {
  // если пользователь авторизован
  if (isAuth) {
    return (
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route index element={<HomePage />} />
      </Routes>
    );
  } // если пользователь не авторизован
  else
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<LoginPage />} />
      </Routes>
    );
};

export default useRoutes;
